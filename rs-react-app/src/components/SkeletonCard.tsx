export const SkeletonCard = () => (
  <div
    data-testid="skeleton"
    className="w-40 p-2 bg-white rounded shadow animate-pulse"
  >
    <div className="w-full h-32 bg-gray-200 rounded" />
    <div className="h-4 bg-gray-200 rounded mt-2 mx-auto w-3/4" />
  </div>
);
