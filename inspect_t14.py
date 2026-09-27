import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Inspect pages 26 to 29
for p_num in range(26, 30):
    p = pages[p_num - 1]
    print(f"=== Page {p_num} ===")
    for l in p['text'].split('\n'):
        if l.strip():
            print(" ", l.strip())
