'use client';

import { useEffect, useState } from 'react';
import { Phone } from '@/lib/types';
import { storage } from '@/lib/storage';
import PhoneList from '@/components/PhoneList';
import AddPhoneModal from '@/components/AddPhoneModal';
import SoldModal from '@/components/SoldModal';

export default function AndroidPage() {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPhone, setEditingPhone] = useState<Phone | undefined>();
    const [phoneToSell, setPhoneToSell] = useState<Phone | undefined>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadPhones();
    }, []);

    useEffect(() => {
        filterPhones();
    }, [phones, searchQuery, filterStatus]);

    const loadPhones = () => {
        const allPhones = storage.getPhones();
        const androidPhones = allPhones.filter((p) => p.type === 'Android');
        setPhones(androidPhones);
    };

    const filterPhones = () => {
        let result = phones;

        // Filter by search query
        if (searchQuery) {
            result = result.filter(
                (p) =>
                    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (p.imei && p.imei.includes(searchQuery))
            );
        }

        // Filter by status
        if (filterStatus === 'available') {
            result = result.filter((p) => !p.sold);
        } else if (filterStatus === 'sold') {
            result = result.filter((p) => p.sold);
        }

        setFilteredPhones(result);
    };

    const handleAddPhone = (phoneData: any) => {
        storage.addPhone(phoneData);
        setShowModal(false);
        loadPhones();
    };

    const handleEditPhone = (phone: Phone) => {
        setEditingPhone(phone);
        setShowModal(true);
    };

    const handleUpdatePhone = (phoneData: any) => {
        if (editingPhone) {
            storage.updatePhone(editingPhone.id, phoneData);
            setShowModal(false);
            setEditingPhone(undefined);
            loadPhones();
        }
    };

    const handleDeletePhone = (id: string) => {
        storage.deletePhone(id);
        loadPhones();
    };

    const handleFormSubmit = (phoneData: any) => {
        if (editingPhone) {
            handleUpdatePhone(phoneData);
        } else {
            handleAddPhone(phoneData);
        }
    };

    const handleFormCancel = () => {
        setShowModal(false);
        setEditingPhone(undefined);
    };

    const handleMarkSold = (phone: Phone) => {
        setPhoneToSell(phone);
    };

    const handleSaleConfirm = () => {
        setPhoneToSell(undefined);
        loadPhones();
    };

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                <h1 className="text-4xl font-bold text-gray-800">Android Phones</h1>
                <button
                    onClick={() => {
                        setEditingPhone(undefined);
                        setShowModal(true);
                    }}
                    className="btn-primary"
                >
                    ➕ Add Phone
                </button>
            </div>

            {/* Add/Edit Modal */}
            <AddPhoneModal
                isOpen={showModal}
                phone={editingPhone}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
            />

            {/* Search and Filter */}
            <div className="card mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search Box */}
                    <div>
                        <label className="form-label">Search</label>
                        <input
                            type="text"
                            placeholder="Search by brand, model, or IMEI..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="form-label">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="input-field"
                        >
                            <option value="all">All</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredPhones.length} of {phones.length} Android phones
            </div>

            {/* Phone List */}
            <PhoneList
                phones={filteredPhones}
                onEdit={handleEditPhone}
                onDelete={handleDeletePhone}
                onMarkSold={handleMarkSold}
            />

            {/* Sold Modal */}
            {phoneToSell && (
                <SoldModal
                    phone={phoneToSell}
                    onConfirm={handleSaleConfirm}
                    onCancel={() => setPhoneToSell(undefined)}
                />
            )}
        </div>
    );
}
