import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, Activity, Globe, ArrowUpRight
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const attendanceChartRef = useRef<HTMLCanvasElement>(null);
  const clientGrowthChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Initialize Charts
    if ((window as any).Chart) {
      if (attendanceChartRef.current) {
        new (window as any).Chart(attendanceChartRef.current, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Attendance Rate',
              data: [95, 92, 98, 90, 88, 75, 80],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointBackgroundColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { display: false, min: 60, max: 100 },
              x: { display: false }
            }
          }
        });
      }

      if (clientGrowthChartRef.current) {
        new (window as any).Chart(clientGrowthChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'New Clients',
              data: [12, 19, 15, 22, 18, 25],
              backgroundColor: '#3b82f6',
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { display: false },
              x: { display: false }
            }
          }
        });
      }
    }
  }, []);

  return (
    <AdminLayout title="Command Center" subtitle="System Commander">
      <div className={`space-y-12 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Top Stats Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Cloud Employees', val: '1,428', icon: Users, delta: '+12%', color: 'brand-blue' },
            { label: 'Sales Pipeline', val: '42 Active', icon: TrendingUp, delta: '+5.4k', color: 'emerald' },
            { label: 'Uptime Index', val: '98.4%', icon: Activity, delta: 'Healthy', color: 'indigo' },
            { label: 'System Reach', val: 'Global', icon: Globe, delta: 'Verified', color: 'purple' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] group hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 relative overflow-hidden active:scale-[0.98]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-600/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-brand-blue-400" />
                  </div>
                  <div className="text-[10px] font-black px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-blue-300 uppercase">{stat.delta}</div>
                </div>
                <div className="text-3xl font-black mb-1 group-hover:translate-x-1 transition-transform">{stat.val}</div>
                <div className="text-xs font-bold text-navy-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Middle Tier - Management Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight uppercase tracking-widest text-navy-200">System Modules</h3>
              <button className="text-[10px] font-black text-brand-blue-400 uppercase tracking-widest hover:text-white transition-colors">Expand Intelligence</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'CRM Core', path: '/admin/crm-management', icon: Users, desc: 'Enterprise client relations and sales intelligence' },
                { title: 'HR Hub', path: '/admin/employee-management', icon: Users, desc: 'Human capital and permission matrix' },
                { title: 'Logistics', path: '/admin/attendance-management', icon: Activity, desc: 'Operational time-tracking and shift management' }
              ].map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <button key={i} onClick={() => navigate(mod.path)} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-left group hover:bg-white/5 hover:border-brand-blue-500/30 transition-all duration-500 shadow-xl shadow-navy-950/20 active:scale-[0.98]">
                    <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue-600 transition-colors">
                      <Icon className="w-5 h-5 text-brand-blue-400 group-hover:text-white" />
                    </div>
                    <h4 className="text-base font-black mb-2 flex items-center gap-2">
                      {mod.title}
                      <ArrowUpRight className="w-4 h-4 text-navy-600 group-hover:text-brand-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h4>
                    <p className="text-xs font-bold text-navy-500 leading-relaxed uppercase tracking-wide group-hover:text-navy-300 transition-colors">{mod.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* New Admin Pages Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black tracking-tight uppercase tracking-widest text-navy-200">Management Tools</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Account Management', path: '/admin/account-management', icon: '💰', desc: 'Financial transactions and reporting' },
                  { title: 'Meeting Arrangement', path: '/admin/meeting-arrangement', icon: '📅', desc: 'Schedule and manage meetings' },
                  { title: 'Tie-up Management', path: '/admin/tie-up-management', icon: '🤝', desc: 'Partnership and collaboration tracking' },
                  { title: 'Branch Management', path: '/admin/branch-management', icon: '🏢', desc: 'Multi-location operations control' }
                ].map((mod, i) => (
                  <button key={i} onClick={() => navigate(mod.path)} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl text-left group hover:bg-white/5 hover:border-brand-blue-500/30 transition-all duration-500 shadow-xl shadow-navy-950/20 active:scale-[0.98]">
                    <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue-600 transition-colors text-2xl">
                      {mod.icon}
                    </div>
                    <h4 className="text-base font-black mb-2 flex items-center gap-2">
                      {mod.title}
                      <ArrowUpRight className="w-4 h-4 text-navy-600 group-hover:text-brand-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h4>
                    <p className="text-xs font-bold text-navy-500 leading-relaxed uppercase tracking-wide group-hover:text-navy-300 transition-colors">{mod.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                <div>
                  <h3 className="text-2xl font-black mb-2">Network Liquidity</h3>
                  <p className="text-xs font-bold text-navy-500 uppercase tracking-widest">Real-time infrastructure performance</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-brand-blue-600/10 border border-brand-blue-500/20 rounded-xl text-[10px] font-black text-brand-blue-400 uppercase tracking-widest cursor-default">Scale 1:100</div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-navy-300 uppercase tracking-widest">7D ARCHIVE</div>
                </div>
              </div>
              <div className="h-[240px] relative">
                <canvas ref={attendanceChartRef} />
                <div className="absolute inset-x-0 bottom-0 py-2 flex justify-between px-4 text-[10px] font-black text-navy-700 uppercase tracking-[0.2em] border-t border-white/5">
                  <span>MK-01</span><span>SYSTEM_CORE</span><span>ENCRYPTED_STREAM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-black tracking-tight uppercase tracking-widest text-navy-200">Active Feed</h3>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-6">
              {[
                { ev: 'ACCESS_GRANTED', user: 'ADM_01', t: '2M_AGO', color: 'text-brand-blue-400' },
                { ev: 'DATABASE_SYNC', user: 'CRON_MASTER', t: '14M_AGO', color: 'text-indigo-400' },
                { ev: 'NEW_LEDGER_ENTRY', user: 'SALES_BOT', t: '1H_AGO', color: 'text-emerald-400' },
                { ev: 'BACKUP_COMPLETE', user: 'SYS_DAEMON', t: '3H_AGO', color: 'text-purple-400' },
                { ev: 'SECURITY_SCAN', user: 'NIGHT_WATCH', t: '5H_AGO', color: 'text-brand-blue-400' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className={`w-full h-1/2 bg-current ${log.color} opacity-30`}></div>
                    </div>
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${log.color}`}>{log.ev}</div>
                      <div className="text-xs font-black text-white group-hover:text-brand-blue-100 transition-colors uppercase tracking-tight">{log.user}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-navy-700 group-hover:text-navy-400 transition-colors">{log.t}</div>
                </div>
              ))}
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-navy-500 uppercase tracking-[0.3em] hover:bg-brand-blue-600 hover:text-white hover:border-brand-blue-500 transition-all duration-500 shadow-xl shadow-navy-950/20">
                View Audit Ledger
              </button>
            </div>

            <div className="bg-brand-blue-600/10 border border-brand-blue-500/20 rounded-[2rem] p-8 group overflow-hidden relative">
              <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-brand-blue-500/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <h4 className="text-lg font-black text-brand-blue-100 mb-2 uppercase tracking-wide leading-none">Global Pulse</h4>
              <p className="text-xs font-bold text-brand-blue-400/80 uppercase tracking-widest mb-6 leading-none">Network expansion metrics</p>
              <div className="h-[120px] mb-4">
                <canvas ref={clientGrowthChartRef} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-brand-blue-400 uppercase tracking-widest">
                <span>Efficiency</span>
                <span className="text-brand-blue-100">+22.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
