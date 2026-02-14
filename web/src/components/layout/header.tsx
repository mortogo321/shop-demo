'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CartIcon } from '@/components/cart/cart-icon';
import { useFilterStore } from '@/stores/filter-store';

export const Header = () => {
	const search = useFilterStore((s) => s.search);
	const setSearch = useFilterStore((s) => s.setSearch);
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

	return (
		<header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-[90rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="shrink-0 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
				>
					ShopDemo
				</Link>

				{/* Desktop search */}
				<div className="mx-auto hidden max-w-lg flex-1 lg:block">
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-gray-400"
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
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search products..."
							className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						/>
						{search ? (
							<button
								type="button"
								onClick={() => setSearch('')}
								className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
								aria-label="Clear search"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
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
				</div>

				<div className="flex items-center gap-1">
					{/* Mobile search toggle */}
					<button
						type="button"
						onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
						className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
						aria-label="Toggle search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
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
					</button>
					<CartIcon />
				</div>
			</div>

			{/* Mobile search bar */}
			{mobileSearchOpen ? (
				<div className="border-t border-gray-100 px-4 py-3 lg:hidden">
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 text-gray-400"
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
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search products..."
							className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						/>
					</div>
				</div>
			) : null}
		</header>
	);
};
