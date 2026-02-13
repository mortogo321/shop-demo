import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { Header } from '@/components/layout/header';
import { QueryProvider } from '@/providers/query-provider';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
	title: 'ShopDemo',
	description: 'Online shop demo built with Next.js, Zustand, and TanStack Query',
};

interface RootLayoutProps {
	children: ReactNode;
	modal: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
				<QueryProvider>
					<Header />
					<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{props.children}</main>
					{props.modal}
					<CartDrawer />
					<ToastContainer position="bottom-right" autoClose={3000} />
				</QueryProvider>
			</body>
		</html>
	);
}
