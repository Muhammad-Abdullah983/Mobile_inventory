'use client';

import { useEffect, useState } from 'react';
import { Phone, Sale, Seller, Buyer } from '@/lib/types';
import { storage } from '@/lib/storage';
import SellerModal from '@/components/SellerModal';
import BuyerModal from '@/components/BuyerModal';

interface SaleWithDetails extends Sale {
    phone?: Phone;
    seller?: Seller;
    buyer?: Buyer;
}

export default function SalesPage() {
    const [sales, setSales] = useState<SaleWithDetails[]>([]);
    const [filteredSales, setFilteredSales] = useState<SaleWithDetails[]>([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
    const [filterType, setFilterType] = useState<'all' | 'today' | 'week' | 'month'>('all');

    useEffect(() => {
        loadSalesData();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [sales, filterType]);

    const loadSalesData = () => {
        const allSales = storage.getSales();
        const allPhones = storage.getPhones();
        const allSellers = storage.getSellers();
        const allBuyers = storage.getBuyers();

        const phoneMap = allPhones.reduce(
            (acc, phone) => {
                acc[phone.id] = phone;
                return acc;
            },
            {} as { [key: string]: Phone }
        );

        const sellerMap = allSellers.reduce(
            (acc, seller) => {
                acc[seller.id] = seller;
                return acc;
            },
            {} as { [key: string]: Seller }
        );

        const buyerMap = allBuyers.reduce(
            (acc, buyer) => {
                acc[buyer.id] = buyer;
                return acc;
            },
            {} as { [key: string]: Buyer }
        );

        const enrichedSales = allSales.map((sale) => ({
            ...sale,
            phone: phoneMap[sale.phoneId],
            seller: sellerMap[sale.sellerId],
            buyer: buyerMap[sale.buyerId],
        }));

        setSales(enrichedSales);
    };

    const applyFilter = () => {
        let filtered = [...sales];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filterType === 'today') {
            filtered = sales.filter((sale) => {
                const saleDate = new Date(sale.saleDate);
                saleDate.setHours(0, 0, 0, 0);
                return saleDate.getTime() === today.getTime();
            });
        } else if (filterType === 'week') {
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            filtered = sales.filter((sale) => {
                const saleDate = new Date(sale.saleDate);
                return saleDate >= weekAgo && saleDate <= today;
            });
        } else if (filterType === 'month') {
            const monthAgo = new Date(today);
            monthAgo.setDate(monthAgo.getDate() - 30);
            filtered = sales.filter((sale) => {
                const saleDate = new Date(sale.saleDate);
                return saleDate >= monthAgo && saleDate <= today;
            });
        }

        setFilteredSales(filtered);
        setTotalProfit(filtered.reduce((sum, sale) => sum + sale.profit, 0));
        setTotalSales(filtered.length);
    };

    if (sales.length === 0) {
        return (
            <div className="py-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Sales History</h1>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={() => setFilterType('today')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'today'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📅 Today
                    </button>
                    <button
                        onClick={() => setFilterType('week')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'week'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📆 Last Week
                    </button>
                    <button
                        onClick={() => setFilterType('month')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'month'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📊 Last Month
                    </button>
                    <button
                        onClick={() => setFilterType('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        📈 All Sales
                    </button>
                </div>

                <div className="card text-center py-12">
                    <p className="text-gray-500 text-lg">No sales yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Phones will appear here once they are marked as sold.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Sales History</h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={() => setFilterType('today')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'today'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    📅 Today
                </button>
                <button
                    onClick={() => setFilterType('week')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'week'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    📆 Last Week
                </button>
                <button
                    onClick={() => setFilterType('month')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'month'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    📊 Last Month
                </button>
                <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'all'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    📈 All Sales
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                    <div className="text-purple-600 text-4xl mb-2">📊</div>
                    <p className="text-gray-600 text-sm mb-2">Sales ({filterType === 'all' ? 'All' : filterType === 'today' ? 'Today' : filterType === 'week' ? 'Last Week' : 'Last Month'})</p>
                    <p className="text-3xl font-bold text-gray-800">{totalSales}</p>
                </div>

                <div className="card bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300">
                    <div className="text-green-600 text-4xl mb-2">💰</div>
                    <p className="text-gray-600 text-sm mb-2">Profit ({filterType === 'all' ? 'All' : filterType === 'today' ? 'Today' : filterType === 'week' ? 'Last Week' : 'Last Month'})</p>
                    <p className="text-3xl font-bold text-gray-800">
                        Rs. {totalProfit.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Sales Table */}
            {filteredSales.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-gray-500 text-lg">No sales found</p>
                    <p className="text-gray-400 text-sm mt-2">
                        No sales during this period.
                    </p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Phone</th>
                                <th>Seller</th>
                                <th>Buyer</th>
                                <th>Purchase Price</th>
                                <th>Sale Price</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="text-sm">
                                        {new Date(sale.saleDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {sale.phone?.brand} {sale.phone?.model}
                                            </p>
                                            <p className="text-xs text-gray-600">{sale.phone?.type}</p>
                                        </div>
                                    </td>
                                    <td>
                                        {sale.seller ? (
                                            <button
                                                onClick={() => setSelectedSeller(sale.seller!)}
                                                className="hover:opacity-75"
                                            >
                                                <div className="text-sm">
                                                    <p className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
                                                        {sale.seller.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {sale.seller.phone}
                                                    </p>
                                                </div>
                                            </button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>
                                    <td>
                                        {sale.buyer ? (
                                            <button
                                                onClick={() => setSelectedBuyer(sale.buyer!)}
                                                className="hover:opacity-75"
                                            >
                                                <div className="text-sm">
                                                    <p className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
                                                        {sale.buyer.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {sale.buyer.phone}
                                                    </p>
                                                </div>
                                            </button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>
                                    <td>Rs. {sale.purchasePrice.toLocaleString()}</td>
                                    <td>Rs. {sale.salePrice.toLocaleString()}</td>
                                    <td>
                                        <span className="badge badge-success">
                                            Rs. {sale.profit.toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Seller Modal */}
            <SellerModal
                seller={selectedSeller}
                onClose={() => setSelectedSeller(null)}
            />

            {/* Buyer Modal */}
            <BuyerModal
                buyer={selectedBuyer}
                onClose={() => setSelectedBuyer(null)}
            />
        </div>
    );
}
