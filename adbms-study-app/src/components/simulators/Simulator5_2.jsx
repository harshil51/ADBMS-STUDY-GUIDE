import React, { useState } from 'react';
import { BarChart3, Database, Layers, ArrowRight, RefreshCw, Box, MoveRight } from 'lucide-react';

export default function Simulator5_2() {
  const [activeTab, setActiveTab] = useState('olap'); // 'olap' or 'etl'
  const [olapOp, setOlapOp] = useState('slice'); // 'slice', 'dice', 'rollup', 'drilldown'

  const olapOps = {
    slice: {
      name: "Slice Operation",
      desc: "Performs a selection on ONE dimension of the OLAP cube, resulting in a 2D sub-cube (e.g., Time = 'Q1 2026').",
      result: "Filters entire sales cube to only show transactions in Quarter 1 across all products and cities."
    },
    dice: {
      name: "Dice Operation",
      desc: "Defines a sub-cube by performing a selection on TWO or MORE dimensions simultaneously.",
      result: "Filters (Time = 'Q1' or 'Q2') AND (Location = 'Ahmedabad' or 'Mumbai') AND (Item = 'Laptops')."
    },
    rollup: {
      name: "Roll-up (Drill-Up)",
      desc: "Aggregates data by climbing up the concept hierarchy (e.g., City → State → Country, or Day → Month → Year).",
      result: "Consolidates individual city sales into overall State and National revenue totals."
    },
    drilldown: {
      name: "Drill-Down",
      desc: "Navigates from less detailed data to more granular detailed data (e.g., Country → State → City).",
      result: "Expands annual company sales into quarterly, monthly, and branch-level performance."
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Business Intelligence: ETL Pipeline & OLAP Operations
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate ETL data flows and multidimensional OLAP Cube analytical transformations
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('olap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'olap' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            OLAP Cube Explorer
          </button>
          <button
            onClick={() => setActiveTab('etl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'etl' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            ETL Architecture
          </button>
        </div>
      </div>

      {activeTab === 'olap' ? (
        <div>
          {/* OLAP Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {Object.keys(olapOps).map(key => (
              <button
                key={key}
                onClick={() => setOlapOp(key)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  olapOp === key
                    ? 'border-blue-500 bg-blue-950/40 text-white shadow-md shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold capitalize">{key}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{olapOps[key].name}</div>
              </button>
            ))}
          </div>

          {/* Operation Preview Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-4 h-4 text-blue-400" />
              <h5 className="font-bold text-sm text-slate-200">{olapOps[olapOp].name}</h5>
            </div>
            <p className="text-xs text-slate-300 mb-3">{olapOps[olapOp].desc}</p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
              <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold mb-1">Execution Effect</span>
              {olapOps[olapOp].result}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            The 3 Stages of the ETL Pipeline
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-blue-400 mb-1">1. Extract (E)</div>
              <p className="text-[11px] text-slate-300">
                Pulls raw transaction records from diverse sources (OLTP relational databases, ERPs, CRM APIs, web logs).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-purple-400 mb-1">2. Transform (T)</div>
              <p className="text-[11px] text-slate-300">
                Cleans dirty data, eliminates duplicates, converts currencies/units, conforms schemas, and applies business rules.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 mb-1">3. Load (L)</div>
              <p className="text-[11px] text-slate-300">
                Loads conformed dimensions and facts into the enterprise Data Warehouse / Data Marts for fast OLAP querying.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
