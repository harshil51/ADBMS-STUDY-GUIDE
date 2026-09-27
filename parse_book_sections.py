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

# Combine all lines from page 7 to 101 with header filter
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

# Find topic starts
topic_start_indices = []
for idx, item in enumerate(raw_stream):
    txt = item['text']
    # Check if this line is "Topic X.Y" or "1. Topic Name"
    m_topic = re.match(r'^(?:MODULE\s+\d+:\s*[^\n]+\s+)?Topic\s+(\d+\.\d+)[:\s]*(.*)$', txt, re.IGNORECASE)
    m_name = re.match(r'^1\.\s+Topic Name\s*[-–—:]*\s*(.*)$', txt, re.IGNORECASE)
    
    if m_topic:
        topic_start_indices.append((m_topic.group(1), idx, item['page'], m_topic.group(2)))
    elif m_name:
        # check if not already found in previous 3 lines
        if not topic_start_indices or idx - topic_start_indices[-1][1] > 5:
            topic_start_indices.append(('NameMarker', idx, item['page'], m_name.group(1)))

print(f"Detected {len(topic_start_indices)} potential topic start points:")
for t in topic_start_indices:
    print(t)
