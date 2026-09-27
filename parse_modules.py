import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Let's write a script that analyzes all topics, their start pages, end pages, module names, topic titles, etc.
full_text = ""
for p in pages:
    full_text += f"\n--- PAGE {p['page']} ---\n" + p['text']

with open('full_text_dump.txt', 'w', encoding='utf-8') as f:
    f.write(full_text)

print("Saved full text dump")

# Let's find all module and topic headers in full text
modules = re.findall(r'(MODULE\s+\d+:\s*[^\n]+)', full_text, re.IGNORECASE)
topics = re.findall(r'(Topic\s+\d+\.\d+:\s*[^\n]+)', full_text, re.IGNORECASE)

print(f"Modules found ({len(modules)}):", set(modules))
print(f"Topics found ({len(topics)}):", list(dict.fromkeys(topics)))
