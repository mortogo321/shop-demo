import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/request';

interface Category {
	slug: string;
	name: string;
	url: string;
}

export const useCategoriesQuery = () => {
	return useQuery<Category[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const response = await api.get<Category[]>('/products/categories');
			return response.data;
		},
	});
};
