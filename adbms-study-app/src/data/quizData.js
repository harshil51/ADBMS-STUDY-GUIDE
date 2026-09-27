export const QUIZ_QUESTIONS = [
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
  {
    "id": "q5_1_1",
    "topicId": "5.1",
    "moduleId": 5,
    "question": "In Association Rule Mining, how is the 'Support' of an itemset rule $(A \\Rightarrow B)$ defined?",
    "options": [
      "The percentage of transactions containing A that also contain B",
      "The proportion of all transactions in the database that contain both itemsets A and B",
      "The ratio of execution speedup achieved by parallel mining",
      "The count of clusters generated by K-Means"
    ],
    "correctIndex": 1,
    "explanation": "Support is the fraction of total transactions containing $A \\cup B$: $Support(A \\Rightarrow B) = \\frac{\\text{Count}(A \\cup B)}{\\text{Total Transactions}}$. Confidence measures the conditional probability $P(B|A)$.",
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
];
