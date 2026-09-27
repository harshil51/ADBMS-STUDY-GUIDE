import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Let's find every occurrence of "Topic X.Y"
topics_found = []
for p in pages:
    lines = p['text'].split('\n')
    for line in lines:
        m = re.search(r'(Topic\s+\d+\.\d+:\s*([^\n]+))', line, re.IGNORECASE)
        if m:
            topics_found.append({
                'page': p['page'],
                'topic': m.group(1).strip()
            })

for t in topics_found:
    print(f"Page {t['page']}: {t['topic']}")
