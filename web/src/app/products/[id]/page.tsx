'use client';

import { useParams, useRouter } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';
import { ProductGrid } from '@/components/products/product-grid';
import { Modal } from '@/components/ui/modal';

export default function ProductPage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const productId = Number(params.id);

	return (
		<>
			<ProductGrid />
			<Modal onClose={() => router.push('/')}>
				<ProductDetail productId={productId} />
			</Modal>
		</>
	);
}
