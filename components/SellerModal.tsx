'use client';

import { Seller } from '@/lib/types';

interface SellerModalProps {
    seller: Seller | null;
    onClose: () => void;
}

export default function SellerModal({ seller, onClose }: SellerModalProps) {
    if (!seller) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Seller Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Full Name</p>
                        <p className="text-lg font-semibold text-gray-800">{seller.name}</p>
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
                            <p className="text-lg font-semibold text-gray-800">{seller.cnic}</p>
                        </div>
                    )}

                    {seller.additionalDetails && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Additional Details</p>
                            <p className="text-sm text-gray-800">{seller.additionalDetails}</p>
                        </div>
                    )}

                    <div className="pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="btn-primary w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
