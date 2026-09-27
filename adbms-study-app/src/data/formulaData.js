export const FORMULA_DATA = [
  {
    "id": "f1",
    "topicId": "1.3",
    "title": "Speedup in Parallel Databases",
    "latex": "Speedup = \\frac{T_{sequential}}{T_{parallel}}",
    "meaning": "Measures how much faster a fixed-size database query runs when more processors are added.",
    "symbols": [
      {
        "symbol": "T_{sequential}",
        "meaning": "Time taken to execute on 1 processor"
      },
      {
        "symbol": "T_{parallel}",
        "meaning": "Time taken to execute on N processors"
      }
    ],
    "example": "If a query takes 100 seconds on 1 CPU and 20 seconds on 5 CPUs, Speedup = 100 / 20 = 5x (Linear Speedup)."
  },
  {
    "id": "f2",
    "topicId": "1.3",
    "title": "Scaleup in Parallel Databases",
    "latex": "Scaleup = \\frac{T_{small}(N)}{T_{large}(m \\cdot N)}",
    "meaning": "Measures the ability to handle larger workloads in the same time when resources are increased proportionally.",
    "symbols": [
      {
        "symbol": "T_{small}(N)",
        "meaning": "Time to process base dataset on N nodes"
      },
      {
        "symbol": "T_{large}(m \\cdot N)",
        "meaning": "Time to process m-times larger dataset on m-times more nodes"
      }
    ],
    "example": "If 10 GB on 1 node takes 30s, and 100 GB on 10 nodes takes 30s, Scaleup = 1.0 (Ideal Scaleup)."
  },
  {
    "id": "f3",
    "topicId": "4.3",
    "title": "Real-Time Transaction Slack Time",
    "latex": "Slack = d_i - t - e_i",
    "meaning": "The margin of time available before a real-time transaction will miss its deadline.",
    "symbols": [
      {
        "symbol": "d_i",
        "meaning": "Absolute deadline timestamp of transaction T_i"
      },
      {
        "symbol": "t",
        "meaning": "Current system clock time"
      },
      {
        "symbol": "e_i",
        "meaning": "Remaining estimated execution time required"
      }
    ],
    "example": "If deadline = 50ms, current time = 10ms, and remaining work = 25ms, Slack = 50 - 10 - 25 = 15ms."
  },
  {
    "id": "f4",
    "topicId": "5.1",
    "title": "Association Rule Support",
    "latex": "Support(A \\Rightarrow B) = \\frac{\\text{Count}(A \\cup B)}{\\text{Total Transactions } N}",
    "meaning": "The proportion of transactions in the dataset that contain both itemsets A and B.",
    "symbols": [
      {
        "symbol": "Count(A \\cup B)",
        "meaning": "Number of transactions containing both items A and B"
      },
      {
        "symbol": "N",
        "meaning": "Total number of transactions in the database"
      }
    ],
    "example": "If 200 out of 1000 shoppers bought Bread and Milk together, Support = 200 / 1000 = 20% (0.20)."
  },
  {
    "id": "f5",
    "topicId": "5.1",
    "title": "Association Rule Confidence",
    "latex": "Confidence(A \\Rightarrow B) = \\frac{\\text{Count}(A \\cup B)}{\\text{Count}(A)}",
    "meaning": "The conditional probability that a customer purchases item B given that they have already purchased item A.",
    "symbols": [
      {
        "symbol": "Count(A \\cup B)",
        "meaning": "Transactions containing both A and B"
      },
      {
        "symbol": "Count(A)",
        "meaning": "Transactions containing itemset A"
      }
    ],
    "example": "If 400 shoppers bought Bread, and 200 of them also bought Milk, Confidence = 200 / 400 = 50% (0.50)."
  }
];
