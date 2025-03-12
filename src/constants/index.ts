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

export const PROGRAMMING_LANGUAGES_COLORS = {
  "C#": "#889E73",
  "C++": "#60A5FA",
  "Objective-C": "#8B5CF6",
  C: "#FBBF24",
  CSS: "#38BDF8",
  CSharp: "#22C55E",
  Dart: "#06B6D4",
  Dockerfile: "#8174A0",
  EJS: "#D946EF",
  Go: "#14B8A6",
  HTML: "#6B7280",
  Java: "#EF4444",
  JavaScript: "#FBBF24",
  Kotlin: "#4F46E5",
  PHP: "#A855F7",
  Perl: "#64748B",
  Python: "#BF3131",
  Ruby: "#EC4899",
  Rust: "#FB7185",
  SQL: "#34D399",
  Shell: "#84CC16",
  Swift: "#F97316",
  TypeScript: "#2563EB",
} as const;
