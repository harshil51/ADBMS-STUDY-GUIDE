import React, { useState } from 'react';
import { Clock, AlertTriangle, Play, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function Simulator4_3() {
  const [activeTab, setActiveTab] = useState('edf'); // 'edf' or 'types'
  
  // Real-time tasks for EDF simulation
  const [tasks, setTasks] = useState([
    { id: "T1", name: "Radar Track Update", deadline: 40, execTime: 15, priority: "High", status: "pending" },
    { id: "T2", name: "Engine Fuel Sensor Log", deadline: 25, execTime: 10, priority: "Critical", status: "pending" },
    { id: "T3", name: "Cabin Climate Adjust", deadline: 90, execTime: 20, priority: "Low", status: "pending" }
  ]);

  const [simulatedSchedule, setSimulatedSchedule] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runEDF = () => {
    setIsSimulating(true);
    // Sort by earliest deadline: T2 (25) -> T1 (40) -> T3 (90)
    const sorted = [...tasks].sort((a, b) => a.deadline - b.deadline);
    
    let currentTime = 0;
    const schedule = [];

    sorted.forEach(t => {
      const start = currentTime;
      currentTime += t.execTime;
      const met = currentTime <= t.deadline;
      schedule.push({
        ...t,
        startTime: start,
        finishTime: currentTime,
        metDeadline: met,
        slack: t.deadline - currentTime
      });
    });

    setTimeout(() => {
      setSimulatedSchedule(schedule);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Real-Time Database Scheduling Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate Earliest Deadline First (EDF) scheduling and compare Hard, Firm, and Soft real-time systems
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('edf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'edf' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            EDF Scheduler
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'types' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hard vs Firm vs Soft
          </button>
        </div>
      </div>

      {activeTab === 'edf' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {tasks.map(t => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-bold text-xs text-blue-400">{t.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                    Deadline: {t.deadline}ms
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 mb-1">{t.name}</div>
                <div className="text-[11px] text-slate-400">
                  Execution Cost: <span className="text-slate-200 font-mono">{t.execTime}ms</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  EDF Execution Timeline
                </h5>
                <p className="text-[11px] text-slate-400">Orders tasks dynamically by nearest absolute deadline (d_i)</p>
              </div>

              <button
                onClick={runEDF}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Compute EDF Order
              </button>
            </div>

            {simulatedSchedule.length > 0 ? (
              <div className="space-y-3 font-mono text-xs">
                {simulatedSchedule.map((s, idx) => (
                  <div key={s.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">#{idx + 1}</span>
                      <span className="font-bold text-white">{s.id} ({s.name})</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-slate-400">Window: [{s.startTime}ms → {s.finishTime}ms]</span>
                      <span className="text-slate-400">Deadline: {s.deadline}ms</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Met (Slack: +{s.slack}ms)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs font-mono">
                Click "Compute EDF Order" to calculate optimal real-time schedule.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <div className="text-rose-400 font-bold text-sm mb-1">Hard Real-Time</div>
            <p className="text-xs text-slate-300 mb-3">
              Missing a single deadline causes catastrophic, fatal failure of the entire physical/software system.
            </p>
            <div className="text-[11px] text-rose-300 font-mono bg-rose-950/60 p-2 rounded">
              Examples: Flight avionics, cardiac pacemakers, nuclear core controllers.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
            <div className="text-amber-400 font-bold text-sm mb-1">Firm Real-Time</div>
            <p className="text-xs text-slate-300 mb-3">
              Missing a deadline makes the result completely useless (value drops to 0), but does not cause catastrophic crash.
            </p>
            <div className="text-[11px] text-amber-300 font-mono bg-amber-950/60 p-2 rounded">
              Examples: Stock trading tick feeds, video conference frame delivery.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30">
            <div className="text-blue-400 font-bold text-sm mb-1">Soft Real-Time</div>
            <p className="text-xs text-slate-300 mb-3">
              Missing a deadline merely degrades quality of service or user experience without total loss of utility.
            </p>
            <div className="text-[11px] text-blue-300 font-mono bg-blue-950/60 p-2 rounded">
              Examples: Video streaming buffering, online shopping cart updates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
