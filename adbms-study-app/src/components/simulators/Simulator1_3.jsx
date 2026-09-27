import React, { useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Zap } from 'lucide-react';

export default function Simulator1_3() {
  const [arch, setArch] = useState('nothing'); // 'memory', 'disk', 'nothing', 'hierarchical'
  const [queryType, setQueryType] = useState('intra'); // 'intra' or 'inter'
  const [isRunning, setIsRunning] = useState(false);
  const [activeWorkers, setActiveWorkers] = useState([0, 0, 0, 0]);

  const runParallelJob = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveWorkers([1, 1, 1, 1]);
    setTimeout(() => {
      setActiveWorkers([0, 0, 0, 0]);
      setIsRunning(false);
    }, 2000);
  };

  const archDescriptions = {
    memory: {
      title: "Shared Memory (SMP)",
      memory: "Single Shared RAM Bus",
      disk: "Single Shared Disks",
      scalability: "Low (Memory Bus Bottleneck, max ~32-64 CPUs)",
      pros: "Simpler programming, easy inter-process communication.",
      cons: "Bus contention slows down system as CPUs increase."
    },
    disk: {
      title: "Shared Disk",
      memory: "Independent Private RAM per Node",
      disk: "Shared SAN/NAS Disk Subsystem",
      scalability: "Medium (Disk Subsystem Bottleneck)",
      pros: "Good fault tolerance (if 1 node crashes, other nodes read disk).",
      cons: "High network traffic on storage network; lock management complexity."
    },
    nothing: {
      title: "Shared Nothing (Massively Parallel)",
      memory: "Independent Private RAM per Node",
      disk: "Independent Private Disk per Node",
      scalability: "Extremely High (Thousands of nodes - Linear Scale)",
      pros: "No hardware bottlenecks. True horizontal scaling (Google, Redshift, Snowflake).",
      cons: "Data communication overhead and data skew can slow queries."
    },
    hierarchical: {
      title: "Hierarchical / Clustered",
      memory: "Shared Memory within Node Clusters",
      disk: "Shared Nothing between Cluster Groups",
      scalability: "Very High",
      pros: "Combines benefits of SMP performance with cluster scale.",
      cons: "Complex architecture and tiered query optimization."
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Parallel Database Architectures & Query Engine
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Compare Shared Memory, Shared Disk, and Shared Nothing architectures with parallel worker execution
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'memory', label: 'Shared Memory' },
            { id: 'disk', label: 'Shared Disk' },
            { id: 'nothing', label: 'Shared Nothing' },
            { id: 'hierarchical', label: 'Hierarchical' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setArch(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                arch === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Architectural Layout */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 mb-6">
        <div className="text-xs font-bold text-slate-300 mb-4 flex items-center justify-between">
          <span>{archDescriptions[arch].title} Architecture Model</span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
            Scalability: {archDescriptions[arch].scalability}
          </span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((nodeId, idx) => (
            <div key={nodeId} className={`p-3.5 rounded-xl border transition-all ${
              activeWorkers[idx] ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20' : 'border-slate-800 bg-slate-900/70'
            }`}>
              <div className="text-xs font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>Node {nodeId}</span>
                {activeWorkers[idx] ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                )}
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-blue-300 bg-blue-950/40 p-1.5 rounded border border-blue-500/20">
                  <Cpu className="w-3.5 h-3.5" /> CPU {nodeId}
                </div>

                <div className={`flex items-center gap-1.5 p-1.5 rounded border ${
                  arch === 'memory' 
                    ? 'text-amber-300 bg-amber-950/30 border-amber-500/20' 
                    : 'text-purple-300 bg-purple-950/30 border-purple-500/20'
                }`}>
                  <MemoryStick className="w-3.5 h-3.5" /> 
                  {arch === 'memory' ? 'Shared Bus RAM' : `RAM ${nodeId}`}
                </div>

                <div className={`flex items-center gap-1.5 p-1.5 rounded border ${
                  arch === 'nothing' 
                    ? 'text-emerald-300 bg-emerald-950/30 border-emerald-500/20' 
                    : 'text-amber-300 bg-amber-950/30 border-amber-500/20'
                }`}>
                  <HardDrive className="w-3.5 h-3.5" /> 
                  {arch === 'nothing' ? `Disk ${nodeId}` : 'Shared Disk Array'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parallel Query Dispatcher */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Parallelism Mode:</span>
            <button
              onClick={() => setQueryType('intra')}
              className={`px-3 py-1 rounded text-xs font-medium border ${
                queryType === 'intra' ? 'bg-blue-600/30 text-blue-300 border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Intraquery (1 Query split across 4 CPUs)
            </button>
            <button
              onClick={() => setQueryType('inter')}
              className={`px-3 py-1 rounded text-xs font-medium border ${
                queryType === 'inter' ? 'bg-purple-600/30 text-purple-300 border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Interquery (4 Queries run concurrently)
            </button>
          </div>

          <button
            onClick={runParallelJob}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            {isRunning ? 'Processing in Parallel...' : 'Dispatch Parallel Workload'}
          </button>
        </div>
      </div>

      {/* Pros & Cons Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="font-bold text-emerald-400 block mb-1">Key Advantages</span>
          <p className="text-slate-300">{archDescriptions[arch].pros}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
          <span className="font-bold text-rose-400 block mb-1">Key Bottlenecks & Limitations</span>
          <p className="text-slate-300">{archDescriptions[arch].cons}</p>
        </div>
      </div>
    </div>
  );
}
