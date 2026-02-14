'use client';

import { type SortOption, useFilterStore } from '@/stores/filter-store';
import { twCb } from '@/utils/helper';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'default', label: 'Relevance' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'rating-desc', label: 'Top Rated' },
	{ value: 'title-asc', label: 'Name: A to Z' },
];

const LIMIT_OPTIONS = [12, 24, 48];

interface ProductToolbarProps {
	total: number;
}

export const ProductToolbar = (props: ProductToolbarProps) => {
	const sortBy = useFilterStore((s) => s.sortBy);
	const setSortBy = useFilterStore((s) => s.setSortBy);
	const limit = useFilterStore((s) => s.limit);
	const setLimit = useFilterStore((s) => s.setLimit);
	const page = useFilterStore((s) => s.page);

	const start = (page - 1) * limit + 1;
	const end = Math.min(page * limit, props.total);

	return (
		<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
			<p className="text-xs text-gray-400">
				Showing{' '}
				<span className="font-medium text-gray-600">
					{start}-{end}
				</span>{' '}
				of <span className="font-medium text-gray-600">{props.total}</span> products
			</p>

			<div className="flex items-center gap-3">
				{/* Items per page */}
				<div className="hidden items-center gap-1.5 sm:flex">
					<span className="text-xs text-gray-400">Show</span>
					<div className="flex rounded-lg border border-gray-200">
						{LIMIT_OPTIONS.map((opt) => (
							<button
								key={opt}
								type="button"
								onClick={() => setLimit(opt)}
								className={twCb(
									'px-2.5 py-1 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg',
									limit === opt
										? 'bg-gray-900 text-white'
										: 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
								)}
							>
								{opt}
							</button>
						))}
					</div>
				</div>

				{/* Sort */}
				<div className="flex items-center gap-1.5">
					<label htmlFor="sort-select" className="hidden text-xs text-gray-400 sm:inline">
						Sort by
					</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as SortOption)}
						className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
					>
						{SORT_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};
