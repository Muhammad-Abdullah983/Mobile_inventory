'use client';

import { Seller, Buyer } from '@/lib/types';

interface SellerBuyerModalProps {
    seller: Seller | null;
    buyer: Buyer | null;
    onClose: () => void;
}

export default function SellerBuyerModal({
    seller,
    buyer,
    onClose,
}: SellerBuyerModalProps) {
    if (!seller) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50 overflow-y-auto">
            <div className="card max-w-4xl w-full mt-32 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Transaction Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Seller Section */}
                    <div>
                        <h3 className="text-lg font-bold text-indigo-600 mb-4">📤 Seller Details</h3>
                        <div className="space-y-3">
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Full Name</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {seller.name}
                                </p>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Phone Number</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    <a
                                        href={`tel:${seller.phone}`}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        {seller.phone}
                                    </a>
                                </p>
                            </div>

                            {seller.cnic && (
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">CNIC</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {seller.cnic}
                                    </p>
                                </div>
                            )}

                            {seller.additionalDetails && (
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Additional Details</p>
                                    <p className="text-sm text-gray-800">{seller.additionalDetails}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buyer Section */}
                    {buyer && (
                        <div>
                            <h3 className="text-lg font-bold text-purple-600 mb-4">
                                📥 Buyer Details
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Full Name</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {buyer.name}
                                    </p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Phone Number</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        <a
                                            href={`tel:${buyer.phone}`}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            {buyer.phone}
                                        </a>
                                    </p>
                                </div>

                                {buyer.cnic && (
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-1">CNIC</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {buyer.cnic}
                                        </p>
                                    </div>
                                )}

                                {buyer.additionalDetails && (
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-1">Additional Details</p>
                                        <p className="text-sm text-gray-800">{buyer.additionalDetails}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t mt-6">
                    <button onClick={onClose} className="btn-primary w-full">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
