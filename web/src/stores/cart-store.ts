import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;
	addItem: (item: Omit<CartItem, 'quantity'>) => void;
	removeItem: (id: number) => void;
	increaseQty: (id: number) => void;
	decreaseQty: (id: number) => void;
	clearCart: () => void;
	toggleCart: () => void;
	setCartOpen: (open: boolean) => void;
	totalItems: () => number;
	totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			addItem: (item) => {
				const existing = get().items.find((i) => i.id === item.id);
				if (existing) {
					set({
						items: get().items.map((i) =>
							i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
						),
					});
				} else {
					set({ items: [...get().items, { ...item, quantity: 1 }] });
				}
			},

			removeItem: (id) => {
				set({ items: get().items.filter((i) => i.id !== id) });
			},

			increaseQty: (id) => {
				set({
					items: get().items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
				});
			},

			decreaseQty: (id) => {
				const item = get().items.find((i) => i.id === id);
				if (item && item.quantity <= 1) {
					set({ items: get().items.filter((i) => i.id !== id) });
				} else {
					set({
						items: get().items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)),
					});
				}
			},

			clearCart: () => {
				set({ items: [] });
			},

			toggleCart: () => {
				set({ isOpen: !get().isOpen });
			},

			setCartOpen: (open) => {
				set({ isOpen: open });
			},

			totalItems: () => {
				return get().items.reduce((sum, item) => sum + item.quantity, 0);
			},

			totalPrice: () => {
				return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({ items: state.items }),
		},
	),
);
