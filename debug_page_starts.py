import json

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p_num in [7, 13, 20, 27, 34, 38, 44, 51, 56, 62, 66, 72, 78, 84, 90, 95]:
    p = pages[p_num - 1]
    lines = [l.strip() for l in p['text'].split('\n') if l.strip()]
    print(f"=== Page {p_num} (Book Page: {p_num - 6}) ===")
    for l in lines[:10]:
        print(f"  {repr(l)}")
