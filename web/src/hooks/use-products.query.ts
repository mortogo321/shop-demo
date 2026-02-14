import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { ProductsResponse } from '@/types/product';
import type { SortOption } from '@/stores/filter-store';
import { api } from '@/utils/request';

interface ProductsQueryParams {
	search: string;
	category?: string;
	sortBy?: SortOption;
	page?: number;
	limit?: number;
}

function getSortParams(sort: SortOption): string {
	switch (sort) {
		case 'price-asc':
			return '&sortBy=price&order=asc';
		case 'price-desc':
			return '&sortBy=price&order=desc';
		case 'rating-desc':
			return '&sortBy=rating&order=desc';
		case 'title-asc':
			return '&sortBy=title&order=asc';
		default:
			return '';
	}
}

export const useProductsQuery = (params: ProductsQueryParams) => {
	const { search, category, sortBy = 'default', page = 1, limit = 12 } = params;
	const skip = (page - 1) * limit;
	const sortParams = getSortParams(sortBy);

	return useQuery<ProductsResponse>({
		queryKey: ['products', search, category ?? '', sortBy, page, limit],
		queryFn: async () => {
			let url: string;
			if (search) {
				url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}${sortParams}`;
			} else if (category) {
				url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}${sortParams}`;
			} else {
				url = `/products?limit=${limit}&skip=${skip}${sortParams}`;
			}
			const response = await api.get<ProductsResponse>(url);
			return response.data;
		},
		placeholderData: keepPreviousData,
	});
};
