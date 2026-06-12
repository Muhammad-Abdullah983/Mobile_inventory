'use client';

import { useState } from 'react';
import { Phone } from '@/lib/types';
import { storage } from '@/lib/storage';

interface SoldModalProps {
    phone: Phone;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function SoldModal({ phone, onConfirm, onCancel }: SoldModalProps) {
    const [formData, setFormData] = useState({
        buyerName: '',
        buyerPhone: '',
        buyerCnic: '',
        buyerAdditionalDetails: '',
        salePrice: phone.salePrice || '',
        soldDate: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.buyerName || !formData.buyerPhone) {
            alert('Please enter buyer details');
            return;
        }

        // Add buyer
        const buyer = storage.addBuyer({
            name: formData.buyerName,
            phone: formData.buyerPhone,
            cnic: formData.buyerCnic,
            additionalDetails: formData.buyerAdditionalDetails || undefined,
        });

        const salePrice = parseFloat(formData.salePrice as string) || phone.salePrice;
        const profit = salePrice - phone.purchasePrice;

        // Add sale record
        storage.addSale({
            phoneId: phone.id,
            sellerId: phone.sellerId,
            buyerId: buyer.id,
            purchasePrice: phone.purchasePrice,
            salePrice,
            profit,
            saleDate: formData.soldDate,
        });

        // Update phone as sold
        storage.updatePhone(phone.id, {
            sold: true,

            soldDate: formData.soldDate,
            buyerId: buyer.id,
            salePrice,
        });

        onConfirm();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50 overflow-y-auto">
            <div className="card max-w-3xl w-full mt-32 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Mark as Sold</h2>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Phone Details:</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Brand & Model:</p>
                            <p className="font-semibold text-gray-800">
                                {phone.brand} {phone.model}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Sale Price:</p>
                            <p className="font-semibold text-gray-800">
                                Rs. {phone.salePrice.toLocaleString()}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-600">Profit:</p>
                            <p className="font-semibold text-green-700">
                                Rs. {(phone.salePrice - phone.purchasePrice).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Buyer Name and Phone - Row Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="form-group">
                            <label className="form-label">Buyer Name *</label>
                            <input
                                type="text"
                                name="buyerName"
                                value={formData.buyerName}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number *</label>
                            <input
                                type="tel"
                                name="buyerPhone"
                                value={formData.buyerPhone}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Phone number"
                                required
                            />
                        </div>
                    </div>

                    {/* CNIC and Sale Price - Row Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="form-group">
                            <label className="form-label">CNIC (Optional)</label>
                            <input
                                type="text"
                                name="buyerCnic"
                                value={formData.buyerCnic}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="CNIC number"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sale Price (Rs) *</label>
                            <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="0"
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Sale Date */}
                    <div className="form-group mb-3">
                        <label className="form-label">Sale Date *</label>
                        <input
                            type="date"
                            name="soldDate"
                            value={formData.soldDate}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    {/* Additional Buyer Details */}
                    <div className="form-group mb-3">
                        <label className="form-label">Additional Buyer Details (Optional)</label>
                        <textarea
                            name="buyerAdditionalDetails"
                            value={formData.buyerAdditionalDetails}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    buyerAdditionalDetails: e.target.value,
                                }))
                            }
                            className="input-field resize-none h-12"
                            placeholder="e.g., Address, business name, etc."
                        />
                    </div>

                    {/* Buttons - Row Layout */}
                    <div className="flex gap-3 justify-end pt-2 border-t mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary px-6"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary px-6">
                            Confirm Sale
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
