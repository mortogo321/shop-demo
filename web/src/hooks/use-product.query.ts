import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types/product';
import { api } from '@/utils/request';

export const useProductQuery = (id: number) => {
	return useQuery<Product>({
		queryKey: ['product', id],
		queryFn: async () => {
			const response = await api.get<Product>(`/products/${id}`);
			return response.data;
		},
		enabled: id > 0,
	});
};
