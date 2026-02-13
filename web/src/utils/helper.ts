import { toast } from 'react-toastify';

export const showToast = {
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	info: (message: string) => toast.info(message),
	warning: (message: string) => toast.warning(message),
};

export const twCb = (...classes: (string | false | null | undefined)[]): string => {
	return classes.filter(Boolean).join(' ');
};

export const formatPrice = (price: number): string => {
	return `$${price.toFixed(2)}`;
};
