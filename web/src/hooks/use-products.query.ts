import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse } from '@/types/product';
import { api } from '@/utils/request';

export const useProductsQuery = (search: string) => {
	return useQuery<ProductsResponse>({
		queryKey: ['products', search],
		queryFn: async () => {
			const url = search
				? `/products/search?q=${encodeURIComponent(search)}&limit=30`
				: '/products?limit=30';
			const response = await api.get<ProductsResponse>(url);
			return response.data;
		},
	});
};
