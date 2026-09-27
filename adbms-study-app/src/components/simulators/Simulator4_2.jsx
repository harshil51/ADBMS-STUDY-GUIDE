import React, { useState } from 'react';
import { Layers, Workflow, Server, Database, CheckCircle2, Play, RefreshCw, AlertCircle } from 'lucide-react';

export default function Simulator4_2() {
  const [workflowState, setWorkflowState] = useState(0); // 0: idle, 1: credit check, 2: inventory, 3: payment, 4: done
  const [hasError, setHasError] = useState(false);
  const [logs, setLogs] = useState(['TP Monitor standing by for client workflow requests.']);

  const steps = [
    { name: "Step 1: Credit Verification", sys: "Banking API", desc: "Validates customer credit limit and account status." },
    { name: "Step 2: Inventory Reservation", sys: "Warehouse DB", desc: "Locks physical stock items in warehouse." },
    { name: "Step 3: Payment Gateway Charge", sys: "Payment Gateway", desc: "Deducts payment and generates transaction token." },
    { name: "Step 4: Dispatch Order", sys: "Logistics ERP", desc: "Generates shipping manifest and notifies customer." }
  ];

  const runWorkflow = () => {
    setHasError(false);
    setWorkflowState(1);
    setLogs(['TP Monitor received workflow request. Initiating persistent state log.']);

    setTimeout(() => {
      setWorkflowState(2);
      setLogs(prev => ['[Step 1 OK] Credit verified. Proceeding to Warehouse Inventory...', ...prev]);

      setTimeout(() => {
        setWorkflowState(3);
        setLogs(prev => ['[Step 2 OK] Inventory reserved. Requesting Payment Gateway...', ...prev]);

        setTimeout(() => {
          setWorkflowState(4);
          setLogs(prev => ['[Step 3 OK] Payment captured. Order Dispatched. Workflow Completed!', ...prev]);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            TP Monitor & Multi-System Workflow Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate how a Transaction Processing Monitor coordinates multi-step business workflows
          </p>
        </div>

        <button
          onClick={runWorkflow}
          disabled={workflowState > 0 && workflowState < 4}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
        >
          {workflowState > 0 && workflowState < 4 ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          Execute Business Workflow
        </button>
      </div>

      {/* Workflow Steps Horizontal Pipeline */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isCurrent = workflowState === stepNum;
            const isDone = workflowState > stepNum;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-950/40 shadow-lg shadow-blue-500/20'
                    : isDone
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase">{st.sys}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  ) : null}
                </div>
                <div className="text-xs font-bold text-slate-200 mb-1">{st.name}</div>
                <p className="text-[10px] text-slate-400">{st.desc}</p>
              </div>
            );
          })}
        </div>

        {/* TP Monitor Coordination Box */}
        <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 font-semibold">TP Monitor Role:</span>
            <span className="text-slate-400">Maintains persistent WAL log & coordinates Two-Phase Commit across all 4 systems</span>
          </div>
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
            Resilient Recovery Enabled
          </span>
        </div>
      </div>

      {/* Audit Log */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
        <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Workflow Engine Execution Log</div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {logs.map((l, i) => (
            <div key={i} className={l.includes('OK') || l.includes('Completed') ? 'text-emerald-300' : 'text-blue-300'}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
