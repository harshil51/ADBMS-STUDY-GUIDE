import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

def clean_line(text):
    if not text:
        return ""
    text = text.replace('\uf0de', '• ')
    text = text.replace('\uf0a7', '• ')
    text = text.replace('\uf0b7', '• ')
    text = text.replace('\ufffd', '-')
    text = text.replace('\u2013', '-')
    text = text.replace('\u2014', ' - ')
    text = text.replace('\u2018', "'")
    text = text.replace('\u2019', "'")
    text = text.replace('\u201c', '"')
    text = text.replace('\u201d', '"')
    text = re.sub(r' +', ' ', text)
    return text.strip()

# Combine all lines
raw_stream = []
for p in pages:
    if p['page'] < 7:
        continue
    for l in p['text'].split('\n'):
        s = clean_line(l)
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        raw_stream.append({'page': p['page'], 'text': s})

# 16 Topics boundaries
slices = [
    {"id": "1.1", "modId": 1, "modName": "Database Architecture", "title": "Client - Server Database Models", "startIdx": 0, "endIdx": 330, "page": "7 - 13", "time": "15 min"},
    {"id": "1.2", "modId": 1, "modName": "Database Architecture", "title": "Concurrency Control Techniques", "startIdx": 330, "endIdx": 626, "page": "13 - 20", "time": "20 min"},
    {"id": "1.3", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Parallel Databases", "startIdx": 626, "endIdx": 904, "page": "20 - 27", "time": "18 min"},
    {"id": "1.4", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Distributed Databases", "startIdx": 904, "endIdx": 1226, "page": "27 - 34", "time": "20 min"},
    {"id": "3.1", "modId": 3, "modName": "Advanced Database Techniques", "title": "Structured vs Unstructured Data", "startIdx": 1226, "endIdx": 1445, "page": "34 - 38", "time": "12 min"},
    {"id": "3.2", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Database Concepts", "startIdx": 1445, "endIdx": 1741, "page": "38 - 44", "time": "18 min"},
    {"id": "3.3", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Using MongoDB", "startIdx": 1741, "endIdx": 2002, "page": "44 - 51", "time": "20 min"},
    {"id": "3.4", "modId": 3, "modName": "Advanced Database Techniques", "title": "Querying with MongoDB", "startIdx": 2002, "endIdx": 2241, "page": "51 - 56", "time": "16 min"},
    {"id": "3.5", "modId": 3, "modName": "Advanced Database Techniques", "title": "Aggregation Concepts in MongoDB", "startIdx": 2241, "endIdx": 2495, "page": "56 - 62", "time": "22 min"},
    {"id": "4.1", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Basics of Transactions and ACID Properties", "startIdx": 2495, "endIdx": 2716, "page": "62 - 66", "time": "15 min"},
    {"id": "4.2", "modId": 4, "modName": "Advanced Transaction Processing", "title": "TP Monitors, Transactional Workflows, and Recovery of Workflow", "startIdx": 2716, "endIdx": 2973, "page": "66 - 72", "time": "20 min"},
    {"id": "4.3", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Real - Time Transaction Systems", "startIdx": 2973, "endIdx": 3226, "page": "72 - 78", "time": "18 min"},
    {"id": "4.4", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Long Duration Transactions and Implementation Issues", "startIdx": 3226, "endIdx": 3539, "page": "78 - 84", "time": "20 min"},
    {"id": "5.1", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Data Mining Techniques", "startIdx": 3539, "endIdx": 3801, "page": "84 - 90", "time": "22 min"},
    {"id": "5.2", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Business Intelligence", "startIdx": 3801, "endIdx": 4049, "page": "90 - 95", "time": "18 min"},
    {"id": "5.3", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Multimedia Databases, Mobile Databases, and Digital Databases", "startIdx": 4049, "endIdx": len(raw_stream), "page": "95 - 101", "time": "20 min"}
]

# Section headers exact pattern
section_patterns = [
    (1, r'^1\.\s+Topic Name\s*[-–—:]*'),
    (2, r'^2\.\s+Beginner Friendly Introduction'),
    (3, r'^3\.\s+Real\s*-\s*Life Analogies'),
    (4, r'^4\.\s+Complete Detailed Explanation'),
    (5, r'^5\.\s+Step\s*-\s*by\s*-\s*Step Working'),
    (6, r'^6\.\s+Diagrams'),
    (7, r'^7\.\s+Images'),
    (8, r'^8\.\s+Tables'),
    (9, r'^9\.\s+Important Terms'),
    (10, r'^10\.\s+Examples'),
    (11, r'^11\.\s+Advantages\s*&\s*Limitations'),
    (12, r'^12\.\s+Applications'),
    (13, r'^13\.\s+Key Points to Remember')
]

for s in slices:
    topic_lines = [item['text'] for item in raw_stream[s['startIdx']:s['endIdx']]]
    
    # Identify positions of the 13 section headers
    sec_positions = []
    for l_idx, line in enumerate(topic_lines):
        for sec_num, pat in section_patterns:
            if re.search(pat, line, re.IGNORECASE):
                sec_positions.append((sec_num, l_idx))
                break
    
    # Sort and remove duplicates if any
    sec_positions = sorted(list(set(sec_positions)), key=lambda x: x[1])
    print(f"Topic {s['id']} ({s['title']}): found {len(sec_positions)} sections -> {[sp[0] for sp in sec_positions]}")

