import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Let's see what topics exist by searching for Topic headers in the pages
topic_starts = []
for p in pages:
    txt = p['text']
    for line in txt.split('\n'):
        line_s = line.strip()
        if re.match(r'^(Topic\s+\d+\.\d+[:\s]|1\.\s+Topic Name)', line_s, re.IGNORECASE):
            topic_starts.append((p['page'], line_s))

for page_num, line in topic_starts:
    print(f"Page {page_num}: {line}")
