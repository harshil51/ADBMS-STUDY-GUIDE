import json

with open('adbms-study-app/src/data/rich_topics_data.json', 'r', encoding='utf-8') as f:
    rich_topics = json.load(f)

modules_meta = [
    {
        "id": 1,
        "title": "Database Architecture",
        "description": "Client-Server models, Concurrency Control (2PL & Locks), Parallel Databases architectures & Distributed Database systems with Two-Phase Commit.",
        "topicsCount": 4,
        "badge": "Core Architecture"
    },
    {
        "id": 3,
        "title": "Advanced Database Techniques",
        "description": "Structured vs Unstructured data spectrum, NoSQL categories (CAP Theorem), and comprehensive MongoDB database modeling, CRUD & Aggregation pipelines.",
        "topicsCount": 5,
        "badge": "NoSQL & Modern Tech"
    },
    {
        "id": 4,
        "title": "Advanced Transaction Processing",
        "description": "ACID properties, Transaction state machine, TP Monitors, Transactional Workflows, Real-time transaction scheduling (EDF), and Long Duration Sagas with compensation.",
        "topicsCount": 4,
        "badge": "Transactions & Sagas"
    },
    {
        "id": 5,
        "title": "Modern Developments in Database Technologies",
        "description": "Data Mining (Apriori association rules, classification, clustering), Business Intelligence frameworks & OLAP, plus Multimedia, Mobile sync & Digital databases.",
        "topicsCount": 3,
        "badge": "Data Mining & BI"
    }
]

js_content = f"""// Advanced Database Systems - Complete Study Guide
// By Harshil Bhagora (GTU B.E. IT Semester 5)
// Deeply Structured Rich Pedagogical Dataset

export const MODULES_DATA = {json.dumps(modules_meta, indent=2)};

export const TOPICS_DATA = {json.dumps(rich_topics, indent=2)};

export const BOOK_METADATA = {{
  title: "Advanced Database Systems",
  subtitle: "Complete Interactive Study Guide",
  subjectCode: "BE05016031",
  branch: "B.E. Information Technology (Semester 5)",
  author: "HARSHIL BHAGORA",
  totalPages: 101,
  totalModules: 4,
  totalTopics: 16,
  estimatedStudyHours: 5.5
}};
"""

with open('adbms-study-app/src/data/courseData.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updated courseData.js with deeply structured topic data!")
