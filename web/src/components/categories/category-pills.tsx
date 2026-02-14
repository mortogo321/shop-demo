'use client';

import { useCategoriesQuery } from '@/hooks/use-categories.query';
import { useFilterStore } from '@/stores/filter-store';
import { twCb } from '@/utils/helper';

export const CategoryPills = () => {
	const { data: categories } = useCategoriesQuery();
	const selectedCategory = useFilterStore((s) => s.selectedCategory);
	const setSelectedCategory = useFilterStore((s) => s.setSelectedCategory);

	return (
		<div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none lg:hidden">
			<button
				type="button"
				onClick={() => setSelectedCategory('')}
				className={twCb(
					'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
					selectedCategory === ''
						? 'border-blue-600 bg-blue-600 text-white shadow-sm'
						: 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900',
				)}
			>
				All
			</button>
			{categories?.map((category) => (
				<button
					type="button"
					key={category.slug}
					onClick={() => setSelectedCategory(category.slug)}
					className={twCb(
						'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
						selectedCategory === category.slug
							? 'border-blue-600 bg-blue-600 text-white shadow-sm'
							: 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900',
					)}
				>
					{category.name}
				</button>
			))}
		</div>
	);
};
