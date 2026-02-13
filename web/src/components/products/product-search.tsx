'use client';

interface ProductSearchProps {
	value: string;
	onChange: (value: string) => void;
}

export const ProductSearch = (props: ProductSearchProps) => {
	return (
		<div className="relative">
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<input
				type="text"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				placeholder="Search products..."
				className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
			/>
		</div>
	);
};
