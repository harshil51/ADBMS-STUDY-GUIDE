import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p in pages:
    txt = p['text']
    for match in re.finditer(r'(Part\s+[A-Z]|Module\s+\d+|Topic\s+\d+\.\d+|Section\s+\d+)', txt, re.IGNORECASE):
        print(f"Page {p['page']}: {match.group(0)}")
