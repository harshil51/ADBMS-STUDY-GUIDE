"""
ADBMS Study Guide - Master Dataset Build Orchestrator
===================================================
Runs all data builders in order to compile the full courseware:
1. generate_table_data.py
2. generate_learning_assets.py (quizzes, flashcards, formulas)
3. build_course_data.py (PDF extraction & 21-topic courseData.js)
"""

import os
import sys
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)

def run_script(script_name):
    script_path = os.path.join(SCRIPT_DIR, script_name)
    print(f"\n==========================================")
    print(f"  Running: {script_name}")
    print(f"==========================================")
    res = subprocess.run([sys.executable, script_path], cwd=ROOT_DIR)
    if res.returncode != 0:
        print(f"Error executing {script_name}")
        sys.exit(res.returncode)

def main():
    print("Starting ADBMS Full Dataset Build Pipeline...")
    run_script("generate_table_data.py")
    run_script("generate_learning_assets.py")
    run_script("build_course_data.py")
    print("\nAll datasets built and verified successfully!")

if __name__ == "__main__":
    main()
