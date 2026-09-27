# ⚛️ ADBMS Study App (Frontend)

Interactive study guide and learning suite built with **React 19**, **Vite**, and **Tailwind CSS**.

## 🚀 Getting Started

### Development Server
```bash
npm install
npm run dev
```
Navigate to `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

## 📁 Architecture
- `src/components/sections/`: 13 modular pedagogical learning sections (`SectionOverview`, `SectionBeginnerIntro`, `SectionAnalogies`, `SectionDetailedExplanation`, `SectionStepByStep`, `SectionTables`, `SectionTerms`, `SectionExamples`, `SectionAdvantagesLimitations`, `SectionApplications`, `SectionKeyPoints`).
- `src/components/simulators/`: 21 full-featured interactive simulators covering Modules 1 through 5.
- `src/data/`: Auto-generated datasets (`courseData.js`, `quizData.js`, `flashcardData.js`, `formulaData.js`, `tableData.js`).
- `src/components/`: Modals for Practice Exams, Flashcards, Formula Cheat Sheets, Notes & Bookmarks, Appearance, and Command-K Global Search.
