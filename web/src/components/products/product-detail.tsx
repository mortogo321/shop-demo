'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useProductQuery } from '@/hooks/use-product.query';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice, showToast, twCb } from '@/utils/helper';

interface ProductDetailProps {
	productId: number;
}

export const ProductDetail = (props: ProductDetailProps) => {
	const { data: product, isLoading, isError } = useProductQuery(props.productId);
	const addItem = useCartStore((s) => s.addItem);
	const [selectedImage, setSelectedImage] = useState(0);

	if (isLoading) {
		return <Spinner size="lg" />;
	}

	if (isError || !product) {
		return (
			<div className="p-8 text-center">
				<p className="text-red-500">Failed to load product details.</p>
			</div>
		);
	}

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			title: product.title,
			price: product.price,
			thumbnail: product.thumbnail,
		});
		showToast.success(`${product.title} added to cart`);
	};

	const allImages = product.images.length > 0 ? product.images : [product.thumbnail];

	const handlePrev = () => {
		setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="p-6">
			<div className="flex flex-col gap-6 md:flex-row">
				{/* Image Gallery */}
				<div className="w-full md:w-1/2">
					{/* Main Image */}
					<div className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
						<Image
							src={allImages[selectedImage]}
							alt={`${product.title} - Image ${selectedImage + 1}`}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>

						{allImages.length > 1 ? (
							<>
								{/* Prev / Next arrows */}
								<button
									type="button"
									onClick={handlePrev}
									className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow-md backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100"
									aria-label="Previous image"
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
								<button
									type="button"
									onClick={handleNext}
									className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow-md backdrop-blur-sm transition-opacity hover:bg-white group-hover:opacity-100"
									aria-label="Next image"
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

								{/* Image counter */}
								<span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
									{selectedImage + 1} / {allImages.length}
								</span>
							</>
						) : null}
					</div>

					{/* Thumbnail strip */}
					{allImages.length > 1 ? (
						<div className="mt-3 flex gap-2 overflow-x-auto pb-1">
							{allImages.map((img, idx) => (
								<button
									key={img}
									type="button"
									onClick={() => setSelectedImage(idx)}
									className={twCb(
										'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
										selectedImage === idx
											? 'border-blue-500 ring-2 ring-blue-500/20'
											: 'border-gray-200 opacity-60 hover:opacity-100',
									)}
									aria-label={`View image ${idx + 1}`}
								>
									<Image
										src={img}
										alt={`${product.title} thumbnail ${idx + 1}`}
										fill
										className="object-cover"
										sizes="64px"
									/>
								</button>
							))}
						</div>
					) : null}
				</div>

				{/* Info */}
				<div className="flex flex-1 flex-col">
					<p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
						{product.category}
					</p>
					<h2 className="mb-2 text-2xl font-bold text-gray-900">{product.title}</h2>

					<div className="mb-4 flex items-center gap-2">
						<div className="flex items-center gap-1 text-amber-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span className="text-sm font-medium text-gray-700">{product.rating.toFixed(1)}</span>
						</div>
						{product.brand ? (
							<span className="text-sm text-gray-400">by {product.brand}</span>
						) : null}
					</div>

					<div className="mb-4 flex items-baseline gap-2">
						<span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
						{product.discountPercentage > 0 ? (
							<span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
								-{Math.round(product.discountPercentage)}%
							</span>
						) : null}
					</div>

					<p className="mb-6 text-sm leading-relaxed text-gray-600">{product.description}</p>

					<div className="mb-6 space-y-2 text-sm text-gray-500">
						<p>
							<span className="font-medium text-gray-700">Availability:</span>{' '}
							{product.availabilityStatus}
						</p>
						<p>
							<span className="font-medium text-gray-700">Shipping:</span>{' '}
							{product.shippingInformation}
						</p>
						<p>
							<span className="font-medium text-gray-700">Return Policy:</span>{' '}
							{product.returnPolicy}
						</p>
					</div>

					<button
						type="button"
						onClick={handleAddToCart}
						className="mt-auto w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};
