import React, { useState, useMemo } from 'react';
import {
  Table as TableIcon,
  Search,
  Sparkles,
  Layers,
  Check,
  Copy,
  LayoutGrid,
  ListFilter,
  Columns,
  Maximize2,
  Minimize2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download
} from 'lucide-react';

export default function SectionTables({ tablesRaw, structuredTables = [] }) {
  const [activeTableIdx, setActiveTableIdx] = useState(0);
  const [filterQuery, setFilterQuery] = useState('');
  const [viewMode, setViewMode] = useState('matrix'); // 'matrix' | 'cards'
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [highlightDiffsOnly, setHighlightDiffsOnly] = useState(false);

  // If no structured tables provided, fallback gracefully to raw parsing
  const tables = useMemo(() => {
    if (structuredTables && structuredTables.length > 0) {
      return structuredTables;
    }
    if (!tablesRaw) return [];
    
    // Minimal fallback if structured data is missing
    const lines = tablesRaw.split('\n').map(l => l.trim()).filter(Boolean);
    return [{
      id: 'raw_table',
      title: 'Technical Comparative Reference',
      subtitle: 'Extracted direct tabular points from textbook',
      badge: 'Reference',
      headers: ['Item / Feature', 'Details'],
      rows: lines.map((line, idx) => ({
        feature: `Row ${idx + 1}`,
        col1: line,
        status: 'info'
      }))
    }];
  }, [structuredTables, tablesRaw]);

  if (!tables || tables.length === 0) return null;

  const currentTable = tables[activeTableIdx] || tables[0];
  const { title, subtitle, badge, headers = [], rows = [] } = currentTable;

  // Filter rows based on search
  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      if (highlightDiffsOnly && row.status !== 'better-col2' && row.status !== 'better-col1' && row.status !== 'warning') {
        // if user wants to see key differences
        return false;
      }
      if (!filterQuery) return true;
      const q = filterQuery.toLowerCase();
      return (
        (row.feature && row.feature.toLowerCase().includes(q)) ||
        (row.col1 && row.col1.toLowerCase().includes(q)) ||
        (row.col2 && row.col2.toLowerCase().includes(q)) ||
        (row.col3 && row.col3.toLowerCase().includes(q)) ||
        (row.col4 && row.col4.toLowerCase().includes(q)) ||
        (row.col5 && row.col5.toLowerCase().includes(q)) ||
        (row.verdict && row.verdict.toLowerCase().includes(q))
      );
    });
  }, [rows, filterQuery, highlightDiffsOnly]);

  const copyToClipboard = (type) => {
    let text = '';
    if (type === 'markdown') {
      text += `### ${title}\n\n`;
      text += `| ${headers.join(' | ')} |\n`;
      text += `| ${headers.map(() => '---').join(' | ')} |\n`;
      rows.forEach(r => {
        const cols = [r.feature, r.col1, r.col2, r.col3, r.col4, r.col5, r.verdict].filter(x => x !== undefined);
        text += `| ${cols.join(' | ')} |\n`;
      });
    } else if (type === 'csv') {
      text += `${headers.map(h => `"${h}"`).join(',')}\n`;
      rows.forEach(r => {
        const cols = [r.feature, r.col1, r.col2, r.col3, r.col4, r.col5, r.verdict].filter(x => x !== undefined);
        text += `${cols.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')}\n`;
      });
    }
    navigator.clipboard.writeText(text);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
            <TableIcon className="w-4 h-4" />
          </div>
          <span>Section 07: Comparative Architecture & Technical Reference Tables</span>
        </div>

        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 shadow-xs">
            <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
            {badge}
          </span>
        )}
      </div>

      {/* Main Container Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-purple-50/40 via-white/50 to-transparent dark:from-purple-950/20 dark:via-slate-900/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Table Selection Tabs (if multiple tables exist) */}
            <div className="flex flex-wrap items-center gap-2">
              {tables.map((tbl, idx) => (
                <button
                  key={tbl.id || idx}
                  onClick={() => {
                    setActiveTableIdx(idx);
                    setFilterQuery('');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTableIdx === idx
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Table {idx + 1}: {tbl.title.split(' vs')[0].split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* View Mode & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Matrix / Card View Toggle */}
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    viewMode === 'matrix'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Matrix Table View"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Matrix</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Head-to-Head Cards View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Battle Cards</span>
                </button>
              </div>

              {/* Copy Markdown Button */}
              <button
                onClick={() => copyToClipboard('markdown')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700/60 transition-all cursor-pointer"
                title="Copy Table as Markdown"
              >
                {copiedFormat === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied MD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Copy MD</span>
                  </>
                )}
              </button>

              {/* Copy CSV Button */}
              <button
                onClick={() => copyToClipboard('csv')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700/60 transition-all cursor-pointer"
                title="Copy Table as CSV"
              >
                {copiedFormat === 'csv' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied CSV!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">CSV</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title & Subtitle Banner */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Live Filter Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search comparison matrix..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
              {filterQuery && (
                <button
                  onClick={() => setFilterQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Body: Matrix Table View */}
        {viewMode === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
                  {headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className={`py-3.5 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider ${
                        hIdx === 0
                          ? 'text-slate-700 dark:text-slate-300 w-1/4 min-w-[160px]'
                          : hIdx === 1
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-500/5 border-l border-r border-blue-500/10 min-w-[200px]'
                          : hIdx === 2
                          ? 'text-purple-700 dark:text-purple-300 bg-purple-500/5 border-r border-purple-500/10 min-w-[200px]'
                          : 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/5 min-w-[180px]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {hIdx === 1 && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                        {hIdx === 2 && <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />}
                        {hIdx >= 3 && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                        <span>{header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs sm:text-sm">
                {filteredRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`transition-colors hover:bg-purple-50/30 dark:hover:bg-purple-950/10 ${
                      row.status === 'warning'
                        ? 'bg-amber-500/5'
                        : row.status === 'better-col2'
                        ? 'bg-purple-500/5'
                        : row.status === 'better-col1'
                        ? 'bg-blue-500/5'
                        : ''
                    }`}
                  >
                    {/* Feature Name Column */}
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 dark:text-white align-top">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <span>{row.feature}</span>
                      </div>
                    </td>

                    {/* Column 1 */}
                    <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 bg-blue-500/[0.02] border-l border-r border-slate-200/50 dark:border-slate-800/50 align-top leading-relaxed">
                      {renderCellContent(row.col1)}
                    </td>

                    {/* Column 2 */}
                    {headers.length > 2 && (
                      <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 bg-purple-500/[0.02] border-r border-slate-200/50 dark:border-slate-800/50 align-top leading-relaxed">
                        {renderCellContent(row.col2)}
                      </td>
                    )}

                    {/* Column 3 / Verdict */}
                    {headers.length > 3 && (
                      <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 bg-emerald-500/[0.02] align-top leading-relaxed">
                        {renderCellContent(row.col3 || row.verdict)}
                      </td>
                    )}

                    {/* Column 4 (if 5 headers) */}
                    {headers.length > 4 && (
                      <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 align-top leading-relaxed">
                        {renderCellContent(row.col4)}
                      </td>
                    )}

                    {/* Column 5 (if 6 headers) */}
                    {headers.length > 5 && (
                      <td className="py-3.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 align-top leading-relaxed">
                        {renderCellContent(row.col5)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Content Body: Head-to-Head Battle Cards View */}
        {viewMode === 'cards' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 hover:border-purple-500/40 transition-all space-y-3"
              >
                {/* Feature Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    {row.feature}
                  </span>
                  {row.status === 'better-col2' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      3-Tier / Col 2 Advantage
                    </span>
                  )}
                  {row.status === 'better-col1' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      2-Tier / Col 1 Advantage
                    </span>
                  )}
                </div>

                {/* Side-by-Side Comparison Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* Option 1 */}
                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-900/40">
                    <div className="text-[11px] font-bold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {headers[1] || 'Option A'}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {row.col1}
                    </div>
                  </div>

                  {/* Option 2 */}
                  {row.col2 && (
                    <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/40 dark:border-purple-900/40">
                      <div className="text-[11px] font-bold text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {headers[2] || 'Option B'}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {row.col2}
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Verdict or 3rd Column */}
                {(row.verdict || row.col3) && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-emerald-700 dark:text-emerald-300">Takeaway: </strong>
                      <span>{row.verdict || row.col3}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty Search Result Fallback */}
        {filteredRows.length === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <Info className="w-6 h-6 mx-auto text-slate-400" />
            <p className="text-xs font-medium">No comparison rows matched "{filterQuery}"</p>
            <button
              onClick={() => setFilterQuery('')}
              className="text-xs text-purple-600 dark:text-purple-400 underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}

        {/* Bottom Legend Bar */}
        <div className="p-3.5 sm:px-6 bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{headers[1] || 'Column 1'}</span>
            </span>
            {headers[2] && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{headers[2]}</span>
              </span>
            )}
            {headers[3] && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{headers[3]}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <span>Showing {filteredRows.length} of {rows.length} rows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to format cell text with smart badges
function renderCellContent(text) {
  if (!text) return <span className="text-slate-400 italic">—</span>;

  // Check for checkmarks or crosses
  if (text.startsWith('✅')) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/20 text-xs">
        {text}
      </span>
    );
  }
  if (text.startsWith('❌')) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold border border-rose-500/20 text-xs">
        {text}
      </span>
    );
  }
  if (text.startsWith('⚡') || text.startsWith('⚖️') || text.startsWith('🔻')) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/20 text-xs">
        {text}
      </span>
    );
  }

  // Format code ticks inside text `code`
  if (text.includes('`')) {
    const parts = text.split(/(`[^`]+`)/g);
    return (
      <span>
        {parts.map((p, idx) => {
          if (p.startsWith('`') && p.endsWith('`')) {
            return (
              <code
                key={idx}
                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-300 font-mono text-[11px] font-semibold"
              >
                {p.slice(1, -1)}
              </code>
            );
          }
          return p;
        })}
      </span>
    );
  }

  return <span>{text}</span>;
}
