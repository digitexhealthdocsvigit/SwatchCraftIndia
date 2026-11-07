import React, { useState, useEffect, useMemo } from 'react';
import { ViewState } from '../App.tsx';
import AdminLaunchCenter from './AdminLaunchCenter.tsx';
import OutreachTemplates from './OutreachTemplates.tsx';
import { getStoredRFQs } from '../hooks/useRFQ.ts';
import { useGlobalSettings } from './GlobalSettingsContext.tsx';
import {
  FileText,
  Users,
  Calculator,
  Building2,
  CheckCircle2,
  Send,
  BarChart3,
  Rocket,
  Settings,
  LogOut,
  Search,
  Filter,
  MessageCircle,
  Mail,
  ExternalLink,
  ChevronRight,
  Clock,
  Globe2,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  X,
  FileCheck,
} from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

export type AdminTab =
  | 'rfqs'
  | 'crm'
  | 'quote_gen'
  | 'partners'
  | 'qc'
  | 'outreach'
  | 'analytics'
  | 'launch'
  | 'settings';

interface RFQItem {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone?: string;
  productType: string;
  quantity: string;
  exportMarket?: string;
  specifications?: string;
  attachments?: Array<{ name: string; type: string; sizeFormatted: string }>;
  submittedAt: string;
  status: 'New' | 'Under Review' | 'Qualified' | 'Quotation Sent' | 'Won' | 'Lost';
  estimatedValueUsd?: number;
  internalNotes?: string[];
  partnerAssigned?: string;
}

const INITIAL_SERVER_RFQS: RFQItem[] = [
  {
    id: 'RFQ-2026-9041',
    fullName: 'Marco Moretti',
    companyName: 'Moretti Tessuti Milano',
    email: 'm.moretti@morettitessuti.it',
    phone: '+39 02 8945 2201',
    productType: 'Hardbound Wallpaper Catalogs',
    quantity: '120 Units (45x45 cm)',
    exportMarket: 'European Union (Italy)',
    specifications:
      'Heavy 420 GSM embossed vinyl sheets with room-scene visualizer separator sheets, gold debossed linen covers, metal corner guards.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    status: 'Under Review',
    estimatedValueUsd: 14500,
    internalNotes: [
      'Sample rolls scheduled for air freight from Como to Bhiwandi hub for repeat registration test.',
    ],
    partnerAssigned: 'Unit A - Precision Bookbinding',
  },
  {
    id: 'RFQ-2026-8874',
    fullName: 'Sarah Jenkins',
    companyName: 'HighPoint Architectural Fabrics LLC',
    email: 's.jenkins@highpointfabrics.com',
    phone: '+1 336 884 9200',
    productType: 'Upholstery Swatch Books',
    quantity: '250 Units',
    exportMarket: 'United States',
    specifications:
      '3mm rigid Kappa board, navy buckram with matte silver foil debossing, 4-tier waterfall layout inside.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: 'Quotation Sent',
    estimatedValueUsd: 19800,
    internalNotes: ['Pro-forma invoice sent with DDP air freight via FedEx.'],
    partnerAssigned: 'Unit B - Automated Pinking & Mounting',
  },
  {
    id: 'RFQ-2026-7612',
    fullName: 'Tariq Al-Mansoor',
    companyName: 'Emirates Interior Furnishings Dubai',
    email: 'tariq@emiratesfurnishings.ae',
    phone: '+971 4 332 9918',
    productType: 'Cascading Waterfall Hangers',
    quantity: '800 Units',
    exportMarket: 'United Arab Emirates',
    specifications:
      'Custom curved plastic hooks with brushed brass finish, 400 GSM full-color branded header cards.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'New',
    estimatedValueUsd: 11200,
    internalNotes: ['Requested sample swatch hook express dispatch to Jebel Ali.'],
  },
];

const OEM_PARTNERS = [
  {
    id: 'PARTNER-01',
    name: 'Unit A — Precision Bookbinding & Board Assembly',
    location: 'Thane-Bhiwandi Sector 4',
    specialty: '3mm–4mm Kappa Board Hardbound Books, Buckram Wrapping, Chicago Screw Binding',
    capacity: '4,000 Hardbound Books / Month',
    leadTime: '14–18 Days',
    status: 'Sample Benchmark (Pending Verification)',
  },
  {
    id: 'PARTNER-02',
    name: 'Unit B — Automated Pinking & Fabric Slitting Hub',
    location: 'Bhiwandi Textile Complex',
    specialty: 'High-Speed Automated Pinking, Straight Cutting, Fabric Serialization & Labeling',
    capacity: '80,000 Swatch Leaves / Month',
    leadTime: '7–10 Days',
    status: 'Sample Benchmark (Pending Verification)',
  },
  {
    id: 'PARTNER-03',
    name: 'Unit C — High-Tonnage Debossing & Foil Stamping',
    location: 'Thane Industrial Zone',
    specialty: 'Hot Foil Metallic Stamping, Precision Blind Debossing, Silk Screen Header Printing',
    capacity: '15,000 Header Cards / Month',
    leadTime: '5–7 Days',
    status: 'Sample Benchmark (Pending Verification)',
  },
  {
    id: 'PARTNER-04',
    name: 'Unit D — Oversized Wallpaper Sheeting & Roll Conversion',
    location: 'Kalher-Bhiwandi Logistics Node',
    specialty: 'Guillotine Sheeting with Pattern Repeat Registration, EN 233 Label Stamping',
    capacity: '2,500 Oversized Wallpaper Albums / Month',
    leadTime: '18–21 Days',
    status: 'Sample Benchmark (Pending Verification)',
  },
];

const GLOBAL_BUYERS = [
  {
    company: 'Moretti Tessuti Milano',
    country: 'Italy (EU)',
    contact: 'Marco Moretti',
    email: 'm.moretti@morettitessuti.it',
    segment: 'Luxury Wallpaper & Velvets',
    stage: 'Active Proposal ($14.5k)',
    lastContact: 'Today',
  },
  {
    company: 'HighPoint Architectural Fabrics LLC',
    country: 'USA (North Carolina)',
    contact: 'Sarah Jenkins',
    email: 's.jenkins@highpointfabrics.com',
    segment: 'Hospitality Contract Upholstery',
    stage: 'Quoted ($19.8k)',
    lastContact: 'Yesterday',
  },
  {
    company: 'Emirates Interior Furnishings Dubai',
    country: 'United Arab Emirates',
    contact: 'Tariq Al-Mansoor',
    email: 'tariq@emiratesfurnishings.ae',
    segment: 'Wholesale Fabric Distribution',
    stage: 'New Inquiry',
    lastContact: '2 days ago',
  },
  {
    company: 'De Veluwe Meubelstoffen BV',
    country: 'Netherlands (EU)',
    contact: 'Jan de Vries',
    email: 'j.devries@develuwefabrics.nl',
    segment: 'Residential Drapery & Linen',
    stage: 'In Discussion (Amsterdam Fair)',
    lastContact: '3 days ago',
  },
  {
    company: 'Mayfair Wallcoverings Studio Ltd',
    country: 'United Kingdom (London)',
    contact: 'Oliver Sterling',
    email: 'o.sterling@mayfairwallcoverings.co.uk',
    segment: 'Bespoke Architectural Murals',
    stage: 'Sample Approved',
    lastContact: '5 days ago',
  },
];

const AdminDashboard: React.FC<Props> = ({ onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('rfqs');
  const [rfqs, setRfqs] = useState<RFQItem[]>(INITIAL_SERVER_RFQS);
  const [selectedRfq, setSelectedRfq] = useState<RFQItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const { currency, setCurrency, formatPrice } = useGlobalSettings();

  // Quote Calculator State
  const [calcProduct, setCalcProduct] = useState('Wallpaper Catalog (45x45 cm)');
  const [calcQuantity, setCalcQuantity] = useState(100);
  const [calcSheets, setCalcSheets] = useState(50);
  const [calcCoverFinish, setCalcCoverFinish] = useState('Buckram + Hot Foil');
  const [calcFreightMethod, setCalcFreightMethod] = useState<'air' | 'sea'>('air');

  // Load RFQs from API and localStorage
  const loadData = async () => {
    setIsRefreshing(true);
    let combined: RFQItem[] = [...INITIAL_SERVER_RFQS];

    // 1. Try serverless endpoint
    try {
      const token = localStorage.getItem('samplinghub_admin_token');
      const res = await fetch('/api/admin/rfqs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.rfqs) && json.rfqs.length > 0) {
          combined = json.rfqs;
        }
      }
    } catch {
      // Fallback to local storage
    }

    // 2. Merge any local submissions from visitors
    const stored = getStoredRFQs();
    stored.forEach((local) => {
      if (!combined.some((c) => c.id === local.id)) {
        combined.unshift({
          id: local.id,
          fullName: local.fullName,
          companyName: local.companyName,
          email: local.email,
          phone: local.phone,
          productType: local.productType,
          quantity: local.quantity,
          exportMarket: local.exportMarket,
          specifications: local.specifications,
          attachments: local.attachments,
          submittedAt: local.submittedAt,
          status: local.status as any,
          internalNotes: [],
        });
      }
    });

    setRfqs(combined);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered RFQs
  const filteredRfqs = useMemo(() => {
    return rfqs.filter((r) => {
      const matchesSearch =
        searchQuery === '' ||
        r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.exportMarket && r.exportMarket.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rfqs, searchQuery, statusFilter]);

  // Update RFQ Status
  const handleUpdateStatus = async (id: string, newStatus: RFQItem['status']) => {
    setRfqs((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
    if (selectedRfq && selectedRfq.id === id) {
      setSelectedRfq((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const token = localStorage.getItem('samplinghub_admin_token');
      await fetch('/api/admin/rfqs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch {
      // Continue locally
    }
  };

  // Add Internal Note
  const handleAddNote = async (id: string) => {
    if (!newNote.trim()) return;
    const noteText = `${new Date().toLocaleDateString('en-GB')} [Admin]: ${newNote.trim()}`;

    setRfqs((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, internalNotes: [...(item.internalNotes || []), noteText] }
          : item
      )
    );

    if (selectedRfq && selectedRfq.id === id) {
      setSelectedRfq((prev) =>
        prev ? { ...prev, internalNotes: [...(prev.internalNotes || []), noteText] } : null
      );
    }

    setNewNote('');

    try {
      const token = localStorage.getItem('samplinghub_admin_token');
      await fetch('/api/admin/rfqs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, internalNote: noteText }),
      });
    } catch {
      // Continue
    }
  };

  // Assign Partner
  const handleAssignPartner = async (id: string, partner: string) => {
    setRfqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, partnerAssigned: partner } : item))
    );
    if (selectedRfq && selectedRfq.id === id) {
      setSelectedRfq((prev) => (prev ? { ...prev, partnerAssigned: partner } : null));
    }

    try {
      const token = localStorage.getItem('samplinghub_admin_token');
      await fetch('/api/admin/rfqs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, partnerAssigned: partner }),
      });
    } catch {
      // Continue
    }
  };

  // Pro-Forma Quote Calculation Engine
  const quoteCalculation = useMemo(() => {
    let baseUnitUsd = 45;
    if (calcProduct.includes('Wallpaper')) {
      baseUnitUsd = calcSheets > 60 ? 115 : 95;
    } else if (calcProduct.includes('Upholstery')) {
      baseUnitUsd = 62;
    } else if (calcProduct.includes('Waterfall')) {
      baseUnitUsd = 14;
    } else if (calcProduct.includes('Cards')) {
      baseUnitUsd = 1.2;
    }

    // Volume discount curve
    let discount = 1.0;
    if (calcQuantity >= 500) discount = 0.78;
    else if (calcQuantity >= 250) discount = 0.85;
    else if (calcQuantity >= 100) discount = 0.92;

    const unitExFactory = Math.round(baseUnitUsd * discount);
    const totalExFactory = unitExFactory * calcQuantity;

    // Freight estimate
    const unitWeightKg = calcProduct.includes('Wallpaper')
      ? 2.8
      : calcProduct.includes('Upholstery')
      ? 1.9
      : 0.4;
    const totalWeightKg = unitWeightKg * calcQuantity;
    const freightRatePerKg = calcFreightMethod === 'air' ? 7.5 : 2.2;
    const totalFreightUsd = Math.round(totalWeightKg * freightRatePerKg);
    const grandTotalUsd = totalExFactory + totalFreightUsd;

    return {
      unitExFactory,
      totalExFactory,
      totalWeightKg: Math.round(totalWeightKg),
      totalFreightUsd,
      grandTotalUsd,
    };
  }, [calcProduct, calcQuantity, calcSheets, calcFreightMethod]);

  const navItems = [
    { id: 'rfqs', label: 'International RFQs', icon: FileText, count: rfqs.length },
    { id: 'crm', label: 'Buyer Directory & CRM', icon: Users, count: GLOBAL_BUYERS.length },
    { id: 'quote_gen', label: 'Export Pro-Forma Calc', icon: Calculator },
    { id: 'partners', label: 'OEM Partner Network', icon: Building2, count: OEM_PARTNERS.length },
    { id: 'qc', label: 'Quality & Dispatch Logs', icon: CheckCircle2 },
    { id: 'outreach', label: 'Outreach & EU Suites', icon: Send },
    { id: 'analytics', label: 'Export Analytics', icon: BarChart3 },
    { id: 'launch', label: 'Launch Control', icon: Rocket },
    { id: 'settings', label: 'System & Currency', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-800">
      {/* Sidebar */}
      <aside className="w-80 bg-[#1e3a5f] text-white flex flex-col fixed inset-y-0 shadow-2xl z-30">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xl font-black uppercase tracking-tight">
              Sampling<span className="text-[#c9a86a]">Hub</span>
            </span>
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">
              Export Operations CRM
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-white/60 hover:text-white p-1 rounded-lg"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Session Identity Card */}
        <div className="p-6 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B6F47] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
              EX
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-white">Central Export Coordinator</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-gray-300 font-medium">Thane-Bhiwandi Hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-grow overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#8B6F47] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Registered Address & Secure Logout */}
        <div className="p-6 border-t border-white/10 bg-[#152943]/60">
          <div className="text-[11px] text-gray-300 mb-4 leading-snug">
            <p className="font-bold text-white">Registered Business Office:</p>
            <p>Thane Bhiwandi, PIN: 421302</p>
            <p>Maharashtra, India</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-red-300 hover:text-white hover:bg-red-500/20 py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-80 p-8 lg:p-12 overflow-y-auto">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-gray-200 gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tight flex items-center gap-3">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
              Managed OEM Sampling Infrastructure • Live Production Tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className={`p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition shadow-sm ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh CRM Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Currency:</span>
              <div className="flex gap-1">
                {(['INR', 'USD', 'EUR', 'AED'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded text-xs font-black transition ${
                      currency === curr
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* TAB 1: INTERNATIONAL RFQS PIPELINE */}
        {activeTab === 'rfqs' && (
          <div className="space-y-6">
            {/* Quick KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-[11px] font-bold text-gray-500 uppercase">Total Export Inquiries</p>
                <p className="text-3xl font-black text-[#1e3a5f] mt-1">{rfqs.length}</p>
                <p className="text-[10px] text-teal-600 font-bold mt-1">Live from USA, EU, UAE & UK</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-[11px] font-bold text-gray-500 uppercase">Awaiting Action</p>
                <p className="text-3xl font-black text-amber-600 mt-1">
                  {rfqs.filter((r) => r.status === 'New' || r.status === 'Under Review').length}
                </p>
                <p className="text-[10px] text-gray-500 font-bold mt-1">&lt;24 Hr SLA target</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-[11px] font-bold text-gray-500 uppercase">Quotations Sent</p>
                <p className="text-3xl font-black text-[#8B6F47] mt-1">
                  {rfqs.filter((r) => r.status === 'Quotation Sent').length}
                </p>
                <p className="text-[10px] text-gray-500 font-bold mt-1">Pro-forma delivered</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-[11px] font-bold text-gray-500 uppercase">Pipeline Value</p>
                <p className="text-3xl font-black text-teal-700 mt-1">
                  $
                  {rfqs
                    .reduce((sum, r) => sum + (r.estimatedValueUsd || 5000), 0)
                    .toLocaleString()}
                </p>
                <p className="text-[10px] text-teal-600 font-bold mt-1">Active OEM orders</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by company, client, product, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl p-1 text-xs">
                  <Filter className="w-3.5 h-3.5 text-gray-400 ml-2" />
                  {[
                    'All',
                    'New',
                    'Under Review',
                    'Qualified',
                    'Quotation Sent',
                    'Won',
                    'Lost',
                  ].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                        statusFilter === st
                          ? 'bg-[#1e3a5f] text-white shadow-sm'
                          : 'text-gray-600 hover:text-navy'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RFQs Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/80 text-gray-500 uppercase font-black text-[10px] tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="p-4">RFQ Ref</th>
                      <th className="p-4">Client / Company</th>
                      <th className="p-4">Product Line</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Export Market</th>
                      <th className="p-4">Est. Value</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredRfqs.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-12 text-center text-gray-400">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredRfqs.map((rfq) => (
                        <tr
                          key={rfq.id}
                          className="hover:bg-gray-50/60 transition cursor-pointer"
                          onClick={() => setSelectedRfq(rfq)}
                        >
                          <td className="p-4 font-mono font-bold text-[#8B6F47]">{rfq.id}</td>
                          <td className="p-4">
                            <p className="font-bold text-[#1e3a5f] text-sm">{rfq.companyName}</p>
                            <p className="text-gray-500 text-[11px]">
                              {rfq.fullName} • {rfq.email}
                            </p>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-gray-700">{rfq.productType}</span>
                          </td>
                          <td className="p-4 font-black text-[#1e3a5f]">{rfq.quantity}</td>
                          <td className="p-4 text-gray-600">{rfq.exportMarket || 'Worldwide'}</td>
                          <td className="p-4 font-black text-teal-700 font-mono">
                            ${(rfq.estimatedValueUsd || 5000).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${
                                rfq.status === 'New'
                                  ? 'bg-blue-100 text-blue-700'
                                  : rfq.status === 'Under Review'
                                  ? 'bg-amber-100 text-amber-700'
                                  : rfq.status === 'Quotation Sent'
                                  ? 'bg-purple-100 text-purple-700'
                                  : rfq.status === 'Won'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {rfq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRfq(rfq);
                              }}
                              className="bg-[#1e3a5f] hover:bg-[#8B6F47] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition"
                            >
                              Inspect &amp; Manage →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUYER CRM & DIRECTORY */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a5f]">
                    International Textile &amp; Wallcovering Accounts
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    [DEMONSTRATION DIRECTORY] Indicative accounts across Milan, High Point, Dubai, Amsterdam, and London (Pending Business Verification)
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('quote_gen')}
                  className="bg-[#8B6F47] hover:bg-[#1e3a5f] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create Export Pro-Forma
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GLOBAL_BUYERS.map((buyer, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-gray-200 hover:border-[#8B6F47] transition bg-gray-50/50 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-[#1e3a5f] text-base">{buyer.company}</h4>
                        <p className="text-xs text-teal-700 font-semibold">{buyer.country}</p>
                      </div>
                      <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full uppercase">
                        {buyer.stage}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <strong className="text-gray-800">Key Contact:</strong> {buyer.contact}
                      </p>
                      <p>
                        <strong className="text-gray-800">Email:</strong> {buyer.email}
                      </p>
                      <p>
                        <strong className="text-gray-800">Focus:</strong> {buyer.segment}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex gap-2">
                      <a
                        href={`mailto:${buyer.email}?subject=SamplingHub%20Export%20Update`}
                        className="flex-1 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-center text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                      <a
                        href={`https://wa.me/919004962871?text=Follow%20up%20with%20${encodeURIComponent(
                          buyer.company
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 rounded-lg text-center text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPORT PRO-FORMA CALCULATOR */}
        {activeTab === 'quote_gen' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls */}
              <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#1e3a5f] border-b pb-4">
                  Export Pro-Forma Configuration
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase">Product Line</label>
                  <select
                    value={calcProduct}
                    onChange={(e) => setCalcProduct(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#1e3a5f]"
                  >
                    <option>Wallpaper Catalog (45x45 cm)</option>
                    <option>Wallpaper Catalog (50x50 cm)</option>
                    <option>Upholstery Swatch Book (Hardbound)</option>
                    <option>Curtain Fabric Presentation Album</option>
                    <option>Cascading Waterfall Hanger</option>
                    <option>Rigid Sample Cards (Set of 100)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-600 uppercase">
                      Quantity (Units)
                    </label>
                    <input
                      type="number"
                      min={40}
                      step={10}
                      value={calcQuantity}
                      onChange={(e) => setCalcQuantity(Number(e.target.value) || 40)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-600 uppercase">
                      Sheets / Leaves
                    </label>
                    <input
                      type="number"
                      min={10}
                      step={5}
                      value={calcSheets}
                      onChange={(e) => setCalcSheets(Number(e.target.value) || 30)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase">Cover Wrap</label>
                  <select
                    value={calcCoverFinish}
                    onChange={(e) => setCalcCoverFinish(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#1e3a5f]"
                  >
                    <option>Washable Acrylic Buckram + Gold Foil Stamping</option>
                    <option>Imported PU Leatherette + Blind Debossing</option>
                    <option>Natural Textured Linen + Silk-Screen Print</option>
                    <option>Laminated Art Board with Metal Corner Protectors</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-600 uppercase">
                    Freight Mode (India to Destination)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCalcFreightMethod('air')}
                      className={`p-3 rounded-xl border text-xs font-bold transition ${
                        calcFreightMethod === 'air'
                          ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      ✈️ Air Cargo Express (5–7 Days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcFreightMethod('sea')}
                      className={`p-3 rounded-xl border text-xs font-bold transition ${
                        calcFreightMethod === 'sea'
                          ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      🚢 Ocean Freight LCL (24–30 Days)
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro-Forma Summary */}
              <div className="lg:col-span-6 bg-gradient-to-br from-[#1e3a5f] to-[#152943] text-white p-8 rounded-2xl shadow-xl space-y-6">
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a86a]">
                      Indicative Benchmark Estimate (Non-Binding)
                    </span>
                    <h4 className="text-2xl font-black mt-1">{calcProduct}</h4>
                  </div>
                  <FileCheck className="w-8 h-8 text-[#c9a86a]" />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-300">Order Volume:</span>
                    <span className="font-bold">{calcQuantity} Units</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-300">Unit Ex-Factory Cost:</span>
                    <span className="font-mono font-bold text-[#c9a86a]">
                      ${quoteCalculation.unitExFactory} / Unit
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-300">Total Ex-Factory:</span>
                    <span className="font-mono font-bold">
                      ${quoteCalculation.totalExFactory.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-300">Est. Consignment Weight:</span>
                    <span className="font-bold">{quoteCalculation.totalWeightKg} kg</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-300">Estimated Freight ({calcFreightMethod.toUpperCase()}):</span>
                    <span className="font-mono font-bold">
                      ${quoteCalculation.totalFreightUsd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 pt-4 border-t border-white/20 text-sm">
                    <span className="font-bold text-white uppercase tracking-wider">
                      Est. CIF Benchmark (Excludes Local Tariffs &amp; Taxes):
                    </span>
                    <span className="font-mono font-black text-xl text-[#c9a86a]">
                      ${quoteCalculation.grandTotalUsd.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-[11px] text-gray-300 leading-relaxed">
                  ✓ Dispatch from central coordination office: Thane Bhiwandi, PIN: 421302, Maharashtra, India.
                  Includes individual moisture shrink-wrap and export packaging.
                </div>
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-400/20 text-[10px] text-amber-200/90 leading-relaxed">
                  ⚠️ <strong>Indicative Pricing Notice:</strong> Landed totals are engineering benchmarks ($7.50/kg air / $2.20/kg sea LCL). They do not constitute confirmed carrier quotes or binding customs declarations. Final pricing is subject to fabric weight measurement, carrier fuel surcharges, destination customs tariffs (e.g., EU TARIC 630790 / US HTS 6307), and destination VAT.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OEM PARTNER NETWORK */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-[#1e3a5f]">
                  Managed OEM Manufacturing Partner Register
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Specialised manufacturing partners coordinated by SamplingHub (Digitex Studio)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OEM_PARTNERS.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#8B6F47]">
                          {partner.id}
                        </span>
                        <h4 className="font-bold text-[#1e3a5f] text-base">{partner.name}</h4>
                        <p className="text-xs text-gray-500">{partner.location}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">
                        {partner.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1 pt-2 border-t border-gray-200">
                      <p>
                        <strong className="text-gray-800">Technical Specialty:</strong> {partner.specialty}
                      </p>
                      <p>
                        <strong className="text-gray-800">Production Capacity:</strong> {partner.capacity}
                      </p>
                      <p>
                        <strong className="text-gray-800">Standard Lead Time:</strong> {partner.leadTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUALITY & DISPATCH LOGS */}
        {activeTab === 'qc' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <div className="border-b pb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a5f]">Export Quality Inspection Protocol</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Multi-tier inspection enforced across all partner dispatches prior to export packaging
                  </p>
                </div>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full font-black text-xs">
                  Active Protocol v2026.1
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: 'Stage 1: Incoming Fabric & Roll Inspection',
                    checks: [
                      'Weft and warp orientation check',
                      'Moisture percentage testing',
                      'Pattern repeat registration measurement',
                      'Fray susceptibility evaluation',
                    ],
                  },
                  {
                    step: 'Stage 2: Precision Cutting & Label Verification',
                    checks: [
                      'Pinking edge tooth sharpness check',
                      'Barcode and fabric composition label accuracy',
                      'Colorway cascade stepping tolerances (±0.5mm)',
                      'Hot foil debossing depth measurement',
                    ],
                  },
                  {
                    step: 'Stage 3: Final Pre-Dispatch & Export Packing',
                    checks: [
                      'Hinge torque & screw-post tension test',
                      'Individual shrink-wrap moisture barrier',
                      'Reinforced corner guards & 5-ply cartons',
                      'Fumigation certification & AWB documentation',
                    ],
                  },
                ].map((tier, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                    <h4 className="font-bold text-[#1e3a5f] text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                      {tier.step}
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {tier.checks.map((check, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: OUTREACH & STRATEGY */}
        {activeTab === 'outreach' && (
          <div>
            <OutreachTemplates onNavigate={onNavigate} />
          </div>
        )}

        {/* TAB 7: EXPORT ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase">Top Export Market</span>
                <p className="text-2xl font-black text-[#1e3a5f]">European Union (42%)</p>
                <p className="text-xs text-gray-600">Italy, Germany, France, Netherlands</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase">Top Product Demand</span>
                <p className="text-2xl font-black text-[#8B6F47]">Wallpaper Repeat Catalogs</p>
                <p className="text-xs text-gray-600">Oversized 45x45 cm &amp; 50x50 cm albums</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase">Average Turnaround</span>
                <p className="text-2xl font-black text-teal-700">21 Days</p>
                <p className="text-xs text-gray-600">Door-to-door delivery via DHL/FedEx</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: LAUNCH CONTROL */}
        {activeTab === 'launch' && (
          <div>
            <AdminLaunchCenter />
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 max-w-2xl">
            <h3 className="text-xl font-bold text-[#1e3a5f] border-b pb-4">System Settings</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Default Display Currency
                </label>
                <p className="text-gray-500 mb-2">Controls pricing shown to visitors across all product pages.</p>
                <div className="flex gap-2">
                  {(['INR', 'USD', 'EUR', 'AED'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-4 py-2 rounded-xl font-bold border transition ${
                        currency === curr
                          ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="font-bold text-gray-700 block mb-1">
                  Serverless Persistence Endpoint
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://www.samplinghub.world/api/admin/rfqs"
                  className="w-full p-3 bg-gray-100 rounded-xl font-mono text-gray-600"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* RFQ DETAIL SLIDE-OVER MODAL */}
      {selectedRfq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slideLeft">
            {/* Modal Header */}
            <div className="p-6 bg-[#1e3a5f] text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#c9a86a] font-bold text-sm">
                    {selectedRfq.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20">
                    {selectedRfq.status}
                  </span>
                </div>
                <h3 className="text-xl font-black mt-1">{selectedRfq.companyName}</h3>
                <p className="text-xs text-gray-300">
                  Submitted by {selectedRfq.fullName} • {new Date(selectedRfq.submittedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedRfq(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow p-6 space-y-6 overflow-y-auto text-xs">
              {/* Status Update Quick Bar */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <label className="font-black text-gray-600 uppercase text-[10px]">
                  Update Inquiry Workflow Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      'New',
                      'Under Review',
                      'Qualified',
                      'Quotation Sent',
                      'Won',
                      'Lost',
                    ] as const
                  ).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedRfq.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                        selectedRfq.status === st
                          ? 'bg-[#1e3a5f] text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 uppercase text-[10px] font-bold">Product</span>
                  <p className="text-sm font-bold text-[#1e3a5f] mt-1">{selectedRfq.productType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 uppercase text-[10px] font-bold">Quantity</span>
                  <p className="text-sm font-black text-[#1e3a5f] mt-1">{selectedRfq.quantity}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 uppercase text-[10px] font-bold">Destination</span>
                  <p className="text-sm font-bold text-gray-700 mt-1">
                    {selectedRfq.exportMarket || 'Not Specified'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 uppercase text-[10px] font-bold">Direct Contact</span>
                  <p className="text-sm font-bold text-gray-700 mt-1">{selectedRfq.email}</p>
                  {selectedRfq.phone && (
                    <p className="text-xs text-gray-500">{selectedRfq.phone}</p>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-2">
                <label className="font-black text-gray-600 uppercase text-[10px]">
                  Technical Specifications
                </label>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 leading-relaxed font-medium">
                  {selectedRfq.specifications || 'Standard export specifications requested.'}
                </div>
              </div>

              {/* Attachments */}
              {selectedRfq.attachments && selectedRfq.attachments.length > 0 && (
                <div className="space-y-2">
                  <label className="font-black text-gray-600 uppercase text-[10px]">
                    Attached Client References
                  </label>
                  <div className="space-y-2">
                    {selectedRfq.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-700">📎 {file.name}</span>
                        <span className="text-gray-400 font-mono text-[10px]">
                          {file.sizeFormatted}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partner Assignment */}
              <div className="space-y-2">
                <label className="font-black text-gray-600 uppercase text-[10px]">
                  Assign OEM Manufacturing Partner
                </label>
                <select
                  value={selectedRfq.partnerAssigned || ''}
                  onChange={(e) => handleAssignPartner(selectedRfq.id, e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#1e3a5f]"
                >
                  <option value="">Unassigned</option>
                  {OEM_PARTNERS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Internal Notes History */}
              <div className="space-y-2">
                <label className="font-black text-gray-600 uppercase text-[10px]">
                  Internal Export Operations Notes
                </label>
                <div className="space-y-2 mb-3">
                  {(!selectedRfq.internalNotes || selectedRfq.internalNotes.length === 0) && (
                    <p className="text-gray-400 italic">No notes logged yet.</p>
                  )}
                  {selectedRfq.internalNotes?.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-amber-900"
                    >
                      {note}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal log note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddNote(selectedRfq.id);
                    }}
                    className="flex-grow p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddNote(selectedRfq.id)}
                    className="bg-[#1e3a5f] hover:bg-[#8B6F47] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition"
                  >
                    Post Note
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Quick Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-3">
              <a
                href={`mailto:${selectedRfq.email}?subject=SamplingHub%20Export%20Quotation%20[${selectedRfq.id}]`}
                className="flex-1 bg-[#1e3a5f] hover:bg-[#8B6F47] text-white py-3 rounded-xl text-center font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email Pro-Forma
              </a>
              <a
                href={`https://wa.me/919004962871?text=Hello%20${encodeURIComponent(
                  selectedRfq.fullName
                )},%20regarding%20your%20SamplingHub%20RFQ%20${selectedRfq.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-center font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
