'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    📱 Mian Mobile Shop
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-6">
                    <Link href="/" className="hover:text-indigo-100 transition">
                        Dashboard
                    </Link>
                    <Link href="/inventory" className="hover:text-indigo-100 transition">
                        Inventory
                    </Link>
                    <Link href="/android" className="hover:text-indigo-100 transition">
                        Android Phones
                    </Link>
                    <Link href="/keypad" className="hover:text-indigo-100 transition">
                        Keypad Phones
                    </Link>
                    <Link href="/sales" className="hover:text-indigo-100 transition">
                        Sales History
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-4 py-3 flex flex-col gap-3">
                    <Link
                        href="/"
                        className="hover:text-indigo-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/inventory"
                        className="hover:text-indigo-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Inventory
                    </Link>
                    <Link
                        href="/android"
                        className="hover:text-indigo-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Android Phones
                    </Link>
                    <Link
                        href="/keypad"
                        className="hover:text-indigo-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Keypad Phones
                    </Link>
                    <Link
                        href="/sales"
                        className="hover:text-indigo-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Sales History
                    </Link>
                </div>
            )}
        </nav>
    );
}
