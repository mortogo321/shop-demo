'use client';

import { useCallback, useEffect } from 'react';
import { ConfirmAction } from '@/components/ui/confirm-action';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice, showToast, twCb } from '@/utils/helper';
import { CartItem } from './cart-item';

export const CartDrawer = () => {
	const isOpen = useCartStore((s) => s.isOpen);
	const items = useCartStore((s) => s.items);
	const setCartOpen = useCartStore((s) => s.setCartOpen);
	const clearCart = useCartStore((s) => s.clearCart);

	const handleClearCart = () => {
		clearCart();
		showToast.success('Cart cleared');
	};

	const handleClose = useCallback(() => {
		setCartOpen(false);
	}, [setCartOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, handleClose]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				role="presentation"
				className={twCb(
					'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
					isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
				)}
				onClick={handleClose}
			/>

			{/* Drawer */}
			<div
				className={twCb(
					'fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out',
					isOpen ? 'translate-x-0' : 'translate-x-full',
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
					<button
						type="button"
						onClick={handleClose}
						className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
						aria-label="Close cart"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							aria-hidden="true"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Items */}
				<div className="flex-1 overflow-y-auto px-6">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-16 text-gray-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mb-4 h-16 w-16"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1}
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
								/>
							</svg>
							<p className="text-sm">Your cart is empty</p>
						</div>
					) : (
						<div className="py-2">
							{items.map((item) => (
								<CartItem key={item.id} item={item} />
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 ? (
					<div className="border-t border-gray-200 px-6 py-4">
						<div className="mb-4 flex items-center justify-between">
							<span className="text-base font-medium text-gray-700">Total</span>
							<span className="text-xl font-bold text-gray-900">
								{formatPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0))}
							</span>
						</div>
						<button
							type="button"
							className="mb-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
						>
							Checkout
						</button>
						<ConfirmAction
							onConfirm={handleClearCart}
							confirmLabel="Yes, clear"
							cancelLabel="Cancel"
							className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
						>
							Clear Cart
						</ConfirmAction>
					</div>
				) : null}
			</div>
		</>
	);
};
