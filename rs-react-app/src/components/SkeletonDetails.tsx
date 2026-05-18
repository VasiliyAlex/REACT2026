export const SkeletonDetails = () => (
  <div
    data-testid="skeleton-details"
    className="w-full max-w-[300px] mx-auto bg-white rounded-xl shadow-md px-4 py-6 space-y-4 animate-pulse"
  >
    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto" />
    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full" />
    <ul className="space-y-2 text-center">
      <li className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      <li className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
      <li className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      <li className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
    </ul>
  </div>
);
