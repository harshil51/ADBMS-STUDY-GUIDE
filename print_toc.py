import json

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for i in range(1, 6):
    print(f"=== Page {i+1} ===")
    print(pages[i]['text'])
