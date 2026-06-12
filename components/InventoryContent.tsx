'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone } from '@/lib/types';
import { storage } from '@/lib/storage';
import AddPhoneModal from '@/components/AddPhoneModal';
import PhoneList from '@/components/PhoneList';
import SoldModal from '@/components/SoldModal';

export default function InventoryContent() {
    const searchParams = useSearchParams();
    const [phones, setPhones] = useState<Phone[]>([]);
    const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
    const [showModal, setShowModal] = useState(searchParams.get('action') === 'add');
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
        setPhones(allPhones);
    };

    const filterPhones = () => {
        let result = phones;

        // Filter by search query
        if (searchQuery) {
            result = storage.searchPhones(searchQuery);
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
            <h1 className="text-3xl font-bold mb-6">📱 Inventory Management</h1>

            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                Add New Phone
            </button>

            <div className="mb-4 flex gap-2 flex-wrap">
                <input
                    type="text"
                    placeholder="Search by brand, model, or IMEI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">All Phones</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            <PhoneList
                phones={filteredPhones}
                onEdit={handleEditPhone}
                onDelete={handleDeletePhone}
                onMarkSold={handleMarkSold}
            />

            {showModal && (
                <AddPhoneModal
                    isOpen={showModal}
                    phone={editingPhone}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

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
