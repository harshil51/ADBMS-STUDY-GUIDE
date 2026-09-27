import React, { useState } from 'react';
import { Smartphone, Cloud, Wifi, WifiOff, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Simulator5_3() {
  const [isOnline, setIsOnline] = useState(false);
  const [offlineEdits, setOfflineEdits] = useState([]);
  const [centralData, setCentralData] = useState({ patientName: "Rahul Dave", dosage: "250mg", status: "Active" });
  const [mobileData, setMobileData] = useState({ patientName: "Rahul Dave", dosage: "250mg", status: "Active" });
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'synced'

  const makeOfflineEdit = () => {
    const updated = { ...mobileData, dosage: mobileData.dosage === "250mg" ? "500mg" : "250mg" };
    setMobileData(updated);
    setOfflineEdits(prev => [`Modified dosage to ${updated.dosage} (Logged locally)`, ...prev]);
  };

  const handleSync = () => {
    if (!isOnline || offlineEdits.length === 0) return;
    setSyncStatus('syncing');
    setTimeout(() => {
      setCentralData(mobileData);
      setOfflineEdits([]);
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2500);
    }, 1200);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Mobile Database Synchronization & Disconnected Operation
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Test offline mobile database caching, change logs, and cloud synchronization
          </p>
        </div>

        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            isOnline
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/50'
              : 'bg-rose-950/50 text-rose-300 border-rose-500/50 hover:bg-rose-900/50'
          }`}
        >
          {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
          Network: {isOnline ? 'Online (Connected)' : 'Offline (Disconnected)'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Mobile Device */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <h5 className="text-xs font-bold text-slate-200">Mobile Client (Local SQLite/Realm)</h5>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Edge Device</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs mb-3 space-y-1">
            <div>Patient: <span className="text-white font-bold">{mobileData.patientName}</span></div>
            <div>Dosage: <span className="text-emerald-400 font-bold">{mobileData.dosage}</span></div>
            <div>Status: <span className="text-blue-400">{mobileData.status}</span></div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={makeOfflineEdit}
              className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              Edit Dosage Locally
            </button>
          </div>

          {offlineEdits.length > 0 && (
            <div className="mt-3 text-[11px] text-amber-400 bg-amber-950/30 p-2 rounded border border-amber-500/30 font-mono">
              ⚠️ {offlineEdits.length} uncommitted delta log(s) pending sync
            </div>
          )}
        </div>

        {/* Central Cloud Database */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-purple-400" />
              <h5 className="text-xs font-bold text-slate-200">Central Cloud Database (Hospital RDBMS)</h5>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Authoritative Source</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs mb-3 space-y-1">
            <div>Patient: <span className="text-white font-bold">{centralData.patientName}</span></div>
            <div>Dosage: <span className="text-purple-400 font-bold">{centralData.dosage}</span></div>
            <div>Status: <span className="text-blue-400">{centralData.status}</span></div>
          </div>

          <button
            onClick={handleSync}
            disabled={!isOnline || offlineEdits.length === 0 || syncStatus === 'syncing'}
            className="w-full py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {syncStatus === 'syncing' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            {syncStatus === 'syncing' ? 'Synchronizing with Cloud...' : 'Synchronize Delta Logs'}
          </button>

          {syncStatus === 'synced' && (
            <div className="mt-3 text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-500/30 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Conflict resolved! Cloud state synchronized.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
