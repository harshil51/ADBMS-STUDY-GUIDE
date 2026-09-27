import json

TABLES_DATA = {
    "1.1": [
        {
            "id": "t1_1_arch",
            "title": "Two-Tier vs. Three-Tier Client-Server Architecture",
            "subtitle": "Head-to-head engineering comparison across architecture, scaling, security, and maintenance",
            "badge": "GTU Core 7-Mark Question",
            "headers": ["Feature / Metric", "Two-Tier Architecture (Fat Client)", "Three-Tier Architecture (Thin Client)", "Verdict / Advantage"],
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
            "headers": ["2PL Protocol Variant", "Lock Acquisition Phase", "Lock Release Timing", "Cascading Rollback Prevention", "Deadlock Prevention", "Concurrency Level"],
            "rows": [
                {
                    "feature": "Basic 2PL",
                    "col1": "Acquires locks dynamically during growing phase",
                    "col2": "Can release locks anytime after reaching the Lock Point",
                    "col3": "❌ No (Uncommitted dirty reads possible)",
                    "col4": "❌ No (Circular waits can occur)",
                    "col5": "⚡ High (Locks released early)",
                    "status": "warning"
                },
                {
                    "feature": "Strict 2PL",
                    "col1": "Acquires Shared & Exclusive locks dynamically",
                    "col2": "Exclusive (X) locks held until COMMIT / ABORT",
                    "col3": "✅ Yes (Prevents dirty reads and cascades)",
                    "col4": "❌ No (Deadlocks still possible)",
                    "col5": "⚖️ Moderate (Shared locks freed early)",
                    "status": "success"
                },
                {
                    "feature": "Rigorous 2PL",
                    "col1": "Acquires all locks during execution",
                    "col2": "ALL locks (Shared & Exclusive) held until COMMIT / ABORT",
                    "col3": "✅ Yes (Strict serializability & easy recovery)",
                    "col4": "❌ No (Deadlocks still possible)",
                    "col5": "🔻 Lower (Longer lock retention)",
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
            "headers": ["Architecture Type", "Shared Memory", "Shared Disks", "Interconnect Bottleneck", "Scalability Limit", "Fault Isolation", "Ideal Workload"],
            "rows": [
                {
                    "feature": "Shared Memory (SMP)",
                    "col1": "✅ Shared across all CPUs via bus",
                    "col2": "✅ Shared single storage subsystem",
                    "col3": "High (Memory bus saturation & cache coherency)",
                    "col4": "Low (Max ~32 to 64 processors)",
                    "col5": "Low (Memory fault crashes entire system)",
                    "col6": "Small single-box DB servers, low-latency OLTP",
                    "status": "warning"
                },
                {
                    "feature": "Shared Disk (Cluster)",
                    "col1": "❌ Private memory per node",
                    "col2": "✅ Shared storage via SAN / NAS / Fibre Channel",
                    "col3": "Moderate (Network storage bandwidth & lock manager)",
                    "col4": "Medium (Dozens of cluster nodes)",
                    "col5": "High (Node crash fails over; shared data intact)",
                    "col6": "Oracle RAC, enterprise fault-tolerant clustering",
                    "status": "info"
                },
                {
                    "feature": "Shared Nothing (MPP)",
                    "col1": "❌ Independent private RAM per node",
                    "col2": "❌ Independent private disk per node",
                    "col3": "Low (High-speed commodity network message passing)",
                    "col4": "Massive (Hundreds or thousands of nodes)",
                    "col5": "Highest (Node failure isolated; partitioned data replicated)",
                    "col6": "Teradata, Google BigQuery, Snowflake, Cassandra",
                    "status": "success"
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
            "headers": ["Dimension / Metric", "Centralized Database (CDBMS)", "Distributed Database (DDBMS)", "Key Advantage / Takeaway"],
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
                    "feature": "Scalability & Elasticity",
                    "col1": "Vertical scaling only (upgrade CPU/RAM on single box)",
                    "col2": "Horizontal scaling (add more low-cost commodity nodes)",
                    "verdict": "DDBMS scales indefinitely",
                    "status": "better-col2"
                }
            ]
        }
    ],
    "2.1": [
        {
            "id": "t2_1_rdbms_ordbms",
            "title": "Relational (RDBMS) vs. Object-Relational (ORDBMS) vs. Pure Object-Oriented (OODBMS)",
            "subtitle": "Comprehensive comparison across data model, type systems, query languages, impedance mismatch, and industry adoption",
            "badge": "GTU Core 7-Mark Question",
            "headers": ["Architectural Dimension", "Relational (RDBMS)", "Object-Relational (ORDBMS)", "Object-Oriented (OODBMS)", "Verdict / Modern Trend"],
            "rows": [
                {
                    "feature": "Data Modeling Basis",
                    "col1": "Flat 2D Tables, Atomic 1NF attributes, Foreign Keys",
                    "col2": "Relations extended with Complex Types, Methods, Inheritance",
                    "col3": "Direct In-Memory Object Graphs (C++, Java, Smalltalk objects)",
                    "verdict": "ORDBMS bridges relational reliability with OOP expressiveness",
                    "status": "better-col2"
                },
                {
                    "feature": "Impedance Mismatch",
                    "col1": "High (Tables must be converted into application OOP objects via ORM)",
                    "col2": "Moderate (Nested types and user types mirror class definitions)",
                    "col3": "Zero (Database stores exact native application object instances)",
                    "verdict": "OODBMS eliminates mapping, but ORDBMS retains SQL compatibility",
                    "status": "info"
                },
                {
                    "feature": "Query Language Standard",
                    "col1": "Standard SQL (SQL:92 tabular queries and joins)",
                    "col2": "Extended SQL:1999 / SQL:2003 (Dot notation, methods, REF dereference)",
                    "col3": "OQL (Object Query Language) or Native Language APIs",
                    "verdict": "ORDBMS preserves universal SQL investment and tooling",
                    "status": "better-col2"
                },
                {
                    "feature": "Encapsulation & Methods",
                    "col1": "❌ None (Data and logic strictly separated into procedures/triggers)",
                    "col2": "✅ Yes (Methods bound directly to user-defined structured types)",
                    "col3": "✅ Yes (Complete OOP encapsulation of state and behavior)",
                    "verdict": "Allows business logic computation inside database engine",
                    "status": "success"
                },
                {
                    "feature": "Complex Data Support (Spatial, CAD, Arrays)",
                    "col1": "Poor (Requires multiple normalized tables or BLOBs)",
                    "col2": "Excellent (Nested types, spatial polygons, ARRAY/MULTISET collections)",
                    "col3": "Excellent (Complex pointer hierarchies and graph networks)",
                    "verdict": "ORDBMS is the industry standard for GIS, CAD, and multimedia",
                    "status": "better-col2"
                },
                {
                    "feature": "Enterprise Adoption & Dominance",
                    "col1": "Universal legacy backbone (MySQL, SQL Server)",
                    "col2": "Dominant modern DBMS engines (PostgreSQL, Oracle, Informix)",
                    "col3": "Niche specialized systems (ObjectStore, db4o, Versant)",
                    "verdict": "ORDBMS is the evolutionary winner for enterprise databases",
                    "status": "success"
                }
            ]
        }
    ],
    "2.2": [
        {
            "id": "t2_2_inheritance",
            "title": "Type Inheritance vs. Table Inheritance in SQL:1999",
            "subtitle": "Detailed comparison of schema structure, polymorphism, query substitutability, and table storage",
            "badge": "Inheritance Mechanics",
            "headers": ["Dimension", "Type Inheritance (`CREATE TYPE ... UNDER`)", "Table Inheritance (`CREATE TABLE ... UNDER`)", "Key Implementation Rule"],
            "rows": [
                {
                    "feature": "Definition Scope",
                    "col1": "Defines domain structures and method signatures without data",
                    "col2": "Creates physical storage tables where tuples actually reside",
                    "verdict": "Type inheritance defines schema; Table inheritance holds records",
                    "status": "info"
                },
                {
                    "feature": "Attribute Inheritance",
                    "col1": "Subtype automatically inherits all supertype attributes & methods",
                    "col2": "Subtable inherits all columns from parent table plus its own",
                    "verdict": "Eliminates repetitive attribute definitions across schemas",
                    "status": "success"
                },
                {
                    "feature": "Query Polymorphism",
                    "col1": "Enables type substitutability in method arguments",
                    "col2": "`SELECT * FROM SuperTable` returns rows of supertable AND all subtables!",
                    "verdict": "Use `SELECT * FROM ONLY(SuperTable)` to suppress subtable rows",
                    "status": "better-col2"
                },
                {
                    "feature": "Primary Key & Unique Constraints",
                    "col1": "Not applicable to abstract type definitions",
                    "col2": "Parent table primary keys enforce uniqueness across the entire hierarchy",
                    "verdict": "Guarantees global entity identity throughout subtype trees",
                    "status": "info"
                }
            ]
        },
        {
            "id": "t2_2_array_multiset",
            "title": "ARRAY vs. MULTISET Collection Types Comparison",
            "subtitle": "Comparing ordered indexed arrays vs. unordered multisets (bags) in SQL:1999",
            "badge": "Collection Types Matrix",
            "headers": ["Attribute / Feature", "ARRAY Collection Type", "MULTISET Collection Type", "Practical Engineering Verdict"],
            "rows": [
                {
                    "feature": "Ordering & Indexing",
                    "col1": "Strictly Ordered; elements accessed via 1-based index `arr[1]`",
                    "col2": "Unordered bag; elements have no positional index",
                    "verdict": "Use ARRAY when sequence matters (e.g. phone priority)",
                    "status": "info"
                },
                {
                    "feature": "Duplicate Handling",
                    "col1": "Allows duplicates (e.g. `ARRAY['A', 'A', 'B']`)",
                    "col2": "Allows duplicates (e.g. `MULTISET['Java', 'Java']`)",
                    "verdict": "Both allow duplicates, unlike relational strict mathematical sets",
                    "status": "info"
                },
                {
                    "feature": "Set Operations Support",
                    "col1": "❌ Limited (Index operations, concatenation `||`, slicing)",
                    "col2": "✅ Rich (`MULTISET UNION`, `INTERSECT`, `EXCEPT`, `SET(M)` to deduplicate)",
                    "verdict": "MULTISET supports algebraic set operations natively",
                    "status": "better-col2"
                },
                {
                    "feature": "Relational Transformation",
                    "col1": "`UNNEST(arr) WITH ORDINALITY` preserves index position",
                    "col2": "`UNNEST(mset)` flattens bag into normal relational rows",
                    "verdict": "Easily integrated into standard SQL SELECT/FROM queries",
                    "status": "success"
                }
            ]
        }
    ],
    "2.3": [
        {
            "id": "t2_3_oid_fk",
            "title": "Primary Key / Foreign Key Joins vs. Object Identity (OID) & REF Types",
            "subtitle": "Detailed comparison of relational value-based joins vs. object-relational pointer dereferencing",
            "badge": "GTU High-Yield Topic",
            "headers": ["Comparison Criteria", "Relational Foreign Key (Value-Based)", "Object Identity (OID) & REF Types (Identity-Based)", "Architectural Advantage"],
            "rows": [
                {
                    "feature": "Identity Generation",
                    "col1": "User-defined or domain value (e.g. `RollNo`, `SSN`, `Email`)",
                    "col2": "System-generated, globally unique, immutable 64/128-bit handle",
                    "verdict": "OID survives attribute modifications and email reassignments",
                    "status": "better-col2"
                },
                {
                    "feature": "Relationship Traversal",
                    "col1": "Requires explicit relational `JOIN ... ON S.DeptNo = D.DeptNo`",
                    "col2": "Direct pointer dereferencing with arrow operator `e.dept->dept_name`",
                    "verdict": "Arrow dereferencing is syntactically concise and eliminates join plans",
                    "status": "better-col2"
                },
                {
                    "feature": "Query Execution Overhead",
                    "col1": "Hash Join, Merge Join, or Index Nested Loops over table indexes",
                    "col2": "Direct disk/memory block address lookup via OID index pointer",
                    "verdict": "Faster navigation in deeply nested CAD/graph structures",
                    "status": "better-col2"
                },
                {
                    "feature": "Scope & Integrity Checking",
                    "col1": "Enforced via `FOREIGN KEY ... REFERENCES OtherTable(PK)`",
                    "col2": "Enforced via `SCOPE TargetTable` clause on the REF attribute",
                    "verdict": "Unscoped REFs risk dangling references if target is dropped",
                    "status": "warning"
                },
                {
                    "feature": "Dangling Reference Behavior",
                    "col1": "Prevented by `ON DELETE RESTRICT / CASCADE` constraints",
                    "col2": "Dereferencing a deleted OID safely yields `NULL` in SQL standard",
                    "verdict": "Scoped REFs ensure referential integrity",
                    "status": "info"
                }
            ]
        }
    ],
    "2.4": [
        {
            "id": "t2_4_dtd_xsd",
            "title": "DTD (Document Type Definition) vs. XML Schema (XSD)",
            "subtitle": "Head-to-head engineering comparison for semi-structured XML document validation",
            "badge": "GTU 7-Mark Question",
            "headers": ["Feature / Metric", "DTD (Document Type Definition)", "XML Schema Definition (XSD)", "Verdict / Modern Standard"],
            "rows": [
                {
                    "feature": "Syntax Language",
                    "col1": "Custom non-XML EBNF grammar (`<!ELEMENT ...>`)",
                    "col2": "Standard XML syntax (`<xs:schema xmlns:xs=...>` tags)",
                    "verdict": "XSD can be parsed with standard XML parsers and tools",
                    "status": "better-col2"
                },
                {
                    "feature": "Data Types Support",
                    "col1": "Very limited: Only `#PCDATA` (raw text), `CDATA`, ID/IDREF",
                    "col2": "Rich 40+ built-in types (integer, decimal, date, boolean, regex patterns)",
                    "verdict": "XSD enforces strict database-grade data type validation",
                    "status": "better-col2"
                },
                {
                    "feature": "Cardinallity & Occurrences",
                    "col1": "Regex symbols only: `?` (0 or 1), `*` (0 or more), `+` (1 or more)",
                    "col2": "Exact numeric bounds: `minOccurs=\"2\" maxOccurs=\"10\"`",
                    "verdict": "XSD allows precise enterprise business rule constraints",
                    "status": "better-col2"
                },
                {
                    "feature": "Namespace Support",
                    "col1": "❌ No native support for XML namespaces",
                    "col2": "✅ Full support for multiple imported namespaces",
                    "verdict": "Essential for combining enterprise schemas (e.g. SOAP, WSDL)",
                    "status": "better-col2"
                },
                {
                    "feature": "Extensibility & Derivation",
                    "col1": "❌ None (Cannot inherit or extend element definitions)",
                    "col2": "✅ Supports type inheritance via `extension` and `restriction`",
                    "verdict": "XSD supports object-oriented XML data modeling",
                    "status": "success"
                }
            ]
        },
        {
            "id": "t2_4_xpath_xquery",
            "title": "XPath vs. XQuery vs. SQL Comparison Matrix",
            "subtitle": "Navigation, transformation, and querying paradigms across hierarchical and relational data",
            "badge": "Query Language Taxonomy",
            "headers": ["Language", "Primary Purpose", "Underlying Data Model", "Core Syntax Mechanism", "Transformation Capability"],
            "rows": [
                {
                    "feature": "XPath",
                    "col1": "Addressing and locating nodes in an XML tree",
                    "col2": "XML Node Tree (Element, Attribute, Text nodes)",
                    "col3": "Path expressions and predicates (`/store/book[price < 30]`)",
                    "col4": "Returns existing node subsets; cannot restructure output",
                    "status": "info"
                },
                {
                    "feature": "XQuery",
                    "col1": "Full query, filtering, joining, and XML restructuring",
                    "col2": "XML Node Tree / Sequences of Items",
                    "col3": "FLWOR expressions (`FOR`, `LET`, `WHERE`, `ORDER BY`, `RETURN`)",
                    "col4": "Full transformation: construct brand-new XML schemas on the fly",
                    "status": "success"
                },
                {
                    "feature": "SQL",
                    "col1": "Relational data querying and CRUD operations",
                    "col2": "Relational Tables (2D rows and columns)",
                    "col3": "Declarative `SELECT ... FROM ... WHERE ... GROUP BY`",
                    "col4": "Produces flat 2D tabular result sets",
                    "status": "info"
                }
            ]
        }
    ],
    "2.5": [
        {
            "id": "t2_5_joins",
            "title": "SQL Join Types Comprehensive Comparison Matrix",
            "subtitle": "Detailed mechanics, match rules, unmatched row handling, NULL padding, and relational algebra equivalents",
            "badge": "Core SQL Query Matrix",
            "headers": ["Join Type", "Match Condition Required?", "Unmatched Left Rows", "Unmatched Right Rows", "Null Padding Applied?", "Typical Real-World Use"],
            "rows": [
                {
                    "feature": "INNER JOIN",
                    "col1": "✅ Yes (`ON T1.id = T2.id`)",
                    "col2": "❌ Dropped (Excluded from output)",
                    "col3": "❌ Dropped (Excluded from output)",
                    "col4": "❌ None (Only valid matching pairs)",
                    "col5": "Finding enrolled students with registered courses",
                    "status": "info"
                },
                {
                    "feature": "LEFT OUTER JOIN",
                    "col1": "✅ Yes",
                    "col2": "✅ Kept (Preserved in output)",
                    "col3": "❌ Dropped",
                    "col4": "✅ Right table columns padded with `NULL`",
                    "col5": "Listing ALL customers and their orders (including non-buyers)",
                    "status": "better-col2"
                },
                {
                    "feature": "RIGHT OUTER JOIN",
                    "col1": "✅ Yes",
                    "col2": "❌ Dropped",
                    "col3": "✅ Kept (Preserved in output)",
                    "col4": "✅ Left table columns padded with `NULL`",
                    "col5": "Listing ALL departments and their assigned managers",
                    "status": "info"
                },
                {
                    "feature": "FULL OUTER JOIN",
                    "col1": "✅ Yes",
                    "col2": "✅ Kept (Preserved)",
                    "col3": "✅ Kept (Preserved)",
                    "col4": "✅ `NULL` padded on whichever side lacks a match",
                    "col5": "Audit reconciliation between two independent accounting ledgers",
                    "status": "better-col2"
                },
                {
                    "feature": "CROSS JOIN",
                    "col1": "❌ No condition (Cartesian Product)",
                    "col2": "✅ Every row paired with all right rows",
                    "col3": "✅ Every row paired with all left rows",
                    "col4": "❌ No nulls (Full $M \\times N$ combinatorial multiplication)",
                    "col5": "Generating all size and color variations for product inventory",
                    "status": "warning"
                }
            ]
        },
        {
            "id": "t2_5_udf",
            "title": "Scalar UDF vs. Table-Valued UDF (TVF) vs. Stored Procedures",
            "subtitle": "Comparison of return types, invocation syntax, execution context, and performance optimization",
            "badge": "Programmable SQL Matrix",
            "headers": ["Construct Type", "Return Value Nature", "Invocation Location in SQL", "Side Effects (INSERT/UPDATE)?", "Query Optimizer Inline Ability"],
            "rows": [
                {
                    "feature": "Scalar UDF",
                    "col1": "Returns exactly one atomic value (e.g. `DECIMAL`, `INT`, `VARCHAR`)",
                    "col2": "Inside `SELECT`, `WHERE`, `ORDER BY` like `ROUND()`",
                    "col3": "❌ No (Deterministic read-only computation)",
                    "col4": "Moderate (May run row-by-row / RBAR overhead)",
                    "status": "info"
                },
                {
                    "feature": "Table-Valued UDF (TVF)",
                    "col1": "Returns an entire tabular result set (`TABLE(...)`)",
                    "col2": "Inside `FROM` clause like a view or table",
                    "col3": "❌ No (Read-only parameterized view)",
                    "col4": "✅ High (Inline TVFs are merged into query execution plan)",
                    "status": "success"
                },
                {
                    "feature": "Stored Procedure",
                    "col1": "Returns status code / multiple result sets / OUT parameters",
                    "col2": "Standalone execution via `CALL` or `EXEC`",
                    "col3": "✅ Yes (Can perform full ACID transactions and DDL/DML)",
                    "col4": "❌ Cannot be embedded inside a SELECT query statement",
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
            "headers": ["Attribute", "Structured Data", "Semi-Structured Data", "Unstructured Data"],
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
            "headers": ["Engineering Dimension", "SQL Relational Databases", "NoSQL Modern Databases", "Key Architectural Trade-off"],
            "rows": [
                {
                    "feature": "Data Modeling Paradigm",
                    "col1": "Tables, Rows, Columns, Foreign Key relations",
                    "col2": "Document (JSON), Key-Value, Column-Family, Graph",
                    "verdict": "SQL normalizes; NoSQL denormalizes for fast read access",
                    "status": "info"
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
            "headers": ["Relational (RDBMS/SQL) Concept", "MongoDB Equivalent", "Structural Difference & Practical Note"],
            "rows": [
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
                    "feature": "Primary Key",
                    "col1": "Primary Key (User-defined or AUTO_INCREMENT int)",
                    "col2": "`_id` Field (12-byte unique BSON `ObjectId` by default)",
                    "verdict": "Every document must have a unique immutable `_id`"
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
            "headers": ["MongoDB Operator", "Operator Name / Function", "SQL Syntax Equivalent", "Example MQL Query"],
            "rows": [
                {
                    "feature": "$eq / $ne",
                    "col1": "Equals / Not Equals comparison",
                    "col2": "`WHERE field = val` / `!=`",
                    "col3": "`db.students.find({ dept: { $eq: \"IT\" } })`"
                },
                {
                    "feature": "$gt / $gte",
                    "col1": "Greater Than / Greater Than or Equal",
                    "col2": "`WHERE field > val` / `>=`",
                    "col3": "`db.students.find({ cpi: { $gte: 8.5 } })`"
                },
                {
                    "feature": "$in / $nin",
                    "col1": "Match in / not in array",
                    "col2": "`WHERE field IN (...)`",
                    "col3": "`db.students.find({ sem: { $in: [3, 5, 7] } })`"
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
            "headers": ["Aggregation Stage", "Stage Purpose & Operation", "SQL Equivalent Clause", "Pipeline Transformation Example"],
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
                    "col3": "`{ $group: { _id: \"$dept\", avgCpi: { $avg: \"$cpi\" } } }`"
                },
                {
                    "feature": "$unwind",
                    "col1": "Deconstructs an array field into individual output documents per element",
                    "col2": "`CROSS JOIN LATERAL` / Unnesting",
                    "col3": "`{ $unwind: \"$skills\" }`"
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
            "headers": ["ACID Property", "Formal Definition", "Implementation Mechanism in DBMS", "Failure Impact if Violated", "Real-Life Banking Scenario"],
            "rows": [
                {
                    "feature": "Atomicity",
                    "col1": "Either all transaction operations complete successfully or none take effect",
                    "col2": "Write-Ahead Logging (WAL) & Undo Log Rollback",
                    "col3": "Partial execution leaves database corrupted and inconsistent",
                    "col4": "₹5000 deducted from Alice, power cut before Bob is credited.",
                    "status": "warning"
                },
                {
                    "feature": "Consistency",
                    "col1": "Transforms database from one valid state satisfying all schema rules to another",
                    "col2": "Schema constraints, triggers, primary/foreign keys, assertions",
                    "col3": "Negative bank balances, orphan records, violated invariants",
                    "col4": "Total sum across all bank accounts before and after transfer must remain identical.",
                    "status": "info"
                },
                {
                    "feature": "Isolation",
                    "col1": "Concurrent transactions execute independently without mutual interference",
                    "col2": "Concurrency control (2PL, Timestamp Ordering, MVCC)",
                    "col3": "Dirty reads, Non-repeatable reads, Phantom tuples",
                    "col4": "Alice deposits ₹2000 while Bob withdraws ₹1000 simultaneously.",
                    "status": "better-col2"
                },
                {
                    "feature": "Durability",
                    "col1": "Once transaction commits, updates persist permanently across crashes",
                    "col2": "Redo Logs flushed to non-volatile disk/SSD, Checkpointing",
                    "col3": "Committed customer purchases vanish upon server reboot",
                    "col4": "ATM displays 'Success'; power cut occurs; balance stays saved.",
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
            "headers": ["Architecture Model", "Coordinator Location", "Scalability & Bottlenecks", "Fault Tolerance & Recovery", "Design Complexity", "Typical Industry Use"],
            "rows": [
                {
                    "feature": "Centralized TP Monitor",
                    "col1": "Single dedicated central coordinator server",
                    "col2": "Limited scalability; coordinator becomes bottleneck under high load",
                    "col3": "Single Point of Failure (SPoF) unless standby exists",
                    "col4": "Low to Moderate: Straightforward state management",
                    "col5": "Traditional enterprise mainframes, legacy ERP architectures",
                    "status": "warning"
                },
                {
                    "feature": "Decentralized TP Monitor",
                    "col1": "Multiple cooperating peer nodes running distributed consensus",
                    "col2": "High horizontal scalability; load distributed across cluster nodes",
                    "col3": "Resilient: Survives single node crashes through peer failover",
                    "col4": "High: Requires distributed consensus, quorum, and global clocks",
                    "col5": "Cloud-native microservices, global financial networks",
                    "status": "success"
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
            "headers": ["Real-Time Category", "Deadline Strictness", "Consequence of Missing Deadline", "Utility Value Drop", "Primary Scheduling Policy", "Concrete Real-World Example"],
            "rows": [
                {
                    "feature": "Hard Real-Time (HRTDBS)",
                    "col1": "Absolute strict deadline guarantee required",
                    "col2": "Catastrophic system failure, loss of life, or equipment destruction",
                    "col3": "Becomes negative infinity (Fatal)",
                    "col4": "Earliest Deadline First (EDF), Least Slack Time (LST)",
                    "col5": "Nuclear reactor temperature safety system, Pacemaker controller",
                    "status": "warning"
                },
                {
                    "feature": "Soft Real-Time (SRTDBS)",
                    "col1": "Flexible target deadline; minimizes average tardiness",
                    "col2": "Degraded quality of service, user annoyance, but result is still valuable",
                    "col3": "Gradually diminishes over time (Smooth decay)",
                    "col4": "Best-effort Priority Queuing, Fair Share Scheduling",
                    "col5": "YouTube 4K video buffering, Airline seat selection portal",
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
            "headers": ["Pattern / Technique", "Core Operating Principle", "Locking Overhead", "Rollback / Recovery Strategy", "Ideal Application Domain"],
            "rows": [
                {
                    "feature": "Saga Pattern (Compensating)",
                    "col1": "Sequence of local transactions; failures trigger a chain of backward compensations",
                    "col2": "Zero distributed 2PC locks across microservices",
                    "col3": "Executes compensating transactions in reverse sequential order",
                    "col4": "E-Commerce checkout (Order → Inventory → Payment → Shipment)",
                    "status": "success"
                },
                {
                    "feature": "Multi-Version Concurrency Control (MVCC)",
                    "col1": "Creates timestamped snapshots for readers; writers create new version without blocking readers",
                    "col2": "Readers never block writers; writers never block readers",
                    "col3": "Garbage collector vacuums old invisible row versions",
                    "col4": "PostgreSQL, MySQL InnoDB transactional engines",
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
            "headers": ["Data Mining Paradigm", "Learning Nature", "Predefined Class Labels?", "Core Algorithmic Technique", "Mathematical Objective", "Commercial Business Example"],
            "rows": [
                {
                    "feature": "Association Rule Mining",
                    "col1": "Unsupervised pattern discovery",
                    "col2": "❌ No (Rules discovered from itemsets)",
                    "col3": "Apriori Algorithm, FP-Growth, ECLAT",
                    "col4": "Support ≥ min_sup and Confidence ≥ min_conf",
                    "col5": "Market Basket Analysis: {Diapers, Beer} → 72% Confidence in supermarket sales",
                    "status": "info"
                },
                {
                    "feature": "Classification",
                    "col1": "Supervised learning on labeled training data",
                    "col2": "✅ Yes (Target classes defined, e.g. Fraud / Legitimate)",
                    "col3": "Decision Trees, Naive Bayes, Random Forest, SVM",
                    "col4": "Minimize classification error on test holdout set",
                    "col5": "Bank Loan Approval: Classify applicant as Low Risk vs High Risk",
                    "status": "success"
                },
                {
                    "feature": "Clustering",
                    "col1": "Unsupervised exploratory data grouping",
                    "col2": "❌ No (Natural clusters formed by data geometry)",
                    "col3": "K-Means, DBSCAN, Hierarchical Clustering",
                    "col4": "Maximize intra-cluster similarity; minimize inter-cluster similarity",
                    "col5": "Customer Segmentation: Grouping 1,000,000 users into personas",
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
            "headers": ["ML Paradigm", "Supervision & Labeled Data", "Feedback & Objective Function", "Primary Algorithmic Models", "Business Intelligence Use Case"],
            "rows": [
                {
                    "feature": "Supervised Learning",
                    "col1": "Requires paired inputs and ground-truth target labels (X, y)",
                    "col2": "Loss function calculates deviation from actual target label",
                    "col3": "Linear/Logistic Regression, XGBoost, Neural Networks, Decision Trees",
                    "col4": "Predicting next quarter revenue, Customer Churn warning",
                    "status": "success"
                },
                {
                    "feature": "Unsupervised Learning",
                    "col1": "No labeled outputs; processes unannotated raw input datasets (X)",
                    "col2": "Discovers latent structures, distributions, and clusters",
                    "col3": "K-Means, PCA, Autoencoders, Isolation Forests",
                    "col4": "Anomalous credit card transaction detection",
                    "status": "better-col2"
                }
            ]
        }
    ],
    "5.3": [
        {
            "id": "t5_3_multimedia",
            "title": "Multimedia vs. Mobile vs. Digital Library Databases",
            "subtitle": "Architectural comparison across storage formats, query indexing, and network synchronization",
            "badge": "Specialized Database Matrix",
            "headers": ["Database Paradigm", "Primary Data Objects", "Unique Storage / Indexing Technique", "Network / Sync Model", "Key Technical Challenge"],
            "rows": [
                {
                    "feature": "Multimedia Databases",
                    "col1": "Images, Audio, 4K Video, 3D Point Clouds",
                    "col2": "R-Trees, Color Histograms, Perceptual Feature Vectors (CBIR)",
                    "col3": "Continuous real-time streaming buffers (QoS)",
                    "col4": "Content-based feature extraction and high-dimensional indexing",
                    "status": "info"
                },
                {
                    "feature": "Mobile Databases",
                    "col1": "Local relational/embedded stores on smartphones/IoT devices",
                    "col2": "Lightweight SQLite, Realm, Delta change logs",
                    "col3": "Intermittent Disconnected Operation with Two-Way Sync",
                    "col4": "Write conflict resolution and extreme battery/memory constraints",
                    "status": "better-col2"
                },
                {
                    "feature": "Digital Libraries",
                    "col1": "Full-text PDFs, Academic papers, Historical archives, Metadata",
                    "col2": "Inverted Indexes, Dublin Core Metadata, OCR indexing",
                    "col3": "Web-based OAI-PMH harvesting protocols",
                    "col4": "Copyright preservation, Semantic search, and permanent DOI identifiers",
                    "status": "success"
                }
            ]
        }
    ]
}

with open('adbms-study-app/src/data/tableData.js', 'w', encoding='utf-8') as f:
    f.write(f"export const structuredTablesData = {json.dumps(TABLES_DATA, indent=2)};\n")

print("Generated complete tableData.js with all 21 topics!")
