import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import Solutions from './pages/public/Solutions';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import Login from './pages/auth/Login';
import PasswordManager from './pages/auth/PasswordManager';
import TwoFactorSetup from './pages/auth/TwoFactorSetup';
import AdminDashboard from './pages/admin/AdminDashboard';
import CrmManagement from './pages/admin/CrmManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import TieUpManagement from './pages/admin/TieUpManagement';
import BranchManagement from './pages/admin/BranchManagement';
import AccountManagement from './pages/admin/AccountManagement';
import MeetingArrangement from './pages/admin/MeetingArrangement';
import InvoiceGenerator from './pages/tools/InvoiceGenerator';

const App: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Public Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/password-manager" element={<PasswordManager />} />
                <Route path="/two-factor-setup" element={<TwoFactorSetup />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/crm-management" element={<CrmManagement />} />
                <Route path="/admin/attendance-management" element={<AttendanceManagement />} />
                <Route path="/admin/employee-management" element={<EmployeeManagement />} />
                <Route path="/admin/tie-up-management" element={<TieUpManagement />} />
                <Route path="/admin/branch-management" element={<BranchManagement />} />
                <Route path="/admin/account-management" element={<AccountManagement />} />
                <Route path="/admin/meeting-arrangement" element={<MeetingArrangement />} />
                <Route path="/admin/invoice-generator" element={<InvoiceGenerator />} />
            </Routes>
        </>
    );
};

export default App;
