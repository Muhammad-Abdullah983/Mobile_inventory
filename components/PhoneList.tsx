'use client';

import { Phone, Seller, Buyer } from '@/lib/types';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import SellerBuyerModal from './SellerBuyerModal';

interface PhoneListProps {
    phones: Phone[];
    onEdit: (phone: Phone) => void;
    onDelete: (id: string) => void;
    onMarkSold: (phone: Phone) => void;
}

export default function PhoneList({
    phones,
    onEdit,
    onDelete,
    onMarkSold,
}: PhoneListProps) {
    const [sellers, setSellers] = useState<{ [key: string]: Seller }>({});
    const [buyers, setBuyers] = useState<{ [key: string]: Buyer }>({});
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

    useEffect(() => {
        const allSellers = storage.getSellers();
        const sellerMap = allSellers.reduce(
            (acc, seller) => {
                acc[seller.id] = seller;
                return acc;
            },
            {} as { [key: string]: Seller }
        );
        setSellers(sellerMap);

        const allBuyers = storage.getBuyers();
        const buyerMap = allBuyers.reduce(
            (acc, buyer) => {
                acc[buyer.id] = buyer;
                return acc;
            },
            {} as { [key: string]: Buyer }
        );
        setBuyers(buyerMap);
    }, []);

    if (phones.length === 0) {
        return (
            <div className="card text-center py-12">
                <p className="text-gray-500 text-lg">No phones found</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Brand & Model</th>
                        <th>IMEI</th>
                        <th>Purchase Price</th>
                        <th>Sale Price</th>
                        <th>Status</th>
                        <th>Seller</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map((phone) => (
                        <tr key={phone.id}>
                            <td>
                                <span className="badge badge-info">
                                    {phone.type}
                                </span>
                            </td>
                            <td>
                                <div>
                                    <p className="font-semibold text-gray-800">{phone.brand}</p>
                                    <p className="text-sm text-gray-600">{phone.model}</p>
                                </div>
                            </td>
                            <td className="text-sm text-gray-600">
                                {phone.imei || '-'}
                            </td>
                            <td>Rs. {phone.purchasePrice.toLocaleString()}</td>
                            <td>Rs. {phone.salePrice.toLocaleString()}</td>
                            <td>
                                {phone.sold ? (
                                    <span className="badge badge-danger">
                                        Sold
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => onMarkSold(phone)}
                                        className="badge badge-success cursor-pointer hover:bg-green-600 transition"
                                    >
                                        Available
                                    </button>
                                )}
                            </td>
                            <td className="text-sm">
                                {sellers[phone.sellerId] ? (
                                    <button
                                        onClick={() => {
                                            setSelectedSeller(sellers[phone.sellerId]);
                                            if (phone.sold && phone.buyerId) {
                                                setSelectedBuyer(buyers[phone.buyerId] || null);
                                            } else {
                                                setSelectedBuyer(null);
                                            }
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                                    >
                                        {sellers[phone.sellerId].name}
                                    </button>
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td>
                                <div className="flex gap-2 flex-wrap">
                                    {!phone.sold && (
                                        <button
                                            onClick={() => onEdit(phone)}
                                            className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                                        >
                                            ✏️
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    'Are you sure you want to delete this phone?'
                                                )
                                            ) {
                                                onDelete(phone.id);
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Seller/Buyer Modal */}
            <SellerBuyerModal
                seller={selectedSeller}
                buyer={selectedBuyer}
                onClose={() => {
                    setSelectedSeller(null);
                    setSelectedBuyer(null);
                }}
            />
        </div>
    );
}
