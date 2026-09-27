"""
ADBMS Study Guide - PDF Course Data Builder & Parser
===================================================
Extracts all 21 topics across 5 modules from the reference PDF
and generates structured JSON / JS data files for the React app.
"""

import os
import sys
import re
import json
import pymupdf

# Locate project paths
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_CANDIDATES = [
    os.path.join(ROOT_DIR, 'docs', 'ADBMS_REFRENCE_ED__BY_HARRY.pdf'),
    os.path.join(ROOT_DIR, 'ADBMS_REFRENCE_ED__BY_HARRY.pdf'),
    os.path.join(ROOT_DIR, 'docs', 'ADBMS REFRENCE ED. BY HARRY.pdf'),
    os.path.join(ROOT_DIR, 'ADBMS REFRENCE ED. BY HARRY.pdf'),
]

PDF_PATH = None
for p in PDF_CANDIDATES:
    if os.path.exists(p):
        PDF_PATH = p
        break

if not PDF_PATH:
    print("Error: Could not locate ADBMS reference PDF in docs/ or root.")
    sys.exit(1)

print(f"Loading PDF from: {PDF_PATH}")
doc = pymupdf.open(PDF_PATH)
print(f"Total pages in PDF: {len(doc)}")

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

pages_stream = []
for idx, page in enumerate(doc):
    page_num = idx + 1
    if page_num < 7:
        continue
    text = page.get_text('text')
    lines = text.split('\n')
    for l in lines:
        s = clean_line(l)
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        pages_stream.append({'page': page_num, 'text': s})

topic_defs = [
    {"id": "1.1", "modId": 1, "modName": "Database Architecture", "title": "Client - Server Database Models", "startPage": 7, "endPage": 13, "time": "15 min"},
    {"id": "1.2", "modId": 1, "modName": "Database Architecture", "title": "Concurrency Control Techniques", "startPage": 13, "endPage": 20, "time": "20 min"},
    {"id": "1.3", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Parallel Databases", "startPage": 20, "endPage": 27, "time": "18 min"},
    {"id": "1.4", "modId": 1, "modName": "Database Architecture", "title": "Introduction to Distributed Databases", "startPage": 27, "endPage": 34, "time": "20 min"},
    
    {"id": "2.1", "modId": 2, "modName": "Object-Based Databases and XML", "title": "Overview of Object-Based Databases and Complex Data Types", "startPage": 34, "endPage": 39, "time": "18 min"},
    {"id": "2.2", "modId": 2, "modName": "Object-Based Databases and XML", "title": "Structured Types, Inheritance, and Array/Multiset Types in SQL", "startPage": 39, "endPage": 43, "time": "20 min"},
    {"id": "2.3", "modId": 2, "modName": "Object-Based Databases and XML", "title": "Object Identity (OI) and Reference Types", "startPage": 43, "endPage": 48, "time": "18 min"},
    {"id": "2.4", "modId": 2, "modName": "Object-Based Databases and XML", "title": "XML: Structure, Schema, XPath, and XQuery (FLWOR Expressions)", "startPage": 48, "endPage": 52, "time": "22 min"},
    {"id": "2.5", "modId": 2, "modName": "Object-Based Databases and XML", "title": "Joins, Nested Queries, Aggregate Functions, and User-Defined Functions", "startPage": 52, "endPage": 58, "time": "20 min"},

    {"id": "3.1", "modId": 3, "modName": "Advanced Database Techniques", "title": "Structured vs Unstructured Data", "startPage": 58, "endPage": 62, "time": "12 min"},
    {"id": "3.2", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Database Concepts", "startPage": 62, "endPage": 68, "time": "18 min"},
    {"id": "3.3", "modId": 3, "modName": "Advanced Database Techniques", "title": "NoSQL Using MongoDB", "startPage": 68, "endPage": 75, "time": "20 min"},
    {"id": "3.4", "modId": 3, "modName": "Advanced Database Techniques", "title": "Querying with MongoDB", "startPage": 75, "endPage": 80, "time": "16 min"},
    {"id": "3.5", "modId": 3, "modName": "Advanced Database Techniques", "title": "Aggregation Concepts in MongoDB", "startPage": 80, "endPage": 86, "time": "22 min"},

    {"id": "4.1", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Basics of Transactions and ACID Properties", "startPage": 86, "endPage": 90, "time": "15 min"},
    {"id": "4.2", "modId": 4, "modName": "Advanced Transaction Processing", "title": "TP Monitors, Transactional Workflows, and Recovery of Workflow", "startPage": 90, "endPage": 96, "time": "20 min"},
    {"id": "4.3", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Real - Time Transaction Systems", "startPage": 96, "endPage": 102, "time": "18 min"},
    {"id": "4.4", "modId": 4, "modName": "Advanced Transaction Processing", "title": "Long Duration Transactions and Implementation Issues", "startPage": 102, "endPage": 108, "time": "20 min"},

    {"id": "5.1", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Data Mining Techniques", "startPage": 108, "endPage": 114, "time": "22 min"},
    {"id": "5.2", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Introduction to Business Intelligence", "startPage": 114, "endPage": 119, "time": "18 min"},
    {"id": "5.3", "modId": 5, "modName": "Modern Developments in Database Technologies", "title": "Multimedia Databases, Mobile Databases, and Digital Databases", "startPage": 119, "endPage": 126, "time": "20 min"}
]

section_headers = [
    (1, re.compile(r'^\s*(?:MODULE\s+\d+:.*)?(?:Topic\s+\d+\.\d+:.*)?1\.\s*Topic\s+Name', re.I)),
    (2, re.compile(r'^\s*2\.\s*Beginner\s+Friendly', re.I)),
    (3, re.compile(r'^\s*3\.\s*Real\s*[-–—]?\s*Life\s+Analogies', re.I)),
    (4, re.compile(r'^\s*4\.\s*(?:Complete\s+)?Detailed\s+Explan', re.I)),
    (5, re.compile(r'^\s*5\.\s*Step\s*[-–—]?\s*by\s*[-–—]?\s*Step', re.I)),
    (6, re.compile(r'^\s*6\.\s*Diagrams', re.I)),
    (7, re.compile(r'^\s*7\.\s*Images', re.I)),
    (8, re.compile(r'^\s*8\.\s*Tables', re.I)),
    (9, re.compile(r'^\s*9\.\s*Important\s+Term', re.I)),
    (10, re.compile(r'^\s*10\.\s*Examples', re.I)),
    (11, re.compile(r'^\s*11\.\s*Advantages', re.I)),
    (12, re.compile(r'^\s*12\.\s*Applications', re.I)),
    (13, re.compile(r'^\s*13\.\s*Key\s+Points', re.I))
]

def parse_robust_topic(t_def):
    lines = [item['text'] for item in pages_stream if t_def['startPage'] <= item['page'] < t_def['endPage']]
    full_raw = "\n".join(lines)
    
    sec_markers = []
    for l_idx, line in enumerate(lines):
        for sec_num, regex in section_headers:
            if regex.search(line):
                sec_markers.append((sec_num, l_idx))
                break
                
    clean_markers = []
    last_num = 0
    for num, idx in sec_markers:
        if num > last_num:
            clean_markers.append((num, idx))
            last_num = num

    marker_dict = {}
    for i in range(len(clean_markers)):
        num, start_idx = clean_markers[i]
        end_idx = clean_markers[i+1][1] if i + 1 < len(clean_markers) else len(lines)
        marker_dict[num] = lines[start_idx:end_idx]

    def get_sec_lines(n):
        return marker_dict.get(n, [])

    # 1. Topic Name & Overview
    s1 = "\n".join(get_sec_lines(1))
    what_is_it = ""
    why_matters = ""
    quick_sum = ""
    
    m_what = re.search(r'What\s+is\s+it\s*\??\s*[:\n]\s*(.*?)(?=(?:Why\s+it\s+matters|One\s+line\s+definition|Quick\s+Summary|2\.\s*Beginner|$))', s1, re.DOTALL | re.I)
    if m_what:
        what_is_it = m_what.group(1).strip()
    m_why = re.search(r'Why\s+it\s+matters\s*\??\s*[:\n]\s*(.*?)(?=(?:One\s+line\s+definition|Quick\s+Summary|2\.\s*Beginner|$))', s1, re.DOTALL | re.I)
    if m_why:
        why_matters = m_why.group(1).strip()
    m_sum = re.search(r'(?:One\s+line\s+definition|Quick\s+Summary)\s*[:\n]\s*(.*?)(?=(?:2\.\s*Beginner|$))', s1, re.DOTALL | re.I)
    if m_sum:
        quick_sum = m_sum.group(1).strip()

    if not what_is_it and len(get_sec_lines(1)) > 1:
        what_is_it = " ".join(get_sec_lines(1)[1:])

    # 2. Beginner Friendly
    s2 = "\n".join(get_sec_lines(2))
    simple_exp = ""
    keywords = []
    
    m_simp = re.search(r'Simple\s+Explanation\s*[:\n]\s*(.*?)(?=(?:Essential\s+Keywords|Keywords|3\.\s*Real|$))', s2, re.DOTALL | re.I)
    if m_simp:
        simple_exp = m_simp.group(1).strip()
    else:
        simple_exp = s2
        
    m_keys = re.search(r'(?:Essential\s+Keywords|Keywords)\s*[:\n]\s*(.*?)(?=(?:3\.\s*Real|$))', s2, re.DOTALL | re.I)
    if m_keys:
        kw_text = m_keys.group(1)
        for kl in kw_text.split('\n'):
            kl = kl.strip(' •-–—\t\r')
            if kl and ':' in kl:
                k_parts = kl.split(':', 1)
                keywords.append({'term': k_parts[0].strip(), 'definition': k_parts[1].strip()})
            elif kl and len(kl) > 3:
                keywords.append({'term': kl, 'definition': ''})

    # 3. Real-life Analogies
    s3 = "\n".join(get_sec_lines(3))
    analogies = []
    an_chunks = re.split(r'(?:Analogy\s*\d*[:\.]?|Real\s*[-–—]?\s*World\s+Analogy[:\.]?|\n(?=[A-Z][a-zA-Z\s]{3,30}:))', s3)
    for ac in an_chunks:
        ac = ac.strip(' •-–—\t\r\n')
        if len(ac) > 20 and not re.match(r'^3\.\s*Real', ac):
            analogies.append(ac)
    if not analogies and len(s3) > 10:
        analogies = [s3]

    # 4. Detailed Explanation
    s4 = "\n".join(get_sec_lines(4))
    subsections = []
    sub_matches = list(re.finditer(r'(?:^|\n)(?:Part\s+[A-Z0-9]+[:\.\-]|Subsection\s+\d+[:\.\-]|[0-9]+\.[0-9]+\s+|[A-Z][A-Za-z0-9\s\(\)\/\-\:]{3,50}[:\n])', s4))
    if len(sub_matches) >= 2:
        for i in range(len(sub_matches)):
            start_pos = sub_matches[i].start()
            end_pos = sub_matches[i+1].start() if i+1 < len(sub_matches) else len(s4)
            chunk = s4[start_pos:end_pos].strip()
            lines_c = chunk.split('\n')
            title = lines_c[0].strip(' :•-')
            body = "\n".join(lines_c[1:]).strip()
            if body:
                subsections.append({"title": title, "content": body})
    if not subsections:
        subsections.append({"title": "Core Theoretical Framework", "content": s4 if s4 else "Detailed theoretical concepts and principles."})

    # 5. Step by step
    s5 = "\n".join(get_sec_lines(5))
    steps = []
    step_chunks = re.split(r'(?:^|\n)(?:Step\s*\d+[:\.\-]|Phase\s*\d+[:\.\-]|[0-9]+\.\s+)', s5)
    for sc in step_chunks:
        sc = sc.strip(' •-–—\t\r\n')
        if len(sc) > 15 and not re.match(r'^5\.\s*Step', sc):
            lines_sc = sc.split('\n')
            title = lines_sc[0].strip(' :•-')
            desc = "\n".join(lines_sc[1:]).strip() if len(lines_sc) > 1 else lines_sc[0]
            steps.append({"step": len(steps) + 1, "title": title, "description": desc})

    # 6, 7, 8: Diagrams, Images, Tables raw
    s6 = "\n".join(get_sec_lines(6))
    s7 = "\n".join(get_sec_lines(7))
    s8 = "\n".join(get_sec_lines(8))

    # 9. Important Terms
    s9 = "\n".join(get_sec_lines(9))
    terms = []
    for tl in s9.split('\n'):
        tl = tl.strip(' •-–—\t\r')
        if tl and ':' in tl and not re.match(r'^9\.\s*Important', tl):
            parts = tl.split(':', 1)
            terms.append({"term": parts[0].strip(), "definition": parts[1].strip()})

    # 10. Examples
    s10 = "\n".join(get_sec_lines(10))
    examples = []
    ex_chunks = re.split(r'(?:^|\n)(?:Example\s*\d*[:\.\-]|Scenario\s*\d*[:\.\-]|Case\s+Study[:\.\-])', s10)
    for ec in ex_chunks:
        ec = ec.strip(' •-–—\t\r\n')
        if len(ec) > 20 and not re.match(r'^10\.\s*Examples', ec):
            examples.append(ec)
    if not examples and len(s10) > 15:
        examples = [s10]

    # 11. Advantages & Limitations
    s11 = "\n".join(get_sec_lines(11))
    adv = []
    lim = []
    adv_part = ""
    lim_part = ""
    m_adv = re.search(r'Advantages?\s*[:\n](.*?)(?=(?:Limitations?|Disadvantages?|12\.\s*Applications|$))', s11, re.DOTALL | re.I)
    if m_adv:
        adv_part = m_adv.group(1)
    m_lim = re.search(r'(?:Limitations?|Disadvantages?)\s*[:\n](.*?)(?=(?:12\.\s*Applications|$))', s11, re.DOTALL | re.I)
    if m_lim:
        lim_part = m_lim.group(1)
    
    for al in adv_part.split('\n'):
        al = al.strip(' •-–—\t\r')
        if len(al) > 5:
            adv.append(al)
    for ll in lim_part.split('\n'):
        ll = ll.strip(' •-–—\t\r')
        if len(ll) > 5:
            lim.append(ll)

    # 12. Applications
    s12 = "\n".join(get_sec_lines(12))
    apps = []
    for apl in s12.split('\n'):
        apl = apl.strip(' •-–—\t\r')
        if len(apl) > 10 and not re.match(r'^12\.\s*Applications', apl):
            apps.append(apl)

    # 13. Key Points
    s13 = "\n".join(get_sec_lines(13))
    points = []
    misconceptions = []
    exam_tips = []
    
    m_misc = re.search(r'(?:Common\s+Misconceptions?|Misconceptions?)\s*[:\n](.*?)(?=(?:Exam\s+Tips?|Quick\s+Revision|$))', s13, re.DOTALL | re.I)
    if m_misc:
        for ml in m_misc.group(1).split('\n'):
            ml = ml.strip(' •-–—\t\r')
            if len(ml) > 10:
                misconceptions.append(ml)
                
    m_tip = re.search(r'(?:Exam\s+Tips?|Key\s+Exam\s+Tips?)\s*[:\n](.*?)$', s13, re.DOTALL | re.I)
    if m_tip:
        for tl in m_tip.group(1).split('\n'):
            tl = tl.strip(' •-–—\t\r')
            if len(tl) > 10:
                exam_tips.append(tl)
                
    for pl in s13.split('\n'):
        pl = pl.strip(' •-–—\t\r')
        if len(pl) > 10 and not re.match(r'^(?:13\.\s*Key|Common\s+Misc|Exam\s+Tip)', pl):
            points.append(pl)

    return {
        "id": t_def["id"],
        "moduleId": t_def["modId"],
        "moduleName": t_def["modName"],
        "title": t_def["title"],
        "timeEstimate": t_def["time"],
        "pageRange": f"{t_def['startPage']} - {t_def['endPage'] - 1}",
        "overview": {
            "whatIsIt": what_is_it,
            "whyItMatters": why_matters,
            "quickSummary": quick_sum
        },
        "beginnerIntro": {
            "simpleExplanation": simple_exp,
            "keywords": keywords
        },
        "analogies": analogies,
        "detailedExplanation": {
            "subsections": subsections,
            "raw": s4
        },
        "stepByStep": steps,
        "diagramsDescription": s6,
        "visualIllustrations": s7,
        "tablesRaw": s8,
        "importantTerms": s9,
        "terms": terms,
        "examples": examples,
        "advantages": adv,
        "limitations": lim,
        "advantagesLimitations": s11,
        "applications": apps,
        "keyPoints": {
            "takeaways": points,
            "misconceptions": misconceptions,
            "examTips": exam_tips
        },
        "fullRawText": full_raw
    }

parsed_all = [parse_robust_topic(t) for t in topic_defs]
print(f"Parsed all {len(parsed_all)} topics successfully!")

# Load table data to enrich topics
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from generate_table_data import TABLES_DATA
except ImportError:
    TABLES_DATA = {}

for topic in parsed_all:
    topic_id = topic["id"]
    topic["structuredTables"] = TABLES_DATA.get(topic_id, [])

modules_meta = [
    {
        "id": 1,
        "title": "Database Architecture",
        "description": "Client-Server models (2-Tier & 3-Tier), Concurrency Control (2PL, Locks & Deadlocks), Parallel Database architectures & Distributed Databases with Two-Phase Commit.",
        "topicsCount": 4,
        "badge": "Core Architecture",
        "pages": "7 - 33"
    },
    {
        "id": 2,
        "title": "Object-Based Databases and XML",
        "description": "Object-Relational DBMS (ORDBMS), Complex structured types, Type & Table Inheritance (UNDER), Object Identity (OID) & REF dereferencing, XML Data Model (DTD, XSD, XPath & XQuery FLWOR), and Advanced SQL Querying (Joins, Subqueries & UDFs).",
        "topicsCount": 5,
        "badge": "ORDBMS & XML",
        "pages": "34 - 57"
    },
    {
        "id": 3,
        "title": "Advanced Database Techniques",
        "description": "Structured vs Unstructured data spectrum, NoSQL categories (CAP Theorem), and comprehensive MongoDB database modeling, CRUD & Aggregation pipelines.",
        "topicsCount": 5,
        "badge": "NoSQL & Modern Tech",
        "pages": "58 - 85"
    },
    {
        "id": 4,
        "title": "Advanced Transaction Processing",
        "description": "ACID properties, Transaction state machine, TP Monitors, Transactional Workflows, Real-time transaction scheduling (EDF), and Long Duration Sagas with compensation.",
        "topicsCount": 4,
        "badge": "Transactions & Sagas",
        "pages": "86 - 107"
    },
    {
        "id": 5,
        "title": "Modern Developments in Database Technologies",
        "description": "Data Mining (Apriori association rules, classification, clustering), Business Intelligence frameworks & OLAP, plus Multimedia, Mobile sync & Digital databases.",
        "topicsCount": 3,
        "badge": "Data Mining & BI",
        "pages": "108 - 125"
    }
]

book_meta = {
    "title": "Advanced Database Systems",
    "subtitle": "Complete Interactive Study Guide",
    "subjectCode": "BE05016031",
    "branch": "B.E. Information Technology (Semester 5)",
    "university": "Gujarat Technological University (GTU)",
    "author": "HARSHIL BHAGORA",
    "totalPages": 125,
    "totalModules": 5,
    "totalTopics": len(parsed_all),
    "estimatedStudyHours": 7.5
}

js_content = f"""// Advanced Database Systems - Complete Study Guide
// By Harshil Bhagora (GTU B.E. IT Semester 5)
// Generated from comprehensive 125-page textbook analysis

export const BOOK_METADATA = {json.dumps(book_meta, indent=2)};

export const MODULES_DATA = {json.dumps(modules_meta, indent=2)};

export const TOPICS_DATA = {json.dumps(parsed_all, indent=2)};
"""

# Save output
data_dir = os.path.join(ROOT_DIR, 'adbms-study-app', 'src', 'data')
os.makedirs(data_dir, exist_ok=True)

with open(os.path.join(data_dir, 'courseData.js'), 'w', encoding='utf-8') as f:
    f.write(js_content)

with open(os.path.join(data_dir, 'rich_topics_data.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_all, f, ensure_ascii=False, indent=2)

with open(os.path.join(data_dir, 'raw_topics_processed.json'), 'w', encoding='utf-8') as f:
    json.dump(parsed_all, f, ensure_ascii=False, indent=2)

print("Generated courseData.js, rich_topics_data.json, and raw_topics_processed.json successfully!")
