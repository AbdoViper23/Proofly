# 🛡️ Proofly - Decentralized Employment Verification System

<div align="center">

![Proofly Banner](https://img.shields.io/badge/Powered%20by-Internet%20Computer-29ABE2?style=for-the-badge&logo=internet-computer&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**🏆 Built at Legal Tech Hackathon 2025 🏆**

**Blockchain-powered employment verification using cryptographic proofs for legal compliance and fraud prevention**

[Live Demo](#) | [Documentation](#api-reference) | [Technical Architecture](#architecture)

</div>

---

## 📋 Overview

**Proofly** is a decentralized employment verification system built on the Internet Computer Protocol. It leverages blockchain's cryptographic properties to create tamper-proof, privacy-compliant verification codes that can be used for legal documentation, background checks, and regulatory compliance.

Unlike traditional verification systems that rely on centralized databases and manual processes, Proofly uses **SHA-256 cryptographic hashing** and **immutable blockchain storage** to provide instant, verifiable employment proofs without storing sensitive personal data.

### 🎯 Built For

- **Legal Teams** - Cryptographically-signed employment verification for litigation
- **HR Departments** - Instant background checks with blockchain-backed proof
- **Compliance Officers** - Auditable verification trail for regulatory requirements
- **Recruitment Agencies** - Fraud-proof employment history validation
- **Social Platforms** - Verify professional credentials on LinkedIn, Twitter, etc.
- **Financial Institutions** - Employment validation for loan applications and KYC

---

## 🚨 The Problem

### Employment Fraud & Verification Challenges

Professional networks and remote work have created new vulnerabilities for employment fraud:

#### Critical Issues:

**1. Professional Impersonation**
- Fraudsters pose as HR managers or recruiters from legitimate companies
- Target job seekers on professional platforms to steal data or extract free work
- No reliable way to verify someone's actual employment status in real-time

**2. Resume & Credential Fraud**
- False employment claims are widespread but difficult to detect
- Traditional background checks are slow, expensive, and rely on manual verification
- No cryptographic proof of employment history

**3. Legal & Compliance Gaps**
- Employment disputes lack tamper-proof evidence
- Regulatory requirements demand verifiable records
- Cross-border verification is complex and unreliable

**4. Privacy Concerns**
- Current systems require sharing extensive personal data
- GDPR/CCPA compliance is challenging with centralized databases
- Employees lack control over their employment verification data

**5. Centralization Risks**
- Single points of failure in verification systems
- Databases can be hacked, manipulated, or taken offline
- No transparency in verification processes

---

## ✅ The Solution

**Proofly uses blockchain and cryptography to solve these problems:**

### 🔐 Cryptographically Secure
- **Tamper-proof** - Blockchain records are immutable and publicly auditable
- **Hash-based verification** - SHA-256 cryptographic proofs prevent forgery
- **Zero-knowledge** - Original proof codes are never stored, only hashes
- **Time-stamped** - Every verification has a permanent timestamp on-chain
- **Single-use tokens** - Proof codes expire and cannot be reused

### ⚡ Decentralized & Resilient
- **No central authority** - Runs on Internet Computer Protocol's distributed network
- **Censorship-resistant** - No single entity can shut down the system
- **Global availability** - Operates anywhere with internet connectivity
- **Zero downtime** - Resilient to server failures and attacks
- **Open & transparent** - All verifications are publicly auditable

### 🔒 Privacy-First Design
- **Minimal data storage** - Only encrypted identifiers, no personally identifiable information
- **Principal-based auth** - Uses ICP's cryptographic identity system
- **Self-sovereign** - Employees control their own verification data
- **GDPR/CCPA compliant** - Privacy by design architecture
- **No email/phone required** - Reduces attack surface for data breaches

### 🚀 Developer-Friendly
- **Free public API** - No authentication required for verification queries
- **Sub-second response** - Query calls execute instantly
- **Type-safe interfaces** - Candid provides compile-time type checking
- **RESTful design** - Simple, predictable API patterns
- **Comprehensive docs** - Complete API reference and examples

---

## 🏗️ Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│                   (Next.js + TypeScript)                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  • Company Management Dashboard                       │  │
│  │  • Employee Self-Service Portal                       │  │
│  │  • Cryptographic Proof Generation UI                  │  │
│  │  • Public Verification Interface                      │  │
│  │  • Real-time validation with React Hook Form          │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ 
                        │ Candid Interface (Type-Safe RPC)
                        │
┌───────────────────────┴─────────────────────────────────────┐
│              Backend Canister Layer                         │
│              (Rust on Internet Computer)                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Stable Memory Storage Architecture           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  COMPANY_MAP                                    │  │  │
│  │  │  • StorableString → Company                     │  │  │
│  │  │  • Stores: ID, name, admin_id, timestamps       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  EMPLOYEE_MAP                                   │  │  │
│  │  │  • StorableString → Employee                    │  │  │
│  │  │  • Stores: ID, display name                     │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  PROOF_MAP                                      │  │  │
│  │  │  • u128 → Proof                                 │  │  │
│  │  │  • Stores: SHA-256 hash, company_id, emp_id     │  │  │
│  │  │  • Includes: created_at, expires_at, is_used    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  Relationship Maps (Graph Structure)            │  │  │
│  │  │  • COMPANY_EMPLOYEES:  Company → [Employees]    │  │  │
│  │  │  • EMPLOYEE_COMPANIES: Employee → [Companies]   │  │  │
│  │  │  • EMPLOYEE_COMPANIES_ADMIN: Admin → [Cos]      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Core Functions (Access Control Applied):                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  🔐 add_new_companey()         [Creates admin]        │  │
│  │  🔐 add_employee()              [Admin-only]          │  │
│  │  🔐 remove_employee()           [Admin-only]          │  │
│  │  🔒 generate_proof()            [Employee auth]       │  │
│  │  🌐 verify_proof()              [Public query]        │  │
│  │  🔒 list_my_companies()         [User auth]           │  │
│  │  🌐 list_company_employess()    [Public query]        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                        │
                        │ Persistent State
                        ↓
┌─────────────────────────────────────────────────────────────┐
│           Internet Computer Protocol (ICP)                  │
│  • Distributed consensus network                            │
│  • Cryptographic chain-key technology                       │
│  • WebAssembly smart contracts (canisters)                  │
│  • Stable memory (survives upgrades)                        │
└─────────────────────────────────────────────────────────────┘
```

### 🔐 Cryptographic Proof System

#### **Proof Generation Flow**

```rust
┌─────────────────────────────────────────────────────────────┐
│  1. Employee Authentication                                 │
│     • Caller principal extracted from ICP runtime           │
│     • Verify caller is registered employee of company       │
│     • Access control: is_works_on(user_id, company_id)      │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Random Code Generation (Cryptographically Secure)       │
│     • Call ic_cdk::management_canister::raw_rand()          │
│     • 62-character alphabet: [A-Za-z0-9]                    │
│     • Generate 10-character random string                   │
│     • Entropy: 62^10 ≈ 839 trillion combinations            │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Proof ID Assignment                                     │
│     • Atomically increment NEXT_PROOF_ID counter            │
│     • Combine: proof_code = RANDOM_CODE + "-" + PROOF_ID    │
│     • Example: "k3Lp9mQx7n-1234567890"                      │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  4. SHA-256 Hashing                                         │
│     • Input: Full proof code (plaintext)                    │
│     • Algorithm: SHA-256 (NIST FIPS 180-4 standard)         │
│     • Output: 256-bit hash (64 hex characters)              │
│     • Example: "a1b2c3d4e5f6..."                            │
│     • Properties: Collision-resistant, pre-image resistant  │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  5. Blockchain Storage                                      │
│     • Store Proof struct in PROOF_MAP                       │
│     • Fields:                                               │
│       - code: SHA-256 hash (NOT plaintext)                  │
│       - company_id: String                                  │
│       - employee_id: Principal ID                           │
│       - created_at: u64 (nanoseconds)                       │
│       - expires_at: created_at + 24 hours                   │
│       - is_used: false (initially)                          │
│     • Persisted in stable memory (survives upgrades)        │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  6. Return Plaintext Code                                   │
│     • Send proof_code to employee (ONE TIME ONLY)           │
│     • Never stored in plaintext anywhere                    │
│     • Employee responsible for secure storage               │
└─────────────────────────────────────────────────────────────┘
```

#### **Proof Verification Flow**

```rust
┌─────────────────────────────────────────────────────────────┐
│  1. Parse Input Code                                        │
│     • Input: "k3Lp9mQx7n-1234567890"                        │
│     • Extract PROOF_ID: Split at position 10+1              │
│     • RANDOM_CODE: "k3Lp9mQx7n"                             │
│     • PROOF_ID: "1234567890" → Parse to u128                │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Blockchain Lookup                                       │
│     • Query PROOF_MAP.get(PROOF_ID)                         │
│     • Returns Option<Proof>                                 │
│     • Error if not found: "Proof not found"                 │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Expiration Check                                        │
│     • Get current time: ic_cdk::api::time()                 │
│     • Compare: current_time > proof.expires_at              │
│     • Error if expired: "Proof expired"                     │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  4. Usage Check (Replay Attack Prevention)                  │
│     • Check: proof.is_used == true                          │
│     • Error if already used: "Proof already used"           │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  5. Cryptographic Verification                              │
│     • Hash input RANDOM_CODE with SHA-256                   │
│     • Compare: computed_hash == stored_proof.code           │
│     • Constant-time comparison (timing attack resistant)    │
│     • Error if mismatch: "Proof code mismatch"              │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  6. Mark as Used & Return                                   │
│     • Set proof.is_used = true                              │
│     • Update PROOF_MAP with modified proof                  │
│     • Return Ok(Proof) with all metadata                    │
│     • Includes: company_id, employee_id, timestamps         │
└─────────────────────────────────────────────────────────────┘
```

### 🔧 Storage Architecture

#### Stable Memory Design

Proofly uses **ic-stable-structures** for persistent storage that survives canister upgrades:

```rust
// Memory Manager with isolated memory regions
MEMORY_MANAGER: MemoryManager<DefaultMemoryImpl>

// Memory IDs (isolated namespaces)
MemoryId(0): COMPANY_EMPLOYEES      // Company → [Employee IDs]
MemoryId(1): EMPLOYEE_COMPANIES     // Employee → [Company IDs]
MemoryId(2): EMPLOYEE_COMPANIES_ADMIN  // Admin → [Company IDs]
MemoryId(3): COMPANY_MAP            // Company ID → Company struct
MemoryId(4): EMPLOYEE_MAP           // Employee ID → Employee struct
MemoryId(5): PROOF_MAP              // Proof ID → Proof struct

// Storage Guarantees
✓ Survives canister upgrades
✓ Consistent serialization (Candid encoding)
✓ Bounded storage sizes (prevents DoS)
✓ Efficient B-tree indexing
✓ Atomic operations (ACID properties)
```

#### Data Structures

```rust
// Storable Types (Candid serialization)

struct Company {
    id: String,              // Unique company identifier
    name: String,            // Display name
    admin_id: String,        // Principal ID of admin
    created_at: u64,         // Timestamp (nanoseconds)
    is_active: bool,         // For future subscription system
}
// Max size: 512 bytes

struct Employee {
    id: String,              // Principal ID
    full_name: String,       // Optional display name
}
// Max size: 512 bytes

struct Proof {
    code: String,            // SHA-256 hash (64 hex chars)
    company_id: String,      // Company identifier
    employee_id: String,     // Employee Principal ID
    created_at: u64,         // Generation timestamp
    expires_at: u64,         // created_at + 24 hours
    is_used: bool,           // Single-use flag
}
// Max size: 512 bytes

struct IDList {
    ids: Vec<String>,        // Dynamic array of IDs
}
// Max size: 1024 bytes (supports ~50 IDs)
```

---

## 🛠️ Technology Stack

### Backend (Rust Canister)

**Core Technologies:**
```rust
[dependencies]
ic-cdk = "0.17"                    // Internet Computer SDK
ic-stable-structures = "0.5.4"     // Persistent storage
candid = "0.10"                    // Interface Definition Language
serde = { version = "1.0", features = ["derive"] }
sha2 = "0.10"                      // SHA-256 hashing
hex = "0.4"                        // Hex encoding/decoding
```

**Key Features:**
- **Memory Safety** - Rust's ownership system prevents memory bugs
- **Zero-cost Abstractions** - High-level code compiles to efficient WebAssembly
- **Concurrency Safe** - Thread-local storage with RefCell for interior mutability
- **Type Safety** - Candid ensures type-safe inter-canister calls
- **Upgrade Safe** - Stable structures persist across canister upgrades

**Cryptographic Libraries:**
- **sha2** - Pure Rust SHA-256 implementation (FIPS 180-4 compliant)
- **hex** - Constant-time encoding/decoding (timing attack resistant)
- **ic-cdk::raw_rand()** - Cryptographically secure random number generator

### Frontend (Next.js)

**Framework & Libraries:**
```json
{
  "dependencies": {
    "next": "15.x",                 // React meta-framework
    "react": "19.x",                // UI library
    "typescript": "5.x",            // Type-safe JavaScript
    "tailwindcss": "3.x",           // Utility-first CSS
    "framer-motion": "11.x",        // Animation library
    "react-hook-form": "7.x",       // Form state management
    "zod": "3.x",                   // Schema validation
    "@hookform/resolvers": "3.x"    // Form validation adapter
  }
}
```

**UI Component Library:**
- **Shadcn/ui** - Accessible, customizable components
- **Radix UI** - Unstyled, accessible primitives
- **Lucide Icons** - Clean, consistent icon set
- **Tailwind Variants** - Type-safe component variants

**Features:**
- **Server-Side Rendering** - SEO-friendly, fast initial load
- **Static Site Generation** - Pre-rendered pages for performance
- **Progressive Web App** - Installable, offline-capable
- **Type-Safe Forms** - Zod schemas with React Hook Form
- **Optimistic Updates** - Instant UI feedback before blockchain confirmation

### Internet Computer Protocol (ICP)

**Why ICP?**

- **True Decentralization** - No cloud providers (AWS, Azure, GCP)
- **Web Speed** - Sub-second query responses
- **Scalability** - Horizontal scaling via subnet replication
- **Reverse Gas Model** - Users don't pay transaction fees
- **Chain-Key Cryptography** - Efficient signature verification
- **Canister Smart Contracts** - WebAssembly-based execution

**ICP Advantages for Proofly:**
```
✓ Query calls are free (verification API costs nothing)
✓ Update calls are cheap (cycles-based pricing)
✓ Stable memory survives upgrades (no data loss)
✓ HTTP outcalls (future integrations with external APIs)
✓ Randomness beacon (secure random number generation)
✓ Time oracle (trusted timestamps)
```

---

## 🌐 API Reference

### **generate_proof**
**Type:** Update Call (Authenticated)  
**Access:** Registered employees only

Generate a cryptographically-signed proof of employment.

```typescript
function generate_proof(company_id: string): Promise<string | null>
```

**Parameters:**
- `company_id`: Company identifier to generate proof for

**Returns:**
- `string`: Proof code in format `RANDOM_CODE-PROOF_ID`
- `null`: If caller is not employee of company

**Authentication:**
- Caller's Principal ID must be in company's employee list
- Checked via `is_works_on(user_id, company_id)`

**Example:**
```typescript
// Employee generates proof for Google
const code = await backend.generate_proof("google");
// Returns: "k3Lp9mQx7n-1234567890"

// Non-employee tries to generate proof
const code = await backend.generate_proof("apple");
// Returns: null (not authorized)
```

**Technical Details:**
- Uses ICP's `raw_rand()` for cryptographic randomness
- SHA-256 hash stored on-chain
- Original code returned once (never stored in plaintext)
- Valid for 24 hours from generation
- Single-use (marked used after verification)

---

### **verify_proof**
**Type:** Query Call (Public)  
**Access:** Anyone (no authentication)

Verify employment proof code and retrieve employment details.

```typescript
function verify_proof(proof_code: string): Promise<Result<Proof, string>>

type Proof = {
  code: string;          // SHA-256 hash (hex-encoded)
  company_id: string;    // Company identifier
  employee_id: string;   // Employee Principal ID
  created_at: bigint;    // Nanoseconds since Unix epoch
  expires_at: bigint;    // created_at + 24 hours
  is_used: boolean;      // Marked true after verification
}
```

**Parameters:**
- `proof_code`: Complete proof code (e.g., `"k3Lp9mQx7n-1234567890"`)

**Returns:**
- `Ok(Proof)`: Valid proof with employment metadata
- `Err("Proof not found")`: Invalid Proof ID
- `Err("Proof expired")`: More than 24 hours old
- `Err("Proof already used")`: Already verified once
- `Err("Proof code mismatch")`: Hash verification failed

**Example:**
```typescript
// Successful verification
const result = await backend.verify_proof("k3Lp9mQx7n-1234567890");
console.log(result);
// Output:
// {
//   code: "a1b2c3d4e5f6...",
//   company_id: "google",
//   employee_id: "2vxsx-fae",
//   created_at: 1735574400000000000n,
//   expires_at: 1735660800000000000n,
//   is_used: true
// }

// Invalid code
const result = await backend.verify_proof("invalid-123");
// Returns: Error "Proof not found"
```

**Security Properties:**
- Constant-time hash comparison (timing attack resistant)
- Single-use enforcement (prevents replay attacks)
- Time-based expiration (limits exposure window)
- Public verifiability (anyone can check)

---

### **add_employee**
**Type:** Update Call (Authenticated)  
**Access:** Company admins only

Add employee to company roster.

```typescript
function add_employee(comp_id: string, emp_id: string): Promise<boolean>
```

**Parameters:**
- `comp_id`: Company identifier
- `emp_id`: Employee's Principal ID

**Returns:**
- `true`: Employee successfully added
- `false`: Caller is not admin of company

**Authentication:**
- Caller must be in company's admin list
- Checked via `is_company_admin(caller, comp_id)`

**Example:**
```typescript
// Admin adds new hire
const success = await backend.add_employee(
  "google",
  "2vxsx-fae"  // Employee's Principal ID
);
// Returns: true

// Non-admin tries to add employee
const success = await backend.add_employee("google", "xyz");
// Returns: false (not authorized)
```

**Side Effects:**
- Updates `COMPANY_EMPLOYEES` map
- Updates `EMPLOYEE_COMPANIES` map
- Idempotent (adding same employee twice is safe)

---

### **remove_employee**
**Type:** Update Call (Authenticated)  
**Access:** Company admins only

Remove employee from company roster.

```typescript
function remove_employee(comp_id: string, emp_id: string): Promise<boolean>
```

**Parameters:**
- `comp_id`: Company identifier
- `emp_id`: Employee's Principal ID to remove

**Returns:**
- `true`: Employee successfully removed
- `false`: Caller is not admin OR employee not found

**Example:**
```typescript
const success = await backend.remove_employee("google", "2vxsx-fae");
// Returns: true (employee removed)
```

---

### **add_new_companey**
**Type:** Update Call (Authenticated)  
**Access:** Anyone (caller becomes admin)

Register new company on platform.

```typescript
function add_new_companey(
  comp_username: string,
  comp_name: string
): Promise<Result<void, string>>
```

**Parameters:**
- `comp_username`: Unique company identifier (used in URLs)
- `comp_name`: Display name of company

**Returns:**
- `Ok(())`: Company created successfully
- `Err("username is already exist")`: Duplicate company ID

**Example:**
```typescript
await backend.add_new_companey("google", "Google Inc.");
// Caller becomes admin of "google"

await backend.add_new_companey("google", "Another Google");
// Error: username already exists
```

---

### **list_my_companies**
**Type:** Query Call (Authenticated)  
**Access:** Authenticated users

List all companies where caller is employee.

```typescript
function list_my_companies(): Promise<string[]>
```

**Returns:**
- Array of company IDs where caller is registered employee

**Example:**
```typescript
const companies = await backend.list_my_companies();
// Returns: ["google", "microsoft", "apple"]
```

---

### **list_company_employess**
**Type:** Query Call (Public)  
**Access:** Anyone

List all employees of a company.

```typescript
function list_company_employess(comp_id: string): Promise<string[]>
```

**Parameters:**
- `comp_id`: Company identifier

**Returns:**
- Array of employee Principal IDs

**Example:**
```typescript
const employees = await backend.list_company_employess("google");
// Returns: ["2vxsx-fae", "rrkah-fqaaa-...", ...]
```

---

## 📊 Use Cases

### Legal & Litigation

**Scenario:** Employment dispute requiring proof of employment

**How Proofly Helps:**
- Cryptographically-signed proof codes serve as tamper-proof evidence
- Blockchain timestamps provide verifiable creation dates
- Immutable records prevent document forgery
- Instant verification during court proceedings

**Technical Flow:**
```typescript
// Employee generates proof during employment period
const proof = await generate_proof("acme-corp");

// Later: Legal team verifies in court
const verification = await verify_proof(proof);
// Returns cryptographic proof with timestamps
```

---

### Background Checks

**Scenario:** Recruitment agency verifying candidate's employment history

**How Proofly Helps:**
- Instant verification instead of manual phone calls
- Cryptographic proof prevents resume fraud
- Free API access reduces verification costs
- Privacy-preserving (only confirms employment, no salary/role details)

**Technical Flow:**
```typescript
// Candidate provides proof code during interview
const result = await verify_proof(candidateCode);

if (result.ok) {
  console.log(`Verified: Employee of ${result.company_id}`);
  console.log(`Employment confirmed at ${new Date(result.created_at)}`);
}
```

---

### Financial Services KYC

**Scenario:** Bank requires employment verification for loan application

**How Proofly Helps:**
- Instant KYC processing (vs days of manual verification)
- Fraud-proof cryptographic validation
- GDPR-compliant (minimal personal data)
- Auditable verification trail for regulators

---

### Social Media Verification

**Scenario:** LinkedIn wants to verify employment claims on user profiles

**How Proofly Helps:**
- Public API for automated verification
- "Verified Employee" badges backed by blockchain
- Prevents impersonation scams
- Real-time verification without manual review

---

### Cross-Border Employment

**Scenario:** International company hiring remote workers globally

**How Proofly Helps:**
- Works identically in all countries (blockchain has no borders)
- No currency conversion or international fees
- Uniform verification standard across jurisdictions
- Instant verification regardless of time zones

---

## 🚀 Getting Started

### Prerequisites

```bash
# Install DFX (Internet Computer SDK)
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Verify installation
dfx --version

# Install Node.js (v18 or higher)
node --version

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustc --version
```

### Local Development

**1. Clone Repository**
```bash
git clone https://github.com/yourusername/proofly.git
cd proofly
```

**2. Start ICP Local Replica**
```bash
# Start blockchain in background
dfx start --clean --background

# Verify it's running
dfx ping
```

**3. Deploy Backend Canister**
```bash
# Compile Rust code to WebAssembly
dfx deploy backend

# Get canister ID
dfx canister id backend
```

**4. Build & Deploy Frontend**
```bash
cd frontend

# Install dependencies
npm install

# Build production bundle
npm run build

# Deploy to ICP
dfx deploy frontend
```

**5. Access Application**
```bash
# Get frontend URL
echo "http://localhost:4943/?canisterId=$(dfx canister id frontend)"

# Open in browser
```

### Testing

**Get Your Principal ID:**
```bash
dfx identity get-principal
# Output: 2vxsx-fae...
```

**Test Backend Functions:**
```bash
# Create company
dfx canister call backend add_new_companey '("google", "Google Inc.")'

# Add yourself as employee
dfx canister call backend add_employee '("google", "YOUR_PRINCIPAL_ID")'

# Generate proof
dfx canister call backend generate_proof '("google")'
# Output: (opt "k3Lp9mQx7n-1234567890")

# Verify proof (anyone can call)
dfx canister call backend verify_proof '("k3Lp9mQx7n-1234567890")'

# List your companies
dfx canister call backend list_my_companies '()'

# List company employees
dfx canister call backend list_company_employess '("google")'


---

## 🔒 Security & Privacy

### Cryptographic Security

**Hash Function:** SHA-256
- **Standard:** NIST FIPS 180-4 approved
- **Properties:**
  - Collision resistance: Finding two inputs with same hash is computationally infeasible
  - Pre-image resistance: Cannot reverse hash to find original input
  - Avalanche effect: Single bit change produces completely different hash
- **Output:** 256 bits (64 hexadecimal characters)
- **Usage in Bitcoin/SSL:** Same algorithm securing billions in cryptocurrency and web traffic

**Random Number Generation:**
- **Source:** ICP's threshold signature randomness beacon
- **Security:** Unpredictable, unbiasable, verifiable
- **Fallback:** Timestamp-based entropy if beacon unavailable
- **Character set:** 62 characters (A-Z, a-z, 0-9)
- **Keyspace:** 62^10 ≈ 839 trillion combinations

**Access Control:**
- **Authentication:** Principal-based (ICP's public-key cryptography)
- **Authorization:** Role-based permissions (admin, employee)
- **Session Management:** No sessions (stateless verification)
- **Password Storage:** None (uses Internet Identity)

### Privacy Compliance

**Data Minimization:**
- ✅ Only store cryptographic identifiers (Principal IDs)
- ✅ No names, emails, phone numbers, or addresses
- ✅ No job titles, salaries, or departments
- ✅ Proof codes stored as hashes only (zero-knowledge)

**GDPR Compliance:**
- ✅ Right to erasure (employees can be removed)
- ✅ Data portability (query endpoints provide all data)
- ✅ Purpose limitation (only used for verification)
- ✅ Privacy by design (minimal data architecture)
- ✅ Transparent processing (all operations auditable on-chain)

**CCPA Compliance:**
- ✅ Consumer rights (employees control proof generation)
- ✅ No data sales (non-commercial open-source project)
- ✅ Opt-in model (voluntary participation)

### Attack Prevention

**Replay Attacks:**
- ✅ Single-use proofs (marked `is_used` after verification)
- ✅ Time-based expiration (24-hour validity window)
- ✅ Unique Proof IDs (cannot forge new proofs)

**Timing Attacks:**
- ✅ Constant-time hash comparison
- ✅ No early returns based on hash match position

**DoS Attacks:**
- ✅ Bounded storage sizes (max 512 bytes per struct)
- ✅ ICP rate limiting (cycles-based cost model)
- ✅ Query calls are cheap (can't drain cycles easily)

**Sybil Attacks:**
- ✅ Principal IDs are cryptographically unique
- ✅ Company admins control employee roster
- ✅ No anonymous proof generation
---

## 🏆 Built at Legal Tech Hackathon 2025

This project was developed during **Legal Tech Hackathon 2025** to address the critical need for cryptographically-verifiable employment records in legal proceedings and compliance.

### Hackathon Challenge

> *"How can blockchain technology improve legal compliance and fraud prevention in employment verification?"*

### Our Solution

Proofly demonstrates how:
- **Blockchain immutability** creates tamper-proof legal evidence
- **Cryptographic hashing** prevents document forgery
- **Decentralized architecture** eliminates single points of failure
- **Privacy-preserving design** meets GDPR/CCPA requirements
- **Public APIs** enable global verification without intermediaries

---

## 🤝 Contributing

We welcome contributions from developers, security researchers, and legal tech enthusiasts!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add cryptographic feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

**Code Quality:**
```bash
# Rust formatting
cargo fmt

# Rust linting
cargo clippy

# TypeScript checking
npm run type-check
```

**Testing:**
```bash
# Unit tests (Rust)
cargo test

# Integration tests
dfx deploy
./scripts/test-integration.sh
```

**Security:**
- Follow Rust secure coding practices
- Validate all inputs
- Use constant-time comparisons for secrets
- Document threat model for new features

---



## 🙏 Acknowledgments

**Built With:**
- [Internet Computer Protocol](https://internetcomputer.org) - Decentralized cloud platform
- [DFINITY Foundation](https://dfinity.org) - ICP development team
- [Rust Language](https://rust-lang.org) - Systems programming excellence
- [Next.js](https://nextjs.org) - React framework
- [Shadcn/ui](https://ui.shadcn.com) - Component library

---

<div align="center">

**🔗 Built on the Internet Computer Protocol (ICP) 🔗**

⭐ **Star this repo if you believe in decentralized legal tech!** ⭐

</div>
