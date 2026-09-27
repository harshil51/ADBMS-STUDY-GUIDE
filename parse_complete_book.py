import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Total pages: {len(pages)}")

# Let's see what each page contains
page_overviews = []
for p in pages:
    lines = [l.strip() for l in p['text'].split('\n') if l.strip()]
    header = " | ".join(lines[:4]) if lines else "EMPTY"
    page_overviews.append(f"Page {p['page']:03d}: {header}")

with open('all_page_headers.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(page_overviews))

print("Wrote all_page_headers.txt successfully")
