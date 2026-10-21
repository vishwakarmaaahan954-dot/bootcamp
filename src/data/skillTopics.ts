export interface SkillTopicLevel {
  level_number: number;
  topic: string;
}

export interface SkillTopicMap {
  [skillName: string]: SkillTopicLevel[];
}

export const SKILL_TOPICS_ROADMAP: SkillTopicMap = {
  "Data Structures & Algorithms": [
    { level_number: 1, topic: "Time & space complexity (Big-O), basic array manipulations & strings" },
    { level_number: 2, topic: "Singly and doubly linked lists, stack & queue primitive operations" },
    { level_number: 3, topic: "Recursion fundamentals, binary search, sorting algorithms (Merge, Quick)" },
    { level_number: 4, topic: "Binary trees, tree traversals (BFS, DFS), binary search trees (BST)" },
    { level_number: 5, topic: "Hash tables, hashing collision handling, two-pointer & sliding window patterns" },
    { level_number: 6, topic: "Heaps, priority queues, disjoint set union (DSU), greedy algorithms" },
    { level_number: 7, topic: "Graph representations, topological sort, Dijkstra and shortest path" },
    { level_number: 8, topic: "Dynamic programming (1D/2D memoization & tabulation), bit manipulation" },
    { level_number: 9, topic: "Advanced graph theory (SCC, flows), segment trees, Trie data structures" },
    { level_number: 10, topic: "Competitive programming problems, NP-hard heuristic optimizations" }
  ],
  "Object-Oriented Programming": [
    { level_number: 1, topic: "Classes, objects, attributes, instance methods, and constructors" },
    { level_number: 2, topic: "Encapsulation, public/private access modifiers, getter/setter patterns" },
    { level_number: 3, topic: "Single and multi-level inheritance, method overriding vs overloading" },
    { level_number: 4, topic: "Polymorphism, runtime dynamic dispatch, interface implementations" },
    { level_number: 5, topic: "Abstract classes vs interfaces, abstract method contracts" },
    { level_number: 6, topic: "SOLID design principles (Single Responsibility, Open-Closed, Liskov)" },
    { level_number: 7, topic: "Creational patterns: Singleton, Factory Method, Builder implementation" },
    { level_number: 8, topic: "Structural patterns: Adapter, Decorator, Facade, Composite" },
    { level_number: 9, topic: "Behavioral patterns: Observer, Strategy, Command, State patterns" },
    { level_number: 10, topic: "Domain-Driven Design (DDD), aggregate roots, clean architecture" }
  ],
  "SQL & Databases": [
    { level_number: 1, topic: "Relational concepts, basic SELECT queries, WHERE, ORDER BY, LIMIT" },
    { level_number: 2, topic: "Data types, PRIMARY KEY, FOREIGN KEY, basic DDL/DML constraints" },
    { level_number: 3, topic: "Aggregate functions (COUNT, SUM, AVG), GROUP BY, HAVING filtering" },
    { level_number: 4, topic: "Inner, left, right, and full outer joins across multiple tables" },
    { level_number: 5, topic: "Database normalization (1NF, 2NF, 3NF, BCNF) and schema design" },
    { level_number: 6, topic: "Subqueries, Common Table Expressions (CTEs), correlated subqueries" },
    { level_number: 7, topic: "Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)" },
    { level_number: 8, topic: "Transactions, ACID properties, isolation levels, concurrency locks" },
    { level_number: 9, topic: "Indexing strategies (B-Trees, Hash indexes), query execution plans" },
    { level_number: 10, topic: "Database sharding, partitioning, replication topologies & read replicas" }
  ],
  "Cloud Fundamentals (AWS/Azure)": [
    { level_number: 1, topic: "Cloud concepts: IaaS, PaaS, SaaS, shared responsibility model" },
    { level_number: 2, topic: "Compute basics: Virtual machines (EC2/Azure VMs), sizing, SSH access" },
    { level_number: 3, topic: "Storage services: Object storage (S3/Blob), block storage (EBS)" },
    { level_number: 4, topic: "Networking: VPC, subnets, route tables, internet gateways, NAT" },
    { level_number: 5, topic: "Security & IAM: Roles, policies, users, least privilege principle" },
    { level_number: 6, topic: "Serverless compute: Lambda/Azure Functions, event-driven architectures" },
    { level_number: 7, topic: "Managed databases: RDS, Aurora, DynamoDB, automated backups" },
    { level_number: 8, topic: "Load balancing & Auto Scaling (ALB/ELB), cloud health monitoring" },
    { level_number: 9, topic: "Infrastructure as Code (Terraform, AWS CloudFormation / CDK)" },
    { level_number: 10, topic: "Multi-region high availability, disaster recovery, cloud FinOps cost" }
  ],
  "Operating Systems": [
    { level_number: 1, topic: "OS architecture, kernel vs user space, system calls interface" },
    { level_number: 2, topic: "Processes vs threads, process lifecycle, PCB, context switching" },
    { level_number: 3, topic: "CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority" },
    { level_number: 4, topic: "Process synchronization: Race conditions, critical section problem" },
    { level_number: 5, topic: "Mutexes, semaphores, monitors, classic producer-consumer problem" },
    { level_number: 6, topic: "Deadlocks: Necessary conditions, detection, prevention & avoidance" },
    { level_number: 7, topic: "Memory management: Paging, segmentation, address translation (MMU)" },
    { level_number: 8, topic: "Virtual memory, page faults, page replacement algorithms (LRU, FIFO)" },
    { level_number: 9, topic: "File systems: Inodes, directory structures, journaling, disk I/O" },
    { level_number: 10, topic: "Kernel internals, IPC mechanisms (pipes, shared memory), virtualization" }
  ],
  "Computer Networks": [
    { level_number: 1, topic: "OSI 7-layer model and TCP/IP protocol suite comparison" },
    { level_number: 2, topic: "Physical & Data Link layers: MAC addressing, framing, switches" },
    { level_number: 3, topic: "Network layer: IPv4 addressing, subnetting (CIDR), ICMP ping" },
    { level_number: 4, topic: "Routing protocols overview: RIP, OSPF, BGP, router forwarding tables" },
    { level_number: 5, topic: "Transport layer: TCP 3-way handshake, 4-way teardown, UDP basics" },
    { level_number: 6, topic: "TCP flow control (sliding window) and congestion control algorithms" },
    { level_number: 7, topic: "Application layer: DNS resolution hierarchy, DHCP, FTP" },
    { level_number: 8, topic: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), status codes, headers" },
    { level_number: 9, topic: "Network security: TLS/SSL handshake, certificates, symmetric crypto" },
    { level_number: 10, topic: "Network architecture: Software-Defined Networking (SDN), VPC peering" }
  ],
  "Aptitude & Logical Reasoning": [
    { level_number: 1, topic: "Number systems, percentages, ratios, proportions, basic averages" },
    { level_number: 2, topic: "Profit & loss, simple and compound interest calculations" },
    { level_number: 3, topic: "Time, speed, and distance; relative speed, trains, and streams" },
    { level_number: 4, topic: "Time and work, pipes and cisterns, efficiency computations" },
    { level_number: 5, topic: "Permutations, combinations, probability theory & conditional odds" },
    { level_number: 6, topic: "Blood relations, direction sense, seating arrangements (linear/circular)" },
    { level_number: 7, topic: "Syllogisms, statement & assumptions, deductive logical reasoning" },
    { level_number: 8, topic: "Data interpretation: Bar charts, pie charts, line graphs, tables" },
    { level_number: 9, topic: "Data sufficiency, critical reasoning, argument evaluation" },
    { level_number: 10, topic: "Advanced problem solving under strict time-pressured assessments" }
  ],
  "Communication & Behavioral": [
    { level_number: 1, topic: "Self-introduction, clear articulation, professional email etiquette" },
    { level_number: 2, topic: "Active listening, asking clarifying questions, body language cues" },
    { level_number: 3, topic: "Resume walkthrough, storytelling structure for personal projects" },
    { level_number: 4, topic: "STAR framework (Situation, Task, Action, Result) for behavioral answers" },
    { level_number: 5, topic: "Handling conflict resolution, empathy, constructive feedback reception" },
    { level_number: 6, topic: "Cross-cultural collaboration, working with global distributed teams" },
    { level_number: 7, topic: "Negotiation fundamentals, alignment with business goals and values" },
    { level_number: 8, topic: "Executive presence, presentation delivery to leadership audiences" },
    { level_number: 9, topic: "Influence without authority, mentoring peers, technical evangelism" },
    { level_number: 10, topic: "Strategic communication during enterprise crises & stakeholder management" }
  ],
  "Web Development Basics": [
    { level_number: 1, topic: "Semantic HTML5, accessibility (a11y), DOM structure and forms" },
    { level_number: 2, topic: "CSS3 fundamentals: Box model, Flexbox layout, Grid system basics" },
    { level_number: 3, topic: "Responsive design: Media queries, mobile-first design principles" },
    { level_number: 4, topic: "JavaScript basics: ES6+ syntax, scope, closures, array methods" },
    { level_number: 5, topic: "Asynchronous JavaScript: Promises, async/await, Fetch API & JSON" },
    { level_number: 6, topic: "Browser APIs: LocalStorage, SessionStorage, Cookies, DOM events" },
    { level_number: 7, topic: "React fundamentals: Components, JSX, props, state, useEffect lifecycle" },
    { level_number: 8, topic: "State management: Context API, custom hooks, form handling" },
    { level_number: 9, topic: "Build tools (Vite/Webpack), bundling, bundle size optimization" },
    { level_number: 10, topic: "Web performance (Core Web Vitals), SEO, SSR/SSG concepts" }
  ],
  "System Design (Intro)": [
    { level_number: 1, topic: "Client-server architecture, monolithic vs distributed systems" },
    { level_number: 2, topic: "Vertical vs horizontal scaling, stateless server tier design" },
    { level_number: 3, topic: "Load balancers: Round-robin, least connections, sticky sessions" },
    { level_number: 4, topic: "Caching fundamentals: CDN, in-memory caching (Redis/Memcached)" },
    { level_number: 5, topic: "Database scaling: Read replicas, connection pooling, indexing" },
    { level_number: 6, topic: "Message queues & event streaming (Kafka/RabbitMQ) decoupled flows" },
    { level_number: 7, topic: "CAP theorem, PACELC theorem, eventual consistency vs strong" },
    { level_number: 8, topic: "Rate limiting algorithms (token bucket, leaky bucket) & API Gateways" },
    { level_number: 9, topic: "Design URL shortener, Pastebin, and rate-limited API architectures" },
    { level_number: 10, topic: "Microservices design: Service discovery, circuit breakers, distributed tracing" }
  ],
  "Git & Version Control": [
    { level_number: 1, topic: "Version control concepts, git init, clone, status, diff basics" },
    { level_number: 2, topic: "Staging and committing: git add, git commit, commit message conventions" },
    { level_number: 3, topic: "Branching workflows: git branch, checkout, switch, branch strategy" },
    { level_number: 4, topic: "Remote repositories: git push, fetch, pull, remote origin tracking" },
    { level_number: 5, topic: "Merging branches: Fast-forward vs 3-way merge, resolve merge conflicts" },
    { level_number: 6, topic: "Git undo operations: git stash, git reset, git revert, git restore" },
    { level_number: 7, topic: "Git rebase: Interactive rebase (squash, reword, fixup), linear history" },
    { level_number: 8, topic: "Pull requests, code review etiquette, GitHub flow, branch protection" },
    { level_number: 9, topic: "Git hooks (pre-commit, Husky), submodules, cherry-pick operations" },
    { level_number: 10, topic: "Git internals (blobs, trees, commit objects), reflog disaster recovery" }
  ],
  "Generative AI Basics": [
    { level_number: 1, topic: "Introduction to Generative AI vs Discriminative AI, foundational models" },
    { level_number: 2, topic: "Tokens, context windows, temperature, top-p and generation parameters" },
    { level_number: 3, topic: "Prompt engineering: Zero-shot, few-shot prompting, system instructions" },
    { level_number: 4, topic: "Chain-of-thought (CoT), self-consistency, structured JSON output generation" },
    { level_number: 5, topic: "Embeddings: Vector representations, cosine similarity, semantic search" },
    { level_number: 6, topic: "Vector databases: Pinecone, Chroma, Milvus, indexing & querying" },
    { level_number: 7, topic: "Retrieval-Augmented Generation (RAG): Chunking, retrieval, generation" },
    { level_number: 8, topic: "AI Agents & Function Calling: Tool usage, ReAct loop, task planning" },
    { level_number: 9, topic: "Model evaluation: Hallucination mitigation, benchmark metrics, RAGAS" },
    { level_number: 10, topic: "LLMOps: Fine-tuning (LoRA), prompt safety, guardrails, deployment latency" }
  ]
};

export function getTopicsForSkill(skillName: string): SkillTopicLevel[] {
  if (SKILL_TOPICS_ROADMAP[skillName]) {
    return SKILL_TOPICS_ROADMAP[skillName];
  }
  // Fallback 10-level generator
  return Array.from({ length: 10 }, (_, i) => ({
    level_number: i + 1,
    topic: `Core proficiency level ${i + 1} topics and applied engineering practices for ${skillName}`
  }));
}

