import React, { useState } from 'react';
import { Bookmark, Edit3, X, ArrowRight, Trash2, Download, Upload, Check } from 'lucide-react';
import { TOPICS_DATA } from '../data/courseData';

export default function NotesAndBookmarksModal({
  isOpen,
  onClose,
  bookmarks,
  onToggleBookmark,
  notes,
  onSaveNote,
  onSelectTopic
}) {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'bookmarks'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bookmarkedTopics = TOPICS_DATA.filter(t => bookmarks.includes(t.id));
  const topicsWithNotes = TOPICS_DATA.filter(t => notes[t.id] && notes[t.id].trim());

  const handleExportData = () => {
    const data = JSON.stringify({ bookmarks, notes }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adbms_study_notes_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Personal Notes & Bookmarked Topics
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Stored safely in your local browser storage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              title="Export Notes as JSON"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Notes ({topicsWithNotes.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'bookmarks'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bookmarks ({bookmarkedTopics.length})
          </button>
        </div>

        {/* Content Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'notes' ? (
            topicsWithNotes.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No personal notes created yet. Add notes at the bottom of any topic page!
              </div>
            ) : (
              topicsWithNotes.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectTopic(t.id);
                        onClose();
                      }}
                      className="font-bold text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Topic {t.id}: {t.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSaveNote(t.id, '')}
                      className="text-slate-400 hover:text-rose-500 text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">
                    {notes[t.id]}
                  </div>
                </div>
              ))
            )
          ) : (
            bookmarkedTopics.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No topics bookmarked yet. Click the Bookmark button on any topic to save it here for fast revision!
              </div>
            ) : (
              bookmarkedTopics.map(t => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-slate-400">Module {t.moduleId}</div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      Topic {t.id}: {t.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(t.id)}
                      className="p-1.5 text-amber-500 hover:text-slate-400"
                      title="Remove Bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectTopic(t.id);
                        onClose();
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Open Topic
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

      </div>
    </div>
  );
}
