import React, { useState, useEffect } from 'react';
import { 
  Building, ShieldCheck, AlertTriangle, Activity, Map, 
  FileText, Users, Search, Filter, Download, ArrowUpRight, 
  CheckCircle2, Clock, ExternalLink, RefreshCw, Send, MessageSquare, Shield, Lock, Eye 
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Legend 
} from 'recharts';
import { useLM } from '../../context/LMContext';
import { Instrument, RiskAnomalyAlert } from '../../types';
import { CertificateViewer } from '../trader/CertificateViewer';

// Leaflet Map Imports (Client-side rendering)
import L from 'leaflet';

export const AdminDashboard: React.FC = () => {
  const { 
    instruments, certificates, complaints, riskAlerts, 
    auditLogs, setCurrentTab, addToast 
  } = useLM();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'registry' | 'map' | 'anomalies' | 'expiry' | 'complaints' | 'audit'>('overview');
  const [registrySearch, setRegistrySearch] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedCertForView, setSelectedCertForView] = useState<any | null>(null);

  // Stats
  const totalInstruments = 248391 + instruments.length - 6;
  const validCerts = certificates.length + 193480;
  const pendingInspections = instruments.filter(i => i.status === 'PENDING_INSPECTION').length + 890;
  const highRiskCount = instruments.filter(i => i.riskScore > 70).length + riskAlerts.length;

  // Chart Mock Data
  const certStatusData = [
    { name: 'Valid Certified', value: 193482, color: '#16A34A' },
    { name: 'Expiring (30 Days)', value: 18392, color: '#D97706' },
    { name: 'Expired', value: 12401, color: '#DC2626' },
    { name: 'Pending Field Audit', value: 24116, color: '#2563EB' }
  ];

  const monthlyTrendData = [
    { month: 'Mar', Inspections: 14200, PassRate: 97.1 },
    { month: 'Apr', Inspections: 15800, PassRate: 96.8 },
    { month: 'May', Inspections: 16900, PassRate: 97.4 },
    { month: 'Jun', Inspections: 17400, PassRate: 97.2 },
    { month: 'Jul', Inspections: 18100, PassRate: 97.6 },
    { month: 'Aug', Inspections: 18392, PassRate: 97.4 }
  ];

  const categoryBreakdownData = [
    { category: 'Weighing Scale', count: 124800 },
    { category: 'Weighbridge', count: 34200 },
    { category: 'Fuel Dispenser', count: 48900 },
    { category: 'Platform Scale', count: 28400 },
    { category: 'Retail Measure', count: 12091 }
  ];

  // Leaflet Map Initialization Hook
  useEffect(() => {
    if (activeSubTab === 'map' || activeSubTab === 'overview') {
      const mapContainer = document.getElementById('india-gis-map');
      if (mapContainer && !(mapContainer as any)._leaflet_id) {
        const map = L.map('india-gis-map').setView([20.5937, 78.9629], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; Government GIS Legal Metrology Map'
        }).addTo(map);

        // Add pins from instruments
        instruments.forEach(inst => {
          const color = inst.status === 'VERIFIED' ? 'green' : inst.status === 'HIGH_RISK' ? 'red' : 'orange';
          
          const customMarker = L.circleMarker([inst.latitude, inst.longitude], {
            radius: 8,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(map);

          customMarker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; text-align: left;">
              <strong style="color: #0A192F;">${inst.id}</strong><br/>
              <strong>${inst.businessName}</strong><br/>
              <span>${inst.type}</span><br/>
              <span style="color: ${color}; font-weight: bold;">Status: ${inst.status}</span><br/>
              <small>${inst.district}, ${inst.state}</small>
            </div>
          `);
        });
      }
    }
  }, [activeSubTab, instruments]);

  const filteredRegistry = instruments.filter(inst => {
    const matchesSearch = inst.id.toLowerCase().includes(registrySearch.toLowerCase()) ||
                          inst.traderName.toLowerCase().includes(registrySearch.toLowerCase()) ||
                          inst.businessName.toLowerCase().includes(registrySearch.toLowerCase()) ||
                          inst.serialNumber.toLowerCase().includes(registrySearch.toLowerCase());
    
    const matchesState = stateFilter === 'ALL' || inst.state === stateFilter;
    const matchesCategory = categoryFilter === 'ALL' || inst.category === categoryFilter;

    return matchesSearch && matchesState && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Executive Command Header */}
      <div className="bg-gradient-to-r from-gov-navy via-[#0B1E38] to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-500/40 uppercase">
              GOVERNMENT COMMAND CENTER
            </span>
            <span className="text-xs text-slate-400">HQ Jurisdiction: National Capital Territory</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            National Legal Metrology Command Center
          </h1>
          <p className="text-slate-300 text-xs mt-0.5">
            Real-time compliance monitoring, GIS heatmaps, and AI anomaly tracking for 28 States & UTs.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'overview' ? 'bg-gov-saffron text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveSubTab('registry')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'registry' ? 'bg-gov-saffron text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Master Registry
          </button>

          <button
            onClick={() => setActiveSubTab('map')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'map' ? 'bg-gov-saffron text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            GIS Map
          </button>

          <button
            onClick={() => setActiveSubTab('anomalies')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
              activeSubTab === 'anomalies' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>AI Risk & Anomalies</span>
            {riskAlerts.length > 0 && (
              <span className="bg-white text-red-700 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-extrabold">
                {riskAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('expiry')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'expiry' ? 'bg-gov-saffron text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Expiry Desk
          </button>

          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'audit' ? 'bg-gov-saffron text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-slate-500">Total Registered Instruments</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{totalInstruments.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Across all commercial sectors</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-emerald-700">Valid Certifications</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-600 mt-1">{validCerts.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5 font-bold">97.4% National Compliance</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-blue-700">Pending Field Audits</div>
          <div className="text-2xl font-extrabold font-heading text-blue-600 mt-1">{pendingInspections.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Inspector slots assigned</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs border-l-4 border-l-red-500">
          <div className="text-xs font-bold text-red-700">High Risk & Anomalies</div>
          <div className="text-2xl font-extrabold font-heading text-red-600 mt-1">{highRiskCount}</div>
          <div className="text-[10px] text-red-500 font-bold mt-0.5">Requires Immediate Audit</div>
        </div>
      </div>

      {/* SUB-TAB 1: OVERVIEW & ANALYTICS */}
      {(activeSubTab === 'overview' || activeSubTab === 'map') && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: Status Distribution Donut */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-sm border-b pb-2">National Certification Status</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={certStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {certStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => value.toLocaleString('en-IN')} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Monthly Inspection Trend */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-sm border-b pb-2">Monthly Field Inspection Volume</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip />
                    <Line type="monotone" dataKey="Inspections" stroke="#1E3A8A" strokeWidth={3} dot={{ r: 5, fill: '#FF9933' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* GIS Map & Anomaly Preview Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* GIS Map Container */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Map className="w-4 h-4 text-gov-navy" />
                  <span>National GIS Compliance Map</span>
                </h3>
                <span className="text-[10px] font-bold text-slate-500 font-mono">LIVE SPATIAL HEATMAP</span>
              </div>

              <div id="india-gis-map" className="h-80 w-full rounded-xl border border-slate-300 z-10"></div>
              
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span> Verified</span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Expiring</span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> High Risk</span>
                </div>
                <span>Click markers to inspect premise details</span>
              </div>
            </div>

            {/* AI Risk & Anomaly Preview List */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-red-600" />
                  <span>Active AI Risk & Anomaly Alerts</span>
                </h3>
                <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  AI MONITORING
                </span>
              </div>

              <div className="space-y-3">
                {riskAlerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-red-50/80 border border-red-200 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between items-start font-bold">
                      <span className="text-red-900">{alert.title}</span>
                      <span className="bg-red-600 text-white text-[9px] font-mono px-1.5 py-0.2 rounded">
                        RISK {alert.riskScore}/100
                      </span>
                    </div>
                    <p className="text-red-900 text-[11px] leading-tight">{alert.description}</p>
                    <div className="text-[10px] text-red-700 font-mono pt-1">
                      Target: {alert.entityId} • {alert.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: MASTER INSTRUMENT REGISTRY */}
      {activeSubTab === 'registry' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">National Instrument Registry Table</h3>
              <p className="text-xs text-slate-500">Searchable register of all verified commercial equipment in India</p>
            </div>

            {/* Filters & Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative w-48">
                <input
                  type="text"
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  placeholder="Search ID, trader or serial..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold"
              >
                <option value="ALL">All States</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>

              <button
                onClick={() => addToast('info', 'CSV Export', 'Generated statutory registry export file.')}
                className="bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Device ID / UUID</th>
                  <th className="p-3">Trader & Business</th>
                  <th className="p-3">State / District</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Risk Score</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegistry.map(inst => {
                  const cert = certificates.find(c => c.instrumentId === inst.id);

                  return (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">
                        <div>{inst.id}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]">{inst.uuid}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-bold text-slate-900">{inst.businessName}</div>
                        <div className="text-[10px] text-slate-500">{inst.traderName}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{inst.district}</div>
                        <div className="text-[10px] text-slate-400">{inst.state}</div>
                      </td>

                      <td className="p-3 font-bold text-slate-700">
                        {inst.category}
                      </td>

                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          inst.status === 'VERIFIED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : inst.status === 'HIGH_RISK'
                              ? 'bg-red-50 text-red-700 border-red-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}>
                          {inst.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className={`font-mono font-bold text-xs ${
                          inst.riskScore > 70 ? 'text-red-600' : inst.riskScore > 40 ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {inst.riskScore}/100
                        </span>
                      </td>

                      <td className="p-3 text-right space-x-1">
                        {cert && (
                          <button
                            onClick={() => setSelectedCertForView(cert)}
                            className="bg-gov-navy text-white text-[10px] font-bold px-2.5 py-1 rounded"
                          >
                            Certificate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: CERTIFICATE EXPIRY CENTER */}
      {activeSubTab === 'expiry' && (
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">Certificate Expiry Desk & Reminders</h3>
              <p className="text-xs text-slate-500">Automated SMS & WhatsApp reminder dispatch for statutory re-verification</p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded border border-amber-300">
              30-DAY & 15-DAY AUDIT NOTIFICATIONS
            </span>
          </div>

          <div className="space-y-3">
            {instruments.filter(i => i.status === 'EXPIRING_SOON' || i.status === 'EXPIRED').map(inst => (
              <div key={inst.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-800">{inst.id}</span>
                    <span className="bg-red-100 text-red-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                      {inst.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">{inst.businessName}</h4>
                  <p className="text-slate-500 text-[11px]">Trader: {inst.traderName} ({inst.contactNumber}) • Expiry: {inst.expiryDate || 'Expired'}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToast('success', 'SMS Reminder Dispatched', `Automated SMS sent to ${inst.contactNumber}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send SMS Reminder</span>
                  </button>

                  <button
                    onClick={() => addToast('success', 'WhatsApp Reminder Sent', `WhatsApp notice sent to ${inst.contactNumber}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Notice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SYSTEM AUDIT TRAIL */}
      {activeSubTab === 'audit' && (
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-heading font-bold text-slate-900 text-base">Immutable System Audit Logs</h3>
            <span className="font-mono text-[10px] text-slate-400">ENCRYPTED GOVT TRAIL</span>
          </div>

          <div className="space-y-2 font-mono">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-950 text-white rounded-lg border border-slate-800 flex justify-between items-center text-[11px]">
                <div>
                  <div className="text-amber-400 font-bold">{log.timestamp} — {log.action}</div>
                  <div className="text-slate-300 text-[10px]">{log.details}</div>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <span>Actor: {log.actorName}</span><br />
                  <span>IP: {log.ipAddress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {selectedCertForView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-heading font-bold text-lg text-gov-navy">Digital Verification Certificate</h3>
              <button onClick={() => setSelectedCertForView(null)} className="text-slate-500 hover:text-slate-900 text-sm font-bold">Close ✕</button>
            </div>
            <CertificateViewer certificate={selectedCertForView} />
          </div>
        </div>
      )}

    </div>
  );
};
