/* 
! Github Api doesn't return total repository count, so we have to hardcode it
! This is not a good practice, but it's the only way to get the total count
! for now.
*/
export const TOTAL_REPOSITORY_COUNT = 192;

export const DEFAULT_PER_PAGE_SIZE = 10;
export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_REPOSITORY_TYPE = "all";
export const DEFAULT_REPOSITORY_SORT_BY = "created";
export const DEFAULT_REPOSITORY_SORT_DIRECTION = "desc";

export const REPOSITORY_TYPE = [
  "all",
  "public",
  "forks",
  "sources",
  "member",
] as const;

export const REPOSITORY_SORT_BY = [
  "created",
  "updated",
  "pushed",
  "full_name",
] as const;

export const REPOSITORY_SORT_DIRECTION = ["asc", "desc"] as const;

export const REPOSITORY_PER_PAGE = [5, 10, 20, 50] as const;
