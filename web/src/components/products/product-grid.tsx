'use client';

import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useProductsQuery } from '@/hooks/use-products.query';
import { ProductCard } from './product-card';
import { ProductSearch } from './product-search';

export const ProductGrid = () => {
	const [search, setSearch] = useState('');
	const { data, isLoading, isError, error } = useProductsQuery(search);

	return (
		<div>
			<div className="mb-8 max-w-md">
				<ProductSearch value={search} onChange={setSearch} />
			</div>

			{isLoading ? (
				<Spinner size="lg" />
			) : isError ? (
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
					<p className="text-sm text-red-600">
						Failed to load products. {error instanceof Error ? error.message : 'Please try again.'}
					</p>
				</div>
			) : data && data.products.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{data.products.map((product, index) => (
						<ProductCard key={product.id} product={product} priority={index < 4} />
					))}
				</div>
			) : (
				<div className="py-16 text-center">
					<p className="text-gray-500">No products found.</p>
				</div>
			)}
		</div>
	);
};
