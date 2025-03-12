import {
  getRepositories,
  repositorySearchSchema,
} from "@/api/get-repositories";
import { Hero } from "@/components/sections/hero";
import { RepositoryList } from "@/components/sections/repository-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: repositorySearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps: { search } }) => getRepositories(search),
});

function Index() {
  return (
    <>
      <Hero />
      <RepositoryList />
    </>
  );
}
