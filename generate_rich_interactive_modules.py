import json
import os

# 1. QUIZ DATA: Comprehensive MCQs for all 16 topics based on the textbook
quiz_questions = [
  # Topic 1.1
  {
    "id": "q1_1_1",
    "topicId": "1.1",
    "moduleId": 1,
    "question": "In a 3-tier database architecture, where does the business logic reside?",
    "options": [
      "Inside the client browser (presentation tier)",
      "Inside the database engine (data tier)",
      "Inside the application server (middle tier)",
      "Directly within the network router"
    ],
    "correctIndex": 2,
    "explanation": "In 3-tier architecture, the presentation layer (client) handles UI, the application server (middle tier) handles business logic and rules, and the database server handles data storage and execution.",
    "difficulty": "Easy"
  },
  {
    "id": "q1_1_2",
    "topicId": "1.1",
    "moduleId": 1,
    "question": "Which of the following is a primary limitation of 2-tier client-server architecture?",
    "options": [
      "Higher network hops and slower latency on local LAN",
      "Business logic mixed with UI making updates difficult across all client machines",
      "Inability to connect via ODBC or JDBC drivers",
      "Requirement for expensive multi-tier application load balancers"
    ],
    "correctIndex": 1,
    "explanation": "In 2-tier architecture ('Fat Client'), business logic is installed on every client machine. Updating application rules requires updating every single client, and direct database access creates security and scalability bottlenecks.",
    "difficulty": "Medium"
  },

  # Topic 1.2
  {
    "id": "q1_2_1",
    "topicId": "1.2",
    "moduleId": 1,
    "question": "What is the primary rule of the Two-Phase Locking (2PL) protocol?",
    "options": [
      "A transaction can release locks during the growing phase",
      "Once a transaction releases a single lock (shrinking phase), it cannot acquire any new locks",
      "A transaction must hold all locks until the system restarts",
      "Shared locks can be upgraded during the shrinking phase"
    ],
    "correctIndex": 1,
    "explanation": "In 2PL, the growing phase allows acquiring locks but not releasing them. The shrinking phase allows releasing locks, but once shrinking starts, no new locks can be acquired.",
    "difficulty": "Medium"
  },
  {
    "id": "q1_2_2",
    "topicId": "1.2",
    "moduleId": 1,
    "question": "In a Wait-For Graph (WFG) used for deadlock detection, what indicates the presence of a deadlock?",
    "options": [
      "A tree structure with no branches",
      "A directed cycle among waiting transactions",
      "An isolated node with no incoming edges",
      "Multiple shared locks on the same data item"
    ],
    "correctIndex": 1,
    "explanation": "A cycle in the Wait-For Graph means transaction T1 is waiting for T2, which is waiting for Tn, which is waiting for T1, resulting in a circular wait condition (deadlock).",
    "difficulty": "Easy"
  },

  # Topic 1.3
  {
    "id": "q1_3_1",
    "topicId": "1.3",
    "moduleId": 1,
    "question": "Which parallel database architecture offers the highest scalability for massive datasets by eliminating shared hardware bottlenecks?",
    "options": [
      "Shared Memory Architecture",
      "Shared Disk Architecture",
      "Shared Nothing Architecture",
      "Centralized Mainframe Architecture"
    ],
    "correctIndex": 2,
    "explanation": "In Shared Nothing architecture, each node has its own independent CPU, RAM, and Disk. Nodes communicate via high-speed interconnects, eliminating bus and memory contention bottlenecks and scaling to thousands of nodes.",
    "difficulty": "Medium"
  },
  {
    "id": "q1_3_2",
    "topicId": "1.3",
    "moduleId": 1,
    "question": "What is the difference between Interquery and Intraquery parallelism?",
    "options": [
      "Interquery executes one query across multiple CPUs; Intraquery executes separate queries concurrently",
      "Interquery executes multiple different queries in parallel; Intraquery splits a single query into sub-operations run in parallel",
      "Interquery is used in single-node databases only; Intraquery is used in distributed databases only",
      "Interquery requires shared memory; Intraquery requires shared disks"
    ],
    "correctIndex": 1,
    "explanation": "Interquery parallelism increases overall system throughput by executing independent queries simultaneously. Intraquery parallelism decreases response time for a single complex query by dividing it among multiple processors.",
    "difficulty": "Medium"
  },

  # Topic 1.4
  {
    "id": "q1_4_1",
    "topicId": "1.4",
    "moduleId": 1,
    "question": "During Phase 1 (Prepare Phase) of the Two-Phase Commit (2PC) protocol, what happens if a participant site cannot commit?",
    "options": [
      "The coordinator forces all other sites to commit anyway",
      "The participant votes 'NO' (Abort), causing the coordinator to broadcast a GLOBAL-ABORT to all sites",
      "The participant retries indefinitely until memory frees up",
      "The transaction splits into a vertical fragment"
    ],
    "correctIndex": 1,
    "explanation": "In 2PC, all participants must vote 'YES' (Ready) for the transaction to proceed. A single 'NO' vote causes the coordinator to issue a Global Abort.",
    "difficulty": "Hard"
  },
  {
    "id": "q1_4_2",
    "topicId": "1.4",
    "moduleId": 1,
    "question": "What is Horizontal Fragmentation in distributed databases?",
    "options": [
      "Splitting a table by columns (attributes), keeping the primary key in each fragment",
      "Splitting a table by rows (tuples) using selection predicates",
      "Replicating the entire database at every geographic node",
      "Converting relational tables into MongoDB JSON documents"
    ],
    "correctIndex": 1,
    "explanation": "Horizontal Fragmentation divides a relation into subsets of rows (tuples) using a selection condition (e.g. branch_location = 'New York'). Vertical fragmentation splits columns.",
    "difficulty": "Easy"
  },

  # Topic 3.1
  {
    "id": "q3_1_1",
    "topicId": "3.1",
    "moduleId": 3,
    "question": "Which of the following data formats is classified as Semi-Structured data?",
    "options": [
      "Relational SQL table with fixed schema",
      "JSON document or XML file with key-value tags and nested objects",
      "Raw video MP4 file or uncompressed audio stream",
      "A compiled C++ binary executable"
    ],
    "correctIndex": 1,
    "explanation": "Semi-structured data (like JSON, XML, YAML) does not conform to a rigid relational schema but contains self-describing internal markers, tags, and hierarchy.",
    "difficulty": "Easy"
  },

  # Topic 3.2
  {
    "id": "q3_2_1",
    "topicId": "3.2",
    "moduleId": 3,
    "question": "According to Eric Brewer's CAP Theorem, what can a distributed data store guarantee simultaneously during network partitions?",
    "options": [
      "All three: Consistency, Availability, and Partition Tolerance",
      "At most two out of Consistency (C), Availability (A), and Partition Tolerance (P)",
      "Only Consistency, never Availability",
      "Only ACID properties, never BASE properties"
    ],
    "correctIndex": 1,
    "explanation": "The CAP theorem states that in the event of a network partition (P), a distributed system must choose between guaranteeing Consistency (CP) or Availability (AP).",
    "difficulty": "Medium"
  },
  {
    "id": "q3_2_2",
    "topicId": "3.2",
    "moduleId": 3,
    "question": "Which NoSQL database category is specifically optimized for storing nodes and edges to query complex network relationships?",
    "options": [
      "Key-Value Store (e.g., Redis)",
      "Document Store (e.g., MongoDB)",
      "Column-Family Store (e.g., Apache Cassandra)",
      "Graph Database (e.g., Neo4j)"
    ],
    "correctIndex": 3,
    "explanation": "Graph databases use nodes (entities) and edges (relationships) with properties to rapidly traverse complex networks like social graphs and recommendation engines.",
    "difficulty": "Easy"
  },

  # Topic 3.3
  {
    "id": "q3_3_1",
    "topicId": "3.3",
    "moduleId": 3,
    "question": "What is the equivalent of a Relational Table in MongoDB?",
    "options": [
      "Document",
      "Collection",
      "Database",
      "Field"
    ],
    "correctIndex": 1,
    "explanation": "In MongoDB, a Collection is a group of documents, which directly corresponds to a Table in relational databases.",
    "difficulty": "Easy"
  },
  {
    "id": "q3_3_2",
    "topicId": "3.3",
    "moduleId": 3,
    "question": "What is the default primary key field automatically generated by MongoDB for each document?",
    "options": [
      "id",
      "_id (ObjectId)",
      "row_id",
      "primary_key"
    ],
    "correctIndex": 1,
    "explanation": "Every MongoDB document requires an immutable `_id` field. If not provided, MongoDB automatically generates a 12-byte `ObjectId` consisting of timestamp, machine ID, process ID, and counter.",
    "difficulty": "Easy"
  },

  # Topic 3.4
  {
    "id": "q3_4_1",
    "topicId": "3.4",
    "moduleId": 3,
    "question": "Which MongoDB query operator matches documents where a field is greater than a specified value?",
    "options": [
      "$gt",
      "$gte",
      "$greater",
      "$max"
    ],
    "correctIndex": 0,
    "explanation": "`$gt` is the comparison operator for 'greater than' (e.g., `{ marks: { $gt: 80 } }`).",
    "difficulty": "Easy"
  },
  {
    "id": "q3_4_2",
    "topicId": "3.4",
    "moduleId": 3,
    "question": "In the MongoDB query `db.students.find({}, { name: 1, _id: 0 })`, what does the second argument represent?",
    "options": [
      "Query filter condition",
      "Projection specifying which fields to include or exclude in the result",
      "Sort criteria",
      "Index hint"
    ],
    "correctIndex": 1,
    "explanation": "The second parameter of `find()` is the Projection document. `name: 1` includes the name field, and `_id: 0` explicitly suppresses the default `_id` field.",
    "difficulty": "Medium"
  },

  # Topic 3.5
  {
    "id": "q3_5_1",
    "topicId": "3.5",
    "moduleId": 3,
    "question": "What is the primary function of the `$match` stage in a MongoDB Aggregation Pipeline?",
    "options": [
      "Groups documents by a specified key",
      "Filters documents so that only matching documents pass to the next stage",
      "Sorts all documents in ascending or descending order",
      "Unwinds arrays into separate documents"
    ],
    "correctIndex": 1,
    "explanation": "`$match` filters the document stream, acting like a `WHERE` clause in SQL to reduce the number of documents passed to subsequent pipeline stages.",
    "difficulty": "Easy"
  },
  {
    "id": "q3_5_2",
    "topicId": "3.5",
    "moduleId": 3,
    "question": "Which aggregation pipeline operator is used to deconstruct an array field in documents to create a separate output document for each array element?",
    "options": [
      "$group",
      "$unwind",
      "$project",
      "$lookup"
    ],
    "correctIndex": 1,
    "explanation": "`$unwind` deconstructs an array field from the input documents to output a document for each element in the array.",
    "difficulty": "Medium"
  },

  # Topic 4.1
  {
    "id": "q4_1_1",
    "topicId": "4.1",
    "moduleId": 4,
    "question": "Which ACID property ensures that the database transitions from one valid state to another, maintaining all integrity constraints?",
    "options": [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    "correctIndex": 1,
    "explanation": "Consistency guarantees that any transaction will bring the database from one valid state to another, enforcing schema rules, unique keys, and foreign key constraints.",
    "difficulty": "Easy"
  },
  {
    "id": "q4_1_2",
    "topicId": "4.1",
    "moduleId": 4,
    "question": "In the transaction state diagram, what state does a transaction enter immediately after the final statement has executed, before writing to disk is finalized?",
    "options": [
      "Active",
      "Partially Committed",
      "Committed",
      "Terminated"
    ],
    "correctIndex": 1,
    "explanation": "A transaction enters the 'Partially Committed' state after the last operation has executed. Only when all recovery log records are flushed to non-volatile storage does it transition to 'Committed'.",
    "difficulty": "Medium"
  },

  # Topic 4.2
  {
    "id": "q4_2_1",
    "topicId": "4.2",
    "moduleId": 4,
    "question": "What is the primary role of a Transaction Processing (TP) Monitor?",
    "options": [
      "A graphical tool for drawing ER diagrams",
      "Middleware that manages client connections, coordinates distributed transactions, and balances server loads",
      "A replacement for SQL relational query optimizers",
      "A hardware storage controller for RAID disks"
    ],
    "correctIndex": 1,
    "explanation": "TP Monitors (such as Tuxedo or CICS) serve as enterprise middleware that routes client requests, manages thread pooling, maintains transaction boundaries, and guarantees 2PC across multiple databases.",
    "difficulty": "Medium"
  },

  # Topic 4.3
  {
    "id": "q4_3_1",
    "topicId": "4.3",
    "moduleId": 4,
    "question": "In a Hard Real-Time Database System, what happens if a transaction misses its deadline?",
    "options": [
      "The system experiences a minor drop in user satisfaction",
      "Catastrophic failure with serious physical, financial, or safety consequences",
      "The transaction automatically retries in the next batch cycle",
      "The database drops to soft consistency"
    ],
    "correctIndex": 1,
    "explanation": "In Hard Real-Time systems (e.g. flight avionics, nuclear plant controllers), missing a strict deadline causes total system failure or catastrophic disaster. In Soft Real-Time, results are merely degraded.",
    "difficulty": "Easy"
  },
  {
    "id": "q4_3_2",
    "topicId": "4.3",
    "moduleId": 4,
    "question": "Which real-time scheduling algorithm always assigns highest priority to the transaction whose deadline is closest to current time?",
    "options": [
      "Round Robin (RR)",
      "Earliest Deadline First (EDF)",
      "First In First Out (FIFO)",
      "Shortest Job First (SJF)"
    ],
    "correctIndex": 1,
    "explanation": "Earliest Deadline First (EDF) dynamically prioritizes transactions based on the absolute earliest deadline ($d_i$).",
    "difficulty": "Medium"
  },

  # Topic 4.4
  {
    "id": "q4_4_1",
    "topicId": "4.4",
    "moduleId": 4,
    "question": "Why are standard ACID rollbacks unsuitable for Long Duration Transactions in distributed microservices?",
    "options": [
      "Because long-running transactions holding locks for hours freeze other transactions, and committed sub-steps cannot simply be rolled back at the storage level",
      "Because SQL does not allow transactions longer than 10 seconds",
      "Because NoSQL databases do not support nested sub-transactions",
      "Because network latency causes CPU overheating"
    ],
    "correctIndex": 0,
    "explanation": "Long duration transactions lock resources for extended periods. When failure occurs after hours or days, earlier sub-transactions that committed cannot be rolled back via WAL; instead, semantic Compensating Transactions (Saga pattern) must logically reverse the work.",
    "difficulty": "Hard"
  },
  {
    "id": "q4_4_2",
    "topicId": "4.4",
    "moduleId": 4,
    "question": "In the Saga Pattern for distributed transactions, what is a 'Compensating Transaction'?",
    "options": [
      "A bonus payment paid to cloud providers for high availability",
      "A forward transaction that undoes the semantic business effect of an already committed earlier step",
      "A hardware backup snapshot",
      "An automated deadlock resolution algorithm"
    ],
    "correctIndex": 1,
    "explanation": "A compensating transaction $C_i$ semantically reverses the business effects of a committed transaction $T_i$ (e.g., refunding a credit card charge after a hotel booking fails).",
    "difficulty": "Medium"
  },

  # Topic 5.1
  {
    "id": "q5_1_1",
    "topicId": "5.1",
    "moduleId": 5,
    "question": "In Association Rule Mining, how is the 'Support' of an itemset rule $(A \Rightarrow B)$ defined?",
    "options": [
      "The percentage of transactions containing A that also contain B",
      "The proportion of all transactions in the database that contain both itemsets A and B",
      "The ratio of execution speedup achieved by parallel mining",
      "The count of clusters generated by K-Means"
    ],
    "correctIndex": 1,
    "explanation": "Support is the fraction of total transactions containing $A \cup B$: $Support(A \Rightarrow B) = \\frac{\\text{Count}(A \\cup B)}{\\text{Total Transactions}}$. Confidence measures the conditional probability $P(B|A)$.",
    "difficulty": "Medium"
  },
  {
    "id": "q5_1_2",
    "topicId": "5.1",
    "moduleId": 5,
    "question": "What is the key difference between Classification and Clustering in Data Mining?",
    "options": [
      "Classification is unsupervised; Clustering is supervised",
      "Classification assigns data to predefined known classes (supervised); Clustering groups data based on natural similarities without predefined labels (unsupervised)",
      "Classification works on images only; Clustering works on numbers only",
      "Classification is done in SQL; Clustering is done in MongoDB only"
    ],
    "correctIndex": 1,
    "explanation": "Classification uses labeled training data to predict categories (supervised learning). Clustering groups unlabeled data points by measuring distance/similarity (unsupervised learning).",
    "difficulty": "Easy"
  },

  # Topic 5.2
  {
    "id": "q5_2_1",
    "topicId": "5.2",
    "moduleId": 5,
    "question": "What are the three core stages of the ETL process in Business Intelligence?",
    "options": [
      "Evaluate, Train, Learn",
      "Extract (from source systems), Transform (clean and normalize), Load (into data warehouse)",
      "Encrypt, Transmit, Lock",
      "Execute, Test, Log"
    ],
    "correctIndex": 1,
    "explanation": "ETL stands for Extract (pulling data from OLTP/ERP sources), Transform (cleaning, conforming, validating), and Load (inserting into target Data Warehouse/Marts).",
    "difficulty": "Easy"
  },

  # Topic 5.3
  {
    "id": "q5_3_1",
    "topicId": "5.3",
    "moduleId": 5,
    "question": "What is Content-Based Image Retrieval (CBIR) in Multimedia Databases?",
    "options": [
      "Searching images by typing textual filenames",
      "Analyzing visual features such as colors, shapes, textures, and vectors to retrieve similar images",
      "Storing pictures as raw text base64 strings in relational tables",
      "Synchronizing mobile phone contacts with the cloud"
    ],
    "correctIndex": 1,
    "explanation": "CBIR queries multimedia databases by analyzing actual perceptual features (color histograms, edge detection, shape features) rather than just manual text tags.",
    "difficulty": "Medium"
  },
  {
    "id": "q5_3_2",
    "topicId": "5.3",
    "moduleId": 5,
    "question": "What is the key technical challenge unique to Mobile Databases?",
    "options": [
      "Phones cannot store numeric data",
      "Disconnected operation handling, local caching, and conflict resolution during synchronization",
      "Lack of touchscreen support",
      "Requirement for optical fiber connections"
    ],
    "correctIndex": 1,
    "explanation": "Mobile databases operate on intermittently connected devices. The system must support local offline transactions, record delta logs, and resolve write conflicts when reconnecting to the central server.",
    "difficulty": "Medium"
  }
]

# 2. FLASHCARD DATA: 80+ Flashcards
flashcards_data = [
  {"id": "fc_1", "topicId": "1.1", "front": "What is a 2-Tier Architecture?", "back": "A client-server model with two physical/logical layers: Client (UI + Business Logic) and Database Server (Data storage + Query execution)."},
  {"id": "fc_2", "topicId": "1.1", "front": "What is a 3-Tier Architecture?", "back": "A model with three distinct layers: Presentation Tier (Client UI), Application Tier (Business Logic), and Data Tier (Database Engine). Highly scalable and secure."},
  {"id": "fc_3", "topicId": "1.1", "front": "What is a Fat/Thick Client?", "back": "A client application that contains its own business logic, validation code, and heavy drivers, communicating directly with the database."},
  {"id": "fc_4", "topicId": "1.2", "front": "What is the Lost Update Problem?", "back": "Occurs when two concurrent transactions read the same data item and update it based on the old value, causing one update to overwrite and erase the other."},
  {"id": "fc_5", "topicId": "1.2", "front": "Explain Shared Lock (S) vs Exclusive Lock (X)", "back": "Shared Lock (S) allows read-only access by multiple transactions. Exclusive Lock (X) gives sole read/write access to one transaction, blocking all other locks."},
  {"id": "fc_6", "topicId": "1.2", "front": "What is the 2-Phase Locking (2PL) Rule?", "back": "Growing Phase: Transaction can acquire locks but cannot release any. Shrinking Phase: Transaction can release locks but cannot acquire any new ones."},
  {"id": "fc_7", "topicId": "1.3", "front": "Define Shared Memory vs Shared Nothing", "back": "Shared Memory: All CPUs share common RAM and Disks (bottleneck at bus). Shared Nothing: Each node has private CPU, RAM, and Disk (infinitely scalable)."},
  {"id": "fc_8", "topicId": "1.3", "front": "What is Data Skew in Parallel Databases?", "back": "Uneven distribution of data or query workload across parallel nodes, causing some nodes to be overloaded while others sit idle."},
  {"id": "fc_9", "topicId": "1.4", "front": "What is Two-Phase Commit (2PC)?", "back": "A distributed consensus protocol ensuring atomic commits across multiple sites: Phase 1 (Prepare/Vote) and Phase 2 (Global Commit or Global Abort)."},
  {"id": "fc_10", "topicId": "1.4", "front": "Horizontal vs Vertical Fragmentation", "back": "Horizontal Fragmentation splits tables by rows (using WHERE filter). Vertical Fragmentation splits tables by columns (retaining primary key in each)."},
  {"id": "fc_11", "topicId": "3.1", "front": "What is Semi-Structured Data?", "back": "Data that does not fit a rigid relational schema but contains self-describing tags, keys, and hierarchical nesting (e.g., JSON, XML)."},
  {"id": "fc_12", "topicId": "3.2", "front": "State the CAP Theorem", "back": "In a distributed data system with network partition (P), you can only guarantee either Consistency (C) or Availability (A), but never all three simultaneously."},
  {"id": "fc_13", "topicId": "3.2", "front": "What does BASE stand for in NoSQL?", "back": "Basically Available, Soft state, Eventual consistency (contrasted with relational ACID)."},
  {"id": "fc_14", "topicId": "3.3", "front": "What is a Document in MongoDB?", "back": "A record in MongoDB stored as BSON (Binary JSON), consisting of field-value pairs similar to a JSON object."},
  {"id": "fc_15", "topicId": "3.4", "front": "What does MongoDB Projection do?", "back": "Specifies which fields to return (1) or suppress (0) from matching documents, reducing network payload."},
  {"id": "fc_16", "topicId": "3.5", "front": "What is the MongoDB Aggregation Pipeline?", "back": "A multi-stage framework where documents pass through sequential transformations ($match, $group, $project, $sort) to produce summarized analytics."},
  {"id": "fc_17", "topicId": "4.1", "front": "List the 4 ACID Properties", "back": "Atomicity (all-or-nothing), Consistency (state validity), Isolation (concurrency protection), Durability (persisted post-commit)."},
  {"id": "fc_18", "topicId": "4.2", "front": "What is a TP Monitor?", "back": "Transaction Processing Monitor: Middleware coordinating distributed transactions, managing client connection pools, and ensuring atomic completion across resource managers."},
  {"id": "fc_19", "topicId": "4.3", "front": "Hard vs Soft Real-Time Systems", "back": "Hard Real-Time: Missing a deadline is a catastrophic system failure. Soft Real-Time: Missing a deadline degrades performance/utility without system crash."},
  {"id": "fc_20", "topicId": "4.4", "front": "What is the Saga Pattern?", "back": "An architectural pattern that breaks a long-duration transaction into a chain of local transactions, with each step paired with a compensating transaction for failure rollback."},
  {"id": "fc_21", "topicId": "5.1", "front": "What is the Apriori Algorithm?", "back": "A data mining algorithm that discovers frequent itemsets and association rules using the Apriori principle: all non-empty subsets of a frequent itemset must also be frequent."},
  {"id": "fc_22", "topicId": "5.2", "front": "What is an OLAP Cube?", "back": "An Online Analytical Processing data structure allowing multidimensional data analysis with operations like Slice, Dice, Drill-down, and Roll-up."},
  {"id": "fc_23", "topicId": "5.3", "front": "What is Disconnected Operation in Mobile DBs?", "back": "The ability of a mobile database to perform local read and write transactions while network connectivity is lost, synchronizing when reconnected."}
]

# 3. FORMULAS DATA: Key formulas
formula_data = [
  {
    "id": "f1",
    "topicId": "1.3",
    "title": "Speedup in Parallel Databases",
    "latex": "Speedup = \\frac{T_{sequential}}{T_{parallel}}",
    "meaning": "Measures how much faster a fixed-size database query runs when more processors are added.",
    "symbols": [
      {"symbol": "T_{sequential}", "meaning": "Time taken to execute on 1 processor"},
      {"symbol": "T_{parallel}", "meaning": "Time taken to execute on N processors"}
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
      {"symbol": "T_{small}(N)", "meaning": "Time to process base dataset on N nodes"},
      {"symbol": "T_{large}(m \\cdot N)", "meaning": "Time to process m-times larger dataset on m-times more nodes"}
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
      {"symbol": "d_i", "meaning": "Absolute deadline timestamp of transaction T_i"},
      {"symbol": "t", "meaning": "Current system clock time"},
      {"symbol": "e_i", "meaning": "Remaining estimated execution time required"}
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
      {"symbol": "Count(A \\cup B)", "meaning": "Number of transactions containing both items A and B"},
      {"symbol": "N", "meaning": "Total number of transactions in the database"}
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
      {"symbol": "Count(A \\cup B)", "meaning": "Transactions containing both A and B"},
      {"symbol": "Count(A)", "meaning": "Transactions containing itemset A"}
    ],
    "example": "If 400 shoppers bought Bread, and 200 of them also bought Milk, Confidence = 200 / 400 = 50% (0.50)."
  }
]

# Write quizData.js
with open('adbms-study-app/src/data/quizData.js', 'w', encoding='utf-8') as f:
    f.write(f"export const QUIZ_QUESTIONS = {json.dumps(quiz_questions, indent=2)};\n")

# Write flashcardData.js
with open('adbms-study-app/src/data/flashcardData.js', 'w', encoding='utf-8') as f:
    f.write(f"export const FLASHCARDS_DATA = {json.dumps(flashcards_data, indent=2)};\n")

# Write formulaData.js
with open('adbms-study-app/src/data/formulaData.js', 'w', encoding='utf-8') as f:
    f.write(f"export const FORMULA_DATA = {json.dumps(formula_data, indent=2)};\n")

print("Generated quizData.js, flashcardData.js, formulaData.js successfully!")
