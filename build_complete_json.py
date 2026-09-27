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

# Boundaries defined
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

# Section headers standard numbers
section_names_map = {
    1: "Topic Overview & Motivation",
    2: "Beginner Friendly Introduction & Key Words",
    3: "Real-Life Analogies",
    4: "Complete Detailed Explanation",
    5: "Step-by-Step Working & Flow",
    6: "Diagrams & Architectural Layout",
    7: "Visual Illustrations & Figures",
    8: "Comparative & Structural Tables",
    9: "Important Terms & Definitions Glossary",
    10: "Comprehensive Examples (Easy, Practical, Industry, Real-Life)",
    11: "Advantages & Limitations Balance Sheet",
    12: "Real-World Applications & Industry Use Cases",
    13: "Key Points to Remember & Exam Tips"
}

parsed_topics = []

for s in slices:
    topic_lines = [item['text'] for item in raw_stream[s['startIdx']:s['endIdx']]]
    
    # Let's segment by section number 1. through 13.
    section_splits = {}
    current_sec = 1
    current_lines = []
    
    # Check lines
    for line in topic_lines:
        m = re.match(r'^(\d{1,2})\.\s+([A-Za-z\s&–—\-/]+)', line)
        if m and int(m.group(1)) in range(1, 14) and int(m.group(1)) != current_sec:
            # save previous section
            if current_sec not in section_splits:
                section_splits[current_sec] = []
            section_splits[current_sec].extend(current_lines)
            current_sec = int(m.group(1))
            current_lines = [line]
        else:
            current_lines.append(line)
            
    if current_lines:
        if current_sec not in section_splits:
            section_splits[current_sec] = []
        section_splits[current_sec].extend(current_lines)
    
    # Store full sections
    formatted_sections = {}
    for sec_num in range(1, 14):
        sec_lines = section_splits.get(sec_num, [])
        formatted_sections[str(sec_num)] = {
            "num": sec_num,
            "title": section_names_map[sec_num],
            "rawText": "\n".join(sec_lines),
            "lines": sec_lines
        }
    
    parsed_topics.append({
        "id": s['id'],
        "moduleId": s['modId'],
        "moduleName": s['modName'],
        "title": s['title'],
        "pages": s['page'],
        "estimatedTime": s['time'],
        "sections": formatted_sections,
        "fullRawText": "\n".join(topic_lines)
    })

print(f"Successfully processed {len(parsed_topics)} topics.")
with open('parsed_topics_intermediate.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_topics, f, ensure_ascii=False, indent=2)

print("Saved parsed_topics_intermediate.json")
