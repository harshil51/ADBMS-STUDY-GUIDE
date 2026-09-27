import React, { useState } from 'react';
import { Triangle, Database, Network, Key, Layers, Share2, Server } from 'lucide-react';

export default function Simulator3_2() {
  const [capChoice, setCapChoice] = useState('CP'); // 'CP', 'AP', 'CA'
  const [noSqlType, setNoSqlType] = useState('document'); // 'keyvalue', 'document', 'column', 'graph'

  const capDetails = {
    CP: {
      name: "Consistency + Partition Tolerance (CP)",
      desc: "During network split, the system refuses or delays writes if it cannot guarantee immediate consistency across all nodes.",
      examples: "MongoDB (with majority write concern), Apache HBase, Google Bigtable, Redis (standalone cluster with CP configs).",
      tradeoff: "Availability is sacrificed during network partitions."
    },
    AP: {
      name: "Availability + Partition Tolerance (AP)",
      desc: "Nodes remain available to accept reads and writes during network splits, but may return slightly stale data (Eventual Consistency).",
      examples: "Apache Cassandra, Amazon DynamoDB, CouchDB, Couchbase.",
      tradeoff: "Strict immediate consistency is sacrificed for uninterrupted availability (BASE model)."
    },
    CA: {
      name: "Consistency + Availability (CA)",
      desc: "Guarantees immediate consistency and availability across all nodes, but cannot handle network partitions (split-brain).",
      examples: "Traditional single-node RDBMS (Oracle, PostgreSQL, MySQL) on a single physical network.",
      tradeoff: "Partition tolerance is not supported (cannot scale across wide-area distributed networks)."
    }
  };

  const noSqlTypes = {
    keyvalue: {
      title: "Key-Value Store",
      icon: Key,
      db: "Redis, AWS DynamoDB, Memcached",
      model: "Stores simple associative pairs (Key -> Value binary blob).",
      useCase: "Session caching, user shopping carts, high-throughput leaderboards."
    },
    document: {
      title: "Document Store",
      icon: Database,
      db: "MongoDB, CouchDB",
      model: "Stores rich hierarchical documents (JSON/BSON) with nested structures and arrays.",
      useCase: "E-commerce catalogs, content management, user profiles, mobile backend."
    },
    column: {
      title: "Column-Family Store",
      icon: Layers,
      db: "Apache Cassandra, Apache HBase, ScyllaDB",
      model: "Data organized into columns grouped into families rather than rows.",
      useCase: "Time-series sensor telemetry, financial logs, massive big-data analytics."
    },
    graph: {
      title: "Graph Database",
      icon: Share2,
      db: "Neo4j, Amazon Neptune, ArangoDB",
      model: "Stores nodes (entities) and edges (relationships) with rich property attributes.",
      useCase: "Social networks (friends of friends), fraud detection, recommendation engines."
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Triangle className="w-5 h-5" />
            CAP Theorem & NoSQL Taxonomy Visualizer
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Explore distributed trade-offs (CAP Theorem) and the 4 fundamental NoSQL data models
          </p>
        </div>

        {/* CAP Selection */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {['CP', 'AP', 'CA'].map(choice => (
            <button
              key={choice}
              onClick={() => setCapChoice(choice)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                capChoice === choice ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {choice} Model
            </button>
          ))}
        </div>
      </div>

      {/* CAP Details Box */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-bold text-sm text-blue-300">{capDetails[capChoice].name}</h5>
          <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
            CAP Selection
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3">{capDetails[capChoice].desc}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Representative Systems</span>
            <span className="font-semibold text-emerald-400">{capDetails[capChoice].examples}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Architectural Trade-off</span>
            <span className="font-semibold text-amber-400">{capDetails[capChoice].tradeoff}</span>
          </div>
        </div>
      </div>

      {/* 4 Types of NoSQL Databases */}
      <div>
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          The 4 Major NoSQL Database Categories
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.keys(noSqlTypes).map(typeKey => {
            const item = noSqlTypes[typeKey];
            const Icon = item.icon;
            const isSelected = noSqlType === typeKey;
            return (
              <button
                key={typeKey}
                onClick={() => setNoSqlType(typeKey)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-500/20' 
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-purple-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{item.title}</span>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">{item.model}</div>
                <div className="text-[10px] text-purple-300 font-mono bg-purple-950/60 p-1 rounded border border-purple-500/20">
                  {item.db}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
