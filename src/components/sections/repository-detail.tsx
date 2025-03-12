import { cn } from "@/lib/utils";
import {
  calculateLanguagePercentages,
  formatBytes,
  formatDate,
  timeAgo,
} from "@/utils";
import { Indicator, Root } from "@radix-ui/react-progress";
import { Await, getRouteApi, Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const RepositoryDetail = () => {
  const routeApi = getRouteApi("/$repo");
  const { data: repository, languagesPromise } = routeApi.useLoaderData();

  return (
    <section
      id="repository-detail"
      className="py-20 bg-gray-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-100 hover:bg-blue-200 dark:bg-blue-900  dark:hover:bg-blue-800 transition duration-150 ease-in-out">
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Back to Repository List
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-neutral-800 shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-start border-b border-gray-200 dark:border-neutral-700">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl">
                {repository?.name}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Last updated: {timeAgo(repository.updated_at)}
              </p>
            </div>
            <div className="flex items-center">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <svg
                  className="mr-2 -ml-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-neutral-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Description
              </h3>
              <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
                {repository?.description}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-neutral-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Stats
              </h3>
              <dl className="mt-5 grid grid-cols-1 gap-5">
                <div className="bg-gray-50 dark:bg-neutral-700 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    Stars
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {repository.stargazers_count}
                  </dd>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-700 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Forks
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {repository.forks_count}
                  </dd>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-700 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Open Issues
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {repository.open_issues_count}
                  </dd>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-700 overflow-hidden rounded-lg px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Watchers
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    {repository.watchers_count}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Languages
              </h3>
              <div className="mt-5 space-y-6">
                <Await
                  promise={languagesPromise}
                  fallback={<div>Loading...</div>}
                >
                  {(data) => {
                    const languagePercentages =
                      calculateLanguagePercentages(data);
                    return languagePercentages.map((language) => (
                      <div key={language.language}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {language.language}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language.percentage}%
                          </span>
                        </div>
                        <Root
                          data-slot="progress"
                          className={cn(
                            "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
                          )}
                        >
                          <Indicator
                            data-slot="progress-indicator"
                            className="bg-yellow-400 h-full w-full flex-1 transition-all"
                            style={{
                              transform: `translateX(-${100 - (parseFloat(language.percentage) || 0)}%)`,
                            }}
                          />
                        </Root>
                      </div>
                    ));
                  }}
                </Await>
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Information
              </h3>
              <dl className="mt-5 space-y-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    License
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {repository.license?.name ?? "No license"}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Created
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {formatDate(repository.created_at)}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Commit
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {timeAgo(repository.updated_at)}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Default Branch
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {repository.default_branch}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Size
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {formatBytes(repository.size)}
                  </dd>
                </div>
              </dl>

              {repository.topics?.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {repository.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
