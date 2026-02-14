import { create } from 'zustand';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';

interface FilterState {
	search: string;
	selectedCategory: string;
	sortBy: SortOption;
	page: number;
	limit: number;
	setSearch: (search: string) => void;
	setSelectedCategory: (category: string) => void;
	setSortBy: (sort: SortOption) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
	search: '',
	selectedCategory: '',
	sortBy: 'default',
	page: 1,
	limit: 12,

	setSearch: (search) => {
		set({ search, selectedCategory: '', page: 1 });
	},

	setSelectedCategory: (category) => {
		set({ selectedCategory: category, search: '', page: 1 });
	},

	setSortBy: (sortBy) => {
		set({ sortBy, page: 1 });
	},

	setPage: (page) => {
		set({ page });
	},

	setLimit: (limit) => {
		set({ limit, page: 1 });
	},
}));
