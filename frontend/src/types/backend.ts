/**
 * TypeScript types matching the backend Candid interface
 */

export interface Proof {
    code: string;
    company_username: string;
    employee_id: string;
    created_at: bigint;
    expires_at: bigint;
    is_used: boolean;
}

export interface Company {
    id: number;
    username: string;
    name: string;
    image?: string;
    employees: Employee[];
}

export interface Employee {
    id: string;
    name: string;
    position: string;
}

// Matches backend struct CompanyEmployeeWithName
export interface CompanyEmployeeWithName {
    employee_id: string;
    employee_name: string;
    position: string;
}


export interface CompanyEmployeeList {
    employees: CompanyEmployeeWithName[];
}

export interface ProofResult {
    company_username: string;
    company_name: string;
    employee_id: string;
    employee_name: string;
    position: string;
    created_at: bigint;
}

export type Result<T> = { Ok: T } | { Err: string };

// Convenience types for specific endpoints
export type CompanyEmployeesResult = Result<CompanyEmployeeWithName[]>;

