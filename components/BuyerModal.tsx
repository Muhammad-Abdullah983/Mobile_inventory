'use client';

import { Buyer } from '@/lib/types';

interface BuyerModalProps {
    buyer: Buyer | null;
    onClose: () => void;
}

export default function BuyerModal({ buyer, onClose }: BuyerModalProps) {
    if (!buyer) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Buyer Details</h2>
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
                        <p className="text-lg font-semibold text-gray-800">{buyer.name}</p>
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
                            <p className="text-lg font-semibold text-gray-800">{buyer.cnic}</p>
                        </div>
                    )}

                    {buyer.additionalDetails && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Additional Details</p>
                            <p className="text-sm text-gray-800">{buyer.additionalDetails}</p>
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
