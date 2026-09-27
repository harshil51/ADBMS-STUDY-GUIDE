export const structuredTablesData = {
  "1.1": [
    {
      "id": "t1_1_arch",
      "title": "Two-Tier vs. Three-Tier Client-Server Architecture",
      "subtitle": "Head-to-head engineering comparison across architecture, scaling, security, and maintenance",
      "badge": "GTU Core 7-Mark Question",
      "headers": [
        "Feature / Metric",
        "Two-Tier Architecture (Fat Client)",
        "Three-Tier Architecture (Thin Client)",
        "Verdict / Advantage"
      ],
      "rows": [
        {
          "feature": "Layer Count & Structure",
          "col1": "2 Layers: Client (UI + Logic) + DB Server",
          "col2": "3 Layers: Client (UI) + App Server (Logic) + DB Server",
          "verdict": "3-Tier decouples concerns",
          "status": "info"
        },
        {
          "feature": "Business Logic Placement",
          "col1": "Embedded directly inside the client application",
          "col2": "Centralized entirely in the middle Application Tier",
          "verdict": "3-Tier enables instant logic updates",
          "status": "better-col2"
        },
        {
          "feature": "Client Footprint",
          "col1": "Thick / Fat Client (Heavy install, local drivers/ODBC)",
          "col2": "Thin Client (Browser / Mobile UI, lightweight)",
          "verdict": "3-Tier runs on any web/mobile device",
          "status": "better-col2"
        },
        {
          "feature": "Scalability & Connections",
          "col1": "Low (~100s concurrent; 1 DB connection per client)",
          "col2": "High (10,000s+ concurrent; Connection Pooling in App Tier)",
          "verdict": "3-Tier scales horizontally",
          "status": "better-col2"
        },
        {
          "feature": "Maintenance & Upgrades",
          "col1": "Difficult: Every user machine must re-install binaries",
          "col2": "Easy: Deploy update once to Application Server cluster",
          "verdict": "Zero-downtime client-free updates",
          "status": "better-col2"
        },
        {
          "feature": "Security & Attack Surface",
          "col1": "Lower: Direct DB port exposed, DB credentials on client",
          "col2": "Higher: DB in private subnet; strict API auth & validation",
          "verdict": "3-Tier isolates database from public network",
          "status": "better-col2"
        },
        {
          "feature": "Hardware / Deployment Cost",
          "col1": "Lower initial setup (no separate app server required)",
          "col2": "Higher initial complexity (servers, load balancers)",
          "verdict": "2-Tier is cheaper for small local LAN tools",
          "status": "better-col1"
        },
        {
          "feature": "Typical Real-World Use",
          "col1": "Small LAN apps, internal departmental utilities",
          "col2": "Web portals, e-commerce, banking, enterprise SaaS",
          "verdict": "3-Tier is the modern industry standard",
          "status": "info"
        },
        {
          "feature": "Concrete Example",
          "col1": "Old VB6 / MS Access desktop billing application",
          "col2": "Amazon.com, Netflix, GTU Student Portal",
          "verdict": "Web-scale architecture",
          "status": "info"
        }
      ]
    }
  ],
  "1.2": [
    {
      "id": "t1_2_2pl",
      "title": "Two-Phase Locking (2PL) Protocol Variants Comparison Matrix",
      "subtitle": "Detailed locking rules, lock release timings, serializability guarantees, and deadlock trade-offs",
      "badge": "High-Yield Concurrency Matrix",
      "headers": [
        "2PL Protocol Variant",
        "Lock Acquisition Phase",
        "Lock Release Timing",
        "Cascading Rollback Prevention",
        "Deadlock Prevention",
        "Concurrency Level"
      ],
      "rows": [
        {
          "feature": "Basic 2PL",
          "col1": "Acquires locks dynamically during growing phase",
          "col2": "Can release locks anytime after reaching the Lock Point",
          "col3": "\u274c No (Uncommitted dirty reads possible)",
          "col4": "\u274c No (Circular waits can occur)",
          "col5": "\u26a1 High (Locks released early)",
          "status": "warning"
        },
        {
          "feature": "Strict 2PL",
          "col1": "Acquires Shared & Exclusive locks dynamically",
          "col2": "Exclusive (X) locks held until COMMIT / ABORT",
          "col3": "\u2705 Yes (Prevents dirty reads and cascades)",
          "col4": "\u274c No (Deadlocks still possible)",
          "col5": "\u2696\ufe0f Moderate (Shared locks freed early)",
          "status": "success"
        },
        {
          "feature": "Rigorous 2PL",
          "col1": "Acquires all locks during execution",
          "col2": "ALL locks (Shared & Exclusive) held until COMMIT / ABORT",
          "col3": "\u2705 Yes (Strict serializability & easy recovery)",
          "col4": "\u274c No (Deadlocks still possible)",
          "col5": "\ud83d\udd3b Lower (Longer lock retention)",
          "status": "info"
        },
        {
          "feature": "Conservative 2PL (Static)",
          "col1": "Declares and acquires ALL locks before transaction begins",
          "col2": "Released gradually after lock point or at commit",
          "col3": "\u274c No (if released before commit)",
          "col4": "\u2705 Yes (Deadlock-free by design)",
          "col5": "\ud83d\udd3b Low (Must know read/write set in advance)",
          "status": "info"
        }
      ]
    }
  ],
  "1.3": [
    {
      "id": "t1_3_arch",
      "title": "Parallel Database Hardware Architectures Comparison",
      "subtitle": "Comparing Shared-Memory, Shared-Disk, and Shared-Nothing systems on scalability, interconnect, and fault tolerance",
      "badge": "Core Architecture Taxonomy",
      "headers": [
        "Architecture Type",
        "Shared Memory",
        "Shared Disks",
        "Interconnect Bottleneck",
        "Scalability Limit",
        "Fault Isolation",
        "Ideal Workload"
      ],
      "rows": [
        {
          "feature": "Shared Memory (SMP)",
          "col1": "\u2705 Shared across all CPUs via bus",
          "col2": "\u2705 Shared single storage subsystem",
          "col3": "High (Memory bus saturation & cache coherency)",
          "col4": "Low (Max ~32 to 64 processors)",
          "col5": "Low (Memory fault crashes entire system)",
          "col6": "Small single-box DB servers, low-latency OLTP",
          "status": "warning"
        },
        {
          "feature": "Shared Disk (Cluster)",
          "col1": "\u274c Private memory per node",
          "col2": "\u2705 Shared storage via SAN / NAS / Fibre Channel",
          "col3": "Moderate (Network storage bandwidth & lock manager)",
          "col4": "Medium (Dozens of cluster nodes)",
          "col5": "High (Node crash fails over; shared data intact)",
          "col6": "Oracle RAC, enterprise fault-tolerant clustering",
          "status": "info"
        },
        {
          "feature": "Shared Nothing (MPP)",
          "col1": "\u274c Independent private RAM per node",
          "col2": "\u274c Independent private disk per node",
          "col3": "Low (High-speed commodity network message passing)",
          "col4": "Massive (Hundreds or thousands of nodes)",
          "col5": "Highest (Node failure isolated; partitioned data replicated)",
          "col6": "Teradata, Google BigQuery, Snowflake, Cassandra",
          "status": "success"
        }
      ]
    },
    {
      "id": "t1_3_partitioning",
      "title": "Parallel Data Partitioning (Declustering) Strategies",
      "subtitle": "Comparison of Round-Robin, Hash Partitioning, and Range Partitioning methods",
      "badge": "Parallel Query Optimization",
      "headers": [
        "Partitioning Strategy",
        "Placement Algorithm",
        "Strengths / Best For",
        "Weaknesses / Trade-offs",
        "Range Query Performance",
        "Point Lookup Performance"
      ],
      "rows": [
        {
          "feature": "Round-Robin Partitioning",
          "col1": "Assigns tuple i to node (i mod n) sequentially",
          "col2": "Perfect uniform load balancing across disks",
          "col3": "No attribute indexing; queries must scan all nodes",
          "col4": "\u274c Inefficient (All nodes participate)",
          "col5": "\u274c Inefficient (Must broadcast to all nodes)",
          "status": "info"
        },
        {
          "feature": "Hash Partitioning",
          "col1": "Applies hash function h(key) mod n to partition key",
          "col2": "Excellent for point queries (key = value) and joins",
          "col3": "Poor for range scans (adjacent values on different nodes)",
          "col4": "\u274c Poor (Requires full cluster broadcast)",
          "col5": "\u2705 Optimal (Direct single-node directed lookup)",
          "status": "success"
        },
        {
          "feature": "Range Partitioning",
          "col1": "Maps continuous value intervals (e.g. A-F, G-M, N-Z) to nodes",
          "col2": "Optimal for range queries (WHERE age BETWEEN 20 AND 30)",
          "col3": "Risk of data skew / hot spots if distribution is non-uniform",
          "col4": "\u2705 Optimal (Direct scan of only relevant node partitions)",
          "col5": "\u2705 Fast (Directed lookup via range vector)",
          "status": "better-col2"
        }
      ]
    }
  ],
  "1.4": [
    {
      "id": "t1_4_cent_dist",
      "title": "Centralized vs. Distributed Database Systems",
      "subtitle": "Fundamental architectural trade-offs between single-site databases and multi-node distributed DBMS",
      "badge": "Distributed Fundamentals",
      "headers": [
        "Dimension / Metric",
        "Centralized Database (CDBMS)",
        "Distributed Database (DDBMS)",
        "Key Advantage / Takeaway"
      ],
      "rows": [
        {
          "feature": "Data Physical Location",
          "col1": "Resides on a single physical machine/server",
          "col2": "Dispersed across multiple geographically separated sites",
          "verdict": "DDBMS provides local data autonomy",
          "status": "info"
        },
        {
          "feature": "Single Point of Failure",
          "col1": "Yes: Server failure halts the entire organization",
          "col2": "No: Site failure isolates only local queries; rest continues",
          "verdict": "DDBMS ensures high availability & fault tolerance",
          "status": "better-col2"
        },
        {
          "feature": "System & Network Complexity",
          "col1": "Low: Local concurrency control and transaction management",
          "col2": "High: Distributed query optimization, 2PC, global deadlock",
          "verdict": "CDBMS is much simpler to administer",
          "status": "better-col1"
        },
        {
          "feature": "Scalability & Elasticity",
          "col1": "Vertical scaling only (upgrade CPU/RAM on single box)",
          "col2": "Horizontal scaling (add more low-cost commodity nodes)",
          "verdict": "DDBMS scales indefinitely",
          "status": "better-col2"
        },
        {
          "feature": "Query Execution Cost",
          "col1": "Dominated by local Disk I/O and CPU compute",
          "col2": "Dominated by network latency and data transfer between sites",
          "verdict": "Query optimizers must minimize inter-site shipping",
          "status": "info"
        }
      ]
    },
    {
      "id": "t1_4_frag",
      "title": "Database Fragmentation Strategies Comparison",
      "subtitle": "Comparison of Horizontal, Vertical, and Mixed/Hybrid Fragmentation",
      "badge": "Design Techniques",
      "headers": [
        "Fragmentation Type",
        "Splitting Axis",
        "Reconstruction Operator",
        "Correctness Guarantee",
        "Example Application"
      ],
      "rows": [
        {
          "feature": "Horizontal Fragmentation (Sharding)",
          "col1": "Splits table by Rows (Tuples) based on predicate condition",
          "col2": "UNION (R = R1 \u222a R2 \u222a ... \u222a Rn)",
          "col3": "Completeness, Disjointness (predicates mutually exclusive)",
          "col4": "Customer table split by region: North vs South vs West branch",
          "status": "success"
        },
        {
          "feature": "Vertical Fragmentation",
          "col1": "Splits table by Columns (Attributes) across sites",
          "col2": "NATURAL JOIN (Must include Primary Key in every fragment)",
          "col3": "Completeness, Lossless Join guarantee via Primary Key",
          "col4": "Employee table: Public profile (Site 1) vs Salary/SSN (Site 2)",
          "status": "info"
        },
        {
          "feature": "Hybrid / Mixed Fragmentation",
          "col1": "Combines Horizontal and Vertical partitioning in tree hierarchy",
          "col2": "Combined UNION and NATURAL JOIN",
          "col3": "Hierarchical reconstruction tree matching decomposition",
          "col4": "Hospital DB: Horizontal by department, then vertical by medical vs billing",
          "status": "info"
        }
      ]
    }
  ],
  "3.1": [
    {
      "id": "t3_1_data_types",
      "title": "Structured vs. Semi-Structured vs. Unstructured Data",
      "subtitle": "The data format spectrum across enterprise systems, storage engines, and query models",
      "badge": "Data Spectrum Taxonomy",
      "headers": [
        "Attribute",
        "Structured Data",
        "Semi-Structured Data",
        "Unstructured Data"
      ],
      "rows": [
        {
          "feature": "Internal Format",
          "col1": "Strict 2D tabular rows and typed columns",
          "col2": "Hierarchical key-value pairs, nested tags, trees",
          "col3": "Raw binary streams, natural language text, media"
        },
        {
          "feature": "Schema Nature",
          "col1": "Schema-on-Write (Strict, predefined DDL before insert)",
          "col2": "Self-describing / Schema-on-Read (Flexible, evolving)",
          "col3": "No explicit schema (Raw unstructured content)"
        },
        {
          "feature": "Primary Storage Engine",
          "col1": "Relational Databases (MySQL, Oracle, PostgreSQL)",
          "col2": "Document / Key-Value Stores (MongoDB, Couchbase, JSON/XML)",
          "col3": "Data Lakes, Object Storage (S3, HDFS, MinIO)"
        },
        {
          "feature": "Querying Ease & Language",
          "col1": "Very High (Declarative SQL with indexes and joins)",
          "col2": "Moderate (JSONPath, MQL, XPath, XQuery)",
          "col3": "Specialized (Vector search, NLP, OCR, Audio processing)"
        },
        {
          "feature": "Share of Enterprise Data",
          "col1": "~20% of enterprise information",
          "col2": "~30% (Logs, APIs, IoT payloads)",
          "col3": "~80% of newly generated world data"
        },
        {
          "feature": "Concrete Real Example",
          "col1": "Bank account ledger with AccNo, Balance, KYC date",
          "col2": "E-commerce product catalog with dynamic custom specs",
          "col3": "Customer call recordings, medical X-ray scans, PDFs"
        }
      ]
    }
  ],
  "3.2": [
    {
      "id": "t3_2_sql_nosql",
      "title": "SQL (Relational) vs. NoSQL (Non-Relational) Comprehensive Matrix",
      "subtitle": "Architecture, scaling, consistency, and data model comparison",
      "badge": "GTU 7-Mark Classic Question",
      "headers": [
        "Engineering Dimension",
        "SQL Relational Databases",
        "NoSQL Modern Databases",
        "Key Architectural Trade-off"
      ],
      "rows": [
        {
          "feature": "Data Modeling Paradigm",
          "col1": "Tables, Rows, Columns, Foreign Key relations",
          "col2": "Document (JSON), Key-Value, Column-Family, Graph",
          "verdict": "SQL normalizes; NoSQL denormalizes for fast read access",
          "status": "info"
        },
        {
          "feature": "Schema Flexibility",
          "col1": "Rigid DDL: Altering schema requires migrations & locking",
          "col2": "Dynamic / Schema-less: Documents can have varying fields",
          "verdict": "NoSQL is ideal for agile, rapidly evolving data models",
          "status": "better-col2"
        },
        {
          "feature": "Scaling Strategy",
          "col1": "Vertical Scaling (Scale-Up: beefier CPU, RAM, NVMe)",
          "col2": "Horizontal Scaling (Scale-Out: distributed sharding)",
          "verdict": "NoSQL scales cost-effectively on commodity cloud clusters",
          "status": "better-col2"
        },
        {
          "feature": "ACID vs. CAP / BASE",
          "col1": "Strict ACID transactions (Atomic, Consistent, Isolated, Durable)",
          "col2": "BASE model (Basically Available, Soft-state, Eventual consistency)",
          "verdict": "SQL guarantees financial accuracy; NoSQL maximizes availability",
          "status": "info"
        },
        {
          "feature": "Complex Joins & Aggregations",
          "col1": "Native multi-table JOINs optimized by relational query engine",
          "col2": "Denormalized embedding preferred; joins ($lookup) are expensive",
          "verdict": "Use SQL when deep relational joins are critical",
          "status": "better-col1"
        },
        {
          "feature": "Primary Industry Fit",
          "col1": "Banking, ERP, Accounting, CRM, Inventory systems",
          "col2": "Real-time analytics, Social Feeds, Mobile apps, IoT, Catalogs",
          "verdict": "Choose based on consistency vs elasticity requirements",
          "status": "info"
        },
        {
          "feature": "Leading Systems",
          "col1": "PostgreSQL, MySQL, Oracle, Microsoft SQL Server",
          "col2": "MongoDB, Apache Cassandra, Redis, Neo4j, Couchbase",
          "verdict": "Polyglot persistence combines both in modern architectures",
          "status": "info"
        }
      ]
    }
  ],
  "3.3": [
    {
      "id": "t3_3_mapping",
      "title": "Relational (SQL) to MongoDB Terminology & Concept Mapping",
      "subtitle": "Direct translation table between SQL relational concepts and MongoDB document database structures",
      "badge": "Developer Rosette Stone",
      "headers": [
        "Relational (RDBMS/SQL) Concept",
        "MongoDB Equivalent",
        "Structural Difference & Practical Note"
      ],
      "rows": [
        {
          "feature": "Database (Catalog)",
          "col1": "Database (`CREATE DATABASE my_app;`)",
          "col2": "Database (`use my_app`)",
          "verdict": "High-level logical container for collections/tables"
        },
        {
          "feature": "Table (Relation)",
          "col1": "Table (`CREATE TABLE users (...);`)",
          "col2": "Collection (`db.createCollection('users')`)",
          "verdict": "Collections do not enforce fixed column constraints by default"
        },
        {
          "feature": "Row (Tuple / Record)",
          "col1": "Row / Record (`INSERT INTO users VALUES (...)`)",
          "col2": "BSON Document (`db.users.insertOne({...})`)",
          "verdict": "Documents can contain nested arrays and sub-documents"
        },
        {
          "feature": "Column (Attribute)",
          "col1": "Column / Field (Fixed datatype per table definition)",
          "col2": "Field (Dynamic key-value pair within BSON object)",
          "verdict": "Different documents in same collection can have different fields"
        },
        {
          "feature": "Primary Key",
          "col1": "Primary Key (User-defined or AUTO_INCREMENT int)",
          "col2": "`_id` Field (12-byte unique BSON `ObjectId` by default)",
          "verdict": "Every document must have a unique immutable `_id`"
        },
        {
          "feature": "Foreign Key & Joins",
          "col1": "Foreign Key + `JOIN` clause in SQL query",
          "col2": "Embedded Subdocuments OR `$lookup` aggregation stage",
          "verdict": "Embedding avoids expensive distributed network joins"
        },
        {
          "feature": "Index",
          "col1": "B-Tree Index (`CREATE INDEX idx_email ON ...`)",
          "col2": "B-Tree / Compound / Text / Geo Index (`db.users.createIndex({...})`)",
          "verdict": "Supports single field, compound, multikey (arrays), and geospatial"
        }
      ]
    }
  ],
  "3.4": [
    {
      "id": "t3_4_operators",
      "title": "MongoDB Query Operators vs. SQL WHERE Clause Equivalents",
      "subtitle": "Syntax mapping for comparison, logical, and element query filters",
      "badge": "Query Translation Cheat Sheet",
      "headers": [
        "MongoDB Operator",
        "Operator Name / Function",
        "SQL Syntax Equivalent",
        "Example MQL Query"
      ],
      "rows": [
        {
          "feature": "$eq",
          "col1": "Equals comparison",
          "col2": "`WHERE field = value`",
          "col3": "`db.students.find({ dept: { $eq: \"IT\" } })`"
        },
        {
          "feature": "$ne",
          "col1": "Not Equal comparison",
          "col2": "`WHERE field != value` or `<>`",
          "col3": "`db.students.find({ status: { $ne: \"Graduated\" } })`"
        },
        {
          "feature": "$gt / $gte",
          "col1": "Greater Than / Greater Than or Equal",
          "col2": "`WHERE field > value` / `>=`",
          "col3": "`db.students.find({ cpi: { $gte: 8.5 } })`"
        },
        {
          "feature": "$lt / $lte",
          "col1": "Less Than / Less Than or Equal",
          "col2": "`WHERE field < value` / `<=`",
          "col3": "`db.products.find({ price: { $lte: 999 } })`"
        },
        {
          "feature": "$in",
          "col1": "Match any value in specified array",
          "col2": "`WHERE field IN (v1, v2, ...)`",
          "col3": "`db.students.find({ sem: { $in: [3, 5, 7] } })`"
        },
        {
          "feature": "$nin",
          "col1": "Not in specified array",
          "col2": "`WHERE field NOT IN (v1, v2, ...)`",
          "col3": "`db.users.find({ role: { $nin: [\"admin\", \"root\"] } })`"
        },
        {
          "feature": "$or",
          "col1": "Logical OR joining array of clauses",
          "col2": "`WHERE cond1 OR cond2`",
          "col3": "`db.students.find({ $or: [{ dept: \"IT\" }, { cpi: { $gt: 9 } }] })`"
        },
        {
          "feature": "$and",
          "col1": "Logical AND joining multiple conditions",
          "col2": "`WHERE cond1 AND cond2`",
          "col3": "`db.students.find({ $and: [{ sem: 5 }, { cpi: { $gte: 8 } }] })`"
        },
        {
          "feature": "$exists",
          "col1": "Matches documents containing field",
          "col2": "`WHERE field IS NOT NULL`",
          "col3": "`db.users.find({ phoneNumber: { $exists: true } })`"
        }
      ]
    }
  ],
  "3.5": [
    {
      "id": "t3_5_pipeline",
      "title": "MongoDB Aggregation Pipeline Stages vs. SQL Analytical Clauses",
      "subtitle": "Step-by-step mapping of data transformation and grouping pipelines",
      "badge": "Aggregation Pipeline Reference",
      "headers": [
        "Aggregation Stage",
        "Stage Purpose & Operation",
        "SQL Equivalent Clause",
        "Pipeline Transformation Example"
      ],
      "rows": [
        {
          "feature": "$match",
          "col1": "Filters documents to pass only matching criteria to next stage",
          "col2": "`WHERE condition` / `HAVING`",
          "col3": "`{ $match: { dept: \"IT\", status: \"Active\" } }`"
        },
        {
          "feature": "$group",
          "col1": "Groups input documents by identifier expression and accumulates metrics",
          "col2": "`GROUP BY col, AVG(), SUM()`",
          "col3": "`{ $group: { _id: \"$dept\", avgCpi: { $avg: \"$cpi\" }, count: { $sum: 1 } } }`"
        },
        {
          "feature": "$sort",
          "col1": "Reorders documents by specified field (1 for ASC, -1 for DESC)",
          "col2": "`ORDER BY col ASC / DESC`",
          "col3": "`{ $sort: { avgCpi: -1, count: 1 } }`"
        },
        {
          "feature": "$project",
          "col1": "Reshapes document stream: selects, computes, or renames fields",
          "col2": "`SELECT col1, col2 AS alias, (col1 * 2)`",
          "col3": "`{ $project: { deptName: \"$_id\", avgScore: \"$avgCpi\", _id: 0 } }`"
        },
        {
          "feature": "$limit",
          "col1": "Restricts the number of output documents passed forward",
          "col2": "`LIMIT n`",
          "col3": "`{ $limit: 5 }`"
        },
        {
          "feature": "$skip",
          "col1": "Skips past the first n documents in the stream",
          "col2": "`OFFSET n`",
          "col3": "`{ $skip: 10 }`"
        },
        {
          "feature": "$unwind",
          "col1": "Deconstructs an array field into individual output documents per element",
          "col2": "`CROSS JOIN LATERAL` / Unnesting",
          "col3": "`{ $unwind: \"$skills\" }`"
        },
        {
          "feature": "$lookup",
          "col1": "Performs left outer join to an unsharded collection in the same database",
          "col2": "`LEFT OUTER JOIN other ON ...`",
          "col3": "`{ $lookup: { from: \"grades\", localField: \"id\", foreignField: \"studId\", as: \"history\" } }`"
        }
      ]
    }
  ],
  "4.1": [
    {
      "id": "t4_1_acid",
      "title": "ACID Properties: Core Mechanisms & Failure Scenarios",
      "subtitle": "In-depth engineering breakdown of database transaction guarantees",
      "badge": "Transaction Core Pillars",
      "headers": [
        "ACID Property",
        "Formal Definition",
        "Implementation Mechanism in DBMS",
        "Failure Impact if Violated",
        "Real-Life Banking Scenario"
      ],
      "rows": [
        {
          "feature": "Atomicity (All-or-Nothing)",
          "col1": "Either all transaction operations complete successfully or none take effect",
          "col2": "Write-Ahead Logging (WAL) & Undo Log Rollback",
          "col3": "Partial execution leaves database corrupted and inconsistent",
          "col4": "\u20b95000 deducted from Alice's account, but power cut occurs before Bob's balance is credited.",
          "status": "warning"
        },
        {
          "feature": "Consistency (Invariant Preservation)",
          "col1": "Transaction transforms database from one valid state satisfying all schema rules to another",
          "col2": "Schema constraints, triggers, primary/foreign keys, assertions",
          "col3": "Negative bank balances, orphan records, violated domain invariants",
          "col4": "Total sum of money across all bank accounts before and after transfer must remain identical.",
          "status": "info"
        },
        {
          "feature": "Isolation (Concurrency Guard)",
          "col1": "Concurrent transactions execute independently without mutual interference",
          "col2": "Concurrency control protocols (2PL, Timestamp Ordering, MVCC, Snapshot Isolation)",
          "col3": "Dirty reads, Non-repeatable reads, Phantom tuples, Lost updates",
          "col4": "Alice deposits \u20b92000 while Bob withdraws \u20b91000 simultaneously; balance calculation is corrupted.",
          "status": "better-col2"
        },
        {
          "feature": "Durability (Persistence Guarantee)",
          "col1": "Once transaction is committed, its updates persist permanently, even through system crashes",
          "col2": "Redo Logs flushed to non-volatile disk/SSD, Battery-backed NVRAM, Checkpointing",
          "col3": "Committed customer purchases vanish upon server reboot",
          "col4": "After ATM displays 'Transaction Success', electricity cuts out; account balance update remains saved.",
          "status": "success"
        }
      ]
    }
  ],
  "4.2": [
    {
      "id": "t4_2_tp_monitors",
      "title": "TP Monitor Architectures & Workflow Models Comparison",
      "subtitle": "Comparing Centralized, Decentralized, and Persistent State-Based Transaction Processing Managers",
      "badge": "Enterprise Transaction Middleware",
      "headers": [
        "Architecture Model",
        "Coordinator Location",
        "Scalability & Bottlenecks",
        "Fault Tolerance & Recovery",
        "Design Complexity",
        "Typical Industry Use"
      ],
      "rows": [
        {
          "feature": "Centralized TP Monitor",
          "col1": "Single dedicated central coordinator server",
          "col2": "Limited scalability; coordinator becomes bottleneck under high load",
          "col3": "Single Point of Failure (SPoF) unless active-passive standby exists",
          "col4": "Low to Moderate: Straightforward centralized state management",
          "col5": "Traditional enterprise mainframes, legacy ERP architectures",
          "status": "warning"
        },
        {
          "feature": "Decentralized (Distributed) TP Monitor",
          "col1": "Multiple cooperating peer nodes running distributed consensus",
          "col2": "High horizontal scalability; load distributed across cluster nodes",
          "col3": "Resilient: Survives single node crashes through peer failover",
          "col4": "High: Requires distributed consensus, quorum, and global clocks",
          "col5": "Cloud-native microservices, global financial clearing networks",
          "status": "success"
        },
        {
          "feature": "State-Based (Persistent) Workflow",
          "col1": "Durable database-backed workflow execution engine",
          "col2": "High throughput for long-running, multi-step asynchronous processes",
          "col3": "Maximum resilience: Steps persisted to WAL before dispatching external events",
          "col4": "Moderate: Requires robust idempotency and compensation handlers",
          "col5": "Temporal, AWS Step Functions, Order fulfillment sagas",
          "status": "better-col2"
        }
      ]
    }
  ],
  "4.3": [
    {
      "id": "t4_3_realtime",
      "title": "Hard vs. Firm vs. Soft Real-Time Database Systems",
      "subtitle": "Comparing deadline criticality, missing deadline consequences, and priority scheduling models",
      "badge": "Real-Time System Classification",
      "headers": [
        "Real-Time Category",
        "Deadline Strictness",
        "Consequence of Missing Deadline",
        "Utility Value Drop After Deadline",
        "Primary Scheduling Policy",
        "Concrete Real-World Example"
      ],
      "rows": [
        {
          "feature": "Hard Real-Time (HRTDBS)",
          "col1": "Absolute strict deadline guarantee required",
          "col2": "Catastrophic system failure, loss of life, or equipment destruction",
          "col3": "Becomes negative infinity (Harmful / Fatal)",
          "col4": "Earliest Deadline First (EDF), Least Slack Time (LST)",
          "col5": "Nuclear reactor temperature safety system, Missile trajectory guidance, Cardiac pacemaker controller",
          "status": "warning"
        },
        {
          "feature": "Firm Real-Time (FRTDBS)",
          "col1": "Strict deadline; no catastrophe if missed, but value is zero",
          "col2": "Transaction result becomes completely useless, aborted immediately",
          "col3": "Drops immediately to zero (0)",
          "col4": "Value-Cognizant Priority Scheduling, Deadline Monotonic",
          "col5": "High-frequency algorithmic stock arbitrage, Radar aircraft position refresh, Automated sensor fusion",
          "status": "info"
        },
        {
          "feature": "Soft Real-Time (SRTDBS)",
          "col1": "Flexible target deadline; system aims to minimize average tardiness",
          "col2": "Degraded quality of service, user annoyance, but result is still valuable",
          "col3": "Gradually diminishes over time (Decays smoothly)",
          "col4": "Best-effort Priority Queuing, Fair Share Scheduling",
          "col5": "YouTube 4K video packet buffering, Airline ticket booking portal, Live weather telemetry display",
          "status": "success"
        }
      ]
    }
  ],
  "4.4": [
    {
      "id": "t4_4_long_running",
      "title": "Advanced Concurrency & Long-Running Transaction Models",
      "subtitle": "Comparing compensation models, sagas, optimistic concurrency, and MVCC for multi-step distributed operations",
      "badge": "Advanced Transaction Patterns",
      "headers": [
        "Pattern / Technique",
        "Core Operating Principle",
        "Locking Overhead",
        "Rollback / Recovery Strategy",
        "Ideal Application Domain"
      ],
      "rows": [
        {
          "feature": "Nested Transactions",
          "col1": "Tree hierarchy of sub-transactions; children commit conditionally into parent",
          "col2": "Moderate (Parent holds ancestor lock hierarchy)",
          "col3": "Sub-transaction aborts locally without aborting whole parent transaction",
          "col4": "CAD/CAM engineering design suites, complex document editors",
          "status": "info"
        },
        {
          "feature": "Compensating Transactions",
          "col1": "Application logic that semantically reverses an already-committed step",
          "col2": "Zero long-term locks (Original transaction commits immediately)",
          "col3": "Executes reverse action (e.g., Refund Payment, Cancel Reservation)",
          "col4": "Flight & hotel booking reservation workflows",
          "status": "better-col2"
        },
        {
          "feature": "Saga Pattern (Orchestration/Choreography)",
          "col1": "Sequence of local transactions; failures trigger a chain of backward compensations",
          "col2": "Zero distributed 2PC locks across microservices",
          "col3": "Executes compensating transactions in reverse sequential order",
          "col4": "E-Commerce checkout (Order \u2192 Inventory \u2192 Payment \u2192 Shipment)",
          "status": "success"
        },
        {
          "feature": "Optimistic Concurrency Control (OCC)",
          "col1": "Read phase \u2192 Validation phase \u2192 Write phase. Assumes conflicts are rare",
          "col2": "Zero locks during execution; validates timestamp at commit",
          "col3": "Aborts and restarts transaction if validation conflict is detected",
          "col4": "Collaborative text editors, read-mostly web applications",
          "status": "info"
        },
        {
          "feature": "Multi-Version Concurrency Control (MVCC)",
          "col1": "Creates timestamped snapshots for readers; writers create new version without blocking readers",
          "col2": "Readers never block writers; writers never block readers",
          "col3": "Garbage collector vacuums old invisible row versions",
          "col4": "PostgreSQL, MySQL InnoDB, CockroachDB transactional engines",
          "status": "success"
        }
      ]
    }
  ],
  "5.1": [
    {
      "id": "t5_1_dm_techniques",
      "title": "Data Mining Core Paradigms: Association, Classification & Clustering",
      "subtitle": "Comparing machine learning and knowledge discovery methodologies in database analytics",
      "badge": "KDD Methodology Matrix",
      "headers": [
        "Data Mining Paradigm",
        "Learning Nature",
        "Predefined Class Labels?",
        "Core Algorithmic Technique",
        "Mathematical Objective",
        "Commercial Business Example"
      ],
      "rows": [
        {
          "feature": "Association Rule Mining",
          "col1": "Unsupervised pattern discovery",
          "col2": "\u274c No (Rules discovered from itemsets)",
          "col3": "Apriori Algorithm, FP-Growth, ECLAT",
          "col4": "Support \u2265 min_sup and Confidence \u2265 min_conf",
          "col5": "Market Basket Analysis: {Diapers, Beer} \u2192 72% Confidence in supermarket sales",
          "status": "info"
        },
        {
          "feature": "Classification",
          "col1": "Supervised learning on labeled training data",
          "col2": "\u2705 Yes (Target classes defined, e.g. Fraud / Legitimate)",
          "col3": "Decision Trees (C4.5, CART), Naive Bayes, Random Forest, SVM",
          "col4": "Minimize classification error on test holdout set",
          "col5": "Bank Loan Approval: Classify applicant as Low Risk vs High Default Risk",
          "status": "success"
        },
        {
          "feature": "Clustering",
          "col1": "Unsupervised exploratory data grouping",
          "col2": "\u274c No (Natural clusters formed by data geometry)",
          "col3": "K-Means, DBSCAN, Hierarchical Agglomerative Clustering",
          "col4": "Maximize intra-cluster similarity; minimize inter-cluster similarity",
          "col5": "Customer Segmentation: Grouping 1,000,000 users into 5 spending personas",
          "status": "better-col2"
        }
      ]
    }
  ],
  "5.2": [
    {
      "id": "t5_2_ml_paradigms",
      "title": "Machine Learning Paradigms in Business Intelligence",
      "subtitle": "Supervised, Unsupervised, and Reinforcement Learning applications in decision support",
      "badge": "AI & BI Integration",
      "headers": [
        "ML Paradigm",
        "Supervision & Labeled Data",
        "Feedback & Objective Function",
        "Primary Algorithmic Models",
        "Business Intelligence Use Case"
      ],
      "rows": [
        {
          "feature": "Supervised Learning",
          "col1": "Requires paired inputs and ground-truth target labels (X, y)",
          "col2": "Loss function calculates deviation from actual target label",
          "col3": "Linear/Logistic Regression, XGBoost, Neural Networks, Decision Trees",
          "col4": "Predicting next quarter revenue, Customer Churn early warning system",
          "status": "success"
        },
        {
          "feature": "Unsupervised Learning",
          "col1": "No labeled outputs; processes unannotated raw input datasets (X)",
          "col2": "Discovers latent structures, distributions, and clusters",
          "col3": "K-Means, PCA (Dimensionality Reduction), Autoencoders, Isolation Forests",
          "col4": "Anomalous credit card transaction detection, Automated demographic clustering",
          "status": "better-col2"
        },
        {
          "feature": "Reinforcement Learning",
          "col1": "No static dataset; autonomous agent interacts with dynamic environment",
          "col2": "Receives positive scalar rewards or negative penalties over time",
          "col3": "Q-Learning, Deep Q-Networks (DQN), PPO (Proximal Policy Optimization)",
          "col4": "Dynamic airline ticket pricing optimization, Real-time ad bidding engine",
          "status": "info"
        }
      ]
    },
    {
      "id": "t5_2_bi_stack",
      "title": "Business Intelligence & Data Warehousing Architecture Stack",
      "subtitle": "Layer-by-layer technical breakdown from raw operational sources to executive dashboards",
      "badge": "Data Warehouse Architecture",
      "headers": [
        "Architecture Layer",
        "Primary Technical Function",
        "Key Technologies Used",
        "Latency & Processing Mode",
        "Target User Persona"
      ],
      "rows": [
        {
          "feature": "1. Data Extraction & ETL",
          "col1": "Extracts from OLTP/APIs, cleans, standardizes, transforms, and loads",
          "col2": "Apache Airflow, Talend, dbt, Spark ETL, AWS Glue",
          "col3": "Scheduled nightly/hourly batch or real-time Kafka streaming",
          "col4": "Data Engineers & Pipeline Architects",
          "status": "info"
        },
        {
          "feature": "2. Enterprise Data Warehouse",
          "col1": "Centralized, subject-oriented, non-volatile, time-variant analytical repository",
          "col2": "Snowflake, Google BigQuery, Amazon Redshift, Star/Snowflake schemas",
          "col3": "Massively Parallel Processing (MPP) analytical storage",
          "col4": "Database Administrators & Data Architects",
          "status": "success"
        },
        {
          "feature": "3. OLAP Analytical Server",
          "col1": "Multi-dimensional cube calculation enabling Roll-up, Drill-down, Slice & Dice",
          "col2": "MOLAP (In-memory multi-dim), ROLAP (Relational OLAP), HOLAP (Hybrid)",
          "col3": "Sub-second multi-dimensional analytical queries",
          "col4": "BI Analysts & Financial Planners",
          "status": "better-col2"
        },
        {
          "feature": "4. Executive Visualization & BI",
          "col1": "Interactive visual charts, KPI metric trackers, and automated alerts",
          "col2": "Tableau, Microsoft Power BI, Looker, Apache Superset",
          "col3": "Interactive client-side web dashboards",
          "col4": "C-Suite Executives, Product Managers, Decision Makers",
          "status": "info"
        }
      ]
    }
  ],
  "5.3": [
    {
      "id": "t5_3_emerging_db",
      "title": "Emerging Database Architectures Comparison",
      "subtitle": "Comparing Multimedia, Mobile, and Digital Library Database Systems",
      "badge": "Specialized Database Systems",
      "headers": [
        "Specialized DB Architecture",
        "Primary Media / Data Format",
        "Key Engineering Challenges",
        "Querying & Search Paradigm",
        "Synchronization & Storage Solution"
      ],
      "rows": [
        {
          "feature": "Multimedia Databases (MMDBMS)",
          "col1": "High-resolution Images, Audio streams, Video, 3D Point Clouds, Geospatial Rasters",
          "col2": "Huge BLOB file sizes, real-time streaming QoS, content feature extraction",
          "col3": "Content-Based Image Retrieval (CBIR), Vector embeddings, Visual feature search",
          "col4": "High-throughput chunked streaming, Vector index (HNSW), Lossy compression codecs",
          "status": "info"
        },
        {
          "feature": "Mobile Databases",
          "col1": "Lightweight relational/document storage on smartphones, tablets, IoT edge devices",
          "col2": "Frequent intermittent network disconnections, battery depletion, weak CPU, multi-master conflicts",
          "col3": "Local SQLite / Realm / WatermelonDB queries with background batch sync",
          "col4": "Optimistic local writes + CRDTs (Conflict-free Replicated Data Types) or Last-Write-Wins (LWW) sync",
          "status": "success"
        },
        {
          "feature": "Digital Library Databases",
          "col1": "Massive repositories of scientific papers, digitized manuscripts, audio archives, legal deeds",
          "col2": "Long-term data preservation (100+ years), complex bibliographic metadata, multi-lingual search",
          "col3": "Dublin Core metadata search, Full-text inverted indexes (Lucene/Elasticsearch), OAI-PMH harvesting",
          "col4": "Immutable WORM storage (Write Once Read Many), High-density archive tiers, Cloud cold storage",
          "status": "better-col2"
        }
      ]
    }
  ]
};

export default structuredTablesData;
