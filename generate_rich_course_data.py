import json
import re
import os

with open('parsed_topics_intermediate.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)

# Let's inspect the sections of each topic and parse them into structured fields
def parse_topic_content(topic):
    sec = topic['sections']
    
    # 1. Topic Overview
    s1_text = sec.get('1', {}).get('rawText', '')
    what_is_it = ""
    why_need = ""
    where_used = ""
    important_notes = ""
    
    m_what = re.search(r'What is it\?\s*(.*?)(?=Why do we need it\?|Where is it used\?|Important:|$)', s1_text, re.DOTALL | re.IGNORECASE)
    if m_what: what_is_it = m_what.group(1).strip()
    
    m_why = re.search(r'Why do we need it\?\s*(.*?)(?=Where is it used\?|Important:|$)', s1_text, re.DOTALL | re.IGNORECASE)
    if m_why: why_need = m_why.group(1).strip()
    
    m_where = re.search(r'Where is it used\?\s*(.*?)(?=Important:|$)', s1_text, re.DOTALL | re.IGNORECASE)
    if m_where: where_used = m_where.group(1).strip()
    
    m_imp = re.search(r'Important:\s*(.*)', s1_text, re.DOTALL | re.IGNORECASE)
    if m_imp: important_notes = m_imp.group(1).strip()
    
    # 2. Beginner Friendly Introduction
    s2_text = sec.get('2', {}).get('rawText', '')
    
    # 3. Real-Life Analogies
    s3_text = sec.get('3', {}).get('rawText', '')
    
    # 4. Complete Detailed Explanation
    s4_text = sec.get('4', {}).get('rawText', '')
    
    # 5. Step by Step Working
    s5_text = sec.get('5', {}).get('rawText', '')
    
    # 6. Diagrams
    s6_text = sec.get('6', {}).get('rawText', '')
    
    # 7. Images / Visual Illustrations
    s7_text = sec.get('7', {}).get('rawText', '')
    
    # 8. Tables
    s8_text = sec.get('8', {}).get('rawText', '')
    
    # 9. Important Terms
    s9_text = sec.get('9', {}).get('rawText', '')
    
    # 10. Examples
    s10_text = sec.get('10', {}).get('rawText', '')
    
    # 11. Advantages & Limitations
    s11_text = sec.get('11', {}).get('rawText', '')
    
    # 12. Applications
    s12_text = sec.get('12', {}).get('rawText', '')
    
    # 13. Key Points to Remember
    s13_text = sec.get('13', {}).get('rawText', '')
    
    return {
        "id": topic['id'],
        "moduleId": topic['moduleId'],
        "moduleName": topic['moduleName'],
        "title": topic['title'],
        "pages": topic['pages'],
        "estimatedTime": topic['estimatedTime'],
        "overview": {
            "whatIsIt": what_is_it if what_is_it else s1_text,
            "whyNeed": why_need,
            "whereUsed": where_used,
            "importantNotes": important_notes,
            "rawText": s1_text
        },
        "beginnerIntro": s2_text,
        "analogies": s3_text,
        "detailedExplanation": s4_text,
        "stepByStep": s5_text,
        "diagramsDescription": s6_text,
        "visualIllustrations": s7_text,
        "tablesContent": s8_text,
        "importantTerms": s9_text,
        "examples": s10_text,
        "advantagesLimitations": s11_text,
        "applications": s12_text,
        "keyPoints": s13_text,
        "fullRawText": topic['fullRawText']
    }

processed = [parse_topic_content(t) for t in topics]

# Ensure src/data directory exists
os.makedirs('adbms-study-app/src/data', exist_ok=True)

with open('adbms-study-app/src/data/raw_topics_processed.json', 'w', encoding='utf-8') as f:
    json.dump(processed, f, ensure_ascii=False, indent=2)

print(f"Saved {len(processed)} parsed topics into adbms-study-app/src/data/raw_topics_processed.json")
