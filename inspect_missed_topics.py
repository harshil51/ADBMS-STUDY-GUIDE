import json

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print("=== Page 20 to 22 ===")
for p in [20, 21, 22]:
    print(f"--- Page {p} ---")
    print(pages[p-1]['text'][:500])

print("=== Page 89 to 92 ===")
for p in [89, 90, 91, 92]:
    print(f"--- Page {p} ---")
    print(pages[p-1]['text'][:500])
