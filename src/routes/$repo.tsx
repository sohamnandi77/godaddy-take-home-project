import {
  getRepositoryDetails,
  getRepositoryLanguages,
} from "@/api/get-repo-details";
import { Error } from "@/components/error";
import { Pending } from "@/components/pending";
import { RepositoryDetail } from "@/components/sections/repository-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$repo")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const languagesPromise = getRepositoryLanguages(params.repo);
    return { languagesPromise, data: await getRepositoryDetails(params.repo) };
  },
  pendingComponent: () => (
    <section id="repository-detail">
      <Pending />
    </section>
  ),
  errorComponent: ({ error }) => (
    <section id="repository-detail">
      <Error error={error} />
    </section>
  ),
});

function RouteComponent() {
  return <RepositoryDetail />;
}
