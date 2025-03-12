import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PER_PAGE_SIZE,
  DEFAULT_REPOSITORY_SORT_BY,
  DEFAULT_REPOSITORY_SORT_DIRECTION,
  DEFAULT_REPOSITORY_TYPE,
  REPOSITORY_SORT_BY,
  REPOSITORY_SORT_DIRECTION,
  REPOSITORY_TYPE,
} from "@/constants/index";
import { Repository } from "@/types";
import { z } from "zod";

export const repositorySearchSchema = z.object({
  /**
   * Specifies the types of repositories you want returned.
   * Default: all
   * Can be one of: all, public, private, forks, sources, member
   */
  type: z.enum(REPOSITORY_TYPE).optional(),
  /** The property to sort the results by.
   * Default: created
   * Can be one of: created, updated, pushed, full_name
   */
  sort: z.enum(REPOSITORY_SORT_BY).optional(),
  /**
   * The order to sort by. Default: asc when using full_name, otherwise desc.
   * Can be one of: asc, desc
   */
  direction: z.enum(REPOSITORY_SORT_DIRECTION).optional(),
  /** The number of results per page (max 100). For more information, see "Using pagination in the REST API."
   * Default: 30
   */
  per_page: z.number().max(100).optional(),
  /**
   * The page number of the results to fetch. For more information, see "Using pagination in the REST API."
   * Default: 1
   */
  page: z.number().optional(),
});

export type RepositorySearch = z.infer<typeof repositorySearchSchema>;

export const getRepositories = async (search: RepositorySearch) => {
  const {
    type = DEFAULT_REPOSITORY_TYPE,
    sort = DEFAULT_REPOSITORY_SORT_BY,
    direction = DEFAULT_REPOSITORY_SORT_DIRECTION,
    page = DEFAULT_PAGE_INDEX,
    per_page = DEFAULT_PER_PAGE_SIZE,
  } = search;

  const searchParams = new URLSearchParams({
    direction,
    page: page.toString(),
    per_page: per_page.toString(),
    sort,
    type,
  });

  try {
    const response = await fetch(
      `https://api.github.com/orgs/godaddy/repos?${searchParams}`
    );

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 404) {
        throw new Error("Organization not found");
      } else if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Error fetching repositories: ${response.statusText}`);
      }
    }

    const data = (await response.json()) as Repository[];
    return data;
  } catch (error) {
    console.error("Error in getRepositories:", error);
    throw error;
  }
};
