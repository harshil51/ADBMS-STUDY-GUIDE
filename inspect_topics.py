import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

output_lines = []
for p in pages[4:]: # from page 5 onward
    lines = [l.strip() for l in p['text'].split('\n') if l.strip()]
    clean_lines = []
    for l in lines:
        if any(h in l for h in ['ADBMS(BE05016031)', 'B.E. IT(Sem-5)', 'Page No:', 'HARSHIL BHAGORA']):
            continue
        clean_lines.append(l)
    
    first_few = clean_lines[:8]
    output_lines.append(f"=== PDF Page {p['page']} (Book Page: {p['page']-6}) ===")
    for l in first_few:
        output_lines.append(f"  {l}")

with open('all_topics_dump.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(output_lines))

print("Wrote all_topics_dump.txt successfully")
