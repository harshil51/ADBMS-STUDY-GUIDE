import React, { useState } from 'react';
import { Target, PieChart, Layers, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';
import KaTeXMath from '../KaTeXMath';

export default function Simulator5_1() {
  const [activeTab, setActiveTab] = useState('apriori'); // 'apriori' or 'clustering'
  
  // Apriori calculator state
  const [totalTxns, setTotalTxns] = useState(1000);
  const [countA, setCountA] = useState(400); // e.g. Bread
  const [countAB, setCountAB] = useState(200); // e.g. Bread + Milk

  const support = ((countAB / totalTxns) * 100).toFixed(1);
  const confidence = ((countAB / countA) * 100).toFixed(1);

  // K-Means state
  const [kClusters, setKClusters] = useState(3);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Data Mining: Association Rules & Clustering Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Calculate Apriori Support & Confidence metrics and visualize K-Means customer segmentation
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('apriori')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'apriori' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Apriori Support & Confidence
          </button>
          <button
            onClick={() => setActiveTab('clustering')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'clustering' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            K-Means Clustering
          </button>
        </div>
      </div>

      {activeTab === 'apriori' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Total Transactions (N)</label>
              <input
                type="number"
                value={totalTxns}
                onChange={e => setTotalTxns(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Txns with Item A (e.g. Bread)</label>
              <input
                type="number"
                value={countA}
                onChange={e => setCountA(Math.min(totalTxns, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Txns with A + B (Bread & Milk)</label>
              <input
                type="number"
                value={countAB}
                onChange={e => setCountAB(Math.min(countA, Math.max(0, Number(e.target.value))))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Support Output */}
            <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Support (A ⇒ B)
                </span>
                <span className="text-xl font-mono font-bold text-blue-400">{support}%</span>
              </div>
              <div className="my-2">
                <KaTeXMath math={`\\text{Support} = \\frac{\\text{Count}(A \\cup B)}{N} = \\frac{${countAB}}{${totalTxns}} = ${support}\\%`} block />
              </div>
              <p className="text-[11px] text-slate-400">
                Fraction of total market basket transactions containing both items Bread and Milk.
              </p>
            </div>

            {/* Confidence Output */}
            <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Confidence (A ⇒ B)
                </span>
                <span className="text-xl font-mono font-bold text-purple-400">{confidence}%</span>
              </div>
              <div className="my-2">
                <KaTeXMath math={`\\text{Confidence} = \\frac{\\text{Count}(A \\cup B)}{\\text{Count}(A)} = \\frac{${countAB}}{${countA}} = ${confidence}\\%`} block />
              </div>
              <p className="text-[11px] text-slate-400">
                Probability that a customer who bought Bread also bought Milk.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="text-sm font-bold text-slate-200">K-Means Customer Segmentation</h5>
              <p className="text-xs text-slate-400">Unsupervised clustering grouping customer purchasing profiles</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Clusters (K):</span>
              {[2, 3, 4].map(k => (
                <button
                  key={k}
                  onClick={() => setKClusters(k)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    kClusters === k ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  K = {k}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30">
              <div className="font-bold text-blue-400 mb-1">Cluster 1: Budget Shoppers</div>
              <div className="text-[11px] text-slate-300">High frequency, low basket value. Responds strongly to discount coupons.</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
              <div className="font-bold text-emerald-400 mb-1">Cluster 2: Premium Buyers</div>
              <div className="text-[11px] text-slate-300">Low frequency, high basket value. Purchases organic and branded electronics.</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30">
              <div className="font-bold text-purple-400 mb-1">Cluster 3: Bulk / Wholesale</div>
              <div className="text-[11px] text-slate-300">Bi-weekly volume orders. Prefers bulk pack sizes and B2B invoicing.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
