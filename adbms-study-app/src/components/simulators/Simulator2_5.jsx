import React, { useState } from 'react';
import { Database, Filter, Play, Terminal, Sparkles, CheckCircle2, ChevronRight, Layers, Shuffle, Code2 } from 'lucide-react';

export default function Simulator2_5() {
  const [activeTab, setActiveTab] = useState('joins'); // 'joins' | 'nested' | 'udf'
  const [joinType, setJoinType] = useState('INNER'); // 'INNER' | 'LEFT' | 'RIGHT' | 'FULL' | 'CROSS'
  const [subqueryStep, setSubqueryStep] = useState(0); // 0: Init, 1: Subquery Evaluated, 2: Final Results
  const [udfDaysLate, setUdfDaysLate] = useState(5);

  const students = [
    { rollNo: 101, name: 'Harshil Bhagora', deptId: 1, marks: 94 },
    { rollNo: 102, name: 'Priya Sharma', deptId: 2, marks: 88 },
    { rollNo: 103, name: 'Amit Patel', deptId: 1, marks: 76 },
    { rollNo: 104, name: 'Neha Joshi', deptId: null, marks: 82 } // Unmatched Dept
  ];

  const departments = [
    { deptId: 1, deptName: 'IT & AI' },
    { deptId: 2, deptName: 'Computer Engg' },
    { deptId: 3, deptName: 'Data Science' } // Unmatched Student
  ];

  const getJoinResults = () => {
    switch (joinType) {
      case 'INNER':
        return [
          { rollNo: 101, name: 'Harshil Bhagora', marks: 94, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 102, name: 'Priya Sharma', marks: 88, deptId: 2, deptName: 'Computer Engg', status: 'match' },
          { rollNo: 103, name: 'Amit Patel', marks: 76, deptId: 1, deptName: 'IT & AI', status: 'match' }
        ];
      case 'LEFT':
        return [
          { rollNo: 101, name: 'Harshil Bhagora', marks: 94, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 102, name: 'Priya Sharma', marks: 88, deptId: 2, deptName: 'Computer Engg', status: 'match' },
          { rollNo: 103, name: 'Amit Patel', marks: 76, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 104, name: 'Neha Joshi', marks: 82, deptId: 'NULL', deptName: 'NULL (Unmatched)', status: 'left-only' }
        ];
      case 'RIGHT':
        return [
          { rollNo: 101, name: 'Harshil Bhagora', marks: 94, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 103, name: 'Amit Patel', marks: 76, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 102, name: 'Priya Sharma', marks: 88, deptId: 2, deptName: 'Computer Engg', status: 'match' },
          { rollNo: 'NULL', name: 'NULL (Unmatched)', marks: 'NULL', deptId: 3, deptName: 'Data Science', status: 'right-only' }
        ];
      case 'FULL':
        return [
          { rollNo: 101, name: 'Harshil Bhagora', marks: 94, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 102, name: 'Priya Sharma', marks: 88, deptId: 2, deptName: 'Computer Engg', status: 'match' },
          { rollNo: 103, name: 'Amit Patel', marks: 76, deptId: 1, deptName: 'IT & AI', status: 'match' },
          { rollNo: 104, name: 'Neha Joshi', marks: 82, deptId: 'NULL', deptName: 'NULL', status: 'left-only' },
          { rollNo: 'NULL', name: 'NULL', marks: 'NULL', deptId: 3, deptName: 'Data Science', status: 'right-only' }
        ];
      case 'CROSS':
        const cartesian = [];
        students.forEach(s => {
          departments.forEach(d => {
            cartesian.push({
              rollNo: s.rollNo,
              name: s.name,
              marks: s.marks,
              deptId: d.deptId,
              deptName: d.deptName,
              status: 'cross'
            });
          });
        });
        return cartesian;
      default:
        return [];
    }
  };

  const avgMarks = (students.reduce((acc, s) => acc + s.marks, 0) / students.length).toFixed(1);
  const aboveAvgStudents = students.filter(s => s.marks > avgMarks);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-emerald-400" />
            SQL Joins, Nested Queries & UDF Execution Lab
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate relational Join algebra (INNER, OUTER, CROSS), step through correlated & nested subqueries, and invoke User-Defined Functions
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('joins')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'joins' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Joins Visualizer
          </button>
          <button
            onClick={() => setActiveTab('nested')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'nested' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Nested Query Stepper
          </button>
          <button
            onClick={() => setActiveTab('udf')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'udf' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            User-Defined Functions (UDF)
          </button>
        </div>
      </div>

      {/* TAB 1: JOINS VISUALIZER */}
      {activeTab === 'joins' && (
        <div className="space-y-6">
          
          {/* Join Controls & Venn Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex flex-wrap gap-2">
              {['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS'].map(jt => (
                <button
                  key={jt}
                  onClick={() => setJoinType(jt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    joinType === jt
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {jt} JOIN
                </button>
              ))}
            </div>

            <div className="font-mono text-xs text-emerald-400">
              {joinType === 'CROSS' ? 'Cartesian Product (N × M = 12 tuples)' : `${getJoinResults().length} tuple(s) in result set`}
            </div>
          </div>

          {/* Source Tables Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-blue-400 font-bold block mb-2">Table A: Student (4 rows)</span>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div>• [101] Harshil (Dept: 1)</div>
                <div>• [102] Priya (Dept: 2)</div>
                <div>• [103] Amit (Dept: 1)</div>
                <div className="text-amber-400">• [104] Neha (Dept: NULL) ← Unmatched Left</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-2">Table B: Department (3 rows)</span>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div>• [Dept: 1] IT & AI</div>
                <div>• [Dept: 2] Computer Engg</div>
                <div className="text-amber-400">• [Dept: 3] Data Science ← Unmatched Right</div>
              </div>
            </div>
          </div>

          {/* Generated SQL & Result Table */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400 border border-slate-800">
              {joinType === 'CROSS'
                ? 'SELECT S.RollNo, S.Name, D.DeptName FROM Student S CROSS JOIN Department D;'
                : `SELECT S.RollNo, S.Name, S.Marks, D.DeptName FROM Student S ${joinType} JOIN Department D ON S.DeptId = D.DeptId;`
              }
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">S.RollNo</th>
                    <th className="p-2.5">S.Name</th>
                    <th className="p-2.5">S.Marks</th>
                    <th className="p-2.5">D.DeptId</th>
                    <th className="p-2.5">D.DeptName</th>
                    <th className="p-2.5">Match Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                  {getJoinResults().map((r, idx) => {
                    let badgeClass = 'bg-emerald-500/10 text-emerald-400';
                    let label = 'MATCH';
                    if (r.status === 'left-only') {
                      badgeClass = 'bg-blue-500/20 text-blue-300';
                      label = 'LEFT UNMATCHED';
                    } else if (r.status === 'right-only') {
                      badgeClass = 'bg-purple-500/20 text-purple-300';
                      label = 'RIGHT UNMATCHED';
                    } else if (r.status === 'cross') {
                      badgeClass = 'bg-slate-800 text-slate-400';
                      label = 'CARTESIAN';
                    }
                    return (
                      <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-2.5 text-blue-300">{r.rollNo}</td>
                        <td className="p-2.5 text-white font-semibold">{r.name}</td>
                        <td className="p-2.5 text-slate-300">{r.marks}</td>
                        <td className="p-2.5 text-purple-300">{r.deptId}</td>
                        <td className="p-2.5 text-emerald-300">{r.deptName}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}`}>
                            {label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: NESTED SUBQUERY STEPPER */}
      {activeTab === 'nested' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
          <div>
            <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Nested Subquery Execution Lifecycle
            </h5>
            <p className="text-[11px] text-slate-400">
              Inner queries execute first to compute intermediate filter predicates before outer SELECT runs.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 leading-relaxed">
{`SELECT Name, Marks FROM Student 
WHERE Marks > (SELECT AVG(Marks) FROM Student);`}
          </div>

          {/* Stepper Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 0, title: 'Step 1: Parse Query', desc: 'Identify inner subquery' },
              { step: 1, title: 'Step 2: Evaluate Inner Query', desc: 'Compute AVG(Marks) = 85.0' },
              { step: 2, title: 'Step 3: Execute Outer Query', desc: 'Filter Marks > 85.0' }
            ].map(s => (
              <button
                key={s.step}
                onClick={() => setSubqueryStep(s.step)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  subqueryStep === s.step
                    ? 'bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold text-xs text-white">{s.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Subquery Visual Box */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            {subqueryStep === 0 && (
              <div className="text-slate-300">
                ⚡ The query engine pauses outer query execution and isolates <code>(SELECT AVG(Marks) FROM Student)</code>.
              </div>
            )}
            {subqueryStep === 1 && (
              <div className="space-y-2">
                <div className="text-emerald-400 font-bold">
                  Inner Query Evaluation: <code>AVG(94, 88, 76, 82) = {avgMarks}</code>
                </div>
                <div className="text-slate-400 text-[11px]">
                  The outer query is rewritten as: <code>SELECT Name, Marks FROM Student WHERE Marks &gt; {avgMarks};</code>
                </div>
              </div>
            )}
            {subqueryStep === 2 && (
              <div className="space-y-2">
                <div className="text-emerald-400 font-bold">
                  Final Output Result ({aboveAvgStudents.length} Students Above Class Average):
                </div>
                <div className="space-y-1">
                  {aboveAvgStudents.map(s => (
                    <div key={s.rollNo} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-white font-bold">{s.name}</span>
                      <span className="text-emerald-400">{s.marks} Marks (&gt; {avgMarks})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: USER-DEFINED FUNCTIONS (UDF) */}
      {activeTab === 'udf' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div>
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Scalar User-Defined Function (UDF) Simulator
            </h5>
            <p className="text-[11px] text-slate-400">
              Encapsulate business logic into reusable SQL functions invoked in SELECT or WHERE clauses.
            </p>
          </div>

          <pre className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE FUNCTION CalculateLateFee(daysLate INT) 
RETURNS DECIMAL(10,2)
BEGIN
    RETURN daysLate * 15.50; -- ₹15.50 per day late penalty
END;

-- Invoking UDF directly in SELECT query:
SELECT BookId, StudentRollNo, CalculateLateFee(DaysOverdue) AS TotalFee FROM LibraryLoans;`}
          </pre>

          {/* Interactive Calculator */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <label className="text-xs text-slate-300 block font-semibold">
              Test UDF Parameter (`daysLate`):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="30"
                value={udfDaysLate}
                onChange={e => setUdfDaysLate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <span className="font-mono text-sm font-bold text-emerald-400 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg min-w-[70px] text-center">
                {udfDaysLate} Days
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">`CalculateLateFee({udfDaysLate})` Output:</span>
              <span className="text-base font-bold text-emerald-300">
                ₹{(udfDaysLate * 15.50).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
