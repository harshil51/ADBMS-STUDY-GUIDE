import React, { useState } from 'react';
import { GitBranch, Layers, Play, Terminal, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export default function Simulator2_2() {
  const [activeQueryMode, setActiveQueryMode] = useState('polymorphic'); // 'polymorphic' | 'only_super' | 'subtype_student' | 'subtype_teacher'
  const [collectionTab, setCollectionTab] = useState('array'); // 'array' | 'multiset'
  const [arrayItems, setArrayItems] = useState(['Database Systems', 'Data Mining', 'Computer Networks']);
  const [multisetItems, setMultisetItems] = useState(['Java', 'Python', 'Python', 'C++']);

  const superTableData = [
    { type: 'Person (Base)', name: 'Ramesh Patel', dob: '1980-05-12', specific: 'Address: Gandhinagar' }
  ];

  const studentSubtableData = [
    { type: 'Student (UNDER Person)', name: 'Harshil Bhagora', dob: '2004-09-20', specific: 'RollNo: 501, GPA: 9.4' },
    { type: 'Student (UNDER Person)', name: 'Pooja Mehta', dob: '2004-03-15', specific: 'RollNo: 502, GPA: 8.9' }
  ];

  const teacherSubtableData = [
    { type: 'Teacher (UNDER Person)', name: 'Dr. Suresh Joshi', dob: '1975-11-04', specific: 'EmpID: T-101, Salary: ₹1,20,000' }
  ];

  const getActiveData = () => {
    switch (activeQueryMode) {
      case 'polymorphic':
        return [...superTableData, ...studentSubtableData, ...teacherSubtableData];
      case 'only_super':
        return [...superTableData];
      case 'subtype_student':
        return [...studentSubtableData];
      case 'subtype_teacher':
        return [...teacherSubtableData];
      default:
        return superTableData;
    }
  };

  const getQuerySQL = () => {
    switch (activeQueryMode) {
      case 'polymorphic':
        return 'SELECT * FROM Person; -- Polymorphic: includes Person + Student + Teacher';
      case 'only_super':
        return 'SELECT * FROM ONLY(Person); -- Excludes subtypes, returns only direct Person tuples';
      case 'subtype_student':
        return 'SELECT * FROM Student; -- Queries Student subtable with inherited and specific attributes';
      case 'subtype_teacher':
        return 'SELECT * FROM Teacher; -- Queries Teacher subtable with inherited and specific attributes';
      default:
        return 'SELECT * FROM Person;';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            Type & Table Inheritance (`UNDER`) & Collections Lab
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Explore SQL:1999 Supertype/Subtype hierarchies, Table Polymorphism (`ONLY` keyword), and ARRAY vs MULTISET collection types
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs">
          SQL:1999 Inheritance Hierarchy
        </div>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
          Visual Type & Table Hierarchy
        </span>

        <div className="flex flex-col items-center">
          {/* Supertype Node */}
          <div className="p-3 rounded-xl bg-blue-950/60 border-2 border-blue-500 text-center w-64 shadow-lg">
            <div className="text-[10px] font-mono text-blue-300 uppercase font-bold">Supertype & Supertable</div>
            <div className="text-xs font-extrabold text-white">PersonType / Person</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              Attributes: (name, dob, address)
            </div>
          </div>

          {/* Connector Branch */}
          <div className="h-6 w-0.5 bg-slate-700 my-1 relative">
            <span className="absolute -left-16 top-0.5 text-[9px] font-mono text-indigo-400 font-bold">UNDER clause</span>
          </div>

          {/* Subtypes Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/60 text-center">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Subtype (UNDER PersonType)</div>
              <div className="text-xs font-bold text-white">StudentType / Student</div>
              <div className="text-[10px] font-mono text-slate-300 mt-1">
                + roll_no, + gpa (Inherits name, dob)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/60 text-center">
              <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">Subtype (UNDER PersonType)</div>
              <div className="text-xs font-bold text-white">TeacherType / Teacher</div>
              <div className="text-[10px] font-mono text-slate-300 mt-1">
                + emp_id, + salary (Inherits name, dob)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Table Polymorphism Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Query Mode Selectors */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-blue-400" />
            Polymorphic Query Selector
          </h5>

          <div className="space-y-2">
            <button
              onClick={() => setActiveQueryMode('polymorphic')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryMode === 'polymorphic'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-emerald-400">SELECT * FROM Person;</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Polymorphic: Returns Person + Student + Teacher</div>
            </button>

            <button
              onClick={() => setActiveQueryMode('only_super')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryMode === 'only_super'
                  ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-amber-300">SELECT * FROM ONLY(Person);</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Non-Polymorphic: ONLY direct Person records</div>
            </button>

            <button
              onClick={() => setActiveQueryMode('subtype_student')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryMode === 'subtype_student'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-emerald-300">SELECT * FROM Student;</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Target Student subtable exclusively</div>
            </button>

            <button
              onClick={() => setActiveQueryMode('subtype_teacher')}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                activeQueryMode === 'subtype_teacher'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-mono text-[11px] text-purple-300">SELECT * FROM Teacher;</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Target Teacher subtable exclusively</div>
            </button>
          </div>
        </div>

        {/* Live Query Results Table */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Polymorphic Table Query Engine Result
            </h5>
            <span className="text-[11px] font-mono text-blue-400">{getActiveData().length} row(s) returned</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
            {getQuerySQL()}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Originating Type</th>
                  <th className="p-2.5">Inherited Name</th>
                  <th className="p-2.5">Inherited DOB</th>
                  <th className="p-2.5">Subtype Specifics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                {getActiveData().map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-2.5 text-indigo-300 font-semibold">{row.type}</td>
                    <td className="p-2.5 text-white">{row.name}</td>
                    <td className="p-2.5 text-slate-400">{row.dob}</td>
                    <td className="p-2.5 text-emerald-400">{row.specific}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Part 2: ARRAY vs MULTISET Comparison Playground */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Collection Types: ARRAY vs MULTISET In Action
            </h5>
            <p className="text-[11px] text-slate-400">
              ARRAY has fixed ordering & 1-based indexing; MULTISET is an unordered bag supporting duplicates and set operations (`SET(M)`).
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setCollectionTab('array')}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                collectionTab === 'array' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ARRAY Type
            </button>
            <button
              onClick={() => setCollectionTab('multiset')}
              className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                collectionTab === 'multiset' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MULTISET Type
            </button>
          </div>
        </div>

        {collectionTab === 'array' ? (
          <div className="space-y-3">
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-blue-300 border border-slate-800">
              <code>courses VARCHAR(30) ARRAY[3] = ARRAY['Database Systems', 'Data Mining', 'Computer Networks']</code>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {arrayItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 text-center">
                  <div className="text-[10px] text-blue-400 font-bold">Index [{idx + 1}] (1-Based)</div>
                  <div className="text-white font-semibold mt-1">"{item}"</div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Operation: <code>courses[1]</code> → returns <code>'Database Systems'</code> | <code>CARDINALITY(courses)</code> → 3
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-purple-300 border border-slate-800">
              <code>skills VARCHAR(20) MULTISET = MULTISET['Java', 'Python', 'Python', 'C++']</code>
            </div>
            <div className="flex flex-wrap gap-2">
              {multisetItems.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-purple-950/50 border border-purple-500/40 text-xs font-mono text-purple-200">
                  {item}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-slate-400 font-mono space-y-1">
              <div>• Unordered collection allowing duplicates ('Python' appears twice).</div>
              <div>• <code>SET(skills)</code> → transforms multiset into strict set without duplicates: <code>{'{\'Java\', \'Python\', \'C++\'}'}</code>.</div>
              <div>• <code>UNNEST(skills)</code> → explodes multiset into individual relational rows.</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
