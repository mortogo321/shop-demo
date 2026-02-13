'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { twCb } from '@/utils/helper';

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

export const Modal = (props: ModalProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => setIsVisible(true));
	}, []);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => props.onClose(), 200);
	}, [props.onClose]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [handleClose]);

	return (
		<div
			role="presentation"
			className={twCb(
				'fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-200',
				isVisible ? 'bg-black/50' : 'bg-black/0',
			)}
			onClick={handleClose}
		>
			<div
				role="presentation"
				className={twCb(
					'relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl transition-all duration-200',
					isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={handleClose}
					className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				{props.children}
			</div>
		</div>
	);
};
