import React, { useState } from 'react';
import { FileCode, Search, Play, Terminal, Sparkles, CheckCircle2, ChevronRight, Layers, ArrowRight } from 'lucide-react';

export default function Simulator2_4() {
  const [activeTab, setActiveTab] = useState('xpath'); // 'xpath' | 'flwor' | 'schema'
  const [selectedXPath, setSelectedXPath] = useState('/bookstore/book[price < 35]/title');
  const [activeFlworStep, setActiveFlworStep] = useState(4); // 0: FOR, 1: LET, 2: WHERE, 3: ORDER, 4: RETURN

  const xmlBooks = [
    {
      id: 'b1',
      category: 'tech',
      title: 'Advanced Database Systems',
      author: 'Harshil Bhagora',
      year: 2026,
      price: 32.00
    },
    {
      id: 'b2',
      category: 'tech',
      title: 'Database Architecture & Internals',
      author: 'A. Silberschatz',
      year: 2024,
      price: 45.00
    },
    {
      id: 'b3',
      category: 'science',
      title: 'Principles of Distributed Systems',
      author: 'Tanenbaum',
      year: 2023,
      price: 28.50
    }
  ];

  const evaluateXPath = (xpath) => {
    switch (xpath) {
      case '/bookstore/book/title':
        return xmlBooks.map(b => `<title>${b.title}</title>`);
      case '//book[@category=\'tech\']/title':
        return xmlBooks.filter(b => b.category === 'tech').map(b => `<title>${b.title}</title>`);
      case '/bookstore/book[price < 35]/title':
        return xmlBooks.filter(b => b.price < 35).map(b => `<title>${b.title}</title>`);
      case '//author':
        return xmlBooks.map(b => `<author>${b.author}</author>`);
      default:
        return xmlBooks.map(b => `<title>${b.title}</title>`);
    }
  };

  const isBookHighlightedByXPath = (book) => {
    if (selectedXPath === '/bookstore/book/title') return true;
    if (selectedXPath === '//book[@category=\'tech\']/title') return book.category === 'tech';
    if (selectedXPath === '/bookstore/book[price < 35]/title') return book.price < 35;
    if (selectedXPath === '//author') return true;
    return false;
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-amber-400" />
            Interactive XML, XPath & XQuery (FLWOR) Studio
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate path expressions against an XML tree, step through the 5 FLWOR pipeline stages, and compare DTD vs XML Schema
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('xpath')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'xpath' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            XPath Evaluator
          </button>
          <button
            onClick={() => setActiveTab('flwor')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'flwor' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            XQuery FLWOR Pipeline
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              activeTab === 'schema' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            DTD vs XML Schema
          </button>
        </div>
      </div>

      {/* TAB 1: XPATH EVALUATOR */}
      {activeTab === 'xpath' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* XPath Selector */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                Select XPath Expression
              </h5>

              <div className="space-y-2">
                {[
                  {
                    path: '/bookstore/book[price < 35]/title',
                    label: 'Predicate Filter: price < $35',
                    desc: 'Selects titles of books cheaper than $35'
                  },
                  {
                    path: '//book[@category=\'tech\']/title',
                    label: 'Attribute Predicate: @category=\'tech\'',
                    desc: 'Selects title nodes of tech books'
                  },
                  {
                    path: '/bookstore/book/title',
                    label: 'Root Path: /bookstore/book/title',
                    desc: 'Direct hierarchical child traversal'
                  },
                  {
                    path: '//author',
                    label: 'Descendant Axis: //author',
                    desc: 'Selects author nodes anywhere in tree'
                  }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedXPath(item.path)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                      selectedXPath === item.path
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/50'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-mono text-[11px] text-emerald-400 truncate">{item.path}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual XML Tree Highlighting */}
            <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live XML Document Tree (`bookstore.xml`)
                </h5>
                <span className="text-[10px] text-emerald-400 font-mono">Matched nodes glow green</span>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded bg-slate-900/60 font-mono text-xs text-slate-400">
                  &lt;<span className="text-purple-400 font-bold">bookstore</span>&gt;
                </div>

                <div className="pl-4 space-y-2">
                  {xmlBooks.map(b => {
                    const isMatched = isBookHighlightedByXPath(b);
                    return (
                      <div
                        key={b.id}
                        className={`p-3 rounded-xl border transition-all font-mono text-xs ${
                          isMatched
                            ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                            : 'bg-slate-900/40 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="text-slate-400 text-[11px]">
                          &lt;<span className="text-blue-400 font-bold">book</span> <span className="text-amber-400">category</span>="<span className="text-emerald-300">{b.category}</span>"&gt;
                        </div>

                        <div className="pl-4 py-1 space-y-0.5 text-[11px]">
                          <div className={selectedXPath.includes('title') && isMatched ? 'text-emerald-300 font-bold bg-emerald-500/20 px-1 rounded inline-block' : 'text-slate-300'}>
                            &lt;title&gt;<span className="text-white">{b.title}</span>&lt;/title&gt;
                          </div>
                          <div className={selectedXPath.includes('author') && isMatched ? 'text-emerald-300 font-bold bg-emerald-500/20 px-1 rounded inline-block' : 'text-slate-400'}>
                            &lt;author&gt;{b.author}&lt;/author&gt;
                          </div>
                          <div className="text-slate-500">
                            &lt;year&gt;{b.year}&lt;/year&gt;
                          </div>
                          <div className="text-amber-400">
                            &lt;price&gt;${b.price.toFixed(2)}&lt;/price&gt;
                          </div>
                        </div>

                        <div className="text-slate-400 text-[11px]">
                          &lt;/<span className="text-blue-400 font-bold">book</span>&gt;
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2 rounded bg-slate-900/60 font-mono text-xs text-slate-400">
                  &lt;/<span className="text-purple-400 font-bold">bookstore</span>&gt;
                </div>
              </div>

              {/* Evaluated XPath Node Stream */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">XPath Result Node Set:</div>
                <div className="text-emerald-400">
                  {evaluateXPath(selectedXPath).join(' , ')}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: XQUERY FLWOR PIPELINE */}
      {activeTab === 'flwor' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
          <div>
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              XQuery FLWOR Pipeline Stepper
            </h5>
            <p className="text-[11px] text-slate-400">
              FLWOR stands for <strong>F</strong>OR, <strong>L</strong>ET, <strong>W</strong>HERE, <strong>O</strong>RDER BY, <strong>R</strong>ETURN. Click stages to inspect pipeline state.
            </p>
          </div>

          {/* FLWOR Stage Stepper Bar */}
          <div className="grid grid-cols-5 gap-2">
            {[
              { idx: 0, tag: 'FOR', desc: 'Iterate over nodes', code: 'for $b in doc("lib.xml")/book' },
              { idx: 1, tag: 'LET', desc: 'Bind variable', code: 'let $disc := $b/price * 0.1' },
              { idx: 2, tag: 'WHERE', desc: 'Filter criteria', code: 'where $b/price > 30' },
              { idx: 3, tag: 'ORDER BY', desc: 'Sort stream', code: 'order by $b/title' },
              { idx: 4, tag: 'RETURN', desc: 'Construct output', code: 'return <deal>{ $b/title, $disc }</deal>' }
            ].map(s => (
              <button
                key={s.idx}
                onClick={() => setActiveFlworStep(s.idx)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  activeFlworStep === s.idx
                    ? 'bg-amber-600/30 border-amber-500 shadow-md ring-1 ring-amber-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-mono text-sm font-black text-amber-400">{s.tag}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Full XQuery Code */}
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 leading-relaxed overflow-x-auto">
{`xquery version "1.0";
for $b in doc("bookstore.xml")/bookstore/book
let $discount := $b/price * 0.15
where $b/price >= 30.00
order by $b/title ascending
return
  <discountDeal>
    { $b/title }
    <originalPrice>{ $b/price/text() }</originalPrice>
    <savingsAmount>{ $discount }</savingsAmount>
    <finalPrice>{ $b/price - $discount }</finalPrice>
  </discountDeal>`}
          </div>

          {/* Generated Result XML */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              Output XML Result Stream ({xmlBooks.filter(b => b.price >= 30).length} transformed elements):
            </span>
            <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
{`<results>
  <discountDeal>
    <title>Advanced Database Systems</title>
    <originalPrice>32.00</originalPrice>
    <savingsAmount>4.80</savingsAmount>
    <finalPrice>27.20</finalPrice>
  </discountDeal>
  <discountDeal>
    <title>Database Architecture &amp; Internals</title>
    <originalPrice>45.00</originalPrice>
    <savingsAmount>6.75</savingsAmount>
    <finalPrice>38.25</finalPrice>
  </discountDeal>
</results>`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: DTD VS XML SCHEMA */}
      {activeTab === 'schema' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                DTD (Document Type Definition)
              </h5>
              <span className="text-[10px] text-slate-500 font-mono">Legacy XML Validation</span>
            </div>
            <pre className="p-3 bg-slate-900 rounded-lg font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
{`<!DOCTYPE bookstore [
  <!ELEMENT bookstore (book+)>
  <!ELEMENT book (title, author+, year, price)>
  <!ATTLIST book category (tech|science) #REQUIRED>
  <!ELEMENT title (#PCDATA)>
  <!ELEMENT author (#PCDATA)>
  <!ELEMENT year (#PCDATA)>
  <!ELEMENT price (#PCDATA)>
]>`}
            </pre>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div>❌ No strong data typing (all content is <code>#PCDATA</code> text).</div>
              <div>❌ Does not use XML syntax (separate non-XML grammar).</div>
              <div>❌ No support for namespaces.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                XML Schema Definition (XSD)
              </h5>
              <span className="text-[10px] text-emerald-400 font-mono">Modern W3C Standard</span>
            </div>
            <pre className="p-3 bg-slate-900 rounded-lg font-mono text-[11px] text-emerald-300 overflow-x-auto border border-slate-800">
{`<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="book">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="title" type="xs:string"/>
        <xs:element name="price" type="xs:decimal"/>
        <xs:element name="year" type="xs:gYear"/>
      </xs:sequence>
      <xs:attribute name="category" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`}
            </pre>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div>✅ 40+ built-in data types (<code>xs:integer</code>, <code>xs:decimal</code>, <code>xs:date</code>).</div>
              <div>✅ Written directly in standard XML syntax.</div>
              <div>✅ Full support for XML namespaces and minOccurs/maxOccurs cardinallities.</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
