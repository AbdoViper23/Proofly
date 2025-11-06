# 🛡️ Proofly - A Decentralized Cryptographical Employment State Verification Solution for Legal & Social Proof

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


## 📋 Vision

Global businesses struggles in employment verification process. "PROOFLY" uses blockchain's cryptography verification properties to create a tamper-proof solution mainly to proof - to 3rd parities interested - the existence and state of a relationship between a "specific" employee and a "specific" institution. i.e. whether he/she is really employed - or have been employed before - by that institution or not! 

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

### 🎯 Built For

- **Legal Teams** - Cryptographically-signed employment verification for litigation
- **HR Departments** - Instant background checks with blockchain-backed proof
- **Compliance Officers** - Auditable verification trail for regulatory requirements
- **Recruitment Agencies** - Fraud-proof employment history validation
- **Social Platforms** - Verify professional credentials on LinkedIn, Twitter, etc.
- **Financial Institutions** - Employment validation for loan applications and KYC

---

## ⚖️ The pain point(s) & dilemma(s) we are trying to solve

### 1. Employment Verification Challenges

As employment verification is critical in some use-cases like:
- ☑ **Professional Requirements**: Background and experience checks.
- 💸 **Financial eligibility**: Employment-based aids and loans.
- ⚖️ **Employment Litigation**: Employment disputes.
- 📜 **Labor laws in other countries**:  Professional visa eligibility.

### 2. LinkedIn Recruitment Fraud Pandemic ([Reference 1](https://www.linkedin.com/posts/digital-cyber-blockchain_fake-jobs-most-of-those-jobs-didnt-actually-activity-7364465833458241536-FZ8D)).
LinkedIn users are facing lots of Fraud hassles everyday like:
- 🤥 **SCAM**: Fake jobs causes identity or money theft plus malware distribution 
- 👨‍💻 **Company Impersonation**:  Can harm proposed employees or cause brand attacks.
- 👿 **Fraud Social Engineering**: Can cause crypto wallet theft.
- 🥷🏻 **Employee Impersonation**:  Can cause gaining access to unrightful privileges.

### 3. Real-World Impact
- **68%** of job seekers encounter fake recruiters (Ghost Jobs) ([Reference 2](https://www.reddit.com/r/recruitinghell/comments/1k8b8ow/nearly_68_of_hiring_managers_admitted_to_posting/)),  ([Reference 3](https://www.cio.com/article/3610861/beware-the-rise-of-ghost-jobs-fake-job-openings-with-no-intent-to-hire.html)).
- **$3.9B** lost annually to employment scams of which **$$2B+** in US only ([Reference 4](https://www.aerotek.com/en/insights/impact-of-job-scams-on-job-searches)).
- **No verification mechanism** for both recruiter/employee authenticity.
- **Lawsuits against legitimate companies for scams they didn't commit**.

---

## 💡 PROOFLY's Solution

**A decentralized legal verification platform providing cryptographically-secured proof codes serving as a "proof of employment" both current and historical**.

Think of **PROOFLY** as a **"Digital notary for employment"** instant, free, tamper-proof, and privacy-compliant.

### How It works:

1. **Company Registration:** Company X register at **PROOFLY**.
2. **Employees Authentication:** Company X's admin authenticate their employees.
3. **Employee Authorization:** Company X's admin authorize employees/x-employees to generate a proof of employment.
4. **Proof Generation:** Employee/X-employee generates unique proof code valid for a specific period of time.
5. **Instant Verification:** Any 3d party can verify employee/x-employee claim to be/have been employed publicly without logining to **PROOFLY**.
---

**IMPORTANT NOTE: The scope of the project submitted to the LegalHack 2025 does not include all the milestones of the project. We are only submitting the 1st Milestone of the project which covers all the above five steps mentioned under "How it works"! The rest milestones will be developed one after the other after the Hackathon.**

## 🔐 Why Blockchain for legal and notary applications?

**1. Tamper-proof records:** Employment data **cannot be altered** once recorded. Like court records sealed by **immutable audit trail** that serves as abiding order/evidence.

**2. Cryptographic verification:**
- Mathematical proof of code authenticity.
- Like notary seal and impossible to forge.
- Courts increasingly accept cryptographic evidence particularly as the legal system adapts to new technologies like blockchain.
- Cryptographic verification methods, particularly digital signatures using public key infrastructure (PKI) which meets and even exceed legal authentication standards in most jurisdictions worldwide. 
- Legislation in many countries grants these methods in the same legal weight as traditional handwritten signatures for most transactions.

**3. Decentralized (no single point of failure)**
- Not controlled by any entity.
- Records persist permanently.
- Like public records accessible to anybody concerned.
- No vendor lock-in.
- Instant cross-border verification.

**4. Privacy by design**
- Only essential information stored.

- GDPR-compliant from ground up:<br>
    &nbsp;&nbsp;✅ **Data Minimization**: Only essential data (company, employee ID, timestamp).<br>
    &nbsp;&nbsp;✅ **Purpose Limitation**: Used only for employment verification.<br>
    &nbsp;&nbsp;✅ **Storage Limitation**: Proof code expires after a specific period of time.<br>
    &nbsp;&nbsp;✅ **Right to be Forgotten**: Records can be removed.<br>
    &nbsp;&nbsp;✅ **Privacy by Design**: No tracking or profiling.

- No verification history tracking which considered bad from privacy concerns and data security risks points of view.

---

## 📊 Use Cases & Legal Benefits

### Employee relocation:

❎**Traditional**: Employee waits 2-3 weeks for employer letter (in some cases) → embassy delays processing → opportunities may be missed!

✅ **With PROOFLY**: Employee gets instant proof code → embassy can verify in 5 seconds → visa processing continues afterwards.

### Employment litigation procedures:

❎**Traditional**: Opposing party claims employment → subpoena records → Wait weeks → time lost in delays.

✅ **With PROOFLY**: Request proof code → cryptographic verification in seconds → proof can reach court fast  → no subpoena needed.

### LinkedIn scam prevention:

❎**Without PROOFLY**: Job seeker receives a job proposal with no way to verify it's authenticity → he/she shares personal data → he/she became a fraud victim ([Reference 1](https://www.linkedin.com/posts/digital-cyber-blockchain_fake-jobs-most-of-those-jobs-didnt-actually-activity-7364465833458241536-FZ8D)).

✅ **With PROOFLY**: Recruiter provides code → job seeker verifies instantly → if valid it is safe to proceed and if not job seeker is aware.

---

## 🌍 Real-World Impact

### Problem Scale:
- **Verification time**: Traditionally too long.
- **High cost**: Cost per verification is very high and sometimes not possible.
- **Trustworthiness**: High percentage of job seekers encountering scam everyday.
- **Financial losses**: Annual losses to employment fraud around $2B+ in US only.
- **Avilability**: Limited.

### PROOFLY Solution:
- **Verification time**: Around  5 seconds⚡
- **Very low cost**: some cents 💰
- **Trustworthiness**: Near 100% Fraud prevention 🔒
- **Financial losses**: NONE.
- **Avilability**: Global availability 🌍

### For Legal Practice:

**Time Savings:**
- Immigration: Saves weeks and sometimes a month per application.
- Due diligence: Reduce timeline by huge percent.
- Litigation: Instant vs. weeks of subpoenas obstacles.

**Cost Savings:**
- Eliminate verification fees.
- Reduce paralegal time.
- Faster case resolution.

**Risk Reduction:**
- No forged letters! Cryptographic proofs presented to courts.
- GDPR compliance built-in.
- Reduces exposure to abuses and corruption.

---

## 📦 Local Development Setup

This guide explains how to run **Proofly** locally on your machine for testing and development.

### 🧰 Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- Internet Identity (optional for local authentication testing)

---

### 🚀 Run Locall
Follow these steps to run Proofly locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/AbdoViper23/Proofly.git

# 2️⃣ Navigate to the project directory
cd Proofly

# 3️⃣ Generate Candid bindings for the backend canister
dfx generate backend

# 4️⃣ Navigate to the frontend folder
cd frontend

# 5️⃣ Install dependencies
npm install   # or pnpm install

# 6️⃣ Build the frontend
npm run build

# 7️⃣ Start the local Internet Computer replica
dfx start --background

# 8️⃣ Deploy canisters locally
dfx deploy
```
---


## 🧩 Project Structure Overview

The Proofly project is organized into clear layers separating frontend, backend, and configuration files for maintainability and scalability.

```

Proofly/
├── backend/                 # Internet Computer backend canister (Rust)
│   ├── src/                 # Rust source code (logic, storage maps, functions)
│   ├── Cargo.toml           # Rust dependencies and project config
│   └── Cargo.lock
│
├── frontend/                # Next.js + TypeScript frontend application
│   ├── pages/               # Next.js routes (public & private pages)
│   ├── components/          # Reusable React UI components
│   ├── hooks/               # Custom React hooks (e.g., wagmi, auth)
│   ├── lib/                 # Utilities (DFX bindings, API helpers)
│   ├── public/              # Static assets (logo, icons)
│   ├── styles/              # Global CSS and Tailwind styles
│   └── package.json         # Frontend dependencies and scripts
│
├── .dfx/                    # DFX local environment (auto-generated)
├── dfx.json                 # Canister configuration and network settings
├── README.md                # Project documentation
└── LICENSE                  # Open-source license information

```


## 🔧 ICP Features & Technologies Used

### Core ICP Capabilities Leveraged

**1. Internet Identity v2**
-  Decentralized, passwordless authentication using biometrics
-  Privacy-preserving: unique Principal ID per user/application
-  Cross-platform support without password risks

**2. Principal-Based Identity**
-  **User Principals**: Cryptographically unique identifiers
-  **Canister Principals**: Smart contract identifiers
-  **Caller Authentication**: Backend verifies identity on every request

**3. Canister Smart Contracts**
-  **Backend Canister (Rust)**: Core logic with tamper-proof storage
-  **Frontend Canister**: Entire Next.js app hosted on-chain
-  **Stable Memory**: Persistent storage survives upgrades

**4. Cryptographic Verification**
-  **Chain Key Cryptography**: Tamper-proof records via threshold signatures
-  **Public Verification**: Anyone can verify proof codes instantly
-  **Immutable Audit Trail**: Permanent, verifiable records

**5. Decentralized Infrastructure**
-  **100% On-Chain**: No traditional servers needed
-  **Global Access**: Fast verification from anywhere
-  **Low Cost**: Efficient cycles model, no user gas fees

**6. Performance Optimization**
-  **Query Calls**: Fast read-only verification (sub-second)
-  **Update Calls**: Secure writes with consensus
-  **Inter-Canister Communication**: Secure frontend-backend integration

---

### Why ICP?

ICP provides the perfect foundation for Proofly:
- ✅ **Legal-grade cryptographic proofs** (court-admissible)
- ✅ **decentralization**
- ✅ **GDPR-compliant by design**
- ✅ **Global instant verification**
- ✅ **Cost-efficient** (pennies per verification)
- ✅ **User-friendly** (no crypto wallets required)

**All running 100% on-chain without traditional cloud infrastructure.**
---

## 🏗️ Technical Architecture

### System Architecture
<img width="1763" height="914" alt="system" src="https://github.com/user-attachments/assets/964fd7c3-0f50-4d14-a973-c0429c547773" />

### Memory Relation Map (stored in Stable memory)
<img width="1321" height="1031" alt="Data Map" src="https://github.com/user-attachments/assets/fc4929a4-e50c-45af-b366-686058bb5ff4" />

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






**🔗 Built on the Internet Computer Protocol (ICP) 🔗**

⭐ **Star this repo if you believe in decentralized legal tech!** ⭐


## 🔗 Resources

**Deployment:**
- Frontend Canister: [5kykv-2qaaa-aaaas-qcs6q-cai](https://5kykv-2qaaa-aaaas-qcs6q-cai.icp0.io/)
- Backend Canister: [5nzmb-xiaaa-aaaas-qcs6a-cai]( https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=5nzmb-xiaaa-aaaas-qcs6a-cai)
- Live URL: https://5kykv-2qaaa-aaaas-qcs6q-cai.icp0.io/

**Repository:**
- GitHub: [https://github.com/AbdoViper23/proofly](https://github.com/AbdoViper23/proofly)`
- License: MIT


---
## 📚 References

### 🔹 Cited Sources
1) [LinkedIn – Digital Cyber Blockchain](https://www.linkedin.com/posts/digital-cyber-blockchain_fake-jobs-most-of-those-jobs-didnt-actually-activity-7364465833458241536-FZ8D)  
2) [Reddit – Recruiting Hell: 68% of Hiring Managers Admit to Posting Ghost Jobs](https://www.reddit.com/r/recruitinghell/comments/1k8b8ow/nearly_68_of_hiring_managers_admitted_to_posting/)  
3) [CIO – Beware the Rise of Ghost Jobs](https://www.cio.com/article/3610861/beware-the-rise-of-ghost-jobs-fake-job-openings-with-no-intent-to-hire.html)  
4) [Aerotek – Impact of Job Scams on Job Searches](https://www.aerotek.com/en/insights/impact-of-job-scams-on-job-searches)

---

### 🔹 Additional References & Recommended Reading
5) [PR Newswire – 48% of US Workers Surveyed Say They Are on the Job Hunt](https://www.prnewswire.com/news-releases/anxious-yet-undeterred-48-of-us-workers-surveyed-say-they-are-on-the-job-hunt-despite-hurdles-like-phantom-jobs-ghosting-bias-and-ai-bot-vs-bot-market-302327722.html)  
6) [Jobs.ca – How to Spot Fake Job Postings](https://www.jobs.ca/blogs/how-to-spot-fake-job-postings-the-red-flags-that-will-save-you-hours)  
7) [TryScamShield – Job Scam Awareness](https://tryscamshield.com/)  
8) [LinkedIn News – Could You Fall for a Job Scam?](https://www.linkedin.com/news/story/could-you-fall-for-a-job-scam-6017172/?trk=news_directory)  
9) [Denim – Freight Fraud Prevention Resources](https://www.denim.com/collection/freight-fraud-prevention-resources)


---

## 🏅 Conclusion

**A Decentralized Cryptographical Employment State Verification Solution for Legal & Social Proof that:**<br>
✅ Leverages ICP's unique features (tamper-resistance, identity, cryptography, speed, decentralized hosting).<br>
✅ Solves real legal and social problems (compliance + scam protection).<br>
✅ Runs 100% on-chain.<br>
✅ Protects both employers and employees.<br>
✅ Scales globally across jurisdictions.

---

<div align="center">

Built with ❤️ on the Internet Computer Protocol.<br>
Developed for **LegalHack 2025**.

*Transforming employment verification to the digital age.*

---


</div>
