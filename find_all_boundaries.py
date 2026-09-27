import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Helper to clean special unicode characters
def sanitize_text(text):
    if not text:
        return ""
    text = text.replace('\uf0de', '• ')
    text = text.replace('\uf0a7', '• ')
    text = text.replace('\uf0b7', '• ')
    text = text.replace('', ' ')
    text = text.replace('\u2013', '-')
    text = text.replace('\u2014', ' - ')
    text = text.replace('\u2018', "'")
    text = text.replace('\u2019', "'")
    text = text.replace('\u201c', '"')
    text = text.replace('\u201d', '"')
    text = re.sub(r' +', ' ', text)
    return text.strip()

# Collect all lines from page 7 to 101
all_items = []
for p in pages:
    if p['page'] < 7:
        continue
    lines = p['text'].split('\n')
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        all_items.append({'page': p['page'], 'text': sanitize_text(s)})

# Identify the 16 topic boundaries
# 1.1: Client-Server Database Models (p. 7)
# 1.2: Concurrency Control Techniques (p. 13)
# 1.3: Introduction to Parallel Databases (p. 20)
# 1.4: Introduction to Distributed Databases (p. 27)
# 3.1: Structured vs Unstructured Data (p. 34)
# 3.2: NoSQL Database Concepts (p. 38)
# 3.3: NoSQL Using MongoDB (p. 44)
# 3.4: Querying with MongoDB (p. 51)
# 3.5: Aggregation Concepts in MongoDB (p. 56)
# 4.1: Basics of Transactions and ACID Properties (p. 62)
# 4.2: TP Monitors and Transactional Workflows (p. 66)
# 4.3: Real-Time Transaction Systems (p. 72)
# 4.4: Long Duration Transactions and Implementation Issues (p. 78)
# 5.1: Introduction to Data Mining Techniques (p. 84)
# 5.2: Introduction to Business Intelligence (p. 90)
# 5.3: Multimedia Databases, Mobile Databases, and Digital Databases (p. 95)

topic_boundaries = [
    {"id": "1.1", "modId": 1, "modName": "Database Architecture", "title": "Client-Server Database Models", "startPage": 7, "search": "Client - Server Database Architecture"},
    {"id": "1.2", "modId": 1, "modName": "Database Architecture", "title": "Concurrency Control Techniques", "startPage": 13, "search": "Concurrency Control"},
    {"id": "1.3", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Parallel Databases", "startPage": 20, "search": "Parallel Databases"},
    {"id": "1.4", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Distributed Databases", "startPage": 27, "search": "Distributed Databases"},
    {"id": "3.1", "modId": 3, "modName": "Advanced Database Techniques", "title": "Structured vs Unstructured Data", "startPage": 34, "search": "Structured vs Unstructured Data"},
    {"id": "3.2", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Database Concepts", "startPage": 38, "search": "NoSQL Databases"},
    {"id": "3.3", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Using MongoDB", "startPage": 44, "search": "MongoDB Basics"},
    {"id": "3.4", "modId": 3, "modName": "Advanced Database Techniques", "title": "Querying with MongoDB", "startPage": 51, "search": "Querying with MongoDB"},
    {"id": "3.5", "modId": 3, "modName": "Advanced Database Techniques", "title": "Aggregation Concepts in MongoDB", "startPage": 56, "search": "Aggregation in MongoDB"},
    {"id": "4.1", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Basics of Transactions and ACID Properties", "startPage": 62, "search": "Transactions and ACID Properties"},
    {"id": "4.2", "modId": 4, "modName": "Advanced Transaction Processing", "title": "TP Monitors, Transactional Workflows, and Recovery", "startPage": 66, "search": "TP Monitors and Transactional Workflows"},
    {"id": "4.3", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Real-Time Transaction Systems", "startPage": 72, "search": "Real - Time Transaction Systems"},
    {"id": "4.4", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Long Duration Transactions and Implementation Issues", "startPage": 78, "search": "Long Duration Transactions"},
    {"id": "5.1", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Data Mining Techniques", "startPage": 84, "search": "Data Mining"},
    {"id": "5.2", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Business Intelligence", "startPage": 90, "search": "Business Intelligence (BI)"},
    {"id": "5.3", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Multimedia, Mobile, and Digital Databases", "startPage": 95, "search": "Multimedia, Mobi"}
]

# Find the start index in all_items for each topic
start_indices = []
for t in topic_boundaries:
    found = False
    for idx, item in enumerate(all_items):
        if item['page'] >= t['startPage'] - 1 and item['page'] <= t['startPage'] + 1:
            if re.search(r'1\.\s+Topic Name', item['text'], re.IGNORECASE) or re.search(r'Topic\s+' + re.escape(t['id']), item['text'], re.IGNORECASE):
                # Check if this is the start
                start_indices.append((t['id'], idx, item['page']))
                found = True
                break
    if not found:
        print(f"Warning: Could not find start for {t['id']}")

print("Found start indices:")
for sid in start_indices:
    print(f"Topic {sid[0]}: line {sid[1]} on page {sid[2]}")
