export const Error = ({ error }: { error: Error }) => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg shadow-md">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v2z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <strong className="font-bold">Oops!</strong>
            <span className="block sm:inline"> {error?.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
