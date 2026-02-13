'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import type { Product } from '@/types/product';
import { formatPrice, showToast } from '@/utils/helper';

interface ProductCardProps {
	product: Product;
	priority?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {
	const addItem = useCartStore((s) => s.addItem);

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
		<div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
			<Link href={`/products/${props.product.id}`}>
				<div className="relative aspect-square overflow-hidden bg-gray-50">
					<Image
						src={props.product.thumbnail}
						alt={props.product.title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						priority={props.priority}
					/>
					{props.product.discountPercentage > 0 ? (
						<span className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
							-{Math.round(props.product.discountPercentage)}%
						</span>
					) : null}
				</div>
				<div className="flex flex-col p-4">
					<p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
						{props.product.category}
					</p>
					<h3 className="mb-2 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
						{props.product.title}
					</h3>
					<div className="flex items-center justify-between">
						<span className="text-lg font-bold text-gray-900">
							{formatPrice(props.product.price)}
						</span>
						<div className="flex items-center gap-1 text-sm text-amber-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span className="text-gray-600">{props.product.rating.toFixed(1)}</span>
						</div>
					</div>
				</div>
			</Link>
			<div className="px-4 pb-4">
				<button
					type="button"
					onClick={handleAddToCart}
					className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
};
