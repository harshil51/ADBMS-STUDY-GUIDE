import React, { useState } from 'react';
import { Network, ArrowRight, Play, Terminal, Sparkles, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export default function Simulator2_3() {
  const [departments, setDepartments] = useState([
    { oid: 'oid#901', deptId: 10, deptName: 'IT & AI Research', budget: '₹50,00,000', location: 'Block A' },
    { oid: 'oid#902', deptId: 20, deptName: 'Computer Engineering', budget: '₹40,00,000', location: 'Block B' }
  ]);

  const [employees, setEmployees] = useState([
    { oid: 'oid#101', empId: 1, name: 'Harshil Bhagora', salary: '₹95,000', deptRef: 'oid#901' },
    { oid: 'oid#102', empId: 2, name: 'Priya Sharma', salary: '₹88,000', deptRef: 'oid#901' },
    { oid: 'oid#103', empId: 3, name: 'Rohan Joshi', salary: '₹75,000', deptRef: 'oid#902' }
  ]);

  const [selectedEmpOid, setSelectedEmpOid] = useState('oid#101');
  const [derefField, setDerefField] = useState('dept_name');
  const [danglingDemo, setDanglingDemo] = useState(false);

  const activeEmp = employees.find(e => e.oid === selectedEmpOid) || employees[0];
  const targetDept = danglingDemo ? null : departments.find(d => d.oid === activeEmp.deptRef);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            Object Identity (OID) &amp; REF Pointer Dereferencing ({'->'})
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate immutable system-generated OIDs and instant object pointer traversal without relational join overhead
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
          `REF(DepartmentType) SCOPE Department`
        </div>
      </div>

      {/* SQL DDL Definition preview */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">Schema DDL: Typed Tables & Scoped References</span>
          <span className="text-[10px] font-mono text-emerald-400">OID Handle & Pointer Schema</span>
        </div>
        <pre className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800/80">
{`CREATE TYPE DeptType AS (deptId INT, deptName VARCHAR(30), budget VARCHAR(20)) FINAL;
CREATE TABLE Department OF DeptType (deptId WITH USER SPECIFIED) REF IS oid SYSTEM GENERATED;

CREATE TYPE EmpType AS (empId INT, name VARCHAR(30), salary VARCHAR(20), dept REF(DeptType) SCOPE Department);
CREATE TABLE Employee OF EmpType;`}
        </pre>
      </div>

      {/* Interactive Visual Memory Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Employee Typed Table (Holding REF) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              Employee Typed Table (Sources)
            </h5>
            <span className="text-[10px] font-mono text-slate-400">Click a tuple to dereference</span>
          </div>

          <div className="space-y-2.5">
            {employees.map(emp => {
              const isSelected = emp.oid === selectedEmpOid;
              return (
                <div
                  key={emp.oid}
                  onClick={() => { setSelectedEmpOid(emp.oid); setDanglingDemo(false); }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer font-mono text-xs ${
                    isSelected
                      ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/20 ring-1 ring-blue-500'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                      OID: {emp.oid}
                    </span>
                    <span className="text-slate-400 text-[10px]">{emp.salary}</span>
                  </div>

                  <div className="text-white font-bold text-sm">
                    {emp.name} <span className="text-xs font-normal text-slate-400">(Emp #{emp.empId})</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Pointer: `e.dept`</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                      {emp.deptRef} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Department Typed Table (Target Memory Node) */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-emerald-400" />
              Department Typed Table (Targets)
            </h5>
            <span className="text-[10px] font-mono text-emerald-400">Target Object Heap</span>
          </div>

          <div className="space-y-2.5">
            {departments.map(dept => {
              const isPointedTo = !danglingDemo && activeEmp.deptRef === dept.oid;
              return (
                <div
                  key={dept.oid}
                  className={`p-3 rounded-xl border transition-all font-mono text-xs ${
                    isPointedTo
                      ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/50 shadow-lg'
                      : 'bg-slate-900 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      Target OID: {dept.oid}
                    </span>
                    {isPointedTo && (
                      <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.2 rounded font-bold">
                        ACTIVE DEREFERENCE TARGET
                      </span>
                    )}
                  </div>

                  <div className="text-white font-bold text-sm">
                    {dept.deptName} <span className="text-xs font-normal text-slate-400">(Dept #{dept.deptId})</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Budget: <strong className="text-emerald-400">{dept.budget}</strong></span>
                    <span>Location: <strong className="text-slate-200">{dept.location}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dangling Pointer Simulation Button */}
          <div className="pt-2">
            <button
              onClick={() => setDanglingDemo(!danglingDemo)}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                danglingDemo
                  ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>{danglingDemo ? "Restore Referenced Target" : "Simulate Dangling Reference (Drop Department)"}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Dereferencing Live Query & Result */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Dereferencing Execution via ({'->'}) Operator
          </span>
          <span className="text-xs font-mono text-purple-400">
            Selected: {activeEmp.name} ({activeEmp.oid})
          </span>
        </div>

        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-400 text-[11px]">SQL Query with Dereferencing Arrow Operator:</div>
          <div className="text-emerald-400 font-bold">
            SELECT e.name, e.dept-&gt;{derefField} FROM Employee e WHERE e.oid = '{activeEmp.oid}';
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Evaluated Result Value:</div>
          {danglingDemo ? (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300">
              ⚠️ <strong>Dangling Reference Error / NULL:</strong> The referenced Department object ({activeEmp.deptRef}) does not exist in memory. Direct pointer dereferencing safely evaluated to <code>NULL</code>.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">e.name:</span>
                <span className="text-white font-bold text-sm">{activeEmp.name}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">e.dept-&gt;deptName:</span>
                <span className="text-emerald-400 font-bold text-sm">{targetDept?.deptName}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">e.dept-&gt;budget:</span>
                <span className="text-blue-400 font-bold text-sm">{targetDept?.budget}</span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
