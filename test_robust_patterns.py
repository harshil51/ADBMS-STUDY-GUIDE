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

slices = [
    {"id": "1.1", "title": "Client - Server Database Models", "startIdx": 0, "endIdx": 330},
    {"id": "1.2", "title": "Concurrency Control Techniques", "startIdx": 330, "endIdx": 626},
    {"id": "1.3", "title": "Introduction to Parallel Databases", "startIdx": 626, "endIdx": 904},
    {"id": "1.4", "title": "Introduction to Distributed Databases", "startIdx": 904, "endIdx": 1226},
    {"id": "3.1", "title": "Structured vs Unstructured Data", "startIdx": 1226, "endIdx": 1445},
    {"id": "3.2", "title": "NoSQL Database Concepts", "startIdx": 1445, "endIdx": 1741},
    {"id": "3.3", "title": "NoSQL Using MongoDB", "startIdx": 1741, "endIdx": 2002},
    {"id": "3.4", "title": "Querying with MongoDB", "startIdx": 2002, "endIdx": 2241},
    {"id": "3.5", "title": "Aggregation Concepts in MongoDB", "startIdx": 2241, "endIdx": 2495},
    {"id": "4.1", "title": "Basics of Transactions and ACID Properties", "startIdx": 2495, "endIdx": 2716},
    {"id": "4.2", "title": "TP Monitors, Transactional Workflows, and Recovery of Workflow", "startIdx": 2716, "endIdx": 2973},
    {"id": "4.3", "title": "Real - Time Transaction Systems", "startIdx": 2973, "endIdx": 3226},
    {"id": "4.4", "title": "Long Duration Transactions and Implementation Issues", "startIdx": 3226, "endIdx": 3539},
    {"id": "5.1", "title": "Introduction to Data Mining Techniques", "startIdx": 3539, "endIdx": 3801},
    {"id": "5.2", "title": "Introduction to Business Intelligence", "startIdx": 3801, "endIdx": 4049},
    {"id": "5.3", "title": "Multimedia Databases, Mobile Databases, and Digital Databases", "startIdx": 4049, "endIdx": len(raw_stream)}
]

robust_patterns = [
    (1, r'^(?:MODULE\s+\d+:.*)?(?:Topic\s+\d+\.\d+:.*)?1\.\s*Topic Name'),
    (2, r'^2\.\s*Beginner Friendly'),
    (3, r'^3\.\s*Re\s*al\s*-\s*Life Analogies|^3\.\s*Real\s*-\s*Life Analogies'),
    (4, r'^4\.\s*Comp.*Detailed Explan|^4\.\s*Detailed Explan'),
    (5, r'^5\.\s*Step\s*-\s*by\s*-\s*Step'),
    (6, r'^6\.\s*Diagrams'),
    (7, r'^7\.\s*Images'),
    (8, r'^8\.\s*Tables'),
    (9, r'^9\.\s*Important Term'),
    (10, r'^10\.\s*Examples'),
    (11, r'^11\.\s*Advantages'),
    (12, r'^12\.\s*Applications'),
    (13, r'^13\.\s*Key Points')
]

for s in slices:
    topic_lines = [item['text'] for item in raw_stream[s['startIdx']:s['endIdx']]]
    found_nums = []
    for l_idx, line in enumerate(topic_lines):
        for sec_num, pat in robust_patterns:
            if re.search(pat, line, re.IGNORECASE):
                found_nums.append((sec_num, l_idx, line))
                break
    print(f"Topic {s['id']}: {[f[0] for f in found_nums]}")

