import json
import re
import os

with open('adbms-study-app/src/data/raw_topics_processed.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)

print(f"Loaded {len(topics)} topics.")

# Let's write helper functions to extract structured tables, terms, lists, code, and analogies from the raw text

def extract_key_words_table(text):
    # Extracts table of words and meanings from section 2
    items = []
    lines = text.split('\n')
    start_collecting = False
    for idx, l in enumerate(lines):
        if 'Key words explained' in l or 'Technical words explained' in l or 'Word' in l and 'Simple Meaning' in l:
            start_collecting = True
            continue
        if start_collecting:
            if re.match(r'^\d+\.\s+Real', l) or 'Analogy' in l:
                break
            # Try to match word and meaning
            # Check if this line is a term followed by meaning in next line or separated
            if l.strip() and not l.startswith('---'):
                parts = re.split(r'\s{2,}|\t|—|-', l.strip(), maxsplit=1)
                if len(parts) == 2 and len(parts[0]) < 35:
                    items.append({'term': parts[0].strip(), 'meaning': parts[1].strip()})
    return items

def extract_analogies(text):
    analogies = []
    # Match "Analogy 1 — Title: Content..."
    matches = re.finditer(r'Analogy\s+(\d+)\s*[-—–]\s*([^:\n]+):\s*(.*?)(?=(?:Analogy\s+\d+)|(?:\d+\.\s+Complete)|$)', text, re.DOTALL | re.IGNORECASE)
    for m in matches:
        analogies.append({
            'num': m.group(1),
            'title': m.group(2).strip(),
            'description': m.group(3).strip()
        })
    if not analogies and text.strip():
        # generic split
        parts = text.split('Analogy')
        for p in parts[1:]:
            lines = p.strip().split('\n')
            if lines:
                analogies.append({
                    'num': '1',
                    'title': lines[0].replace(':', '').strip(),
                    'description': " ".join(lines[1:]).strip()
                })
    return analogies

def extract_terms(text):
    terms = []
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line or '9. Important Terms' in line or 'Term' in line and 'Simple Meaning' in line:
            i += 1
            continue
        # If line has "—" or "-" or two parts
        if '—' in line or ' - ' in line:
            parts = re.split(r'—| - ', line, maxsplit=1)
            terms.append({'term': parts[0].strip(), 'definition': parts[1].strip()})
        elif i + 1 < len(lines) and len(line) < 35 and len(lines[i+1]) > 10:
            # Multi-line term & definition
            terms.append({'term': line, 'definition': lines[i+1].strip()})
            i += 1
        i += 1
    return terms

def extract_examples(text):
    examples = []
    matches = re.finditer(r'[•\-*]?\s*(Easy example|Practical example|Industry example|Real\s*-\s*life example):\s*(.*?)(?=[•\-*]?\s*(?:Easy|Practical|Industry|Real\s*-\s*life|\d+\.\s+Advantages)|$)', text, re.DOTALL | re.IGNORECASE)
    for m in matches:
        examples.append({
            'type': m.group(1).replace(' - ', '-').strip(),
            'content': m.group(2).strip()
        })
    return examples

def extract_advantages_limitations(text):
    adv = []
    lim = []
    for l in text.split('\n'):
        l_str = l.strip()
        if not l_str or '11. Advantages & Limitations' in l_str:
            continue
        if re.search(r'Advantage[:\s]', l_str, re.IGNORECASE):
            clean = re.sub(r'^[•\-*]?\s*(?:[A-Za-z0-9\s\-]+[-–—]\s*)?Advantage:\s*', '', l_str, flags=re.IGNORECASE)
            adv.append(clean.strip())
        elif re.search(r'Limitation[:\s]', l_str, re.IGNORECASE):
            clean = re.sub(r'^[•\-*]?\s*(?:[A-Za-z0-9\s\-]+[-–—]\s*)?Limitation:\s*', '', l_str, flags=re.IGNORECASE)
            lim.append(clean.strip())
        elif l_str.startswith('-') or l_str.startswith('•'):
            clean = l_str.lstrip('-•* ').strip()
            if 'advantage' in l_str.lower():
                adv.append(clean)
            elif 'limit' in l_str.lower() or 'disadvantage' in l_str.lower():
                lim.append(clean)
    return {'advantages': adv, 'limitations': lim}

def extract_applications(text):
    apps = []
    matches = re.finditer(r'[•\-*]?\s*(Industry|Companies|Daily life|Software|Websites|Mobile Apps):\s*(.*?)(?=[•\-*]?\s*(?:Industry|Companies|Daily life|Software|Websites|Mobile Apps|\d+\.\s+Key)|$)', text, re.DOTALL | re.IGNORECASE)
    for m in matches:
        apps.append({
            'category': m.group(1).strip(),
            'details': m.group(2).strip()
        })
    return apps

def extract_key_points(text):
    points = []
    misconceptions = []
    exam_tips = []
    for l in text.split('\n'):
        l_str = l.strip()
        if not l_str or '13. Key Points to Remember' in l_str:
            continue
        if 'misconception' in l_str.lower():
            misconceptions.append(re.sub(r'^[•\-*\s]*(?:Common\s+misconception:\s*)?', '', l_str, flags=re.IGNORECASE).strip())
        elif 'exam' in l_str.lower():
            exam_tips.append(re.sub(r'^[•\-*\s]*(?:Exam\s+Tip:\s*)?', '', l_str, flags=re.IGNORECASE).strip())
        else:
            clean = re.sub(r'^[•\-*\s]*', '', l_str).strip()
            if clean:
                points.append(clean)
    return {'points': points, 'misconceptions': misconceptions, 'examTips': exam_tips}

print("Extractor functions defined.")
