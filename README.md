# ⚡ Advanced Database Management Systems (ADBMS) — Interactive Study Guide

<div align="center">

[![GTU Syllabus](https://img.shields.io/badge/GTU%20Syllabus-B.E.%20IT%20Sem%205-0066CC?style=for-the-badge&logo=googlescholar&logoColor=white)](https://www.gtu.ac.in/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math%20Formulas-3298dc?style=for-the-badge&logo=latex&logoColor=white)](https://katex.org/)
[![Simulators](https://img.shields.io/badge/Interactive%20Simulators-21%20Live-10B981?style=for-the-badge&logo=codepen&logoColor=white)](#-21-live-interactive-simulators-catalog)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

<p align="center">
  <b>A complete, textbook-accurate, highly interactive university study platform engineered for Gujarat Technological University (GTU) B.E. Information Technology (Semester 5).</b>
  <br />
  <i>Covers 100% of all 5 Modules, 21 Topics, 13 Modular Pedagogical Sections per topic, 21 Hands-on Visual Simulators, 100+ Practice MCQs, 50+ Flashcards, and KaTeX Formula Cheat Sheets.</i>
</p>

[✨ Live Demo](#-quick-start) • [📚 Syllabus & Modules](#-complete-syllabus--module-breakdown) • [🕹️ Simulators Directory](#-21-live-interactive-simulators-catalog) • [🚀 Quick Start](#-quick-start) • [📁 Project Structure](#-repository-structure)

</div>

---

## 🌟 Key Highlights & Features

### 🎓 1. 13-Section Deep Pedagogical Architecture (For Every Single Topic)
Every one of the 21 topics is structured into **13 dedicated learning sections**:
1. **Topic Overview & Metadata**: What is it, why it matters, time estimates, and one-line summaries.
2. **Beginner Friendly Intuition**: Plain-English explanations & essential vocabulary cards.
3. **Real-World Analogies**: Everyday conceptual models (e.g., restaurant kitchens, bank vaults, highway lanes).
4. **Complete Detailed Theory**: In-depth academic breakdowns, formal algorithms, and architectural schemas.
5. **Step-by-Step Walkthrough**: Phased lifecycle steppers with progress indicators.
6. **Live Interactive Simulator**: Full-screen interactive playground tailored to that specific topic.
7. **Diagrams & System Architecture**: ASCII/SVG flowcharts, data pipelines, and node topologies.
8. **Comparative Technical Matrices**: Formatted tables contrasting paradigms (e.g., 2-Tier vs 3-Tier, 2PL variants, XML vs JSON, ACID vs BASE).
9. **Important Terms Glossary**: Searchable definitions with quick-copy capabilities.
10. **Practical Code & SQL Examples**: Syntax-highlighted SQL, MongoDB MQL, XQuery, and procedural blocks.
11. **Advantages & Limitations**: Balanced pros/cons cards with visual badges.
12. **Industry Applications**: Enterprise case studies (AWS DynamoDB, Netflix, Uber, Banking SWIFT).
13. **Key Points, Misconceptions & GTU Exam Tips**: High-yield exam revision nuggets and common trap warnings.

---

### 🕹️ 2. 21 Live Interactive Simulators Catalog
Every single topic features a dedicated, hands-on visual simulator with real-time state machines:

| # | Topic | Simulator Name | Interactive Capabilities & Controls |
|---|---|---|---|
| **1.1** | Client-Server Architecture | **2-Tier vs 3-Tier Architecture Flow Visualizer** | Toggle 2-tier vs 3-tier, dispatch client requests, trigger middle-tier connection pool & load balancing. |
| **1.2** | Concurrency Control | **Two-Phase Locking (2PL) & Deadlock Arena** | Strict 2PL vs Rigorous 2PL vs Conservative 2PL, grant Shared/Exclusive locks, detect Deadlock cycles. |
| **1.3** | Parallel Databases | **Parallel Database Architecture & Speedup Lab** | Shared-Memory vs Shared-Disk vs Shared-Nothing, benchmark Scaleup & Speedup curves. |
| **1.4** | Distributed Databases | **Two-Phase Commit (2PC) Distributed Consensus** | Coordinator vs Participant nodes, Prepare phase, Commit/Abort voting, simulated site crashes. |
| **2.1** | Object-Based & Complex Types | **Complex Structured Types & Dot-Notation Explorer** | Define composite UDTs (`Address_t`, `Publisher_t`), nested dot notation (`book.pub.city`), relational unnesting. |
| **2.2** | Inheritance & Collections | **SQL Type & Table Inheritance + Collections Lab** | `UNDER` keyword hierarchy (`person_t` -> `student_t`), `ONLY()` query filter, `ARRAY` vs `MULTISET` operations. |
| **2.3** | Object Identity & References | **OID & Reference Pointer (`->`) Dereferencing Lab** | Create system OIDs, resolve pointer dereferences (`dept_ref->name`), trigger dangling reference detection. |
| **2.4** | XML, XPath & XQuery | **XML Tree Visualizer, XPath & FLWOR Query Pipeline** | Interactive DOM tree, live XPath selector evaluator (`//book[price < 50]/title`), 5-stage FLWOR execution. |
| **2.5** | Advanced SQL & Joins | **SQL Joins, Subqueries & User-Defined Functions** | Venn-diagram join visualizer (INNER, LEFT, RIGHT, FULL), step-by-step correlated subqueries, scalar UDF sandbox. |
| **3.1** | Data Classification | **Structured vs Semi-Structured vs Unstructured Spectrum** | Interactive data type classifier, schema rigidity analyzer, query speed & storage overhead calculator. |
| **3.2** | NoSQL Foundations | **CAP Theorem & PACELC Interactive Triangle** | Pick Consistency, Availability, Partition Tolerance; simulate network split behavior across MongoDB, Cassandra & RDBMS. |
| **3.3** | MongoDB Architecture | **BSON Document Modeling & Storage Engine Visualizer** | JSON vs BSON binary size comparator, WiredTiger cache simulation, embedded subdocuments vs normalized references. |
| **3.4** | MongoDB Querying | **Live MongoDB Query (MQL) Playground** | Interactive query builder (`$gt`, `$in`, `$regex`, `$or`), real-time result filtering on sample collections. |
| **3.5** | MongoDB Aggregation | **Aggregation Pipeline (`$match` -> `$group` -> `$sort`) Stepper** | Visual multi-stage data transformation pipeline with stage-by-stage document stream inspection. |
| **3.6 / 4.1** | Transaction Basics | **ACID Properties & Transaction State Machine** | Active -> Partially Committed -> Committed / Failed -> Aborted state transitions with rollback simulation. |
| **4.2** | TP Monitors & Workflows | **Transactional Workflow & Saga Compensation Visualizer** | Multi-step travel booking workflow, simulate payment failure, trigger backward compensating transactions. |
| **4.3** | Real-Time Databases | **Real-Time Earliest Deadline First (EDF) Scheduler** | Hard vs Soft vs Firm real-time deadlines, priority queue reordering, deadline miss penalty calculator. |
| **4.4** | Long-Duration Transactions | **Long Duration Transactions & Nested Saga Matrix** | Lock duration comparison, multi-hour engineering design transactions, savepoint rollback steppers. |
| **5.1** | Data Mining | **Apriori Association Rule Mining Algorithm Lab** | Candidate itemset generation ($C_k$), minimum support & confidence threshold sliders, frequent itemset pruning ($L_k$). |
| **5.2** | Business Intelligence | **OLAP Multidimensional Cube (Roll-Up, Drill-Down, Slice & Dice)** | 3D Data Cube manipulator with interactive slice, dice, roll-up (City -> Country) and drill-down (Year -> Quarter). |
| **5.3** | Modern Database Tech | **Mobile Offline Sync & Multimedia Feature Vector Lab** | Two-way sync with vector clock conflict resolution, CBIR color histogram image distance matching. |

---

### 🧠 3. Interactive Exam Prep & Learning Suites
- **🎯 Full-Featured Practice Exam Modal**: Timed mock exams, instant scoring, topic breakdown, and comprehensive solution explanations.
- **🗂️ Interactive Flashcards Deck**: Flipped flashcard study mode with mastery tracking ("Got It" vs "Needs Review").
- **📐 KaTeX Formula & Architecture Cheat Sheet**: Formatted mathematical formulas (Apriori Support/Confidence, Speedup/Scaleup, Cap Theorem, Amdahl's Law).
- **📝 Notes & Bookmarks System**: Save custom notes and bookmark key topics directly to local storage.
- **🎨 Appearance & Accessibility Engine**: Dark / Light / Midnight themes, customizable font sizes, and distraction-free study layout.
- **🔍 Instant Command-K Global Search**: Deep full-text search across all 21 topics, headings, terms, and simulators.

---

## 📚 Complete Syllabus & Module Breakdown

| Module | Title | Topics Covered | Text Pages |
|:---:|---|---|:---:|
| **Module 1** | **Database Architecture** | **1.1** Client-Server Models (2-Tier & 3-Tier)<br/>**1.2** Concurrency Control Techniques (2PL, Locks & Deadlocks)<br/>**1.3** Parallel Databases (Shared-Mem/Disk/Nothing, Speedup/Scaleup)<br/>**1.4** Distributed Databases & 2-Phase Commit (2PC) | Pages 7–33 |
| **Module 2** | **Object-Based Databases and XML** | **2.1** Complex Structured Types & Object Relational DBs<br/>**2.2** Type & Table Inheritance (`UNDER`), Arrays & Multisets<br/>**2.3** Object Identity (`OID`) & Reference Types (`->`)<br/>**2.4** XML Structure, Schema (DTD/XSD), XPath & XQuery (FLWOR)<br/>**2.5** Advanced Joins, Nested Queries & User-Defined Functions | Pages 34–57 |
| **Module 3** | **Advanced Database Techniques** | **3.1** Structured vs Semi-Structured vs Unstructured Data<br/>**3.2** NoSQL Concepts, CAP Theorem & BASE Properties<br/>**3.3** MongoDB Document Architecture & BSON Modeling<br/>**3.4** Querying with MongoDB (MQL & Operators)<br/>**3.5** Aggregation Pipeline Concepts in MongoDB | Pages 58–85 |
| **Module 4** | **Advanced Transaction Processing** | **4.1** Transaction Basics, ACID Properties & State Machine<br/>**4.2** TP Monitors, Transactional Workflows & Sagas<br/>**4.3** Real-Time Database Systems & Deadline Scheduling<br/>**4.4** Long Duration Transactions & Implementation Issues | Pages 86–107 |
| **Module 5** | **Modern Developments in Database Tech** | **5.1** Data Mining Techniques & Apriori Algorithm<br/>**5.2** Business Intelligence (BI) Frameworks & OLAP Cubes<br/>**5.3** Multimedia, Mobile (Sync/Replication) & Digital DBs | Pages 108–125 |

---

## 📁 Repository Structure

```text
ADBMS-STUDY-GUIDE/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD GitHub Actions workflow for Vite build & GitHub Pages
├── docs/                           # Reference curriculum materials & source PDFs
│   ├── ADBMS_REFRENCE_ED__BY_HARRY.pdf   # Complete 125-page ADBMS reference textbook
│   └── ADBMS REFRENCE ED. BY HARRY.pdf   # Original curriculum reference
├── scripts/                        # Python ETL pipeline & dataset build tools
│   ├── build_all_datasets.py       # Master dataset build pipeline runner
│   ├── build_course_data.py        # Extracts 21 topics from PDF into courseData.js
│   ├── generate_table_data.py      # Generates comprehensive comparison matrices
│   ├── generate_learning_assets.py # Generates quizzes, flashcards & KaTeX formulas
│   └── requirements.txt            # Python dependencies (PyMuPDF)
├── adbms-study-app/                # React 19 + Vite Web Application
│   ├── public/
│   │   ├── favicon.svg             # App SVG icon
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── sections/           # 13 Modular Pedagogical Sections
│   │   │   │   ├── SectionOverview.jsx
│   │   │   │   ├── SectionBeginnerIntro.jsx
│   │   │   │   ├── SectionAnalogies.jsx
│   │   │   │   ├── SectionDetailedExplanation.jsx
│   │   │   │   ├── SectionStepByStep.jsx
│   │   │   │   ├── SectionTables.jsx
│   │   │   │   ├── SectionTerms.jsx
│   │   │   │   ├── SectionExamples.jsx
│   │   │   │   ├── SectionAdvantagesLimitations.jsx
│   │   │   │   ├── SectionApplications.jsx
│   │   │   │   └── SectionKeyPoints.jsx
│   │   │   ├── simulators/         # 21 Live Interactive Simulators
│   │   │   │   ├── Simulator1_1.jsx ... Simulator1_4.jsx
│   │   │   │   ├── Simulator2_1.jsx ... Simulator2_5.jsx
│   │   │   │   ├── Simulator3_1.jsx ... Simulator3_5.jsx
│   │   │   │   ├── Simulator4_1.jsx ... Simulator4_4.jsx
│   │   │   │   ├── Simulator5_1.jsx ... Simulator5_3.jsx
│   │   │   │   └── SimulatorRegistry.jsx
│   │   │   ├── AppearanceModal.jsx
│   │   │   ├── FlashcardsDeckModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormulaCheatSheetModal.jsx
│   │   │   ├── HeroLanding.jsx
│   │   │   ├── KaTeXMath.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotesAndBookmarksModal.jsx
│   │   │   ├── PracticeExamModal.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopicView.jsx
│   │   ├── data/                   # Generated Datasets
│   │   │   ├── courseData.js       # Complete 21-topic courseware dataset
│   │   │   ├── flashcardData.js    # Interactive flashcards dataset
│   │   │   ├── formulaData.js      # KaTeX formulas & mathematical models
│   │   │   ├── quizData.js         # Comprehensive practice MCQ bank
│   │   │   └── tableData.js        # Formatted comparison matrices
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore                      # Git ignore rules for node_modules, dist & Python
├── LICENSE                         # MIT License
└── README.md                       # Master Documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: v3.9+ (only required if rebuilding datasets from the PDF)

### 1. Clone the Repository
```bash
git clone https://github.com/harshil51/ADBMS-STUDY-GUIDE.git
cd ADBMS-STUDY-GUIDE
```

### 2. Launch the Web Application
```bash
# Navigate to the web application directory
cd adbms-study-app

# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🐍 Python Data Extraction Pipeline (Optional)

The datasets (`courseData.js`, `quizData.js`, `flashcardData.js`, `formulaData.js`, `tableData.js`) are pre-built and ready to use. If you wish to re-extract or modify the data pipeline from `docs/ADBMS_REFRENCE_ED__BY_HARRY.pdf`:

```bash
# From the repository root
pip install -r scripts/requirements.txt

# Run the master build pipeline
python scripts/build_all_datasets.py
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) | Modern reactive component architecture with hooks and state machines |
| **Build Tool** | [Vite 6](https://vitejs.dev/) | Ultra-fast HMR and optimized production bundling |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism | Responsive layout, dark/midnight theme system, and micro-interactions |
| **Typography & Icons** | [Google Fonts (Inter / Outfit)](https://fonts.google.com/) + [Lucide Icons](https://lucide.dev/) | Crisp typography, semantic iconography, and accessible visual hierarchy |
| **Mathematical Typesetting** | [KaTeX](https://katex.org/) | Fast LaTeX mathematical formulas and query algebra rendering |
| **Data Processing** | [Python 3](https://www.python.org/) + [PyMuPDF](https://pymupdf.readthedocs.io/) | PDF stream parsing, regex section extraction, and structured JSON compilation |
| **Deployment** | [GitHub Pages](https://pages.github.com/) / [GitHub Actions](https://github.com/features/actions) | Automated CI/CD deployment on every commit to `main` |

---

## 📖 Course & Academic Details

- **Course Title**: Advanced Database Management Systems (ADBMS)
- **Subject Code**: `BE05016031` / `3150710`
- **Branch**: B.E. Information Technology (Semester 5)
- **University**: Gujarat Technological University (GTU), Ahmedabad, Gujarat
- **Author & Reference Edition**: Harshil Bhagora

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Engineered with ❤️ for Gujarat Technological University (GTU) B.E. IT Students.</sub>
</div>
