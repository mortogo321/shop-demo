import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductCard } from '@/components/products/product-card';
import { useCartStore } from '@/stores/cart-store';
import type { Product } from '@/types/product';

vi.mock('next/image', () => ({
	default: (props: { src: string; alt: string }) => {
		return <img src={props.src} alt={props.alt} />;
	},
}));

vi.mock('next/link', () => ({
	default: (props: { href: string; children: React.ReactNode; className?: string }) => {
		return (
			<a href={props.href} className={props.className}>
				{props.children}
			</a>
		);
	},
}));

const mockProduct: Product = {
	id: 1,
	title: 'Test Product',
	description: 'A test product',
	category: 'electronics',
	price: 29.99,
	discountPercentage: 10,
	rating: 4.5,
	stock: 50,
	tags: ['test'],
	brand: 'TestBrand',
	sku: 'TEST-001',
	weight: 1,
	dimensions: { width: 10, height: 5, depth: 3 },
	warrantyInformation: '1 year',
	shippingInformation: 'Free shipping',
	availabilityStatus: 'In Stock',
	reviews: [],
	returnPolicy: '30 days',
	minimumOrderQuantity: 1,
	meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
	images: ['https://cdn.dummyjson.com/products/images/test.png'],
	thumbnail: 'https://cdn.dummyjson.com/products/images/test-thumb.png',
};

describe('ProductCard', () => {
	beforeEach(() => {
		useCartStore.setState({ items: [] });
	});

	it('should render product title', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('Test Product')).toBeInTheDocument();
	});

	it('should render product price', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('$29.99')).toBeInTheDocument();
	});

	it('should render product category', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('electronics')).toBeInTheDocument();
	});

	it('should render product rating', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('4.5')).toBeInTheDocument();
	});

	it('should render discount badge', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('-10%')).toBeInTheDocument();
	});

	it('should add item to cart when button is clicked', () => {
		render(<ProductCard product={mockProduct} />);
		const addButton = screen.getByText('Add to Cart');
		fireEvent.click(addButton);
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(1);
		expect(state.items[0].id).toBe(1);
	});

	it('should link to product detail page', () => {
		render(<ProductCard product={mockProduct} />);
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/products/1');
	});
});
