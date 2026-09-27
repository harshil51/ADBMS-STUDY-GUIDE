import pymupdf
import json
import re

doc = pymupdf.open('ADBMS REFRENCE ED. BY HARRY.pdf')
pages_data = []
for idx, page in enumerate(doc):
    text = page.get_text('text')
    pages_data.append({
        'page': idx + 1,
        'text': text
    })

with open('extracted_pdf_pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages_data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(pages_data)} pages.")
print(f"Total characters: {sum(len(p['text']) for p in pages_data)}")

# Let's inspect pages 2-10 for the Table of Contents and overview
toc_text = "\n".join([pages_data[i]['text'] for i in range(1, 10)])
with open('pdf_toc_pages.txt', 'w', encoding='utf-8') as f:
    f.write(toc_text)

print("Saved TOC pages to pdf_toc_pages.txt")
