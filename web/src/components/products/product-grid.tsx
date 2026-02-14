'use client';

import { useProductsQuery } from '@/hooks/use-products.query';
import { useFilterStore } from '@/stores/filter-store';
import { CategoryPills } from '@/components/categories/category-pills';
import { Pagination } from './pagination';
import { ProductCard } from './product-card';
import { ProductSkeleton } from './product-skeleton';
import { ProductToolbar } from './product-toolbar';

export const ProductGrid = () => {
	const search = useFilterStore((s) => s.search);
	const selectedCategory = useFilterStore((s) => s.selectedCategory);
	const sortBy = useFilterStore((s) => s.sortBy);
	const page = useFilterStore((s) => s.page);
	const limit = useFilterStore((s) => s.limit);

	const { data, isLoading, isFetching, isError, error } = useProductsQuery({
		search,
		category: selectedCategory,
		sortBy,
		page,
		limit,
	});

	const products = data?.products ?? [];
	const total = data?.total ?? 0;

	return (
		<div>
			<CategoryPills />

			{isLoading ? (
				<ProductSkeleton />
			) : isError ? (
				<div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto mb-3 h-10 w-10 text-red-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1.5}
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					<p className="text-sm font-medium text-red-600">
						Failed to load products
					</p>
					<p className="mt-1 text-xs text-red-500">
						{error instanceof Error ? error.message : 'Please try again later.'}
					</p>
				</div>
			) : products.length > 0 ? (
				<div>
					<ProductToolbar total={total} />

					{search ? (
						<p className="mb-4 text-xs text-gray-400">
							{total} result{total !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
						</p>
					) : null}

					<div className={`space-y-3 transition-opacity duration-200 ${isFetching ? 'opacity-60' : ''}`}>
						{products.map((product, index) => (
							<ProductCard
								key={product.id}
								product={product}
								priority={index < 4 && page === 1}
							/>
						))}
					</div>

					<Pagination total={total} />
				</div>
			) : (
				<div className="py-20 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto mb-3 h-12 w-12 text-gray-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={1}
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<p className="text-sm font-medium text-gray-500">No products found</p>
					<p className="mt-1 text-xs text-gray-400">Try adjusting your search or filter</p>
				</div>
			)}
		</div>
	);
};
