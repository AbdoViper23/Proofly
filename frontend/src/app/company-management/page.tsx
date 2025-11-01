"use client"

import BorderLayout from "@/components/layout/borderLayout"
import CrossSVG from "@/components/svg/CrossSVG"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Building2, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Actor, HttpAgent } from '@dfinity/agent'
import { idlFactory, canisterId as declaredCanisterId } from '@/declarations/backend'

// Canister ID from multiple sources with fallbacks
const CANISTER_ID = 
    process.env.NEXT_PUBLIC_CANISTER_ID_BACKEND || 
    declaredCanisterId || 
    'uxrrr-q7777-77774-qaaaq-cai';

// Determine network and host
const getNetworkConfig = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const network = process.env.NEXT_PUBLIC_DFX_NETWORK || (isDevelopment ? 'local' : 'ic');
    
    let host;
    if (network === 'local' || isDevelopment) {
        host = 'http://localhost:4943';
    } else {
        host = 'https://ic0.app';
    }
    
    return { network, host, isDevelopment };
};

// Create ICP Actor
const createActor = async () => {
    try {
        const { network, host, isDevelopment } = getNetworkConfig();
        
        if (!CANISTER_ID) {
            throw new Error('Backend canister ID not configured.');
        }
        
        const agent = new HttpAgent({ host });

        if (network === 'local' || isDevelopment) {
            await agent.fetchRootKey().catch(err => {
                console.warn('Could not fetch root key:', err);
            });
        }

        const actor = Actor.createActor(idlFactory, {
            agent,
            canisterId: CANISTER_ID,
        });

        return actor;
    } catch (error) {
        console.error('Failed to create actor:', error);
        throw error instanceof Error ? error : new Error(String(error));
    }
};

interface Employee {
    id: string
    name: string
    position: string
}

interface Company {
    id: number
    username: string  // Company username (unique identifier)
    name: string
    image?: string
    employees: Employee[]
}

const STORAGE_KEY = "companies";

const DEFAULT_COMPANIES: Company[] = [
    { id: 1, username: "artify", name: "Artify Studio", employees: [] },
    { id: 2, username: "vision", name: "Vision Arts", employees: [], image: "https://placehold.co/600x400" },
];

export default function page() {
    // Mounted gate to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);
    const [actor, setActor] = useState<any>(null);

    const [companies, setCompanies] = useState<Company[]>([]);

    // Load from backend after mount
    useEffect(() => {
        const initAndLoad = async () => {
            try {
                // Create actor
                const icpActor = await createActor();
                setActor(icpActor);
                
                // Load companies from backend (returns array of usernames)
                const companyUsernames = await icpActor.list_my_admin_companies() as string[];
                console.log("📥 Company usernames from backend:", companyUsernames);
                
                // Convert string[] to Company[]
                const companiesData: Company[] = companyUsernames.map((username, index) => ({
                    id: index + 1,
                    username: username,
                    name: username,  // Using username as name for now
                    employees: []
                }));
                
                setCompanies(companiesData);
            } catch (error) {
                console.error("Error loading companies:", error);
                // Fallback to default companies on error
                setCompanies(DEFAULT_COMPANIES);
            } finally {
                setMounted(true);
            }
        };
        
        initAndLoad();
    }, []);

    // Persist to localStorage after mounted (keeping for now)
    useEffect(() => {
        if (!mounted) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
        } catch { }
    }, [companies, mounted]);

    // Dialog state
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({ username: "", name: "" });
    const [saving, setSaving] = useState(false);

    const openAddDialog = () => {
        setIsEditing(false);
        setEditingId(null);
        setForm({ username: "", name: "" });
        setOpen(true);
    };

    const openEditDialog = (c: Company) => {
        setIsEditing(true);
        setEditingId(c.id);
        setForm({ username: "", name: c.name });
        setOpen(true);
    };

    const handleSaveCompany = async () => {
        if (!form.name.trim() || !form.username.trim()) {
            alert("Please fill in all fields");
            return;
        }

        if (isEditing && editingId !== null) {
            // TODO: Edit functionality (not implemented in backend yet)
            setCompanies((prev) =>
                prev.map((c) =>
                    c.id === editingId ? { ...c, name: form.name.trim() } : c
                )
            );
        } else {
            // Add new company via backend
            if (!actor) {
                alert("Not connected to backend");
                return;
            }

            setSaving(true);
            try {
                console.log("📡 Adding new company:", form.username, form.name);
                const result = await actor.add_new_companey(form.username.trim(), form.name.trim());
                
                if ('Ok' in result) {
                    console.log("✅ Company added successfully");
                    alert("Company added successfully!");
                    
                    // Reload companies from backend
                    const companyUsernames = await actor.list_my_admin_companies() as string[];
                    const companiesData: Company[] = companyUsernames.map((username, index) => ({
                        id: index + 1,
                        username: username,
                        name: username,  // Using username as name for now
                        employees: []
                    }));
                    setCompanies(companiesData);
                } else {
                    console.error("❌ Error adding company:", result.Err);
                    alert("Error: " + result.Err);
                }
            } catch (error) {
                console.error("❌ Failed to add company:", error);
                alert("Failed to add company: " + (error instanceof Error ? error.message : "Unknown error"));
            } finally {
                setSaving(false);
            }
        }

        // close dialog
        setOpen(false);
        setForm({ username: "", name: "" });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleDeleteCompany = (id: number) => {
        if (!confirm("Are you sure you want to delete this company?")) return;
        setCompanies((prev) => prev.filter((c) => c.id !== id));
    };

    // Skeleton while mounting to avoid hydration mismatch
    if (!mounted) {
        return (
            
            <BorderLayout id="verify-page" className="mt-3 border-t">
                <CrossSVG className="absolute -left-3 -top-3 " />
                <CrossSVG className="absolute -right-3 -top-3" />
                <div className="seciton-py">
                    <div className="text-center">
                        <div className="font-matter space-y-4 pb-8 flex flex-col items-center justify-center text-center">
                            {/* Label */}
                            <div className="text-xs text-secondary-black flex gap-1.5 px-3.5 py-1 bg-white items-center shadow border border-gray rounded-full w-fit [&>svg]:size-4">
                                Your companies in one place
                            </div>

                            {/* Title */}
                            <div className="text-[32px] lg:text-[48px] text-[#141414] font-cal capitalize text-balance leading-tight">
                                <h1>Company Management</h1>
                            </div>

                            {/* Description */}
                            <div className="text-base lg:text-lg text-gray-700 max-w-2xl">
                                <h2>
                                    Manage your companies with ease — add new companies, edit or remove employees,
                                    and maintain full control as the company owner.
                                </h2>
                            </div>
                        </div>



                        {/* Company Cards */}
                        <div className="flex justify-center items-center">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </BorderLayout>
        );
    }

    return (
        <BorderLayout id="verify-page" className="mt-3 border-t">
            <CrossSVG className="absolute -left-3 -top-3 " />
            <CrossSVG className="absolute -right-3 -top-3" />

            <div className="seciton-py">
                <div className="text-center">
                    <div className="font-matter space-y-4 pb-8 flex flex-col items-center justify-center text-center">
                        {/* Label */}
                        <div className="text-xs text-secondary-black flex gap-1.5 px-3.5 py-1 bg-white items-center shadow border border-gray rounded-full w-fit [&>svg]:size-4">
                            Your companies in one place
                        </div>

                        {/* Title */}
                        <div className="text-[32px] lg:text-[48px] text-[#141414] font-cal capitalize text-balance leading-tight">
                            <h1>Company Management</h1>
                        </div>

                        {/* Description */}
                        <div className="text-base lg:text-lg text-gray-700 max-w-2xl">
                            <h2>
                                Manage your companies with ease — add new companies, edit or remove employees,
                                and maintain full control as the company owner.
                            </h2>
                        </div>
                    </div>

                    {/* Add Company Button */}
                    <div className="flex justify-center mb-8">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="size-4" /> Add Company
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[400px]">
                                <DialogHeader>
                                    {/* <DialogTitle>Add New Company</DialogTitle> */}
                                    <DialogTitle>{isEditing ? "Edit Company" : "Add New Company"}</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-3">
                                    <Input
                                        placeholder="Company Username"
                                        value={form.username}
                                        onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
                                    />
                                    <Input
                                        placeholder="Company Name"
                                        value={form.name}
                                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                                    />
                                    <Button 
                                        type="submit" 
                                        onClick={handleSaveCompany} 
                                        className="w-full"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : (isEditing ? "Save Changes" : "Add Company")}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Company Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                        {companies.map((item, i) => (
                            <div
                                key={item.id}
                                className="font-matter overflow-hidden bg-white border border-gray rounded-2xl relative"
                            >
                                {/* border dots */}
                                <span className="absolute size-1.5 bg-[#C8D4DD] rounded-full left-3.5 top-3.5" />
                                <span className="absolute size-1.5 bg-[#C8D4DD] rounded-full right-3.5 top-3.5" />
                                <span className="absolute size-1.5 bg-[#C8D4DD] rounded-full left-3.5 bottom-3.5" />
                                <span className="absolute size-1.5 bg-[#C8D4DD] rounded-full right-3.5 bottom-3.5" />

                                <div className="p-10  flex flex-col items-center text-center">
                                    {/* ✅ Image or Default Icon */}
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="size-12 object-cover rounded-md mb-3"
                                        />
                                    ) : (
                                        <div className="inline-block p-2 font-mono text-[#6b7280] mb-3 text-sm rounded-md bg-[#e5e7eb] font-bold">
                                            <Building2 className="text-gray-500 size-8" />
                                        </div>
                                    )}
                                    <div className="mb-[6px] text-[18px] text-[#141414] font-semibold">
                                        {item.name}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">{item.employees.length} Employees</p>

                                    {/* Actions */}
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        <Button variant="secondary" className="gap-1" onClick={() => openEditDialog(item)}>
                                            <Pencil className="size-4" /> Edit
                                        </Button>
                                        <Link href={`/companies?username=${item.username}`}>
                                            <Button variant="default" className="gap-1">
                                                <Eye className="size-4" /> View
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="gap-1"
                                            onClick={() => handleDeleteCompany(item.id)}
                                        >
                                            <Trash2 className="size-4" /> Delete
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BorderLayout>
    )

}
