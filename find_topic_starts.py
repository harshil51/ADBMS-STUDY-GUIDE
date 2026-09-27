import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Collect all non-header lines in entire PDF along with their source page number
all_lines = []
for p in pages:
    lines = p['text'].split('\n')
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', s, re.IGNORECASE):
            continue
        all_lines.append({'page': p['page'], 'text': s})

# Find all "1. Topic Name" headings
topic_headings = []
for idx, item in enumerate(all_lines):
    # Only search from page 7 onwards (after TOC)
    if item['page'] >= 7:
        m = re.match(r'^1\.\s+Topic Name\s*[—–-]\s*(.*)$', item['text'], re.IGNORECASE)
        if m:
            topic_headings.append({
                'title': m.group(1).strip(),
                'line_idx': idx,
                'page': item['page']
            })

print(f"Found {len(topic_headings)} topic headings:")
for idx, th in enumerate(topic_headings):
    print(f"{idx+1}. Line {th['line_idx']} (Page {th['page']}): {th['title']}")
