import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroLanding from './components/HeroLanding';
import TopicView from './components/TopicView';
import SearchModal from './components/SearchModal';
import FlashcardsDeckModal from './components/FlashcardsDeckModal';
import PracticeExamModal from './components/PracticeExamModal';
import FormulaCheatSheetModal from './components/FormulaCheatSheetModal';
import NotesAndBookmarksModal from './components/NotesAndBookmarksModal';
import AppearanceModal from './components/AppearanceModal';
import Footer from './components/Footer';
import { TOPICS_DATA } from './data/courseData';

export default function App() {
  // Appearance & Theme State (8 Presets)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('adbms_theme') || 'midnight';
  });

  // Font Size Scaling: 'compact' | 'normal' | 'comfortable' | 'large'
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('adbms_font_size') || 'normal';
  });

  // Font Family: 'default' | 'tech' | 'serif' | 'mono'
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('adbms_font_family') || 'default';
  });

  // Content Width: 'focused' (850px) | 'standard' (1280px) | 'full' (100%)
  const [contentWidth, setContentWidth] = useState(() => {
    return localStorage.getItem('adbms_content_width') || 'standard';
  });

  // Reading Mode State (Focus Mode)
  const [readingMode, setReadingMode] = useState(false);

  // Navigation State
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'topic'
  const [currentTopicId, setCurrentTopicId] = useState(() => {
    return localStorage.getItem('adbms_last_topic') || '1.1';
  });

  // User Progress Persistence
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('adbms_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('adbms_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('adbms_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [flashcardsOpen, setFlashcardsOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [formulaOpen, setFormulaOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync theme, font size, and font family to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-font-family', fontFamily);

    if (theme === 'light' || theme === 'sepia') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('adbms_theme', theme);
    localStorage.setItem('adbms_font_size', fontSize);
    localStorage.setItem('adbms_font_family', fontFamily);
  }, [theme, fontSize, fontFamily]);

  // Sync content width
  useEffect(() => {
    localStorage.setItem('adbms_content_width', contentWidth);
  }, [contentWidth]);

  // Sync completed topics
  useEffect(() => {
    localStorage.setItem('adbms_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem('adbms_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync notes
  useEffect(() => {
    localStorage.setItem('adbms_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync last visited topic
  useEffect(() => {
    if (currentTopicId) {
      localStorage.setItem('adbms_last_topic', currentTopicId);
    }
  }, [currentTopicId]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (readingMode) setReadingMode(false);
        setSearchOpen(false);
        setFlashcardsOpen(false);
        setQuizOpen(false);
        setFormulaOpen(false);
        setNotesOpen(false);
        setAppearanceOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingMode]);

  // Handlers
  const handleToggleCompleted = (topicId) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleToggleBookmark = (topicId) => {
    setBookmarks(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSaveNote = (topicId, text) => {
    setNotes(prev => ({ ...prev, [topicId]: text }));
  };

  const handleSelectTopic = (topicId) => {
    setCurrentTopicId(topicId);
    setCurrentView('topic');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => {
    handleSelectTopic('1.1');
  };

  const handleContinueReading = () => {
    handleSelectTopic(currentTopicId || '1.1');
  };

  // Compute container width style
  const maxContainerWidth = readingMode 
    ? '820px' 
    : contentWidth === 'focused' 
    ? '900px' 
    : contentWidth === 'full' 
    ? '100%' 
    : '1380px';

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentTheme={theme}
        openAppearance={() => setAppearanceOpen(true)}
        darkMode={theme !== 'light' && theme !== 'sepia'}
        setDarkMode={(isDark) => setTheme(isDark ? 'midnight' : 'light')}
        readingMode={readingMode}
        setReadingMode={setReadingMode}
        openSearch={() => setSearchOpen(true)}
        openFlashcards={() => setFlashcardsOpen(true)}
        openQuiz={() => setQuizOpen(true)}
        openFormulas={() => setFormulaOpen(true)}
        openNotes={() => setNotesOpen(true)}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Main Content Area with Dynamic Max Width */}
      <div 
        className="flex-1 w-full mx-auto flex transition-all duration-300"
        style={{ maxWidth: maxContainerWidth }}
      >
        
        {/* Desktop Sidebar (Hidden when readingMode is active or when on full focused mode) */}
        {!readingMode && (
          <div className="hidden lg:block">
            <Sidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              currentTopicId={currentTopicId}
              setCurrentTopicId={setCurrentTopicId}
              completedTopics={completedTopics}
              toggleTopicCompleted={handleToggleCompleted}
              openFlashcards={() => setFlashcardsOpen(true)}
              openQuiz={() => setQuizOpen(true)}
              openFormulas={() => setFormulaOpen(true)}
              openNotes={() => setNotesOpen(true)}
            />
          </div>
        )}

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex">
            <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-slate-950 shadow-2xl overflow-y-auto">
              <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                currentTopicId={currentTopicId}
                setCurrentTopicId={setCurrentTopicId}
                completedTopics={completedTopics}
                toggleTopicCompleted={handleToggleCompleted}
                openFlashcards={() => setFlashcardsOpen(true)}
                openQuiz={() => setQuizOpen(true)}
                openFormulas={() => setFormulaOpen(true)}
                openNotes={() => setNotesOpen(true)}
                closeMobileMenu={() => setMobileMenuOpen(false)}
              />
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Center Main Stage */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 min-w-0 transition-all ${
          readingMode ? 'reading-mode-active mx-auto' : ''
        }`}>
          {currentView === 'home' ? (
            <HeroLanding
              onStartLearning={handleStartLearning}
              onContinueReading={handleContinueReading}
              lastVisitedTopicId={currentTopicId}
              completedTopics={completedTopics}
              onSelectTopic={handleSelectTopic}
            />
          ) : (
            <TopicView
              topicId={currentTopicId}
              onNavigateTopic={handleSelectTopic}
              onBackToHome={() => setCurrentView('home')}
              isCompleted={completedTopics.includes(currentTopicId)}
              onToggleCompleted={handleToggleCompleted}
              isBookmarked={bookmarks.includes(currentTopicId)}
              onToggleBookmark={handleToggleBookmark}
              onOpenConceptSpotlight={() => {}}
              notes={notes}
              onSaveNote={handleSaveNote}
            />
          )}
        </main>
      </div>

      {/* Global Footer */}
      {!readingMode && (
        <Footer
          onSelectTopic={handleSelectTopic}
          openFlashcards={() => setFlashcardsOpen(true)}
          openQuiz={() => setQuizOpen(true)}
          openFormulas={() => setFormulaOpen(true)}
          openNotes={() => setNotesOpen(true)}
        />
      )}

      {/* Modals */}
      <AppearanceModal
        isOpen={appearanceOpen}
        onClose={() => setAppearanceOpen(false)}
        currentTheme={theme}
        onSelectTheme={(t) => setTheme(t)}
        fontSize={fontSize}
        onChangeFontSize={(s) => setFontSize(s)}
        fontFamily={fontFamily}
        onChangeFontFamily={(f) => setFontFamily(f)}
        contentWidth={contentWidth}
        onChangeContentWidth={(w) => setContentWidth(w)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
      />

      <FlashcardsDeckModal
        isOpen={flashcardsOpen}
        onClose={() => setFlashcardsOpen(false)}
        onSelectTopic={handleSelectTopic}
      />

      <PracticeExamModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />

      <FormulaCheatSheetModal
        isOpen={formulaOpen}
        onClose={() => setFormulaOpen(false)}
        onSelectTopic={handleSelectTopic}
      />

      <NotesAndBookmarksModal
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        notes={notes}
        onSaveNote={handleSaveNote}
        onSelectTopic={handleSelectTopic}
      />

    </div>
  );
}
