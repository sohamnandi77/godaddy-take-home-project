import {
  getRepositories,
  repositorySearchSchema,
} from "@/api/get-repositories";
import { Error } from "@/components/error";
import { Pending } from "@/components/pending";
import { Hero } from "@/components/sections/hero";
import { RepositoryList } from "@/components/sections/repository-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: repositorySearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps: { search } }) => getRepositories(search),
  pendingComponent: () => (
    <section id="repository-list">
      <Pending />
    </section>
  ),
  errorComponent: ({ error }) => (
    <section id="repository-list">
      <Error error={error} />
    </section>
  ),
});

function Index() {
  return (
    <>
      <Hero />
      <RepositoryList />
    </>
  );
}
