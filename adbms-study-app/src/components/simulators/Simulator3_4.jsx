import React, { useState } from 'react';
import { Search, Terminal, Filter, Eye, Code2 } from 'lucide-react';

export default function Simulator3_4() {
  const sampleCollection = [
    { _id: "1", name: "Harshil Bhagora", dept: "IT", marks: 94, city: "Ahmedabad", passed: true },
    { _id: "2", name: "Priya Shah", dept: "CE", marks: 82, city: "Surat", passed: true },
    { _id: "3", name: "Karan Patel", dept: "IT", marks: 74, city: "Vadodara", passed: true },
    { _id: "4", name: "Ananya Desai", dept: "EC", marks: 68, city: "Ahmedabad", passed: false },
    { _id: "5", name: "Rohan Verma", dept: "CE", marks: 91, city: "Rajkot", passed: true }
  ];

  const presets = [
    {
      id: "gt80",
      label: "Marks >= 80 ($gte)",
      queryStr: 'db.students.find({ marks: { $gte: 80 } })',
      filterFn: (d) => d.marks >= 80,
      projFn: (d) => d
    },
    {
      id: "orQuery",
      label: "$or (Dept IT or Marks > 90)",
      queryStr: 'db.students.find({ $or: [{ dept: "IT" }, { marks: { $gt: 90 } }] })',
      filterFn: (d) => d.dept === "IT" || d.marks > 90,
      projFn: (d) => d
    },
    {
      id: "projection",
      label: "Projection ({ name: 1, marks: 1, _id: 0 })",
      queryStr: 'db.students.find({ marks: { $gte: 75 } }, { name: 1, marks: 1, _id: 0 })',
      filterFn: (d) => d.marks >= 75,
      projFn: (d) => ({ name: d.name, marks: d.marks })
    },
    {
      id: "inArray",
      label: "City $in ['Ahmedabad', 'Surat']",
      queryStr: 'db.students.find({ city: { $in: ["Ahmedabad", "Surat"] } })',
      filterFn: (d) => ["Ahmedabad", "Surat"].includes(d.city),
      projFn: (d) => d
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState(presets[0]);

  const results = sampleCollection.filter(selectedPreset.filterFn).map(selectedPreset.projFn);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Search className="w-5 h-5" />
            MongoDB Query Operators & Projection Runner
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Test comparison ($gt, $gte, $in), logical ($or, $and), and projection operators
          </p>
        </div>

        {/* Preset query buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPreset.id === p.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Query Bar */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 flex items-center gap-2 mb-6 shadow-inner">
        <Terminal className="w-4 h-4 text-emerald-500 shrink-0" />
        <span className="text-slate-500 font-bold">&gt;</span>
        <span className="text-emerald-300 font-semibold">{selectedPreset.queryStr}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Collection */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              Raw Collection Data (5 Documents)
            </h5>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {sampleCollection.map(item => {
              const isMatch = selectedPreset.filterFn(item);
              return (
                <div key={item._id} className={`p-2.5 rounded-lg border font-mono text-xs transition-all ${
                  isMatch ? 'bg-blue-950/30 border-blue-500/40 text-blue-200' : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                }`}>
                  <div className="flex justify-between">
                    <span>"{item.name}"</span>
                    <span className="text-[11px] font-bold">Marks: {item.marks} | {item.dept}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    City: {item.city} | Passed: {String(item.passed)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Output Results */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Query Result Set ({results.length} Returned)
            </h5>
            <span className="text-[10px] text-emerald-400 font-mono">Projection Applied</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto">
            <pre className="text-emerald-300">{JSON.stringify(results, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
