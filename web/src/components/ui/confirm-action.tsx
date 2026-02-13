'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

interface ConfirmActionProps {
	onConfirm: () => void;
	confirmLabel?: string;
	cancelLabel?: string;
	children: ReactNode;
	className?: string;
}

export const ConfirmAction = (props: ConfirmActionProps) => {
	const [showConfirm, setShowConfirm] = useState(false);

	const handleConfirm = () => {
		props.onConfirm();
		setShowConfirm(false);
	};

	return showConfirm ? (
		<div className="flex gap-2">
			<button
				type="button"
				onClick={handleConfirm}
				className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				{props.confirmLabel ?? 'Yes, clear'}
			</button>
			<button
				type="button"
				onClick={() => setShowConfirm(false)}
				className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
			>
				{props.cancelLabel ?? 'Cancel'}
			</button>
		</div>
	) : (
		<button type="button" onClick={() => setShowConfirm(true)} className={props.className}>
			{props.children}
		</button>
	);
};
