import React, { useState } from 'react';
import { Table, FileJson, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Simulator3_1() {
  const [selectedType, setSelectedType] = useState('structured');

  const types = {
    structured: {
      title: "Structured Data",
      icon: Table,
      color: "text-blue-400",
      bgColor: "bg-blue-950/40 border-blue-500/40",
      schema: "Strict, Predefined (Schema-on-Write)",
      storage: "Relational Databases (PostgreSQL, Oracle, MySQL)",
      flexibility: "Low (Altering schema requires ALTER TABLE migrations)",
      searchability: "Extremely High (Standard SQL indexing & execution plans)",
      sampleData: `| emp_id | name       | department  | salary |
|--------|------------|-------------|--------|
| 101    | Alice Roy   | Engineering | 95000  |
| 102    | Bob Smith  | Marketing   | 72000  |
| 103    | Carol Chen | Analytics   | 88000  |`,
      explanation: "Data is organized in rigid rows and columns with defined data types (integers, strings, dates) and enforced foreign key constraints."
    },
    semistructured: {
      title: "Semi-Structured Data",
      icon: FileJson,
      color: "text-purple-400",
      bgColor: "bg-purple-950/40 border-purple-500/40",
      schema: "Self-Describing, Flexible (Schema-on-Read)",
      storage: "Document & Graph NoSQL (MongoDB, XML, JSON, YAML)",
      flexibility: "High (Each record can have dynamic, polymorphic keys)",
      searchability: "High (Using JSON path queries and document indices)",
      sampleData: `{
  "emp_id": 101,
  "name": "Alice Roy",
  "skills": ["SQL", "MongoDB", "Python"],
  "address": { "city": "Ahmedabad", "zip": "380015" },
  "projects": [{ "id": "P1", "role": "Lead" }]
}`,
      explanation: "Contains internal tags, keys, and hierarchical nesting. Does not require a fixed relational schema, but maintains structured properties."
    },
    unstructured: {
      title: "Unstructured Data",
      icon: FileText,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/40 border-emerald-500/40",
      schema: "None (Raw Binary / Free-form Text / Media)",
      storage: "Data Lakes, Object Storage (AWS S3, MinIO, Blob Stores)",
      flexibility: "Maximum (Accepts any media, PDFs, audio, videos)",
      searchability: "Requires AI / NLP / Content-Based Retrieval",
      sampleData: `[Video Stream: live_feed_1080p.mp4 (450 MB)]
[Voice Recording: customer_call_audio.wav]
"Customer stated: The transaction failed at 9:15 AM
due to network timeout on the payment gateway..."`,
      explanation: "Accounts for over 80% of enterprise data. Cannot be organized into tables without automated extraction, NLP, or computer vision processing."
    }
  };

  const curr = types[selectedType];
  const IconComponent = curr.icon;

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Table className="w-5 h-5" />
            Data Spectrum Visualizer
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Compare Structured, Semi-Structured, and Unstructured data formats and storage engines
          </p>
        </div>

        {/* Spectrum Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {Object.keys(types).map(key => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === key ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {types[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* Spectrum Progress Bar */}
      <div className="mb-6 p-3 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2">
          <span className="text-blue-400">Structured (Strict Schema)</span>
          <span className="text-purple-400">Semi-Structured (JSON/XML)</span>
          <span className="text-emerald-400">Unstructured (Raw Media/Text)</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              selectedType === 'structured'
                ? 'w-1/3 bg-blue-500'
                : selectedType === 'semistructured'
                ? 'w-2/3 bg-purple-500'
                : 'w-full bg-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* Data Model Card */}
      <div className={`p-5 rounded-xl border mb-6 ${curr.bgColor}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700">
            <IconComponent className={`w-6 h-6 ${curr.color}`} />
          </div>
          <div>
            <h5 className="font-bold text-base text-white">{curr.title}</h5>
            <p className="text-xs text-slate-300 mt-0.5">{curr.explanation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Properties */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Schema Enforcement</span>
              <span className="font-semibold text-slate-200">{curr.schema}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Typical Storage Engine</span>
              <span className="font-semibold text-slate-200">{curr.storage}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Flexibility & Evolutions</span>
              <span className="font-semibold text-slate-200">{curr.flexibility}</span>
            </div>
          </div>

          {/* Sample Code Display */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
            <div className="text-[10px] text-slate-500 font-sans uppercase font-bold mb-2">Example Representation</div>
            <pre>{curr.sampleData}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
