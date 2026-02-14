'use client';

import { useFilterStore } from '@/stores/filter-store';
import { twCb } from '@/utils/helper';

interface PaginationProps {
	total: number;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	const pages: (number | 'ellipsis')[] = [1];

	if (current > 3) {
		pages.push('ellipsis');
	}

	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (current < total - 2) {
		pages.push('ellipsis');
	}

	pages.push(total);
	return pages;
}

export const Pagination = (props: PaginationProps) => {
	const page = useFilterStore((s) => s.page);
	const limit = useFilterStore((s) => s.limit);
	const setPage = useFilterStore((s) => s.setPage);

	const totalPages = Math.ceil(props.total / limit);

	if (totalPages <= 1) return null;

	const pages = getPageNumbers(page, totalPages);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="mt-8 flex items-center justify-center gap-1.5">
			{/* Previous */}
			<button
				type="button"
				onClick={() => handlePageChange(page - 1)}
				disabled={page === 1}
				className={twCb(
					'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
					page === 1
						? 'cursor-not-allowed text-gray-300'
						: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
				)}
				aria-label="Previous page"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			{/* Page numbers */}
			{pages.map((p, idx) =>
				p === 'ellipsis' ? (
					<span
						key={`ellipsis-${idx === 1 ? 'start' : 'end'}`}
						className="flex h-9 w-9 items-center justify-center text-xs text-gray-400"
					>
						...
					</span>
				) : (
					<button
						key={p}
						type="button"
						onClick={() => handlePageChange(p)}
						className={twCb(
							'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all',
							page === p
								? 'bg-blue-600 text-white shadow-sm'
								: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
						)}
					>
						{p}
					</button>
				),
			)}

			{/* Next */}
			<button
				type="button"
				onClick={() => handlePageChange(page + 1)}
				disabled={page === totalPages}
				className={twCb(
					'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
					page === totalPages
						? 'cursor-not-allowed text-gray-300'
						: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
				)}
				aria-label="Next page"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	);
};
