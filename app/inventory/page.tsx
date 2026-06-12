import { Suspense } from 'react';
import InventoryContent from '@/components/InventoryContent';

export default function InventoryPage() {
    return (
        <Suspense fallback={<div className="py-6 text-center">Loading...</div>}>
            <InventoryContent />
        </Suspense>
    );
}
