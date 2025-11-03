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
import { useICPActor } from '@/hooks/useICPActor'
import type { Company } from '@/types/backend'

const STORAGE_KEY = "companies";

const DEFAULT_COMPANIES: Company[] = [
    { id: 1, username: "artify", name: "Artify Studio", employees: [] },
    { id: 2, username: "vision", name: "Vision Arts", employees: [], image: "https://placehold.co/600x400" },
];

export default function page() {
    // Mounted gate to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    
    // Initialize ICP Actor using custom hook
    const { actor, loading: connecting, error: connectionError } = useICPActor();

    // Load companies from backend after actor is ready
    useEffect(() => {
        const loadCompanies = async () => {
            if (!actor) return;
            
            try {
                setLoadingCompanies(true);
                
                // Load companies from backend (returns array of usernames)
                const companyUsernames = await actor.list_my_admin_companies() as string[];
                
                // Convert string[] to Company[]
                const companiesData: Company[] = companyUsernames.map((username, index) => ({
                    id: index + 1,
                    username: username,
                    name: username,  // Using username as name for now
                    image: "",
                    employees: []
                }));
                
                setCompanies(companiesData);
            } catch (error) {
                // Fallback to default companies on error
                setCompanies(DEFAULT_COMPANIES);
            } finally {
                setLoadingCompanies(false);
                setMounted(true);
            }
        };
        
        loadCompanies();
    }, [actor]);

    // Persist to localStorage after mounted (keeping for now)
    useEffect(() => {
        if (!mounted) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
        } catch { }
    }, [companies, mounted]);

    // Add Dialog state
    const [openAdd, setOpenAdd] = useState(false);
    const [addForm, setAddForm] = useState({ username: "", name: "" });
    const [savingAdd, setSavingAdd] = useState(false);
    const [usernameError, setUsernameError] = useState("");

    // Edit Dialog state
    const [openEdit, setOpenEdit] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const [editForm, setEditForm] = useState({ username: "", name: "" });
    const [editMode, setEditMode] = useState<"name" | "username" | "both">("both");
    const [savingEdit, setSavingEdit] = useState(false);

    const openAddDialog = () => {
        setAddForm({ username: "", name: "" });
        setUsernameError("");
        setOpenAdd(true);
    };

    const validateUsername = (username: string): boolean => {
        // Check if username contains only lowercase letters, numbers, hyphens, and underscores
        const validPattern = /^[a-z0-9_-]*$/;
        return validPattern.test(username);
    };

    const openEditDialog = (c: Company) => {
        setEditingCompany(c);
        setEditForm({ username: c.username, name: c.name });
        setEditMode("both");
        setOpenEdit(true);
    };

    const closeAddDialog = () => {
        setOpenAdd(false);
        setAddForm({ username: "", name: "" });
        setUsernameError("");
    };

    const closeEditDialog = () => {
        setOpenEdit(false);
        setEditingCompany(null);
        setEditForm({ username: "", name: "" });
        setEditMode("both");
    };

    const handleAddCompany = async () => {
        if (!addForm.name.trim() || !addForm.username.trim()) {
            alert("Please fill in all fields");
            return;
        }

        if (!validateUsername(addForm.username)) {
            setUsernameError("Username can only contain lowercase letters, numbers, hyphens (-), and underscores (_). No spaces or special characters allowed.");
            return;
        }

        if (!actor) {
            alert("Not connected to backend");
            return;
        }

        setSavingAdd(true);
        try {
            const result = await actor.add_new_companey(addForm.username.trim(), addForm.name.trim());
            
            if ('Ok' in result) {
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
                closeAddDialog();
            } else {
                alert("Error: " + result.Err);
            }
        } catch (error) {
            alert("Failed to add company: " + (error instanceof Error ? error.message : "Unknown error"));
        } finally {
            setSavingAdd(false);
        }
    };

    const handleEditCompany = async () => {
        if (!editingCompany) return;

        // Validate based on edit mode
        if (editMode === "name" || editMode === "both") {
            if (!editForm.name.trim()) {
                alert("Please enter company name");
                return;
            }
        }
        if (editMode === "username" || editMode === "both") {
            if (!editForm.username.trim()) {
                alert("Please enter company username");
                return;
            }
        }

        // TODO: Edit functionality (not implemented in backend yet)
        // For now, update locally
        setSavingEdit(true);
        try {
            setCompanies((prev) =>
                prev.map((c) =>
                    c.id === editingCompany.id 
                        ? { 
                            ...c, 
                            name: editMode === "name" || editMode === "both" ? editForm.name.trim() : c.name,
                            username: editMode === "username" || editMode === "both" ? editForm.username.trim() : c.username
                          } 
                        : c
                )
            );
            alert("Company updated successfully!");
            closeEditDialog();
        } catch (error) {
            alert("Failed to update company: " + (error instanceof Error ? error.message : "Unknown error"));
        } finally {
            setSavingEdit(false);
        }
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
                        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                            <DialogTrigger asChild>
                                <Button className="gap-2" onClick={openAddDialog}>
                                    <Plus className="size-4" /> Add Company
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[400px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Company</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Company Name</label>
                                        <Input
                                            placeholder="Enter company name"
                                            value={addForm.name}
                                            onChange={(e) => setAddForm((s) => ({ ...s, name: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Company Username</label>
                                        <Input
                                            placeholder="Enter company username"
                                            value={addForm.username}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setAddForm((s) => ({ ...s, username: value }));
                                                
                                                // Validate and show error if invalid
                                                if (value && !validateUsername(value)) {
                                                    setUsernameError("Only lowercase letters, numbers, hyphens (-), and underscores (_) are allowed");
                                                } else {
                                                    setUsernameError("");
                                                }
                                            }}
                                            className={usernameError ? "border-red-500" : ""}
                                        />
                                        {usernameError && (
                                            <p className="text-xs text-red-500 mt-1">{usernameError}</p>
                                        )}
                                    </div>
                                    <Button 
                                        type="submit" 
                                        onClick={handleAddCompany} 
                                        className="w-full"
                                        disabled={savingAdd}
                                    >
                                        {savingAdd ? "Adding..." : "Add Company"}
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

            {/* Edit Company Dialog */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Edit Company</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Edit Mode Selection */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">What do you want to edit?</label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    type="button"
                                    variant={editMode === "name" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEditMode("name")}
                                    className="w-full"
                                >
                                    Name
                                </Button>
                                <Button
                                    type="button"
                                    variant={editMode === "username" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEditMode("username")}
                                    className="w-full"
                                >
                                    Username
                                </Button>
                                <Button
                                    type="button"
                                    variant={editMode === "both" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEditMode("both")}
                                    className="w-full"
                                >
                                    Both
                                </Button>
                            </div>
                        </div>

                        {/* Edit Fields */}
                        <div className="space-y-3">
                            {(editMode === "username" || editMode === "both") && (
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Company Username</label>
                                    <Input
                                        placeholder="Enter company username"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm((s) => ({ ...s, username: e.target.value }))}
                                    />
                                </div>
                            )}
                            
                            {(editMode === "name" || editMode === "both") && (
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Company Name</label>
                                    <Input
                                        placeholder="Enter company name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            <Button 
                                type="button"
                                variant="outline"
                                onClick={closeEditDialog}
                                className="flex-1"
                                disabled={savingEdit}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                onClick={handleEditCompany} 
                                className="flex-1"
                                disabled={savingEdit}
                            >
                                {savingEdit ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </BorderLayout>
    )

}
