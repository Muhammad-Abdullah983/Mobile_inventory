import { Phone, Seller, Buyer, Sale, DashboardStats } from './types';

const STORAGE_KEYS = {
    PHONES: 'mobile_inventory_phones',
    SELLERS: 'mobile_inventory_sellers',
    BUYERS: 'mobile_inventory_buyers',
    SALES: 'mobile_inventory_sales',
};

// Utility functions for managing data
export const storage = {
    // Phones
    getPhones: (): Phone[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.PHONES);
        return data ? JSON.parse(data) : [];
    },

    addPhone: (phone: Omit<Phone, 'id'>) => {
        const phones = storage.getPhones();
        const newPhone: Phone = {
            ...phone,
            id: Date.now().toString(),
        };
        phones.push(newPhone);
        localStorage.setItem(STORAGE_KEYS.PHONES, JSON.stringify(phones));
        return newPhone;
    },

    updatePhone: (id: string, updates: Partial<Phone>) => {
        const phones = storage.getPhones();
        const index = phones.findIndex((p) => p.id === id);
        if (index !== -1) {
            phones[index] = { ...phones[index], ...updates };
            localStorage.setItem(STORAGE_KEYS.PHONES, JSON.stringify(phones));
        }
    },

    deletePhone: (id: string) => {
        const phones = storage.getPhones().filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PHONES, JSON.stringify(phones));
    },

    // Sellers
    getSellers: (): Seller[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.SELLERS);
        return data ? JSON.parse(data) : [];
    },

    addSeller: (seller: Omit<Seller, 'id'>) => {
        const sellers = storage.getSellers();
        const newSeller: Seller = {
            ...seller,
            id: Date.now().toString(),
        };
        sellers.push(newSeller);
        localStorage.setItem(STORAGE_KEYS.SELLERS, JSON.stringify(sellers));
        return newSeller;
    },

    // Buyers
    getBuyers: (): Buyer[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.BUYERS);
        return data ? JSON.parse(data) : [];
    },

    addBuyer: (buyer: Omit<Buyer, 'id'>) => {
        const buyers = storage.getBuyers();
        const newBuyer: Buyer = {
            ...buyer,
            id: Date.now().toString(),
        };
        buyers.push(newBuyer);
        localStorage.setItem(STORAGE_KEYS.BUYERS, JSON.stringify(buyers));
        return newBuyer;
    },

    // Sales
    getSales: (): Sale[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEYS.SALES);
        return data ? JSON.parse(data) : [];
    },

    addSale: (sale: Omit<Sale, 'id'>) => {
        const sales = storage.getSales();
        const newSale: Sale = {
            ...sale,
            id: Date.now().toString(),
        };
        sales.push(newSale);
        localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
        return newSale;
    },

    // Dashboard Stats
    getDashboardStats: (): DashboardStats => {
        const phones = storage.getPhones();
        const sales = storage.getSales();

        const totalPhones = phones.length;
        const soldPhones = phones.filter((p) => p.sold).length;
        const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
        const totalSales = sales.length;

        return {
            totalPhones,
            soldPhones,
            totalProfit,
            totalSales,
        };
    },

    // Search
    searchPhones: (query: string): Phone[] => {
        const phones = storage.getPhones();
        const lowerQuery = query.toLowerCase();

        return phones.filter(
            (phone) =>
                phone.brand.toLowerCase().includes(lowerQuery) ||
                phone.model.toLowerCase().includes(lowerQuery) ||
                (phone.imei && phone.imei.includes(query))
        );
    },
};
