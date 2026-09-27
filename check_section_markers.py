import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

def clean_page(p_obj):
    lines = p_obj['text'].split('\n')
    out = []
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        out.append(s)
    return out

topic_metadata = [
    {
        "id": "1.1",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Client - Server Database Models",
        "startPage": 7,
        "endPage": 13,
        "tag": "Architecture",
        "timeMin": 15
    },
    {
        "id": "1.2",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Concurrency Control Techniques",
        "startPage": 13,
        "endPage": 20,
        "tag": "Locks & Concurrency",
        "timeMin": 20
    },
    {
        "id": "1.3",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Introduction to Parallel Databases",
        "startPage": 20,
        "endPage": 27,
        "tag": "Parallelism & Scalability",
        "timeMin": 18
    },
    {
        "id": "1.4",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Introduction to Distributed Databases",
        "startPage": 27,
        "endPage": 34,
        "tag": "Distributed Systems & 2PC",
        "timeMin": 20
    },
    {
        "id": "3.1",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Structured vs Unstructured Data",
        "startPage": 34,
        "endPage": 38,
        "tag": "Data Models & Spectrum",
        "timeMin": 12
    },
    {
        "id": "3.2",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "NoSQL Database Concepts",
        "startPage": 38,
        "endPage": 44,
        "tag": "CAP Theorem & NoSQL Types",
        "timeMin": 18
    },
    {
        "id": "3.3",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "NoSQL Using MongoDB",
        "startPage": 44,
        "endPage": 51,
        "tag": "MongoDB CRUD & Data Types",
        "timeMin": 20
    },
    {
        "id": "3.4",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Querying with MongoDB",
        "startPage": 51,
        "endPage": 56,
        "tag": "MongoDB Query Operators",
        "timeMin": 16
    },
    {
        "id": "3.5",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Aggregation Concepts in MongoDB",
        "startPage": 56,
        "endPage": 62,
        "tag": "Aggregation Pipeline & MapReduce",
        "timeMin": 22
    },
    {
        "id": "4.1",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Basics of Transactions and ACID Properties",
        "startPage": 62,
        "endPage": 66,
        "tag": "ACID Properties & States",
        "timeMin": 15
    },
    {
        "id": "4.2",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "TP Monitors, Transactional Workflows, and Recovery of Workflow",
        "startPage": 66,
        "endPage": 72,
        "tag": "TP Monitors & Workflows",
        "timeMin": 20
    },
    {
        "id": "4.3",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Real - Time Transaction Systems",
        "startPage": 72,
        "endPage": 78,
        "tag": "Real-Time Scheduling & Deadlines",
        "timeMin": 18
    },
    {
        "id": "4.4",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Long Duration Transactions and Implementation Issues",
        "startPage": 78,
        "endPage": 84,
        "tag": "Nested Transactions & Saga Pattern",
        "timeMin": 20
    },
    {
        "id": "5.1",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Introduction to Data Mining Techniques",
        "startPage": 84,
        "endPage": 90,
        "tag": "Apriori, Classification & Clustering",
        "timeMin": 22
    },
    {
        "id": "5.2",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Introduction to Business Intelligence",
        "startPage": 90,
        "endPage": 95,
        "tag": "BI Framework, ETL & OLAP",
        "timeMin": 18
    },
    {
        "id": "5.3",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Multimedia Databases, Mobile Databases, and Digital Databases",
        "startPage": 95,
        "endPage": 101,
        "tag": "Multimedia, Mobile Sync & Digital Libs",
        "timeMin": 20
    }
]

# Let's inspect raw text of each topic to see how section headings 1 to 13 are structured
print("Examining section markers in each topic...")
for t in topic_metadata:
    topic_lines = []
    for p_num in range(t['startPage'], t['endPage'] + 1):
        topic_lines.extend(clean_page(pages[p_num - 1]))
    
    # find section markers like "1. Topic Name", "2. Beginner Friendly Introduction", etc.
    markers = []
    for idx, l in enumerate(topic_lines):
        m = re.match(r'^(\d{1,2})\.\s+([A-Za-z\s&–—\-/]+)', l)
        if m and int(m.group(1)) <= 13:
            markers.append((m.group(1), m.group(2).strip(), idx))
    
    print(f"Topic {t['id']}: found {len(markers)} markers -> {[m[0] for m in markers]}")

