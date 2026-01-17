import React, { useState } from 'react';
import { ViewState } from '../App.tsx';
import AdminLaunchCenter from './AdminLaunchCenter.tsx';

interface Props {
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

const AdminDashboard: React.FC<Props> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'launch' | 'settings'>('leads');

  const leads = [
    { id: 'RFQ-901', company: 'Milan Velvet Co.', type: 'Waterfall Cards', qty: 500, date: '2 hours ago', status: 'New' },
    { id: 'LD-402', company: 'HighPoint USA', type: 'Upholstery Books', qty: 100, date: '5 hours ago', status: 'Contacted' },
    { id: 'RFQ-882', company: 'Dubai Curtains', type: 'A3+ Albums', qty: 50, date: '1 day ago', status: 'Quoted' },
    { id: 'LD-398', company: 'Berlin Sofa Ltd.', type: 'Waterfall Cards', qty: 1000, date: '2 days ago', status: 'Export Dispatched' },
  ];

  const stats = [
    { label: 'Active Leads', val: '24', trend: '+12%' },
    { label: 'Conversion Rate', val: '18.4%', trend: '+2.1%' },
    { label: 'Top Region', val: 'Europe', trend: 'Italy' },
    { label: 'Monthly Rev', val: '₹4.2M', trend: 'Target Met' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-72 bg-navy text-white flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-white/10">
          <span className="text-xl font-black uppercase tracking-tighter">SwatchCraft <span className="text-gold">Ops</span></span>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Management Console</p>
        </div>
        
        <div className="p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-black">AD</div>
             <div>
                <p className="text-xs font-bold">Lead Admin</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                   <span className="text-[9px] font-black text-gray-400 uppercase">Active Session</span>
                </div>
             </div>
          </div>
        </div>

        <nav className="p-6 space-y-2 flex-grow overflow-y-auto">
          <button onClick={() => setActiveTab('leads')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Leads & RFQs</button>
          <button onClick={() => setActiveTab('launch')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'launch' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Launch Control</button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Global Analytics</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>System Settings</button>
        </nav>
        
        <div className="p-8 border-t border-white/10">
          <button onClick={onLogout} className="text-red-400 font-black text-[10px] uppercase tracking-widest hover:text-white flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Secure Logout
          </button>
        </div>
      </div>

      <div className="flex-grow ml-72 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">
              {activeTab === 'leads' ? 'Lead Pipeline' : activeTab === 'launch' ? 'Go-To-Market Center' : activeTab === 'analytics' ? 'Performance Metrics' : 'System Configuration'}
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
               Operational Hub Status: <span className="text-teal">System Nominal</span>
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Server Heartbeat</p>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <p className="text-xs font-black text-navy">12ms Response</p>
                </div>
             </div>
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase">System Date</p>
                <p className="text-xs font-bold text-navy">JAN 24, 2025</p>
             </div>
          </div>
        </header>

        {activeTab === 'launch' && <AdminLaunchCenter />}

        {activeTab === 'leads' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-4 gap-6">
               {stats.map((s, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{s.label}</p>
                    <p className="text-2xl font-black text-navy mb-1">{s.val}</p>
                    <p className="text-[9px] font-bold text-teal uppercase tracking-widest">{s.trend}</p>
                 </div>
               ))}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 font-black text-navy uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="p-8">Reference</th>
                      <th className="p-8">Company</th>
                      <th className="p-8">Inquiry Type</th>
                      <th className="p-8">Scale</th>
                      <th className="p-8">Status</th>
                      <th className="p-8">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.map((l, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="p-8 text-xs font-black text-gold">{l.id}</td>
                        <td className="p-8">
                           <p className="text-sm font-bold text-navy">{l.company}</p>
                           <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">{l.date}</p>
                        </td>
                        <td className="p-8 text-sm font-medium text-gray-600">{l.type}</td>
                        <td className="p-8 text-sm font-black text-navy">{l.qty}u</td>
                        <td className="p-8">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${l.status === 'New' ? 'bg-teal/10 text-teal' : l.status === 'Quoted' ? 'bg-gold/10 text-gold' : 'bg-navy/10 text-navy'}`}>
                             {l.status}
                           </span>
                        </td>
                        <td className="p-8">
                           <button className="text-navy font-black text-[10px] uppercase tracking-widest group-hover:text-gold transition-colors">Manage Lead →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;