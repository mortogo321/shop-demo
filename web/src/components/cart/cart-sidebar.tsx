'use client';

import { ConfirmAction } from '@/components/ui/confirm-action';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice, showToast } from '@/utils/helper';
import { CartItem } from './cart-item';

export const CartSidebar = () => {
	const items = useCartStore((s) => s.items);
	const clearCart = useCartStore((s) => s.clearCart);
	const totalPrice = useCartStore((s) => s.totalPrice);
	const totalItems = useCartStore((s) => s.totalItems);

	const handleClearCart = () => {
		clearCart();
		showToast.success('Cart cleared');
	};

	return (
		<div className="sticky top-24 rounded-xl border border-gray-100 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
				<h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">
					Order Summary
				</h2>
				{items.length > 0 ? (
					<span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
						{totalItems()} {totalItems() === 1 ? 'item' : 'items'}
					</span>
				) : null}
			</div>

			<div className="max-h-[calc(100vh-18rem)] overflow-y-auto px-4">
				{items.length === 0 ? (
					<div className="py-10 text-center">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-gray-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.5}
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
								/>
							</svg>
						</div>
						<p className="text-sm font-medium text-gray-500">Your cart is empty</p>
						<p className="mt-1 text-xs text-gray-400">Add items to get started</p>
					</div>
				) : (
					<div className="divide-y divide-gray-50 py-1">
						{items.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
				)}
			</div>

			{items.length > 0 ? (
				<div className="border-t border-gray-100 px-4 py-4">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm font-medium text-gray-500">Total</span>
						<span className="text-lg font-bold text-gray-900">{formatPrice(totalPrice())}</span>
					</div>
					<button
						type="button"
						className="mb-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow"
					>
						Checkout
					</button>
					<ConfirmAction
						onConfirm={handleClearCart}
						confirmLabel="Yes, clear"
						cancelLabel="Cancel"
						className="w-full rounded-lg py-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-red-500"
					>
						Clear Cart
					</ConfirmAction>
				</div>
			) : null}
		</div>
	);
};
