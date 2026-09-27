import React, { useState } from 'react';
import { Database, Plus, Trash2, Edit3, Search, Terminal, CheckCircle2 } from 'lucide-react';

export default function Simulator3_3() {
  const initialDocs = [
    { _id: "6640a1", name: "Alice Patel", dept: "IT", sem: 5, cgpa: 9.2, active: true },
    { _id: "6640a2", name: "Rahul Sharma", dept: "CE", sem: 5, cgpa: 8.7, active: true },
    { _id: "6640a3", name: "Pooja Mehta", dept: "IT", sem: 5, cgpa: 9.5, active: false }
  ];

  const [docs, setDocs] = useState(initialDocs);
  const [selectedOp, setSelectedOp] = useState('find');
  const [commandLog, setCommandLog] = useState(['db.students.find() executed. Returned 3 documents.']);
  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState('IT');

  const handleInsert = (e) => {
    e.preventDefault();
    if (!newName) return;
    const newDoc = {
      _id: "6640a" + (docs.length + 1),
      name: newName,
      dept: newDept,
      sem: 5,
      cgpa: 8.5,
      active: true
    };
    setDocs([...docs, newDoc]);
    setCommandLog([
      `db.students.insertOne({ name: "${newName}", dept: "${newDept}", sem: 5, cgpa: 8.5, active: true })`,
      ...commandLog
    ]);
    setNewName('');
  };

  const handleDelete = (id, name) => {
    setDocs(docs.filter(d => d._id !== id));
    setCommandLog([
      `db.students.deleteOne({ _id: ObjectId("${id}") }) // Deleted ${name}`,
      ...commandLog
    ]);
  };

  const handleUpdate = (id) => {
    setDocs(docs.map(d => d._id === id ? { ...d, cgpa: Number((d.cgpa + 0.1).toFixed(2)) } : d));
    setCommandLog([
      `db.students.updateOne({ _id: ObjectId("${id}") }, { $inc: { cgpa: 0.1 } })`,
      ...commandLog
    ]);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Database className="w-5 h-5" />
            MongoDB Shell & CRUD Playground
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Execute real MongoDB operations (`insertOne`, `find`, `updateOne`, `deleteOne`) in real-time
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>db: <span className="text-emerald-300 font-bold">gtu_university</span></span>
          <span className="text-slate-600">|</span>
          <span>coll: <span className="text-blue-300 font-bold">students</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Insert Control */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            Insert New Document
          </h5>

          <form onSubmit={handleInsert} className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Student Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g., Harshit Dave"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Department</label>
              <select
                value={newDept}
                onChange={e => setNewDept(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="IT">IT (Information Tech)</option>
                <option value="CE">CE (Computer Engg)</option>
                <option value="AI-DS">AI-DS (Data Science)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Execute db.students.insertOne()
            </button>
          </form>
        </div>

        {/* Collection Documents Grid */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Collection View ({docs.length} Documents)
            </h5>
            <span className="text-[10px] text-slate-400 font-mono">BSON Document Representation</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {docs.map(doc => (
              <div key={doc._id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="text-slate-400 text-[10px]">
                    _id: <span className="text-amber-400 font-bold">{doc._id}</span>
                  </div>
                  <div className="text-white font-semibold">
                    "{doc.name}" <span className="text-blue-400 font-normal">({doc.dept})</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    CGPA: <span className="text-emerald-400 font-bold">{doc.cgpa}</span> | Sem: {doc.sem} | Active: <span className={doc.active ? 'text-emerald-400' : 'text-slate-500'}>{String(doc.active)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdate(doc._id)}
                    title="Increment CGPA by +0.1"
                    className="p-1.5 rounded bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-[11px] cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc._id, doc.name)}
                    title="Delete document"
                    className="p-1.5 rounded bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[11px] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Command Log */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
        <div className="text-slate-500 text-[10px] uppercase font-bold mb-1 flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-emerald-400" />
          MongoDB Shell Execution Stream
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {commandLog.map((log, i) => (
            <div key={i} className="text-emerald-400 flex items-start gap-1.5">
              <span className="text-slate-600">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
