'use client';

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/stores/cart-store';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/utils/helper';

interface CartItemProps {
	item: CartItemType;
}

export const CartItem = (props: CartItemProps) => {
	const increaseQty = useCartStore((s) => s.increaseQty);
	const decreaseQty = useCartStore((s) => s.decreaseQty);
	const removeItem = useCartStore((s) => s.removeItem);

	return (
		<div className="flex gap-3 border-b border-gray-100 py-3">
			<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
				<Image
					src={props.item.thumbnail}
					alt={props.item.title}
					fill
					className="object-cover"
					sizes="64px"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex items-start justify-between">
					<h4 className="text-sm font-medium text-gray-900 line-clamp-1">{props.item.title}</h4>
					<button
						type="button"
						onClick={() => removeItem(props.item.id)}
						className="ml-2 text-gray-400 transition-colors hover:text-red-500"
						aria-label={`Remove ${props.item.title}`}
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
				</div>
				<p className="text-sm font-semibold text-blue-600">{formatPrice(props.item.price)}</p>
				<div className="mt-1 flex items-center gap-2">
					<button
						type="button"
						onClick={() => decreaseQty(props.item.id)}
						className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
						aria-label="Decrease quantity"
					>
						-
					</button>
					<span className="text-sm font-medium text-gray-700">{props.item.quantity}</span>
					<button
						type="button"
						onClick={() => increaseQty(props.item.id)}
						className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
						aria-label="Increase quantity"
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};
