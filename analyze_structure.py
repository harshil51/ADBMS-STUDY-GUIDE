import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Total pages: {len(pages)}")

# Print pages 1-10 to see full Table of Contents
print("=== TOC ANALYSIS ===")
for p in pages[1:10]:
    print(f"--- Page {p['page']} ---")
    for line in p['text'].split('\n'):
        if line.strip() and not line.strip().startswith('....'):
            print(line.strip())

# Analyze structure of remaining pages
print("\n=== PAGE HEADERS ACROSS ALL 101 PAGES ===")
for p in pages:
    lines = [l.strip() for l in p['text'].split('\n') if l.strip()]
    first_few = " | ".join(lines[:3]) if lines else "EMPTY"
    if any(k in first_few.upper() for k in ['MODULE', 'PART', 'TOPIC', 'QUESTION', 'EXAM', 'GATE', 'GTU', 'SUMMARY', 'FORMULA', 'MCQ', 'PRACTICE']):
        print(f"Page {p['page']:03d}: {first_few}")
