'use client';

import { useState, useEffect } from 'react';
import { Phone, Seller } from '@/lib/types';
import { storage } from '@/lib/storage';

interface PhoneFormProps {
    phone?: Phone;
    onSubmit: (phone: any) => void;
    onCancel: () => void;
}

export default function PhoneForm({ phone, onSubmit, onCancel }: PhoneFormProps) {
    const [formData, setFormData] = useState({
        type: phone?.type || 'Android',
        brand: phone?.brand || '',
        model: phone?.model || '',
        imei: phone?.imei || '',
        purchasePrice: phone?.purchasePrice || '',
        salePrice: phone?.salePrice || '',
        purchaseDate: phone?.purchaseDate || new Date().toISOString().split('T')[0],
        sellerName: '',
        sellerPhone: '',
        sellerCnic: '',
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
            purchasePrice: parseFloat(formData.purchasePrice as string),
            salePrice: salePriceValue,
            purchaseDate: formData.purchaseDate,
            sellerId,
            sold: phone?.sold || false,
            soldDate: phone?.soldDate,
            buyerId: phone?.buyerId,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">
                {phone ? 'Edit Phone' : 'Add New Phone'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                        placeholder="e.g., Samsung, iPhone, Nokia"
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
                        placeholder="e.g., Galaxy A12, iPhone 11"
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
                        placeholder="Phone IMEI number"
                    />
                </div>

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
                        min="0"
                    />
                </div>

                {/* Sale Price */}
                <div className="form-group">
                    <label className="form-label">Sale Price (Rs) {phone ? '*' : '(Optional)'}</label>
                    <input
                        type="number"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Leave empty if unknown"
                        required={!!phone}
                        min="0"
                    />
                    {!phone && (
                        <p className="text-sm text-gray-500 mt-1">
                            💡 You can set this later when marking the phone as sold
                        </p>
                    )}
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
            <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Seller Information</h3>

                {!showNewSeller && sellers.length > 0 ? (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                            Using existing seller.
                            <button
                                type="button"
                                onClick={() => setShowNewSeller(true)}
                                className="text-indigo-600 hover:underline ml-2"
                            >
                                Add new seller?
                            </button>
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group">
                            <label className="form-label">Seller Name *</label>
                            <input
                                type="text"
                                name="sellerName"
                                value={formData.sellerName}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Full name"
                                required={showNewSeller}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number *</label>
                            <input
                                type="tel"
                                name="sellerPhone"
                                value={formData.sellerPhone}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Phone number"
                                required={showNewSeller}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">CNIC (Optional)</label>
                            <input
                                type="text"
                                name="sellerCnic"
                                value={formData.sellerCnic}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="CNIC number"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                    {phone ? 'Update Phone' : 'Add Phone'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
