'use client';

import { CartSidebar } from '@/components/cart/cart-sidebar';
import { CategorySidebar } from '@/components/categories/category-sidebar';
import { ProductGrid } from '@/components/products/product-grid';

export default function HomePage() {
	return (
		<div className="flex gap-6">
			<aside className="hidden w-56 shrink-0 lg:block">
				<CategorySidebar />
			</aside>
			<div className="min-w-0 flex-1">
				<ProductGrid />
			</div>
			<aside className="hidden w-80 shrink-0 lg:block">
				<CartSidebar />
			</aside>
		</div>
	);
}
