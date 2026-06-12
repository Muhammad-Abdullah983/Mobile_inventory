'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { DashboardStats } from '@/lib/types';

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        // Load stats from storage
        const dashboardStats = storage.getDashboardStats();
        setStats(dashboardStats);
    }, []);

    if (!stats) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Total Phones */}
                <div className="card bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200">
                    <div className="text-indigo-600 text-4xl mb-2">📦</div>
                    <p className="text-gray-600 text-sm mb-2">Total Phones</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalPhones}</p>
                </div>

                {/* Available Phones */}
                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <div className="text-green-600 text-4xl mb-2">✅</div>
                    <p className="text-gray-600 text-sm mb-2">Available</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {stats.totalPhones - stats.soldPhones}
                    </p>
                </div>

                {/* Sold Phones */}
                <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                    <div className="text-purple-600 text-4xl mb-2">🎉</div>
                    <p className="text-gray-600 text-sm mb-2">Sold</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.soldPhones}</p>
                </div>

                {/* Total Profit */}
                <div className="card bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300">
                    <div className="text-green-600 text-4xl mb-2">💰</div>
                    <p className="text-gray-600 text-sm mb-2">Total Profit</p>
                    <p className="text-3xl font-bold text-gray-800">
                        Rs. {stats.totalProfit.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/inventory?action=add"
                        className="btn-primary text-center"
                    >
                        ➕ Add New Phone
                    </Link>
                    <Link
                        href="/inventory"
                        className="btn-secondary text-center"
                    >
                        📋 View Inventory
                    </Link>
                    <Link
                        href="/sales"
                        className="btn-secondary text-center"
                    >
                        📊 Sales History
                    </Link>
                </div>
            </div>

            {/* Info Section */}
            <div className="card bg-indigo-50 border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">ℹ️ About This App</h3>
                <p className="text-gray-700 mb-2">
                    This is a mobile inventory management system designed for managing used Android and
                    keypad phones. Keep track of your inventory, sales, and profits all in one place.
                </p>
                <p className="text-gray-600 text-sm">
                    💡 Tip: Start by adding phones to your inventory from the &quot;Add New Phone&quot; button.
                </p>
            </div>
        </div>
    );
}
