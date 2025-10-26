use candid::{export_service, Principal};
use candid::{CandidType,Decode,Deserialize,Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl,StableBTreeMap,Storable,BoundedStorable};
use std::{cell::RefCell,borrow::Cow};
use std::collections::HashMap;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static COMPANY_EMPLOYEES: RefCell<StableBTreeMap<StorableString, IDList, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))) // compID -> arr of empID
    );

    static EMPLOYEE_COMPANIES: RefCell<StableBTreeMap<StorableString, IDList, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))) // empID -> arr of compID
    );
    static EMPLOYEE_COMPANIES_ADMIN: RefCell<StableBTreeMap<StorableString, IDList, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))) // empID -> arr of compAdminID 
    );

    static COMPANY_MAP: RefCell<StableBTreeMap<StorableString, Company, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))) // CompID -> comp
    );
    static EMPLOYEE_MAP: RefCell<StableBTreeMap<StorableString, Employee, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4)))) // EmpID -> emp
    );
    static PROOF_MAP: RefCell<StableBTreeMap<StorableString, Proof, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5)))) // ProofID -> Proof
    );
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Debug)]
pub struct StorableString {
    pub str: String,
}

pub struct IDList {
    pub ids: Vec<String>,
}

impl Storable for IDList {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(&self.ids).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Self {
            ids: Decode!(bytes.as_ref(), Vec<String>).unwrap(),
        }
    }
}

impl Storable for Company {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Company).unwrap()
    }
}

impl Storable for Employee {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Employee).unwrap()
    }
}

impl Storable for Proof {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Proof).unwrap()
    }
}

impl Storable for StorableString {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(&self.str).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Self{
            str: Decode!(bytes.as_ref(), String).unwrap(),
        }
    }
}


impl BoundedStorable for IDList {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

impl BoundedStorable for Company {
    const MAX_SIZE: u32 = 512;
    const IS_FIXED_SIZE: bool = false;
}

impl BoundedStorable for Employee {
    const MAX_SIZE: u32 = 512;
    const IS_FIXED_SIZE: bool = false;
}

impl BoundedStorable for Proof {
    const MAX_SIZE: u32 = 512;
    const IS_FIXED_SIZE: bool = false;
}

impl BoundedStorable for StorableString {
    const MAX_SIZE: u32 = 200;
    const IS_FIXED_SIZE: bool = false;
}



#[derive(CandidType, Deserialize, Clone)]  
struct Company {
    id: u64,
    name: String,
    admin_id: u64,
    created_at: u64,
    is_active: bool,
}

impl Company {
    fn add_employee(&mut self, employee: Employee) {
    }
    
    fn list_my_employee(&self)->&Vec<Employee>{
    }

    fn remove_employee(&mut self, emp_id:u64) {
    }
}


#[derive(CandidType, Deserialize, Clone)]
struct Employee {
    id: u64,
    principal: String,
    full_name: String,
    added_at: u64,
}

impl Employee {
    async fn gen_proof(&self,company_index:u64) -> Proof {
        let random_code = generate_random_code(10).await;
        let now = ic_cdk::api::time();
        let company_id = &self.company_ids[company_index as usize];
        let proof_id=0; //toDo get frome stable memo
        Proof {
            code: format!("{}-{}-{}",company_id, random_code,proof_id),
            company_id: company_id.clone(),
            employee_id: self.id.clone(),
            created_at: now,
            expires_at: now + (24 * 60 * 60 * 1_000_000_000),
            is_used: false,
        }
    }

    fn list_comp(&self) -> Vec<String>{
        self.company_ids.clone()
    }
}


//####################################################################################

#[derive(CandidType, Deserialize, Clone)]
struct Proof {
    code: String,
    company_id: String,
    employee_id: u64,
    created_at: u64,
    expires_at: u64,
    is_used: bool,
}



async fn generate_random_code(length: usize) -> String {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789".chars().collect::<Vec<char>>();
    
    let random_bytes = match ic_cdk::api::management_canister::main::raw_rand().await {
        Ok((bytes,)) => bytes,
        Err(_) => {
            ic_cdk::api::time().to_le_bytes().to_vec()
        }
    };
    
    let mut result = String::new();
    for i in 0..length {
        let byte_index = i % random_bytes.len();
        let char_index = (random_bytes[byte_index] as usize) % chars.len();
        result.push(chars[char_index]);
    }
    
    result
}



#[ic_cdk::update]
async fn generate_proof(company_index:u64) -> String {
    let caller_principal = ic_cdk::caller();
    let user_id = caller_principal.to_text();

//    let e = EMPLOYEES.with(|m| m.borrow().get(&user_id).unwrap());

    e.gen_proof(company_index).await.code
}

#[ic_cdk::query]
fn list_my_companies() -> Vec<String> {
    let caller_principal = ic_cdk::caller();
    let user_id = caller_principal.to_text();

//    let e = EMPLOYEES.with(|m| m.borrow().get(&user_id).unwrap());

    e.list_comp()
}

#[ic_cdk::query]
fn verify_proof(proof_code: String) -> bool {
    return true;// toDo
}

ic_cdk::export_candid!();