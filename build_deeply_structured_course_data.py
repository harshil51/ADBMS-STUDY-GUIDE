import json
import re
import os

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
    (1, r'^(?:MODULE\s+\d+:.*)?(?:Topic\s+\d+\.\d+:.*)?1\.\s*Topic Name'),
    (2, r'^2\.\s*Beginner Friendly'),
    (3, r'^3\.\s*Re\s*al\s*-\s*Life Analogies|^3\.\s*Real\s*-\s*Life Analogies'),
    (4, r'^4\.\s*.*Detailed\s*Explan|^4\.\s*Comp.*Detailed'),
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

def parse_topic_into_rich_structure(s_def):
    lines = [item['text'] for item in raw_stream[s_def['startIdx']:s_def['endIdx']]]
    
    # Segment lines by section number 1 to 13
    sec_markers = []
    for l_idx, line in enumerate(lines):
        for sec_num, pat in section_patterns:
            if re.search(pat, line, re.IGNORECASE):
                sec_markers.append((sec_num, l_idx))
                break
                
    # Filter to only increasing section numbers
    clean_markers = []
    last_num = 0
    for num, idx in sec_markers:
        if num > last_num:
            clean_markers.append((num, idx))
            last_num = num
            
    sections_text = {}
    for i in range(len(clean_markers)):
        num, start = clean_markers[i]
        end = clean_markers[i+1][1] if i + 1 < len(clean_markers) else len(lines)
        sections_text[num] = "\n".join(lines[start:end])
        
    # Section 1: Overview
    s1 = sections_text.get(1, "")
    what_match = re.search(r'What is it\?\s*(.*?)(?=Why do we need it\?|Where is it used\?|Important:|$)', s1, re.DOTALL | re.IGNORECASE)
    why_match = re.search(r'Why do we need it\?\s*(.*?)(?=Where is it used\?|Important:|$)', s1, re.DOTALL | re.IGNORECASE)
    where_match = re.search(r'Where is it used\?\s*(.*?)(?=Important:|$)', s1, re.DOTALL | re.IGNORECASE)
    imp_match = re.search(r'Important:\s*(.*)', s1, re.DOTALL | re.IGNORECASE)
    
    # Section 2: Beginner Intro & Keywords
    s2 = sections_text.get(2, "")
    intro_story = ""
    keywords = []
    # Split story and keywords table
    if "Key words explained" in s2 or "Technical words explained" in s2 or "Word" in s2 and "Simple Meaning" in s2:
        parts = re.split(r'Key words explained:?|Technical words explained:?|Technical words explained simply:?', s2, flags=re.IGNORECASE)
        intro_story = parts[0].replace('2. Beginner Friendly Introduction', '').strip()
        if len(parts) > 1:
            kw_lines = parts[1].strip().split('\n')
            i = 0
            while i < len(kw_lines):
                line = kw_lines[i].strip()
                if not line or line.startswith('Word') or line.startswith('Simple Meaning'):
                    i += 1
                    continue
                # If term is in line and meaning is in next line or separated
                if '—' in line or ' - ' in line:
                    p = re.split(r'—| - ', line, maxsplit=1)
                    keywords.append({"term": p[0].strip(), "meaning": p[1].strip()})
                elif i + 1 < len(kw_lines) and len(line) < 30 and len(kw_lines[i+1]) > 5:
                    keywords.append({"term": line, "meaning": kw_lines[i+1].strip()})
                    i += 1
                i += 1
    else:
        intro_story = s2.replace('2. Beginner Friendly Introduction', '').strip()
        
    # Section 3: Analogies
    s3 = sections_text.get(3, "")
    analogies = []
    analogy_matches = re.finditer(r'Analogy\s+(\d+)\s*[-—–]\s*([^:\n]+):\s*(.*?)(?=(?:Analogy\s+\d+)|$)', s3, re.DOTALL | re.IGNORECASE)
    for am in analogy_matches:
        analogies.append({
            "num": am.group(1),
            "title": am.group(2).strip(),
            "description": am.group(3).strip()
        })
    if not analogies and s3:
        analogies.append({"num": "1", "title": "Real-World Scenario", "description": s3.replace('3. Real - Life Analogies', '').strip()})

    # Section 4: Detailed Explanation (split by 4.1, 4.2, 4.3 or numbered points)
    s4 = sections_text.get(4, "")
    subsections = []
    sub_matches = list(re.finditer(r'(4\.\d+\s+[^:\n]+)(.*?)(?=(?:4\.\d+\s+)|$)', s4, re.DOTALL))
    if sub_matches:
        for sm in sub_matches:
            title = sm.group(1).strip()
            content = sm.group(2).strip()
            subsections.append({"title": title, "content": content})
    else:
        subsections.append({"title": "Detailed Architectural Breakdown", "content": s4.replace('4. Complete Detailed Explanation', '').strip()})

    # Section 5: Step by Step
    s5 = sections_text.get(5, "")
    steps = []
    for line in s5.split('\n'):
        line_clean = line.strip()
        if not line_clean or line_clean.startswith('5. Step') or line_clean == '↓':
            continue
        if 'Flow:' in line_clean or 'Phase:' in line_clean:
            steps.append({"title": line_clean, "isHeader": True})
        else:
            steps.append({"title": line_clean, "isHeader": False})

    # Section 8: Tables
    s8 = sections_text.get(8, "").replace('8. Tables', '').strip()

    # Section 9: Important Terms
    s9 = sections_text.get(9, "")
    terms = []
    for l in s9.split('\n'):
        line = l.strip()
        if not line or line.startswith('9. Important') or line.startswith('Term'):
            continue
        if '—' in line or ' - ' in line:
            p = re.split(r'—| - ', line, maxsplit=1)
            terms.append({"term": p[0].strip(), "definition": p[1].strip()})
        else:
            parts = re.split(r'\t|\s{2,}', line, maxsplit=1)
            if len(parts) == 2:
                terms.append({"term": parts[0].strip(), "definition": parts[1].strip()})

    # Section 10: Examples
    s10 = sections_text.get(10, "")
    examples = []
    ex_matches = re.finditer(r'[•\-*]?\s*(Easy example|Practical example|Industry example|Real\s*-\s*life example):\s*(.*?)(?=[•\-*]?\s*(?:Easy|Practical|Industry|Real\s*-\s*life)|$)', s10, re.DOTALL | re.IGNORECASE)
    for em in ex_matches:
        examples.append({
            "type": em.group(1).replace(' - ', '-').strip(),
            "content": em.group(2).strip()
        })
    if not examples and s10:
        examples.append({"type": "Key Example", "content": s10.replace('10. Examples', '').strip()})

    # Section 11: Advantages & Limitations
    s11 = sections_text.get(11, "")
    adv = []
    lim = []
    for l in s11.split('\n'):
        line = l.strip()
        if not line or line.startswith('11. Advantages'):
            continue
        if re.search(r'Advantage[:\s]', line, re.IGNORECASE):
            adv.append(re.sub(r'^[•\-*]?\s*(?:[A-Za-z0-9\s\-]+[-–—]\s*)?Advantage:\s*', '', line, flags=re.IGNORECASE).strip())
        elif re.search(r'Limitation[:\s]', line, re.IGNORECASE):
            lim.append(re.sub(r'^[•\-*]?\s*(?:[A-Za-z0-9\s\-]+[-–—]\s*)?Limitation:\s*', '', line, flags=re.IGNORECASE).strip())
        elif 'advantage' in line.lower():
            adv.append(line.lstrip('•-* ').strip())
        elif 'limit' in line.lower() or 'disadvantage' in line.lower():
            lim.append(line.lstrip('•-* ').strip())

    # Section 12: Applications
    s12 = sections_text.get(12, "")
    apps = []
    app_matches = re.finditer(r'[•\-*]?\s*(Industry|Companies|Daily life|Software|Websites|Mobile Apps):\s*(.*?)(?=[•\-*]?\s*(?:Industry|Companies|Daily life|Software|Websites|Mobile Apps)|$)', s12, re.DOTALL | re.IGNORECASE)
    for am in app_matches:
        apps.append({
            "category": am.group(1).strip(),
            "details": am.group(2).strip()
        })
    if not apps and s12:
        apps.append({"category": "General Applications", "details": s12.replace('12. Applications', '').strip()})

    # Section 13: Key Points
    s13 = sections_text.get(13, "")
    points = []
    misconceptions = []
    exam_tips = []
    for l in s13.split('\n'):
        line = l.strip()
        if not line or line.startswith('13. Key Points'):
            continue
        if 'misconception' in line.lower():
            misconceptions.append(re.sub(r'^[•\-*\s]*(?:Common\s+misconception:\s*)?', '', line, flags=re.IGNORECASE).strip())
        elif 'exam' in line.lower():
            exam_tips.append(re.sub(r'^[•\-*\s]*(?:Exam\s+Tip:\s*)?', '', line, flags=re.IGNORECASE).strip())
        else:
            clean_p = re.sub(r'^[•\-*\s]*', '', line).strip()
            if clean_p:
                points.append(clean_p)

    return {
        "id": s_def['id'],
        "moduleId": s_def['modId'],
        "moduleName": s_def['modName'],
        "title": s_def['title'],
        "pages": s_def['page'],
        "estimatedTime": s_def['time'],
        "overview": {
            "whatIsIt": what_match.group(1).strip() if what_match else "Core database architecture and management techniques.",
            "whyNeed": why_match.group(1).strip() if why_match else "Crucial for scalability, data integrity, and high performance.",
            "whereUsed": where_match.group(1).strip() if where_match else "Enterprise banking, web applications, and large-scale data platforms.",
            "importantNotes": imp_match.group(1).strip() if imp_match else ""
        },
        "beginnerIntro": {
            "story": intro_story,
            "keywords": keywords
        },
        "analogies": analogies,
        "detailedExplanation": {
            "subsections": subsections,
            "raw": s4
        },
        "stepByStep": steps,
        "tablesRaw": s8,
        "terms": terms,
        "examples": examples,
        "advantages": adv,
        "limitations": lim,
        "applications": apps,
        "keyPoints": {
            "takeaways": points,
            "misconceptions": misconceptions,
            "examTips": exam_tips
        }
    }

all_rich_topics = [parse_topic_into_rich_structure(s) for s in slices]

with open('adbms-study-app/src/data/rich_topics_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_rich_topics, f, ensure_ascii=False, indent=2)

print(f"Generated rich structured data for all {len(all_rich_topics)} topics!")
