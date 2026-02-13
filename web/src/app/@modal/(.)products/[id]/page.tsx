'use client';

import { useParams, useRouter } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';
import { Modal } from '@/components/ui/modal';

export default function ProductModalPage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const productId = Number(params.id);

	return (
		<Modal onClose={() => router.back()}>
			<ProductDetail productId={productId} />
		</Modal>
	);
}
