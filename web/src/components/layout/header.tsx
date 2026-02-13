'use client';

import Link from 'next/link';
import { CartIcon } from '@/components/cart/cart-icon';

export const Header = () => {
	return (
		<header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
				>
					ShopDemo
				</Link>
				<CartIcon />
			</div>
		</header>
	);
};
