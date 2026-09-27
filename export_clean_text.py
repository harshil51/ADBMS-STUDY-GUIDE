import json

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Total pages: {len(pages)}")

with open('clean_full_text.txt', 'w', encoding='utf-8') as f_out:
    for idx, p in enumerate(pages):
        f_out.write(f"\n{'='*40}\nPAGE {p['page']}\n{'='*40}\n")
        f_out.write(p['text'])

print("Wrote clean_full_text.txt")
