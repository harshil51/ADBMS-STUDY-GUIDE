import json
import re

with open('parsed_topics_intermediate.json', 'r', encoding='utf-8') as f:
    raw_topics = json.load(f)

print(f"Loaded {len(raw_topics)} topics.")

# Let's inspect the sections in each raw topic
for t in raw_topics:
    print(f"Topic {t['id']} ({t['title']}): {len(t['sections'])} sections")

# We will write a comprehensive generator that builds a clean courseData.js file in `adbms-study-app/src/data/courseData.js`
