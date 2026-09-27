import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

def clean_page_text(txt):
    lines = txt.split('\n')
    cleaned = []
    for l in lines:
        l_str = l.strip()
        if not l_str:
            continue
        # filter running headers / footers
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', l_str, re.IGNORECASE):
            continue
        cleaned.append(l_str)
    return cleaned

# Let's inspect page ranges for all topics
# Topic 1.1: 7-13
# Topic 1.2: 13-20
# Topic 1.3: 20-27
# Topic 1.4: 27-34
# Topic 3.1: 34-38
# Topic 3.2: 38-44
# Topic 3.3: 44-51
# Topic 3.4: 51-56
# Topic 3.5: 56-62
# Topic 4.1: 62-66
# Topic 4.2: 66-72
# Topic 4.3: 72-78
# Topic 4.4: 78-84
# Topic 5.1: 84-90
# Topic 5.2: 90-95
# Topic 5.3: 95-101

topic_ranges = [
    {"module_id": 1, "module_name": "Database Architecture", "topic_id": "1.1", "title": "Client - Server Database Models", "start_page": 7, "end_page": 13},
    {"module_id": 1, "module_name": "Database Architecture", "topic_id": "1.2", "title": "Concurrency Control Techniques", "start_page": 13, "end_page": 20},
    {"module_id": 1, "module_name": "Database Architecture", "topic_id": "1.3", "title": "Introduction to Parallel Databases", "start_page": 20, "end_page": 27},
    {"module_id": 1, "module_name": "Database Architecture", "topic_id": "1.4", "title": "Introduction to Distributed Databases", "start_page": 27, "end_page": 34},
    {"module_id": 3, "module_name": "Advanced Database Techniques", "topic_id": "3.1", "title": "Structured vs Unstructured Data", "start_page": 34, "end_page": 38},
    {"module_id": 3, "module_name": "Advanced Database Techniques", "topic_id": "3.2", "title": "NoSQL Database Concepts", "start_page": 38, "end_page": 44},
    {"module_id": 3, "module_name": "Advanced Database Techniques", "topic_id": "3.3", "title": "NoSQL Using MongoDB", "start_page": 44, "end_page": 51},
    {"module_id": 3, "module_name": "Advanced Database Techniques", "topic_id": "3.4", "title": "Querying with MongoDB", "start_page": 51, "end_page": 56},
    {"module_id": 3, "module_name": "Advanced Database Techniques", "topic_id": "3.5", "title": "Aggregation Concepts in MongoDB", "start_page": 56, "end_page": 62},
    {"module_id": 4, "module_name": "Advanced Transaction Processing", "topic_id": "4.1", "title": "Basics of Transactions and ACID Properties", "start_page": 62, "end_page": 66},
    {"module_id": 4, "module_name": "Advanced Transaction Processing", "topic_id": "4.2", "title": "TP Monitors, Transactional Workflows, and Recovery of Workflow", "start_page": 66, "end_page": 72},
    {"module_id": 4, "module_name": "Advanced Transaction Processing", "topic_id": "4.3", "title": "Real - Time Transaction Systems", "start_page": 72, "end_page": 78},
    {"module_id": 4, "module_name": "Advanced Transaction Processing", "topic_id": "4.4", "title": "Long Duration Transactions and Implementation Issues", "start_page": 78, "end_page": 84},
    {"module_id": 5, "module_name": "Modern Developments in Database Technologies", "topic_id": "5.1", "title": "Introduction to Data Mining Techniques", "start_page": 84, "end_page": 90},
    {"module_id": 5, "module_name": "Modern Developments in Database Technologies", "topic_id": "5.2", "title": "Introduction to Business Intelligence", "start_page": 90, "end_page": 95},
    {"module_id": 5, "module_name": "Modern Developments in Database Technologies", "topic_id": "5.3", "title": "Multimedia Databases, Mobile Databases, and Digital Databases", "start_page": 95, "end_page": 101}
]

print(f"Total topics defined: {len(topic_ranges)}")
