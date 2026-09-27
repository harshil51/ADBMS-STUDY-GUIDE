import React from 'react';
import { Briefcase, Building2, Smartphone, Globe, Code2 } from 'lucide-react';

export default function SectionApplications({ applications }) {
  if (!applications || applications.length === 0) return null;

  const rawList = Array.isArray(applications) ? applications : [applications];

  const parsedApps = rawList.map((app, idx) => {
    if (typeof app === 'string') {
      const clean = app.replace(/^[•*\-\s]+/, '').trim();
      const firstColon = clean.indexOf(':');
      if (firstColon > 0 && firstColon < 35) {
        return {
          category: clean.slice(0, firstColon).trim(),
          details: clean.slice(firstColon + 1).trim()
        };
      }
      return {
        category: `Domain #${idx + 1}`,
        details: clean
      };
    }
    return {
      category: app.category || app.name || `Application #${idx + 1}`,
      details: app.details || app.description || ''
    };
  });

  const getCategoryIcon = (cat) => {
    const c = (cat || '').toString().toLowerCase();
    if (c.includes('industry') || c.includes('business')) return Briefcase;
    if (c.includes('companies') || c.includes('enterprise') || c.includes('bank')) return Building2;
    if (c.includes('mobile') || c.includes('app')) return Smartphone;
    if (c.includes('web') || c.includes('software') || c.includes('system')) return Code2;
    return Globe;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Briefcase className="w-4 h-4 text-purple-500" />
          <span>Section 12: Real-World Industry Applications ({parsedApps.length})</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
          Production Deployments
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {parsedApps.map((app, idx) => {
          const IconComp = getCategoryIcon(app.category);

          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {app.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {app.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
