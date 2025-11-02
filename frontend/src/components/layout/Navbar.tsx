"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <nav className="border-b bg-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image 
                        src="/svg/logoipsum.svg" 
                        alt="VerifyChain Logo" 
                        width={48} 
                        height={48}
                        className="w-12 h-12"
                    />
                </Link>

                {/* Right side - Profile & Logout */}
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <span className="text-gray-600 font-medium">U</span>
                    </button>
                    <Button variant="outline" size="sm">
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}

