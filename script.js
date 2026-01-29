// Echoes Explorer Browser - Full Browser Implementation

class EchoesBrowser {
    constructor() {
        this.tabs = [];
        this.currentTabId = null;
        this.history = {};
        this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.createInitialTab();
        this.loadBookmarks();
    }
    
    initializeElements() {
        this.addressBar = document.getElementById('addressBar');
        this.webFrame = document.getElementById('webFrame');
        this.backBtn = document.getElementById('backBtn');
        this.forwardBtn = document.getElementById('forwardBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.homeBtn = document.getElementById('homeBtn');
        this.searchBtn = document.getElementById('searchBtn');
        this.tabBar = document.querySelector('.tab-bar');
        this.pageInfo = document.querySelector('.page-info');
        this.securityIndicator = document.querySelector('.security-indicator');
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.backBtn.addEventListener('click', () => this.goBack());
        this.forwardBtn.addEventListener('click', () => this.goForward());
        this.refreshBtn.addEventListener('click', () => this.refreshPage());
        this.homeBtn.addEventListener('click', () => this.goHome());
        this.searchBtn.addEventListener('click', () => this.navigateToUrl());
        
        // Address bar
        this.addressBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigateToUrl();
            }
        });
        
        this.addressBar.addEventListener('input', (e) => {
            this.handleAddressBarInput(e.target.value);
        });
        
        this.addressBar.addEventListener('focus', () => {
            this.showSuggestions();
        });
        
        this.addressBar.addEventListener('blur', () => {
            // Delay hiding suggestions to allow clicking them
            setTimeout(() => {
                this.hideSuggestions();
            }, 200);
        });
        
        // Tab management
        document.querySelector('.new-tab-btn').addEventListener('click', () => this.createNewTab());
        
        // Window controls
        document.querySelector('.close-btn').addEventListener('click', () => window.close());
        document.querySelector('.minimize-btn').addEventListener('click', () => {
            if (window.frameElement) {
                window.parent.postMessage({type: 'minimize'}, '*');
            }
        });
        document.querySelector('.maximize-btn').addEventListener('click', () => {
            if (window.frameElement) {
                window.parent.postMessage({type: 'maximize'}, '*');
            }
        });
        
        // Bookmarks button - hold to see history
        const bookmarksBtn = document.querySelector('.bookmarks-btn');
        let pressTimer;
        
        bookmarksBtn.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => {
                this.showHistoryPanel();
            }, 1000); // Show history after holding for 1 second
        });
        
        bookmarksBtn.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
            this.toggleBookmarks(); // Show bookmarks on regular click
        });
        
        bookmarksBtn.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
        });
        
        // Handle iframe load events
        this.webFrame.addEventListener('load', () => {
            this.updateSecurityIndicator();
            this.updatePageTitle();
            this.saveHistory();
        });
        
        // Prevent context menu on browser elements
        document.addEventListener('contextmenu', function(e) {
            if (!e.target.closest('iframe')) {
                e.preventDefault();
            }
        });
    }
    
    createInitialTab() {
        this.createTab('about:blank', 'New Tab');
    }
    
    createTab(url = 'about:blank', title = 'New Tab') {
        const tabId = Date.now().toString();
        
        const tab = {
            id: tabId,
            url: url,
            title: title,
            history: [url],
            historyIndex: 0
        };
        
        this.tabs.push(tab);
        this.currentTabId = tabId;
        
        this.renderTabs();
        this.switchToTab(tabId);
        
        if (url !== 'about:blank') {
            this.loadUrl(url);
        }
    }
    
    renderTabs() {
        const tabsContainer = this.tabBar;
        // Clear existing tabs except the new tab button
        const newTabBtn = tabsContainer.querySelector('.new-tab-btn');
        tabsContainer.innerHTML = '';
        tabsContainer.appendChild(newTabBtn);
        
        this.tabs.forEach(tab => {
            const tabElement = document.createElement('div');
            tabElement.className = `tab ${tab.id === this.currentTabId ? 'active-tab' : ''}`;
            tabElement.dataset.tabId = tab.id;
            
            tabElement.innerHTML = `
                <span class="tab-title">${tab.title}</span>
                <button class="tab-close-btn">×</button>
            `;
            
            tabElement.querySelector('.tab-close-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(tab.id);
            });
            
            tabElement.addEventListener('click', () => {
                this.switchToTab(tab.id);
            });
            
            tabsContainer.insertBefore(tabElement, newTabBtn);
        });
    }
    
    switchToTab(tabId) {
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab) {
            this.currentTabId = tabId;
            this.webFrame.src = tab.url;
            this.addressBar.value = tab.url;
            this.updateTabTitle(tabId, tab.title);
            this.updateNavigationButtons();
            this.renderTabs();
        }
    }
    
    closeTab(tabId) {
        if (this.tabs.length <= 1) {
            alert('Cannot close the last tab');
            return;
        }
        
        const tabIndex = this.tabs.findIndex(tab => tab.id === tabId);
        if (tabIndex !== -1) {
            this.tabs.splice(tabIndex, 1);
            
            if (tabId === this.currentTabId) {
                const newActiveTab = this.tabs[0];
                this.currentTabId = newActiveTab.id;
                this.switchToTab(newActiveTab.id);
            }
            
            this.renderTabs();
        }
    }
    
    navigateToUrl() {
        let url = this.addressBar.value.trim();
        
        if (!url) return;
        
        // Validate URL to prevent XSS and malicious schemes
        if (!this.isValidUrl(url)) {
            alert('Invalid URL. Only HTTP, HTTPS, and search queries are allowed.');
            return;
        }
        
        // Check if it's a valid URL or search query
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.includes('.') && !url.includes(' ')) {
                url = 'https://' + url;
            } else {
                // Treat as search query
                url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            }
        }
        
        // Warn about potential security risks for non-HTTPS sites
        if (!url.startsWith('https://')) {
            const continueBrowsing = confirm(`Warning: You are about to visit a non-secure site (${url}).

Proceed with caution as data transmitted may not be encrypted.

Click OK to continue or Cancel to stay on current page.`);
            if (!continueBrowsing) return;
        }
        
        this.loadUrl(url);
    }
    
    isValidUrl(string) {
        try {
            // Check for potentially dangerous URL schemes
            if (/^(javascript|data|vbscript|file|blob|ftp):/i.test(string)) {
                return false;
            }
            
            // If it's already a valid HTTP/HTTPS URL, return true
            if (string.startsWith('http://') || string.startsWith('https://')) {
                const url = new URL(string);
                return ['http:', 'https:'].includes(url.protocol);
            }
            
            // If it looks like a domain (contains dot but no spaces), it's valid for our purposes
            if (string.includes('.') && !string.includes(' ')) {
                return /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9](\\.[a-z0-9][a-z0-9-]{1,61}[a-z0-9])*$/i.test(string.split('/')[0]);
            }
            
            // If it's a search query, it's valid
            return true;
        } catch (err) {
            return false;
        }
    }
    
    loadUrl(url) {
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        if (currentTab) {
            // Update tab history
            currentTab.history = currentTab.history.slice(0, currentTab.historyIndex + 1);
            currentTab.history.push(url);
            currentTab.historyIndex = currentTab.history.length - 1;
            currentTab.url = url;
            
            this.webFrame.src = url;
            this.updateNavigationButtons();
        }
    }
    
    goBack() {
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        if (currentTab && currentTab.historyIndex > 0) {
            currentTab.historyIndex--;
            const previousUrl = currentTab.history[currentTab.historyIndex];
            currentTab.url = previousUrl;
            this.webFrame.src = previousUrl;
            this.addressBar.value = previousUrl;
            this.updateNavigationButtons();
        }
    }
    
    goForward() {
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        if (currentTab && currentTab.historyIndex < currentTab.history.length - 1) {
            currentTab.historyIndex++;
            const nextUrl = currentTab.history[currentTab.historyIndex];
            currentTab.url = nextUrl;
            this.webFrame.src = nextUrl;
            this.addressBar.value = nextUrl;
            this.updateNavigationButtons();
        }
    }
    
    refreshPage() {
        this.webFrame.src = this.webFrame.src;
    }
    
    goHome() {
        this.loadUrl('about:blank');
        this.addressBar.value = '';
    }
    
    updateNavigationButtons() {
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        if (currentTab) {
            this.backBtn.disabled = currentTab.historyIndex <= 0;
            this.forwardBtn.disabled = currentTab.historyIndex >= currentTab.history.length - 1;
        }
    }
    
    updateSecurityIndicator() {
        const currentUrl = this.webFrame.contentWindow?.location.href || this.webFrame.src;
        
        if (currentUrl.startsWith('https://')) {
            this.securityIndicator.className = 'security-indicator secure';
            this.securityIndicator.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.1 16,13V16C16,16.97 15.4,17.5 14.5,17.5H9.5C8.6,17.5 8,16.97 8,16V13C8,12.1 8.6,11.5 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.5V11.5H13.5V10.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                </svg>
                Secure Connection (HTTPS)
            `;
        } else if (currentUrl.startsWith('http://')) {
            this.securityIndicator.className = 'security-indicator not-secure';
            this.securityIndicator.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.1 16,13V16C16,16.97 15.4,17.5 14.5,17.5H9.5C8.6,17.5 8,16.97 8,16V13C8,12.1 8.6,11.5 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.5V11.5H13.5V10.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                </svg>
                Not Secure (HTTP)
            `;
        } else {
            // For special URLs like about:blank
            this.securityIndicator.className = 'security-indicator info';
            this.securityIndicator.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                Internal Page
            `;
        }
    }
    
    updatePageTitle() {
        try {
            const frameDoc = this.webFrame.contentDocument || this.webFrame.contentWindow.document;
            const title = frameDoc.title || this.getAddressDomain(this.webFrame.src);
            this.updateTabTitle(this.currentTabId, title);
            document.title = 'Echoes Browser';
            this.pageInfo.textContent = `Loaded: ${title}`;
        } catch (e) {
            // Cross-origin restrictions prevent accessing title
            const title = this.getAddressDomain(this.webFrame.src);
            this.updateTabTitle(this.currentTabId, title);
            document.title = 'Echoes Browser';
            this.pageInfo.textContent = `Loaded: ${title}`;
        }
    }
    
    getAddressDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (e) {
            return url;
        }
    }
    
    updateTabTitle(tabId, title) {
        const tabElement = document.querySelector(`.tab[data-tab-id="${tabId}"]`);
        if (tabElement) {
            const titleSpan = tabElement.querySelector('.tab-title');
            if (titleSpan) {
                titleSpan.textContent = title.length > 20 ? title.substring(0, 20) + '...' : title;
            }
        }
    }
    
    saveHistory() {
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        if (currentTab) {
            const historyEntry = {
                url: currentTab.url,
                title: currentTab.title,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            let browserHistory = JSON.parse(localStorage.getItem('browserHistory')) || [];
            browserHistory.unshift(historyEntry);
            // Keep only last 100 entries
            browserHistory = browserHistory.slice(0, 100);
            localStorage.setItem('browserHistory', JSON.stringify(browserHistory));
        }
    }
    
    toggleBookmarks() {
        // Create or toggle bookmarks sidebar
        let sidebar = document.querySelector('.bookmark-sidebar');
        
        if (sidebar) {
            sidebar.classList.toggle('active');
        } else {
            sidebar = this.createBookmarksSidebar();
            document.body.appendChild(sidebar);
            setTimeout(() => sidebar.classList.add('active'), 10);
        }
    }
    
    createBookmarksSidebar() {
        const sidebar = document.createElement('div');
        sidebar.className = 'bookmark-sidebar';
        
        const currentTab = this.tabs.find(tab => tab.id === this.currentTabId);
        const currentUrl = currentTab ? currentTab.url : this.webFrame.src;
        const pageTitle = currentTab ? currentTab.title : this.getDocumentTitle();
        
        sidebar.innerHTML = `
            <div class="bookmark-header">
                <h3>Bookmarks</h3>
                <button class="close-sidebar">×</button>
            </div>
            <div class="bookmark-list">
                <div class="add-bookmark-section">
                    <h4>Add Current Page</h4>
                    <input type="text" class="bookmark-title" value="${pageTitle}" placeholder="Bookmark title">
                    <input type="text" class="bookmark-url" value="${currentUrl}" placeholder="Bookmark URL">
                    <button class="save-bookmark-btn">Save Bookmark</button>
                </div>
                <h4>Your Bookmarks</h4>
                <div class="bookmarks-container">
                    
                </div>
            </div>
        `;
        
        // Add event listeners
        sidebar.querySelector('.close-sidebar').addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
        
        sidebar.querySelector('.save-bookmark-btn').addEventListener('click', () => {
            const titleInput = sidebar.querySelector('.bookmark-title');
            const urlInput = sidebar.querySelector('.bookmark-url');
            
            if (titleInput.value && urlInput.value) {
                this.addBookmark(titleInput.value, urlInput.value);
                this.renderBookmarksList(sidebar);
                titleInput.value = pageTitle;
                urlInput.value = currentUrl;
            }
        });
        
        this.renderBookmarksList(sidebar);
        
        return sidebar;
    }
    
    addBookmark(title, url) {
        const bookmark = {
            id: Date.now().toString(),
            title: title,
            url: url,
            timestamp: new Date().toISOString()
        };
        
        this.bookmarks.unshift(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
    
    renderBookmarksList(sidebar) {
        const container = sidebar.querySelector('.bookmarks-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.bookmarks.length === 0) {
            container.innerHTML = '<p>No bookmarks yet. Save some pages!</p>';
            return;
        }
        
        this.bookmarks.forEach(bookmark => {
            const item = document.createElement('div');
            item.className = 'bookmark-item';
            item.innerHTML = `
                <div>
                    <div>${bookmark.title}</div>
                    <small>${bookmark.url}</small>
                </div>
                <div class="bookmark-actions">
                    <button class="bookmark-btn visit-btn" data-url="${bookmark.url}">Visit</button>
                    <button class="bookmark-btn delete-btn" data-id="${bookmark.id}">Delete</button>
                </div>
            `;
            
            // Add event listeners
            item.querySelector('.visit-btn').addEventListener('click', (e) => {
                const url = e.target.getAttribute('data-url');
                this.loadUrl(url);
                sidebar.classList.remove('active');
            });
            
            item.querySelector('.delete-btn').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.deleteBookmark(id);
                this.renderBookmarksList(sidebar);
            });
            
            container.appendChild(item);
        });
    }
    
    deleteBookmark(id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
    
    getDocumentTitle() {
        try {
            return this.webFrame.contentDocument?.title || this.webFrame.contentWindow?.document?.title || 'Untitled';
        } catch (e) {
            return 'Secure Site';
        }
    }
    
    loadBookmarks() {
        // Load bookmarks from localStorage
        this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    }
    
    handleAddressBarInput(value) {
        if (value.length > 0) {
            this.fetchSuggestions(value);
        } else {
            this.hideSuggestions();
        }
    }
    
    async fetchSuggestions(query) {
        // Create or update suggestions container
        let suggestionsDiv = document.getElementById('suggestions-container');
        
        if (!suggestionsDiv) {
            suggestionsDiv = document.createElement('div');
            suggestionsDiv.id = 'suggestions-container';
            suggestionsDiv.className = 'suggestions-container';
            document.body.appendChild(suggestionsDiv);
        }
        
        // Position the suggestions div below the address bar
        const addressBarRect = this.addressBar.getBoundingClientRect();
        suggestionsDiv.style.top = `${addressBarRect.bottom + window.scrollY}px`;
        suggestionsDiv.style.left = `${addressBarRect.left + window.scrollX}px`;
        suggestionsDiv.style.width = `${addressBarRect.width}px`;
        
        // For demo purposes, we'll create mock suggestions
        // In a real implementation, this would call an API like Google Suggest
        const mockSuggestions = [
            `${query} definition`,
            `${query} tutorial`,
            `${query} examples`,
            `${query} wikipedia`,
            `${query} images`
        ];
        
        // Filter suggestions based on query
        const filteredSuggestions = mockSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions
        
        // Add history-based suggestions
        const historySuggestions = [];
        const browserHistory = JSON.parse(localStorage.getItem('browserHistory')) || [];
        
        browserHistory.forEach(entry => {
            if (entry.title.toLowerCase().includes(query.toLowerCase()) || 
                entry.url.toLowerCase().includes(query.toLowerCase())) {
                historySuggestions.push({
                    title: entry.title,
                    url: entry.url,
                    type: 'history'
                });
            }
        });
        
        // Combine and render suggestions
        suggestionsDiv.innerHTML = '';
        
        // Add search suggestions
        filteredSuggestions.forEach(suggestion => {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'suggestion-item';
            suggestionEl.textContent = suggestion;
            suggestionEl.addEventListener('click', () => {
                this.addressBar.value = suggestion;
                this.navigateToUrl();
                this.hideSuggestions();
            });
            suggestionsDiv.appendChild(suggestionEl);
        });
        
        // Add history suggestions if there are any
        if (historySuggestions.length > 0) {
            // Add a divider
            const divider = document.createElement('hr');
            divider.className = 'suggestion-divider';
            suggestionsDiv.appendChild(divider);
            
            // Add history items
            historySuggestions.slice(0, 3).forEach(item => { // Limit to 3 history items
                const suggestionEl = document.createElement('div');
                suggestionEl.className = 'suggestion-item history-suggestion';
                suggestionEl.innerHTML = `<strong>${item.title}</strong><br><small>${item.url}</small>`;
                suggestionEl.addEventListener('click', () => {
                    this.loadUrl(item.url);
                    this.hideSuggestions();
                });
                suggestionsDiv.appendChild(suggestionEl);
            });
        }
        
        // Show the suggestions container
        suggestionsDiv.style.display = 'block';
    }
    
    showSuggestions() {
        if (this.addressBar.value.length > 0) {
            this.fetchSuggestions(this.addressBar.value);
        }
    }
    
    hideSuggestions() {
        const suggestionsDiv = document.getElementById('suggestions-container');
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
    }
    
    showHistoryPanel() {
        let panel = document.querySelector('.history-panel');
        
        if (panel) {
            panel.classList.toggle('active');
        } else {
            panel = this.createHistoryPanel();
            document.body.appendChild(panel);
            setTimeout(() => panel.classList.add('active'), 10);
        }
    }
    
    createHistoryPanel() {
        const panel = document.createElement('div');
        panel.className = 'history-panel';
        
        const browserHistory = JSON.parse(localStorage.getItem('browserHistory')) || [];
        
        panel.innerHTML = `
            <div class="history-header">
                <h3>Browsing History</h3>
                <button class="close-history">×</button>
            </div>
            <div class="history-list">
                ${browserHistory.length > 0 ? 
                    browserHistory.map(entry => `
                        <div class="history-item">
                            <a href="#" class="history-url" data-url="${entry.url}">${entry.title}</a>
                            <div class="history-time">${new Date(entry.timestamp).toLocaleString()}</div>
                        </div>
                    `).join('') :
                    '<p>No browsing history yet.</p>'
                }
            </div>
        `;
        
        // Add event listeners
        panel.querySelector('.close-history').addEventListener('click', () => {
            panel.classList.remove('active');
        });
        
        // Add click handlers for history items
        panel.querySelectorAll('.history-url').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('data-url');
                this.loadUrl(url);
                panel.classList.remove('active');
            });
        });
        
        return panel;
    }
}

// Initialize the browser when the page loads
let browser;
document.addEventListener('DOMContentLoaded', function() {
    browser = new EchoesBrowser();
});

// Handle browser resize events
window.addEventListener('resize', function() {
    // Adjust iframe height if needed
    const contentArea = document.querySelector('.browser-content');
    if (contentArea && browser && browser.webFrame) {
        browser.webFrame.style.height = `${contentArea.offsetHeight}px`;
    }
});