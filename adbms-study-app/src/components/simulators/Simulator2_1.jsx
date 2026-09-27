import React, { useState } from 'react';
import { Layers, Sparkles, Terminal, Code2, Play, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Simulator2_1() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: { first: 'Harshil', last: 'Bhagora' },
      address: { street: 'SG Highway', city: 'Ahmedabad', pincode: '380015' },
      phones: ['+91-9876543210', '+91-9123456780'],
      birthYear: 2004,
      calcAge() { return 2026 - this.birthYear; }
    },
    {
      id: 2,
      name: { first: 'Priya', last: 'Sharma' },
      address: { street: 'Ring Road', city: 'Surat', pincode: '395001' },
      phones: ['+91-9898989898'],
      birthYear: 2003,
      calcAge() { return 2026 - this.birthYear; }
    },
    {
      id: 3,
      name: { first: 'Amit', last: 'Patel' },
      address: { street: 'CG Road', city: 'Ahmedabad', pincode: '380009' },
      phones: ['+91-9777777777', '+91-9666666666'],
      birthYear: 2002,
      calcAge() { return 2026 - this.birthYear; }
    }
  ]);

  const [activeQueryPreset, setActiveQueryPreset] = useState('dot_address');
  const [customDotPath, setCustomDotPath] = useState('p.address.city');
  const [filterCity, setFilterCity] = useState('Ahmedabad');
  const [log, setLog] = useState([
    'ORDBMS Schema initialized: Type AddressType, NameType, and Table Person created.',
    'Dot-notation query executed: SELECT p.name.first, p.address.city FROM Person p'
  ]);

  const runQuery = (preset) => {
    setActiveQueryPreset(preset);
    if (preset === 'dot_address') {
      setLog(prev => [
        `SELECT p.name.first, p.address.city, p.address.pincode FROM Person p WHERE p.address.city = '${filterCity}'`,
        ...prev
      ]);
    } else if (preset === 'method_call') {
      setLog(prev => [
        `SELECT p.name.first, p.calcAge() AS current_age FROM Person p -- Invoking user-defined type method`,
        ...prev
      ]);
    } else if (preset === 'array_access') {
      setLog(prev => [
        `SELECT p.name.first, p.phones[1] AS primary_phone FROM Person p -- 1-based SQL:1999 Array indexing`,
        ...prev
      ]);
    }
  };

  const getFilteredResults = () => {
    if (activeQueryPreset === 'dot_address') {
      return people.filter(p => p.address.city.toLowerCase() === filterCity.toLowerCase()).map(p => ({
        "p.id": p.id,
        "p.name.first": p.name.first,
        "p.address.street": p.address.street,
        "p.address.city": p.address.city,
        "p.address.pincode": p.address.pincode
      }));
    } else if (activeQueryPreset === 'method_call') {
      return people.map(p => ({
        "p.id": p.id,
        "p.name.first": p.name.first,
        "p.birthYear": p.birthYear,
        "p.calcAge()": `${p.calcAge()} yrs (Method Evaluated)`
      }));
    } else if (activeQueryPreset === 'array_access') {
      return people.map(p => ({
        "p.id": p.id,
        "p.name.first": p.name.first,
        "p.phones[1] (Primary)": p.phones[0] || 'N/A',
        "p.phones.count": `${p.phones.length} phones`
      }));
    }
    return people;
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Complex Structured Types & Dot-Notation Explorer
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate SQL:1999 user-defined structured types (`CREATE TYPE`), nested attributes, array collections, and encapsulated methods
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs flex items-center gap-1.5">
          <Code2 className="w-4 h-4" />
          <span>ORDBMS SQL:1999 Engine</span>
        </div>
      </div>

      {/* SQL DDL Definition preview */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">Schema DDL (Object-Relational Model)</span>
          <span className="text-[10px] font-mono text-purple-400">CREATE TYPE AddressType / Person</span>
        </div>
        <pre className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800/80">
{`CREATE TYPE NameType AS (first VARCHAR(30), last VARCHAR(30)) FINAL;
CREATE TYPE AddressType AS (street VARCHAR(50), city VARCHAR(30), pincode CHAR(6)) FINAL;
CREATE TABLE Person (
    id INT PRIMARY KEY,
    name NameType,              -- Structured Complex Attribute
    address AddressType,        -- Nested Structured Attribute
    phones VARCHAR(15) ARRAY[5],-- Collection Attribute (Array)
    birthYear INT,
    METHOD calcAge() RETURNS INT
);`}
        </pre>
      </div>

      {/* Interactive Query Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Query Presets & Filters */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-blue-400" />
            Select Dot-Notation Query
          </h5>

          <div className="space-y-2">
            <button
              onClick={() => runQuery('dot_address')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryPreset === 'dot_address'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-emerald-300">p.address.city Filter</div>
              <div className="text-[10px] text-slate-400">Drill down through nested AddressType</div>
            </button>

            <button
              onClick={() => runQuery('method_call')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryPreset === 'method_call'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-purple-300">p.calcAge() Method Call</div>
              <div className="text-[10px] text-slate-400">Execute encapsulated behavioral method</div>
            </button>

            <button
              onClick={() => runQuery('array_access')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryPreset === 'array_access'
                  ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-amber-300">p.phones[1] Array Indexing</div>
              <div className="text-[10px] text-slate-400">Direct 1-based collection index access</div>
            </button>
          </div>

          {activeQueryPreset === 'dot_address' && (
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <label className="text-[11px] text-slate-400 block">Filter by City (`p.address.city`):</label>
              <select
                value={filterCity}
                onChange={e => {
                  setFilterCity(e.target.value);
                  setLog(prev => [
                    `Filter updated: WHERE p.address.city = '${e.target.value}'`,
                    ...prev
                  ]);
                }}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Surat">Surat</option>
              </select>
            </div>
          )}
        </div>

        {/* Right: Live Result Set Table */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Evaluated Query Results ({getFilteredResults().length} tuples)
            </h5>
            <span className="text-[10px] text-emerald-400 font-mono">Status: 200 OK (SQL:1999 Engine)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                <tr>
                  {Object.keys(getFilteredResults()[0] || {}).map((header, idx) => (
                    <th key={idx} className="p-2.5 font-semibold text-blue-300">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                {getFilteredResults().map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-slate-200">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Terminal Log */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
        <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-emerald-400" />
          Execution Log & Type System Trace
        </div>
        <div className="space-y-1 max-h-20 overflow-y-auto text-slate-300">
          {log.map((entry, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-emerald-400">
              <span className="text-slate-600">&gt;</span>
              <span>{entry}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
