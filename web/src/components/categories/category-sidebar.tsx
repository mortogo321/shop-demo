'use client';

import { useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/hooks/use-categories.query';
import { useFilterStore } from '@/stores/filter-store';
import { twCb } from '@/utils/helper';

const INITIAL_VISIBLE = 8;

export const CategorySidebar = () => {
	const { data: categories, isLoading } = useCategoriesQuery();
	const selectedCategory = useFilterStore((s) => s.selectedCategory);
	const setSelectedCategory = useFilterStore((s) => s.setSelectedCategory);
	const [expanded, setExpanded] = useState(false);
	const [filterText, setFilterText] = useState('');

	const allCategories = categories ?? [];

	const filteredCategories = useMemo(() => {
		if (!filterText.trim()) return allCategories;
		const query = filterText.toLowerCase();
		return allCategories.filter((c) => c.name.toLowerCase().includes(query));
	}, [allCategories, filterText]);

	const isFiltering = filterText.trim().length > 0;
	const hasMore = !isFiltering && filteredCategories.length > INITIAL_VISIBLE;

	const visibleCategories = isFiltering
		? filteredCategories
		: expanded
			? filteredCategories
			: filteredCategories.slice(0, INITIAL_VISIBLE);

	// If the selected category is beyond the visible list, auto-expand
	const selectedInHidden =
		!isFiltering &&
		!expanded &&
		hasMore &&
		filteredCategories.slice(INITIAL_VISIBLE).some((c) => c.slug === selectedCategory);

	const effectiveCategories = selectedInHidden ? filteredCategories : visibleCategories;
	const isExpanded = expanded || selectedInHidden;

	return (
		<nav className="sticky top-24">
			<div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
				<h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-900">
					Categories
				</h3>

				{/* Filter input */}
				{allCategories.length > INITIAL_VISIBLE ? (
					<div className="relative mb-2">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3.5 w-3.5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<input
							type="text"
							value={filterText}
							onChange={(e) => {
								setFilterText(e.target.value);
								setExpanded(false);
							}}
							placeholder="Filter categories..."
							className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs text-gray-700 placeholder-gray-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						/>
						{filterText ? (
							<button
								type="button"
								onClick={() => setFilterText('')}
								className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600"
								aria-label="Clear filter"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-3.5 w-3.5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						) : null}
					</div>
				) : null}

				<div className="space-y-0.5">
					{!isFiltering ? (
						<button
							type="button"
							onClick={() => setSelectedCategory('')}
							className={twCb(
								'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
								selectedCategory === ''
									? 'bg-blue-50 font-semibold text-blue-700'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
							)}
						>
							<span
								className={twCb(
									'h-1.5 w-1.5 rounded-full transition-colors',
									selectedCategory === '' ? 'bg-blue-600' : 'bg-gray-300',
								)}
							/>
							All Products
						</button>
					) : null}

					{isLoading ? (
						<div className="space-y-2 px-3 py-2">
							<div className="h-4 w-[75%] animate-pulse rounded bg-gray-100" />
							<div className="h-4 w-[60%] animate-pulse rounded bg-gray-100" />
							<div className="h-4 w-[85%] animate-pulse rounded bg-gray-100" />
							<div className="h-4 w-[65%] animate-pulse rounded bg-gray-100" />
							<div className="h-4 w-[80%] animate-pulse rounded bg-gray-100" />
							<div className="h-4 w-[70%] animate-pulse rounded bg-gray-100" />
						</div>
					) : null}

					{effectiveCategories.map((category) => (
						<button
							type="button"
							key={category.slug}
							onClick={() => {
								setSelectedCategory(category.slug);
								setFilterText('');
							}}
							className={twCb(
								'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
								selectedCategory === category.slug
									? 'bg-blue-50 font-semibold text-blue-700'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
							)}
						>
							<span
								className={twCb(
									'h-1.5 w-1.5 rounded-full transition-colors',
									selectedCategory === category.slug ? 'bg-blue-600' : 'bg-gray-300',
								)}
							/>
							{category.name}
						</button>
					))}

					{isFiltering && filteredCategories.length === 0 ? (
						<p className="px-3 py-3 text-center text-xs text-gray-400">
							No categories found
						</p>
					) : null}

					{hasMore ? (
						<button
							type="button"
							onClick={() => setExpanded(!isExpanded)}
							className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={twCb(
									'h-3.5 w-3.5 transition-transform duration-200',
									isExpanded ? 'rotate-180' : '',
								)}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
							{isExpanded
								? 'Show less'
								: `Show ${filteredCategories.length - INITIAL_VISIBLE} more`}
						</button>
					) : null}
				</div>
			</div>
		</nav>
	);
};
