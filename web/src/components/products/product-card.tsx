'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import type { Product } from '@/types/product';
import { formatPrice, showToast } from '@/utils/helper';

interface ProductCardProps {
	product: Product;
	index?: number;
	priority?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {
	const addItem = useCartStore((s) => s.addItem);
	const discount = Math.round(props.product.discountPercentage);
	const hasDiscount = discount >= 5;
	const originalPrice = hasDiscount
		? props.product.price / (1 - props.product.discountPercentage / 100)
		: null;

	const handleAddToCart = () => {
		addItem({
			id: props.product.id,
			title: props.product.title,
			price: props.product.price,
			thumbnail: props.product.thumbnail,
		});
		showToast.success(`${props.product.title} added to cart`);
	};

	return (
		<div className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md">
			<Link
				href={`/products/${props.product.id}`}
				className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50"
			>
				<Image
					src={props.product.thumbnail}
					alt={props.product.title}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
					sizes="96px"
					priority={props.priority}
				/>
				{hasDiscount ? (
					<span className="absolute top-1 left-1 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
						-{discount}%
					</span>
				) : null}
			</Link>

			<div className="flex min-w-0 flex-1 flex-col">
				<Link href={`/products/${props.product.id}`} className="group/title">
					<h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover/title:text-blue-600">
						{props.product.title}
					</h3>
				</Link>
				<p className="mt-0.5 text-xs leading-relaxed text-gray-500 line-clamp-2">
					{props.product.description}
				</p>
				<div className="mt-2 flex items-center gap-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-3.5 w-3.5 text-amber-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					<span className="text-xs font-medium text-gray-600">
						{props.product.rating.toFixed(1)}
					</span>
					{props.product.brand ? (
						<>
							<span className="text-gray-300">|</span>
							<span className="text-xs text-gray-400">{props.product.brand}</span>
						</>
					) : null}
				</div>
			</div>

			<div className="flex shrink-0 flex-col items-end gap-2">
				<div className="text-right">
					<span className="text-base font-bold text-gray-900">
						{formatPrice(props.product.price)}
					</span>
					{originalPrice ? (
						<p className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</p>
					) : null}
				</div>
				<button
					type="button"
					onClick={handleAddToCart}
					className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:bg-blue-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-3.5 w-3.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						aria-hidden="true"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Add
				</button>
			</div>
		</div>
	);
};
