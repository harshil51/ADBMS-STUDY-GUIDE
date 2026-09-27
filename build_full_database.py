import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

def clean_page(page_obj):
    lines = page_obj['text'].split('\n')
    out = []
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        out.append(s)
    return out

# Extract all text per page
cleaned_pages = {}
for p in pages:
    cleaned_pages[p['page']] = clean_page(p)

topic_defs = [
    {
        "id": "1.1",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Client - Server Database Models",
        "startPage": 7,
        "endPage": 13,
        "tag": "Architecture"
    },
    {
        "id": "1.2",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Concurrency Control Techniques",
        "startPage": 13,
        "endPage": 20,
        "tag": "Transactions & Locks"
    },
    {
        "id": "1.3",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Introduction to Parallel Databases",
        "startPage": 20,
        "endPage": 27,
        "tag": "Distributed & Parallel"
    },
    {
        "id": "1.4",
        "moduleId": 1,
        "moduleName": "Database Architecture",
        "title": "Introduction to Distributed Databases",
        "startPage": 27,
        "endPage": 34,
        "tag": "Distributed Systems"
    },
    {
        "id": "3.1",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Structured vs Unstructured Data",
        "startPage": 34,
        "endPage": 38,
        "tag": "Data Modeling"
    },
    {
        "id": "3.2",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "NoSQL Database Concepts",
        "startPage": 38,
        "endPage": 44,
        "tag": "NoSQL & Big Data"
    },
    {
        "id": "3.3",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "NoSQL Using MongoDB",
        "startPage": 44,
        "endPage": 51,
        "tag": "MongoDB Hands-on"
    },
    {
        "id": "3.4",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Querying with MongoDB",
        "startPage": 51,
        "endPage": 56,
        "tag": "MongoDB Queries"
    },
    {
        "id": "3.5",
        "moduleId": 3,
        "moduleName": "Advanced Database Techniques",
        "title": "Aggregation Concepts in MongoDB",
        "startPage": 56,
        "endPage": 62,
        "tag": "Aggregation Pipeline"
    },
    {
        "id": "4.1",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Basics of Transactions and ACID Properties",
        "startPage": 62,
        "endPage": 66,
        "tag": "ACID & Recovery"
    },
    {
        "id": "4.2",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "TP Monitors, Transactional Workflows, and Recovery",
        "startPage": 66,
        "endPage": 72,
        "tag": "Enterprise Systems"
    },
    {
        "id": "4.3",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Real - Time Transaction Systems",
        "startPage": 72,
        "endPage": 78,
        "tag": "Real-Time Scheduling"
    },
    {
        "id": "4.4",
        "moduleId": 4,
        "moduleName": "Advanced Transaction Processing",
        "title": "Long Duration Transactions and Implementation Issues",
        "startPage": 78,
        "endPage": 84,
        "tag": "Sagas & Compensation"
    },
    {
        "id": "5.1",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Introduction to Data Mining Techniques",
        "startPage": 84,
        "endPage": 90,
        "tag": "Data Mining & KDD"
    },
    {
        "id": "5.2",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Introduction to Business Intelligence",
        "startPage": 90,
        "endPage": 95,
        "tag": "BI & Analytics"
    },
    {
        "id": "5.3",
        "moduleId": 5,
        "moduleName": "Modern Developments in Database Technologies",
        "title": "Multimedia, Mobile, and Digital Databases",
        "startPage": 95,
        "endPage": 101,
        "tag": "Modern Database Types"
    }
]

# Let's verify text extraction per topic
topics_raw = []
for t in topic_defs:
    text_lines = []
    for p_num in range(t['startPage'], t['endPage'] + 1):
        text_lines.extend(cleaned_pages.get(p_num, []))
    topics_raw.append({
        **t,
        "lines": text_lines,
        "raw_text": "\n".join(text_lines)
    })

print(f"Extracted {len(topics_raw)} topics.")
for t in topics_raw:
    print(f"Topic {t['id']}: {t['title']} ({len(t['lines'])} lines, {len(t['raw_text'])} chars)")
