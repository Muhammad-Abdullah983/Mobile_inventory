// Types for the inventory management system

export interface Seller {
    id: string;
    name: string;
    phone: string;
    cnic?: string;
    additionalDetails?: string;
}

export interface Buyer {
    id: string;
    name: string;
    phone: string;
    cnic?: string;
    additionalDetails?: string;
}

export interface Phone {
    id: string;
    type: 'Android' | 'Keypad';
    brand: string;
    model: string;
    imei?: string;
    storageCapacity?: string;
    condition: 'New' | 'Used';
    mobileDetails?: string;
    purchasePrice: number;
    salePrice: number;
    purchaseDate: string;
    sellerId: string;
    sold: boolean;
    soldDate?: string;
    buyerId?: string;
}

export interface Sale {
    id: string;
    phoneId: string;
    sellerId: string;
    buyerId: string;
    purchasePrice: number;
    salePrice: number;
    profit: number;
    saleDate: string;
}

export interface DashboardStats {
    totalPhones: number;
    soldPhones: number;
    totalProfit: number;
    totalSales: number;
}
