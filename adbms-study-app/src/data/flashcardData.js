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
