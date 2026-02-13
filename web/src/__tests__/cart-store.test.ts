import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from '@/stores/cart-store';

const mockProduct = {
	id: 1,
	title: 'Test Product',
	price: 29.99,
	thumbnail: 'https://cdn.dummyjson.com/products/images/test.png',
};

const mockProduct2 = {
	id: 2,
	title: 'Another Product',
	price: 49.99,
	thumbnail: 'https://cdn.dummyjson.com/products/images/test2.png',
};

describe('cart store', () => {
	beforeEach(() => {
		useCartStore.setState({ items: [], isOpen: false });
	});

	it('should start with an empty cart', () => {
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(0);
		expect(state.totalItems()).toBe(0);
		expect(state.totalPrice()).toBe(0);
	});

	it('should add an item to the cart', () => {
		useCartStore.getState().addItem(mockProduct);
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(1);
		expect(state.items[0].id).toBe(1);
		expect(state.items[0].quantity).toBe(1);
	});

	it('should increase quantity when adding the same item', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct);
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(1);
		expect(state.items[0].quantity).toBe(2);
	});

	it('should remove an item from the cart', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct2);
		useCartStore.getState().removeItem(1);
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(1);
		expect(state.items[0].id).toBe(2);
	});

	it('should increase quantity of a specific item', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().increaseQty(1);
		const state = useCartStore.getState();
		expect(state.items[0].quantity).toBe(2);
	});

	it('should decrease quantity of a specific item', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().decreaseQty(1);
		const state = useCartStore.getState();
		expect(state.items[0].quantity).toBe(1);
	});

	it('should remove item when quantity decreases below 1', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().decreaseQty(1);
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(0);
	});

	it('should clear all items', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct2);
		useCartStore.getState().clearCart();
		const state = useCartStore.getState();
		expect(state.items).toHaveLength(0);
	});

	it('should calculate total items correctly', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct2);
		expect(useCartStore.getState().totalItems()).toBe(3);
	});

	it('should calculate total price correctly', () => {
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct);
		useCartStore.getState().addItem(mockProduct2);
		const expected = 29.99 * 2 + 49.99;
		expect(useCartStore.getState().totalPrice()).toBeCloseTo(expected);
	});

	it('should toggle cart open state', () => {
		expect(useCartStore.getState().isOpen).toBe(false);
		useCartStore.getState().toggleCart();
		expect(useCartStore.getState().isOpen).toBe(true);
		useCartStore.getState().toggleCart();
		expect(useCartStore.getState().isOpen).toBe(false);
	});

	it('should set cart open state directly', () => {
		useCartStore.getState().setCartOpen(true);
		expect(useCartStore.getState().isOpen).toBe(true);
		useCartStore.getState().setCartOpen(false);
		expect(useCartStore.getState().isOpen).toBe(false);
	});
});
