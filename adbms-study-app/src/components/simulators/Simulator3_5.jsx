import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export default function Simulator3_5() {
  const [currentStage, setCurrentStage] = useState(0);

  const rawDocs = [
    { name: "Aarav", dept: "IT", marks: 88, status: "A" },
    { name: "Diya", dept: "CE", marks: 92, status: "A" },
    { name: "Kavya", dept: "IT", marks: 76, status: "I" }, // inactive
    { name: "Manan", dept: "IT", marks: 94, status: "A" },
    { name: "Riya", dept: "CE", marks: 84, status: "A" },
    { name: "Yash", dept: "EC", marks: 70, status: "A" }
  ];

  const stages = [
    {
      num: 0,
      name: "Input Collection",
      syntax: "db.students.aggregate([...])",
      desc: "Raw collection containing 6 student documents across multiple departments.",
      data: rawDocs
    },
    {
      num: 1,
      name: "Stage 1: $match",
      syntax: `{ $match: { status: "A" } }`,
      desc: "Filters out inactive students (status = 'I'). 5 active documents pass to the next stage.",
      data: rawDocs.filter(d => d.status === "A")
    },
    {
      num: 2,
      name: "Stage 2: $group",
      syntax: `{ $group: { _id: "$dept", total: { $sum: 1 }, avgMarks: { $avg: "$marks" } } }`,
      desc: "Groups documents by 'dept' and calculates count and average marks per department.",
      data: [
        { _id: "IT", total: 2, avgMarks: 91 },
        { _id: "CE", total: 2, avgMarks: 88 },
        { _id: "EC", total: 1, avgMarks: 70 }
      ]
    },
    {
      num: 3,
      name: "Stage 3: $sort",
      syntax: `{ $sort: { avgMarks: -1 } }`,
      desc: "Sorts department summary groups in descending order of average marks.",
      data: [
        { _id: "IT", total: 2, avgMarks: 91 },
        { _id: "CE", total: 2, avgMarks: 88 },
        { _id: "EC", total: 1, avgMarks: 70 }
      ]
    },
    {
      num: 4,
      name: "Stage 4: $project",
      syntax: `{ $project: { department: "$_id", avgMarks: 1, total: 1, _id: 0 } }`,
      desc: "Renames '_id' to 'department' and suppresses the default '_id' field for clean output.",
      data: [
        { department: "IT", avgMarks: 91, total: 2 },
        { department: "CE", avgMarks: 88, total: 2 },
        { department: "EC", avgMarks: 70, total: 1 }
      ]
    }
  ];

  const activeStageObj = stages[currentStage];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            MongoDB Aggregation Pipeline Interactive Stepper
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Step through `$match` → `$group` → `$sort` → `$project` stages on live sample data
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
            disabled={currentStage === 0}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
          >
            ← Previous Stage
          </button>
          <button
            onClick={() => setCurrentStage(Math.min(stages.length - 1, currentStage + 1))}
            disabled={currentStage === stages.length - 1}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
          >
            Next Stage →
          </button>
        </div>
      </div>

      {/* Pipeline Breadcrumb Stages */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {stages.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStage(idx)}
            className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
              currentStage === idx
                ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                : currentStage > idx
                ? 'bg-slate-950/80 border-slate-800 text-emerald-400'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400">Stage {idx}</div>
            <div className="text-xs font-bold truncate">{st.name.replace('Stage ' + idx + ': ', '')}</div>
          </button>
        ))}
      </div>

      {/* Stage Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stage Explanation & Syntax */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-blue-400 font-bold mb-1">Active Pipeline Stage</div>
            <h5 className="font-bold text-sm text-white">{activeStageObj.name}</h5>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{activeStageObj.desc}</p>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Stage Operator Syntax</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
              {activeStageObj.syntax}
            </div>
          </div>
        </div>

        {/* Documents passing through current stage */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Output Data Stream ({activeStageObj.data.length} Documents)
            </h5>
            <span className="text-[10px] text-emerald-400 font-mono">JSON Document Array</span>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 max-h-60 overflow-y-auto">
            <pre className="text-emerald-300">{JSON.stringify(activeStageObj.data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
