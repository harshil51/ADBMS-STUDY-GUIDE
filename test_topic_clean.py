import json
import re

with open('extracted_pdf_pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

# Helper to get clean text for a range of pages
def get_clean_pages_text(start_p, end_p):
    lines = []
    for p_num in range(start_p, end_p + 1):
        p = pages[p_num - 1]
        for l in p['text'].split('\n'):
            l_str = l.strip()
            if not l_str:
                continue
            if re.search(r'ADBMS\(BE\d+\)|B\.E\.\s+IT\(Sem-5\)|Page No:\s*\d+|HARSHIL BHAGORA', l_str, re.IGNORECASE):
                continue
            lines.append(l_str)
    return "\n".join(lines)

# Let's test for topic 1.1 (pages 7 to 13)
t1_text = get_clean_pages_text(7, 13)
with open('sample_t1_clean.txt', 'w', encoding='utf-8') as f:
    f.write(t1_text)

print("Saved sample_t1_clean.txt")
print("Total length of Topic 1.1 text:", len(t1_text))
