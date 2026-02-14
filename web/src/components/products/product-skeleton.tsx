'use client';

const SkeletonCard = () => (
	<div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
		<div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-gray-100" />
		<div className="flex min-w-0 flex-1 flex-col gap-2">
			<div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
			<div className="h-3 w-full animate-pulse rounded bg-gray-50" />
			<div className="h-3 w-1/2 animate-pulse rounded bg-gray-50" />
			<div className="flex items-center gap-2">
				<div className="h-3 w-8 animate-pulse rounded bg-gray-100" />
				<div className="h-3 w-16 animate-pulse rounded bg-gray-50" />
			</div>
		</div>
		<div className="flex shrink-0 flex-col items-end gap-2">
			<div className="h-5 w-14 animate-pulse rounded bg-gray-100" />
			<div className="h-7 w-16 animate-pulse rounded-lg bg-gray-100" />
		</div>
	</div>
);

export const ProductSkeleton = () => (
	<div className="space-y-8">
		<div>
			<div className="mb-4 flex items-center gap-3">
				<div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
				<div className="h-3 w-12 animate-pulse rounded bg-gray-100" />
				<div className="h-px flex-1 bg-gray-100" />
			</div>
			<div className="space-y-3">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</div>
		<div>
			<div className="mb-4 flex items-center gap-3">
				<div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
				<div className="h-3 w-10 animate-pulse rounded bg-gray-100" />
				<div className="h-px flex-1 bg-gray-100" />
			</div>
			<div className="space-y-3">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</div>
	</div>
);
