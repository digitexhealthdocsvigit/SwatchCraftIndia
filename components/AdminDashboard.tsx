import React, { useState } from 'react';
import { ViewState } from '../App';

interface Props {
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

const AdminDashboard: React.FC<Props> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'cms'>('leads');

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
      {/* Sidebar */}
      <div className="w-72 bg-navy text-white flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-white/10">
          <span className="text-xl font-black uppercase tracking-tighter">SwatchCraft <span className="text-gold">Ops</span></span>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Management Console</p>
        </div>
        <nav className="p-6 space-y-2 flex-grow">
          <button onClick={() => setActiveTab('leads')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Leads & RFQs</button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Global Analytics</button>
          <button onClick={() => setActiveTab('cms')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'cms' ? 'bg-gold text-navy shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>Content & Blog</button>
          <div className="pt-8 border-t border-white/10 mt-8">
            <button onClick={() => onNavigate('gbp-strategy')} className="w-full text-left px-6 py-4 text-gray-500 text-[10px] font-black uppercase hover:text-gold">Google Business Hub</button>
            <button onClick={() => onNavigate('outreach-templates')} className="w-full text-left px-6 py-4 text-gray-500 text-[10px] font-black uppercase hover:text-gold">Outreach Suite</button>
          </div>
        </nav>
        <div className="p-8 border-t border-white/10">
          <button onClick={onLogout} className="text-red-400 font-black text-[10px] uppercase tracking-widest hover:text-white">Secure Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">
              {activeTab === 'leads' ? 'Lead Pipeline' : activeTab === 'analytics' ? 'Performance Metrics' : 'Content Management'}
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Status: Operational System Nominal</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase">System Date</p>
                <p className="text-xs font-bold text-navy">JAN 24, 2025</p>
             </div>
          </div>
        </header>

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

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-2 gap-8 animate-fadeIn">
             <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                <h4 className="text-xl font-black text-navy mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Regional Interest (Last 30 Days)</h4>
                <div className="space-y-6">
                   {[
                     { label: 'Europe', val: 65 },
                     { label: 'USA', val: 45 },
                     { label: 'Middle East', val: 30 },
                     { label: 'India (Domestic)', val: 55 }
                   ].map((r, i) => (
                     <div key={i}>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2"><span>{r.label}</span><span>{r.val}%</span></div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${r.val}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-navy text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                <h4 className="text-xl font-black text-gold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Most Requested Formats</h4>
                <div className="grid grid-cols-2 gap-6">
                   {[
                     { l: 'Waterfall', v: '42%' },
                     { l: 'Upholstery', v: '28%' },
                     { l: 'Curtain', v: '18%' },
                     { l: 'Hangers', v: '12%' }
                   ].map((f, i) => (
                     <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{f.l}</p>
                        <p className="text-2xl font-black">{f.v}</p>
                     </div>
                   ))}
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full"></div>
             </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center animate-fadeIn">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
                <span className="text-3xl text-gray-300">✍️</span>
             </div>
             <h4 className="text-2xl font-black text-navy uppercase tracking-widest mb-4">Content Builder Beta</h4>
             <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium">Industry Intelligence Hub editor. Connect a Markdown backend or Gemini API for automated content generation.</p>
             <button className="bg-navy text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gold transition-colors shadow-lg">New Blog Post</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;