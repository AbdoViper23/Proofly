/**
 * TypeScript types matching the backend Candid interface
 */

export interface Proof {
    code: string;
    company_id: string;
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

export type Result<T> = { Ok: T } | { Err: string };

