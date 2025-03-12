export const Pending = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-700 font-semibold">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};
