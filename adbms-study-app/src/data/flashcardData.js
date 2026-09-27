export const FLASHCARDS_DATA = [
  {
    "id": "fc_1",
    "topicId": "1.1",
    "front": "What is a 2-Tier Architecture?",
    "back": "A client-server model with two physical/logical layers: Client (UI + Business Logic) and Database Server (Data storage + Query execution)."
  },
  {
    "id": "fc_2",
    "topicId": "1.1",
    "front": "What is a 3-Tier Architecture?",
    "back": "A model with three distinct layers: Presentation Tier (Client UI), Application Tier (Business Logic), and Data Tier (Database Engine). Highly scalable and secure."
  },
  {
    "id": "fc_3",
    "topicId": "1.1",
    "front": "What is a Fat/Thick Client?",
    "back": "A client application that contains its own business logic, validation code, and heavy drivers, communicating directly with the database."
  },
  {
    "id": "fc_4",
    "topicId": "1.2",
    "front": "What is the Lost Update Problem?",
    "back": "Occurs when two concurrent transactions read the same data item and update it based on the old value, causing one update to overwrite and erase the other."
  },
  {
    "id": "fc_5",
    "topicId": "1.2",
    "front": "Explain Shared Lock (S) vs Exclusive Lock (X)",
    "back": "Shared Lock (S) allows read-only access by multiple transactions. Exclusive Lock (X) gives sole read/write access to one transaction, blocking all other locks."
  },
  {
    "id": "fc_6",
    "topicId": "1.2",
    "front": "What is the 2-Phase Locking (2PL) Rule?",
    "back": "Growing Phase: Transaction can acquire locks but cannot release any. Shrinking Phase: Transaction can release locks but cannot acquire any new ones."
  },
  {
    "id": "fc_7",
    "topicId": "1.3",
    "front": "Define Shared Memory vs Shared Nothing",
    "back": "Shared Memory: All CPUs share common RAM and Disks (bottleneck at bus). Shared Nothing: Each node has private CPU, RAM, and Disk (infinitely scalable)."
  },
  {
    "id": "fc_8",
    "topicId": "1.3",
    "front": "What is Data Skew in Parallel Databases?",
    "back": "Uneven distribution of data or query workload across parallel nodes, causing some nodes to be overloaded while others sit idle."
  },
  {
    "id": "fc_9",
    "topicId": "1.4",
    "front": "What is Two-Phase Commit (2PC)?",
    "back": "A distributed consensus protocol ensuring atomic commits across multiple sites: Phase 1 (Prepare/Vote) and Phase 2 (Global Commit or Global Abort)."
  },
  {
    "id": "fc_10",
    "topicId": "1.4",
    "front": "Horizontal vs Vertical Fragmentation",
    "back": "Horizontal Fragmentation splits tables by rows (using WHERE filter). Vertical Fragmentation splits tables by columns (retaining primary key in each)."
  },
  {
    "id": "fc_m2_1",
    "topicId": "2.1",
    "front": "What is an ORDBMS (Object-Relational DBMS)?",
    "back": "A relational database management system extended with object-oriented capabilities such as user-defined complex structured types, methods, inheritance, and collection types while retaining full SQL support."
  },
  {
    "id": "fc_m2_2",
    "topicId": "2.1",
    "front": "What is a Structured Type in SQL:1999?",
    "back": "A named, user-defined composite data type (created with `CREATE TYPE TypeName AS (...)`) consisting of one or more named attributes and encapsulated methods."
  },
  {
    "id": "fc_m2_3",
    "topicId": "2.2",
    "front": "How is Type Inheritance declared in SQL:1999?",
    "back": "Using the `UNDER` clause (e.g. `CREATE TYPE StudentType UNDER PersonType (...)`), where the subtype inherits all attributes and methods of the supertype."
  },
  {
    "id": "fc_m2_4",
    "topicId": "2.2",
    "front": "What does the `ONLY` keyword do in table queries?",
    "back": "In `SELECT * FROM ONLY(SuperTable);`, it restricts query evaluation to rows belonging directly to SuperTable, suppressing rows stored in subtables."
  },
  {
    "id": "fc_m2_5",
    "topicId": "2.2",
    "front": "ARRAY vs MULTISET in SQL:1999",
    "back": "ARRAY is an ordered, 1-based indexed collection allowing duplicates. MULTISET is an unordered bag of elements allowing duplicates and supporting set operations."
  },
  {
    "id": "fc_m2_6",
    "topicId": "2.3",
    "front": "What is Object Identity (OID)?",
    "back": "A permanent, system-generated, immutable identifier that uniquely identifies a row in a typed table independently of its attribute values."
  },
  {
    "id": "fc_m2_7",
    "topicId": "2.3",
    "front": "What is the Dereferencing Operator (`->`)?",
    "back": "An operator in SQL:1999 used to follow a `REF` pointer directly to read an attribute from the target object without writing an explicit SQL JOIN (e.g., `e.dept->dept_name`)."
  },
  {
    "id": "fc_m2_8",
    "topicId": "2.4",
    "front": "What are the 5 clauses of a FLWOR expression in XQuery?",
    "back": "FOR (iteration over nodes), LET (variable assignment), WHERE (filtering), ORDER BY (sorting), and RETURN (result formatting)."
  },
  {
    "id": "fc_m2_9",
    "topicId": "2.4",
    "front": "DTD vs XML Schema (XSD)",
    "back": "DTD uses non-XML syntax and lacks data typing. XSD is written in XML, supports 40+ data types, numeric occurrence constraints (minOccurs/maxOccurs), and namespaces."
  },
  {
    "id": "fc_m2_10",
    "topicId": "2.5",
    "front": "INNER JOIN vs LEFT OUTER JOIN",
    "back": "INNER JOIN returns only rows with a matching key in both tables. LEFT OUTER JOIN returns all rows from the left table, padding right columns with NULL for non-matches."
  },
  {
    "id": "fc_m2_11",
    "topicId": "2.5",
    "front": "What is a Scalar User-Defined Function (UDF)?",
    "back": "A reusable database function that accepts input parameters, executes algorithmic logic, and returns a single scalar value usable in SELECT or WHERE clauses."
  },
  {
    "id": "fc_11",
    "topicId": "3.1",
    "front": "What is Semi-Structured Data?",
    "back": "Data that does not fit a rigid relational schema but contains self-describing tags, keys, and hierarchical nesting (e.g., JSON, XML)."
  },
  {
    "id": "fc_12",
    "topicId": "3.2",
    "front": "State the CAP Theorem",
    "back": "In a distributed data system with network partition (P), you can only guarantee either Consistency (C) or Availability (A), but never all three simultaneously."
  },
  {
    "id": "fc_13",
    "topicId": "3.2",
    "front": "What does BASE stand for in NoSQL?",
    "back": "Basically Available, Soft state, Eventual consistency (contrasted with relational ACID)."
  },
  {
    "id": "fc_14",
    "topicId": "3.3",
    "front": "What is a Document in MongoDB?",
    "back": "A record in MongoDB stored as BSON (Binary JSON), consisting of field-value pairs similar to a JSON object."
  },
  {
    "id": "fc_15",
    "topicId": "3.4",
    "front": "What does MongoDB Projection do?",
    "back": "Specifies which fields to return (1) or suppress (0) from matching documents, reducing network payload."
  },
  {
    "id": "fc_16",
    "topicId": "3.5",
    "front": "What is the MongoDB Aggregation Pipeline?",
    "back": "A multi-stage framework where documents pass through sequential transformations ($match, $group, $project, $sort) to produce summarized analytics."
  },
  {
    "id": "fc_17",
    "topicId": "4.1",
    "front": "List the 4 ACID Properties",
    "back": "Atomicity (all-or-nothing), Consistency (state validity), Isolation (concurrency protection), Durability (persisted post-commit)."
  },
  {
    "id": "fc_18",
    "topicId": "4.2",
    "front": "What is a TP Monitor?",
    "back": "Transaction Processing Monitor: Middleware coordinating distributed transactions, managing client connection pools, and ensuring atomic completion across resource managers."
  },
  {
    "id": "fc_19",
    "topicId": "4.3",
    "front": "Hard vs Soft Real-Time Systems",
    "back": "Hard Real-Time: Missing a deadline is a catastrophic system failure. Soft Real-Time: Missing a deadline degrades performance/utility without system crash."
  },
  {
    "id": "fc_20",
    "topicId": "4.4",
    "front": "What is the Saga Pattern?",
    "back": "An architectural pattern that breaks a long-duration transaction into a chain of local transactions, with each step paired with a compensating transaction for failure rollback."
  },
  {
    "id": "fc_21",
    "topicId": "5.1",
    "front": "What is the Apriori Algorithm?",
    "back": "A data mining algorithm that discovers frequent itemsets and association rules using the Apriori principle: all non-empty subsets of a frequent itemset must also be frequent."
  },
  {
    "id": "fc_22",
    "topicId": "5.2",
    "front": "What is an OLAP Cube?",
    "back": "An Online Analytical Processing data structure allowing multidimensional data analysis with operations like Slice, Dice, Drill-down, and Roll-up."
  },
  {
    "id": "fc_23",
    "topicId": "5.3",
    "front": "What is Disconnected Operation in Mobile DBs?",
    "back": "The ability of a mobile database to perform local read and write transactions while network connectivity is lost, synchronizing when reconnected."
  }
];
