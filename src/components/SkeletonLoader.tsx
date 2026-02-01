export default function SkeletonLoader() {
  return (
    <article className="group">
      <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse sm:aspect-[2/3]"></div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
      </div>
      <div className="mt-1 h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
    </article>
  )
}