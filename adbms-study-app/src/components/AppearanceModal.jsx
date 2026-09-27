import React from 'react';
import { 
  X, Palette, Check, Sparkles, Sun, Moon, Type, 
  Maximize2, Eye, Sliders, RefreshCw, Layout, Smartphone, Monitor
} from 'lucide-react';

export const THEME_PRESETS = [
  {
    id: 'midnight',
    name: 'Midnight Slate',
    category: 'Dark Mode',
    desc: 'Deep space obsidian with electric cyan & indigo accents',
    bg: '#090d16',
    card: '#131c31',
    border: '#1e293b',
    accent: '#3b82f6',
    tag: 'Popular',
    icon: Moon
  },
  {
    id: 'oled',
    name: 'Obsidian OLED',
    category: 'Dark Mode',
    desc: 'Pure pitch black #000000 with high-contrast electric glow',
    bg: '#000000',
    card: '#0c0c0e',
    border: '#27272a',
    accent: '#00f2fe',
    tag: 'Battery Saver',
    icon: Sparkles
  },
  {
    id: 'cyberpunk',
    name: 'Synthwave Cyberpunk',
    category: 'Dark Mode',
    desc: 'Futuristic neon purple, hot pink & turquoise glow',
    bg: '#0b0314',
    card: '#1c0832',
    border: '#3b1163',
    accent: '#ec4899',
    tag: 'Vibrant',
    icon: Sparkles
  },
  {
    id: 'matrix',
    name: 'Matrix Emerald',
    category: 'Dark Mode',
    desc: 'Hacker terminal forest night with radiant mint glow',
    bg: '#020f09',
    card: '#082216',
    border: '#0d3d25',
    accent: '#10b981',
    tag: 'Code Vibe',
    icon: Sparkles
  },
  {
    id: 'nordic',
    name: 'Nordic Arctic Frost',
    category: 'Dark Mode',
    desc: 'Icy polar deep navy with crisp sky blue & teal',
    bg: '#0a111e',
    card: '#14233a',
    border: '#1e3656',
    accent: '#38bdf8',
    tag: 'Clean Dark',
    icon: Moon
  },
  {
    id: 'sunset',
    name: 'Royal Amethyst Dusk',
    category: 'Dark Mode',
    desc: 'Rich royal purple dusk with rose gold highlights',
    bg: '#12091c',
    card: '#251438',
    border: '#422460',
    accent: '#a855f7',
    tag: 'Warm Dark',
    icon: Sparkles
  },
  {
    id: 'sepia',
    name: 'Warm Coffee & Sepia',
    category: 'Warm Light',
    desc: 'Warm paper textbook tone, soft amber, reduces eye fatigue',
    bg: '#fbf7ee',
    card: '#ffffff',
    border: '#ded0b8',
    accent: '#d97706',
    tag: 'Reader Mode',
    icon: Eye
  },
  {
    id: 'light',
    name: 'Clean Apple Porcelain',
    category: 'Light Mode',
    desc: 'Crisp minimal white with subtle frosted glass and azure blue',
    bg: '#f8fafc',
    card: '#ffffff',
    border: '#e2e8f0',
    accent: '#2563eb',
    tag: 'Minimalist',
    icon: Sun
  }
];

export default function AppearanceModal({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  fontSize,
  onChangeFontSize,
  fontFamily,
  onChangeFontFamily,
  contentWidth,
  onChangeContentWidth
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Appearance & Visual Theme
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize colors, reader typography, font scaling, and reading ambiance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: THEME PRESETS GRID */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Theme Presets (8 Aesthetic Palettes)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Live Instant Preview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {THEME_PRESETS.map((t) => {
              const isSelected = currentTheme === t.id;
              const Icon = t.icon;

              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTheme(t.id)}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group overflow-hidden ${
                    isSelected
                      ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                  style={{ backgroundColor: t.bg }}
                >
                  {/* Miniature Mockup Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: t.accent }}
                        >
                          <Icon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span 
                          className="text-xs font-bold truncate"
                          style={{ color: t.id === 'light' || t.id === 'sepia' ? '#0f172a' : '#ffffff' }}
                        >
                          {t.name}
                        </span>
                      </div>

                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <span 
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full border opacity-70"
                          style={{ 
                            color: t.accent, 
                            borderColor: `${t.accent}40`,
                            backgroundColor: `${t.accent}15`
                          }}
                        >
                          {t.tag}
                        </span>
                      )}
                    </div>

                    {/* Miniature UI Card Preview */}
                    <div 
                      className="p-2 rounded-xl border space-y-1.5"
                      style={{ backgroundColor: t.card, borderColor: t.border }}
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
                        <div 
                          className="h-1.5 rounded-full w-12"
                          style={{ backgroundColor: t.id === 'light' || t.id === 'sepia' ? '#cbd5e1' : '#334155' }}
                        />
                      </div>
                      <div 
                        className="h-1 rounded-full w-full"
                        style={{ backgroundColor: t.id === 'light' || t.id === 'sepia' ? '#e2e8f0' : '#1e293b' }}
                      />
                      <div 
                        className="h-1 rounded-full w-4/5"
                        style={{ backgroundColor: t.id === 'light' || t.id === 'sepia' ? '#e2e8f0' : '#1e293b' }}
                      />
                    </div>
                  </div>

                  <p 
                    className="text-[10px] mt-2.5 leading-tight opacity-75 line-clamp-2 font-sans"
                    style={{ color: t.id === 'light' || t.id === 'sepia' ? '#475569' : '#94a3b8' }}
                  >
                    {t.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: TYPOGRAPHY & FONT SCALING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          
          {/* Font Scaling */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-blue-500" />
              Textbook Font Size Scaling
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              {[
                { id: 'compact', label: 'Compact', size: '88%' },
                { id: 'normal', label: 'Normal', size: '100%' },
                { id: 'comfortable', label: 'Relaxed', size: '112%' },
                { id: 'large', label: 'Large', size: '125%' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => onChangeFontSize(f.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                    fontSize === f.id
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div>{f.label}</div>
                  <div className="text-[10px] opacity-60 font-mono">{f.size}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Typography Family */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              Font Family Aesthetic
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              {[
                { id: 'default', label: 'Modern Sans', font: 'Outfit / Inter' },
                { id: 'tech', label: 'Clean Tech', font: 'Plus Jakarta' },
                { id: 'serif', label: 'Book Serif', font: 'Georgia / Textbook' },
                { id: 'mono', label: 'Dev Mono', font: 'JetBrains Code' }
              ].map((ff) => (
                <button
                  key={ff.id}
                  onClick={() => onChangeFontFamily(ff.id)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                    fontFamily === ff.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div>{ff.label}</div>
                  <div className="text-[10px] opacity-60 font-mono truncate">{ff.font}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: READING WIDTH */}
        <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-emerald-500" />
            Reading Layout Width
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'focused', label: 'Focused Reading (850px)', desc: 'Ideal for reading text without eye wandering' },
              { id: 'standard', label: 'Standard Canvas (1280px)', desc: 'Balanced layout with comfortable margins' },
              { id: 'full', label: 'Wide Screen (Full Width)', desc: 'Maximized for wide monitors & data tables' }
            ].map((w) => (
              <button
                key={w.id}
                onClick={() => onChangeContentWidth(w.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  contentWidth === w.id
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs">{w.label}</div>
                <div className="text-[10px] opacity-70 font-normal mt-0.5">{w.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <button
            onClick={() => {
              onSelectTheme('midnight');
              onChangeFontSize('normal');
              onChangeFontFamily('default');
              onChangeContentWidth('standard');
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default Theme</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
