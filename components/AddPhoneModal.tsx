'use client';

import { Phone, Seller } from '@/lib/types';
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';

interface AddPhoneModalProps {
    isOpen: boolean;
    phone?: Phone;
    onSubmit: (phone: any) => void;
    onCancel: () => void;
}

export default function AddPhoneModal({
    isOpen,
    phone,
    onSubmit,
    onCancel,
}: AddPhoneModalProps) {
    const [formData, setFormData] = useState({
        type: phone?.type || 'Android',
        brand: phone?.brand || '',
        model: phone?.model || '',
        imei: phone?.imei || '',
        storageCapacity: phone?.storageCapacity || '',
        condition: phone?.condition || 'New',
        mobileDetails: phone?.mobileDetails || '',
        purchasePrice: phone?.purchasePrice || '',
        salePrice: phone?.salePrice || '',
        purchaseDate: phone?.purchaseDate || new Date().toISOString().split('T')[0],
        sellerName: '',
        sellerPhone: '',
        sellerCnic: '',
        sellerAdditionalDetails: '',
    });

    const [sellers, setSellers] = useState<Seller[]>([]);
    const [showNewSeller, setShowNewSeller] = useState(!phone);

    useEffect(() => {
        setSellers(storage.getSellers());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let sellerId = '';
        if (showNewSeller) {
            if (!formData.sellerName || !formData.sellerPhone) {
                alert('Please enter seller details');
                return;
            }
            const seller = storage.addSeller({
                name: formData.sellerName,
                phone: formData.sellerPhone,
                cnic: formData.sellerCnic,
                additionalDetails: formData.sellerAdditionalDetails || undefined,
            });
            sellerId = seller.id;
        } else {
            const selectedSeller = sellers[0];
            if (!selectedSeller) {
                alert('Please select a seller or create a new one');
                return;
            }
            sellerId = selectedSeller.id;
        }

        // If sale price is empty when adding (not editing), use purchase price as default
        const salePriceValue = formData.salePrice
            ? parseFloat(formData.salePrice as string)
            : parseFloat(formData.purchasePrice as string);

        onSubmit({
            type: formData.type,
            brand: formData.brand,
            model: formData.model,
            imei: formData.imei || undefined,
            storageCapacity: formData.storageCapacity || undefined,
            condition: formData.condition as 'New' | 'Used',
            mobileDetails: formData.mobileDetails || undefined,
            purchasePrice: parseFloat(formData.purchasePrice as string),
            salePrice: salePriceValue,
            purchaseDate: formData.purchaseDate,
            sellerId,
            sold: phone?.sold || false,
            soldDate: phone?.soldDate,
            buyerId: phone?.buyerId,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50 overflow-y-auto">
            <div className="card max-w-5xl w-full mt-32 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {phone ? 'Edit Phone' : 'Add New Phone'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {/* Phone Type */}
                        <div className="form-group">
                            <label className="form-label">Phone Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="Android">Android</option>
                                <option value="Keypad">Keypad</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="form-group">
                            <label className="form-label">Brand *</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Samsung, iPhone"
                                required
                            />
                        </div>

                        {/* Model */}
                        <div className="form-group">
                            <label className="form-label">Model *</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Galaxy A12"
                                required
                            />
                        </div>

                        {/* IMEI */}
                        <div className="form-group">
                            <label className="form-label">IMEI (Optional)</label>
                            <input
                                type="text"
                                name="imei"
                                value={formData.imei}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="15-digit IMEI"
                            />
                        </div>

                        {/* Storage Capacity */}
                        <div className="form-group">
                            <label className="form-label">Storage Capacity (Optional)</label>
                            <input
                                type="text"
                                name="storageCapacity"
                                value={formData.storageCapacity}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., 64GB, 128GB"
                            />
                        </div>

                        {/* Condition */}
                        <div className="form-group">
                            <label className="form-label">Condition *</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile Details */}
                    <div className="form-group mb-4 col-span-2 lg:col-span-3">
                        <label className="form-label">Mobile Details (Optional)</label>
                        <textarea
                            name="mobileDetails"
                            value={formData.mobileDetails}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    mobileDetails: e.target.value,
                                }))
                            }
                            className="input-field resize-none h-12"
                            placeholder="e.g., Battery health, scratches, screen condition, etc."
                        />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {/* Purchase Price */}
                        <div className="form-group">
                            <label className="form-label">Purchase Price (Rs) *</label>
                            <input
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="0"
                                required
                            />
                        </div>

                        {/* Sale Price */}
                        <div className="form-group">
                            <label className="form-label">Sale Price (Rs)</label>
                            <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Leave empty to use purchase price"
                            />
                        </div>

                        {/* Purchase Date */}
                        <div className="form-group">
                            <label className="form-label">Purchase Date *</label>
                            <input
                                type="date"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                    </div>

                    {/* Seller Section */}
                    <div className="border-t pt-4 mb-4">
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="newSeller"
                                name="sellerType"
                                checked={showNewSeller}
                                onChange={() => setShowNewSeller(true)}
                                className="mr-2"
                            />
                            <label htmlFor="newSeller" className="cursor-pointer">
                                Add New Seller
                            </label>
                        </div>

                        {showNewSeller && (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3 bg-gray-50 p-3 rounded">
                                    <div className="form-group">
                                        <label className="form-label">Seller Name *</label>
                                        <input
                                            type="text"
                                            name="sellerName"
                                            value={formData.sellerName}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Full name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Seller Phone *</label>
                                        <input
                                            type="tel"
                                            name="sellerPhone"
                                            value={formData.sellerPhone}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Phone number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Seller CNIC</label>
                                        <input
                                            type="text"
                                            name="sellerCnic"
                                            value={formData.sellerCnic}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="CNIC"
                                        />
                                    </div>
                                </div>

                                {/* Additional Seller Details */}
                                <div className="form-group mb-3 col-span-2 lg:col-span-3">
                                    <label className="form-label">Additional Seller Details (Optional)</label>
                                    <textarea
                                        name="sellerAdditionalDetails"
                                        value={formData.sellerAdditionalDetails}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                sellerAdditionalDetails: e.target.value,
                                            }))
                                        }
                                        className="input-field resize-none h-12"
                                        placeholder="e.g., Address, business name, etc."
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {phone ? 'Update Phone' : 'Add Phone'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
