import { RepositorySearch } from "@/api/get-repositories";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PER_PAGE_SIZE,
  DEFAULT_REPOSITORY_SORT_BY,
  DEFAULT_REPOSITORY_SORT_DIRECTION,
  DEFAULT_REPOSITORY_TYPE,
  PROGRAMMING_LANGUAGES_COLORS,
  REPOSITORY_PER_PAGE,
  REPOSITORY_SORT_BY,
  REPOSITORY_SORT_DIRECTION,
  REPOSITORY_TYPE,
  TOTAL_REPOSITORY_COUNT,
} from "@/constants/index";
import { cn } from "@/lib/utils";
import { Repository } from "@/types";
import { timeAgo, toCapitalizedCase } from "@/utils";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Columns3Icon,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

const columns: ColumnDef<Repository>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium truncate max-w-[200px]">
        {row.original.name ?? "--"}
      </div>
    ),
    size: 200,
    enableHiding: false,
  },
  {
    header: "Updated At",
    accessorKey: "updated_at",
    cell: ({ row }) => (
      <div className="font-medium">
        {timeAgo(row.original.updated_at) ?? "--"}
      </div>
    ),
  },
  {
    header: "Top Language",
    accessorKey: "language",
    cell: ({ row }) => (
      <div
        style={{
          color:
            PROGRAMMING_LANGUAGES_COLORS[
              row.original.language as keyof typeof PROGRAMMING_LANGUAGES_COLORS
            ] ?? "#6B7280",
        }}
      >
        {row.original.language ?? "--"}
      </div>
    ),
  },
  {
    header: "Forks",
    accessorKey: "forks_count",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.forks_count ?? 0}</div>
    ),
  },
  {
    header: "Stars",
    accessorKey: "stargazers_count",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.stargazers_count ?? 0}</div>
    ),
  },
  {
    header: "Watchers",
    accessorKey: "watchers_count",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.watchers_count ?? 0}</div>
    ),
  },
  {
    header: "Open Issues",
    accessorKey: "open_issues_count",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.open_issues_count ?? 0}</div>
    ),
  },
  {
    header: "License",
    accessorFn: (row) => row.license?.key,
    cell: ({ row }) => (
      <div className="font-medium truncate max-w-[200px]">
        {row.original.license?.name ?? "No License"}
      </div>
    ),
  },
  {
    header: "Owner",
    accessorFn: (row) => row.owner?.login,
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.owner.login ?? "No Owner"}
      </div>
    ),
  },
];

export function RepositoryList() {
  const routeApi = getRouteApi("/");
  const repository = routeApi.useLoaderData();
  const routeSearch = routeApi.useSearch();
  const navigate = useNavigate();

  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const paginationState = {
    pageIndex: (routeSearch?.page ?? DEFAULT_PAGE_INDEX) - 1,
    pageSize: routeSearch?.per_page ?? DEFAULT_PER_PAGE_SIZE,
  };

  const table = useReactTable({
    data: repository ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (pagination) => {
      const newPagination =
        typeof pagination === "function"
          ? pagination(paginationState)
          : pagination;
      navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          page: newPagination.pageIndex + 1,
          per_page: newPagination.pageSize,
        }),
      });
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualFiltering: true,
    manualPagination: true,
    enableSortingRemoval: false,
    rowCount: TOTAL_REPOSITORY_COUNT,
    state: {
      sorting: [
        {
          desc: routeSearch.direction ? routeSearch.direction === "desc" : true,
          id: routeSearch?.sort ?? "created",
        },
      ],
      pagination: paginationState,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    // Add Keyboard Navigation For Pagination
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "ArrowLeft" && table.getCanPreviousPage()) {
        table.previousPage();
      } else if (event.key === "ArrowRight" && table.getCanNextPage()) {
        table.nextPage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <section
      id="repository-list"
      className="py-16 bg-gray-50 dark:bg-neutral-900 text-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Filters */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {/* Filter By Type */}
            <Select
              value={routeSearch.type ?? DEFAULT_REPOSITORY_TYPE}
              onValueChange={(value) => {
                navigate({
                  to: "/",
                  search: (prev) => ({
                    ...prev,
                    type: value as RepositorySearch["type"],
                  }),
                });
              }}
            >
              <SelectTrigger
                id={id}
                className="w-fit whitespace-nowrap capitalize"
              >
                <Label className="font-extrabold">Repository Type: </Label>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                {REPOSITORY_TYPE.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {toCapitalizedCase(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Sort By */}
            <Select
              value={routeSearch.sort ?? DEFAULT_REPOSITORY_SORT_BY}
              onValueChange={(value) => {
                navigate({
                  to: "/",
                  search: (prev) => ({
                    ...prev,
                    sort: value as RepositorySearch["sort"],
                  }),
                });
              }}
            >
              <SelectTrigger
                id={id}
                className="w-fit whitespace-nowrap capitalize"
              >
                <Label className="font-extrabold">Sort By</Label>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                {REPOSITORY_SORT_BY.map((sortBy) => (
                  <SelectItem
                    key={sortBy}
                    value={sortBy}
                    className="capitalize"
                  >
                    {toCapitalizedCase(sortBy)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Sort Direction */}
            <Select
              value={routeSearch.direction ?? DEFAULT_REPOSITORY_SORT_DIRECTION}
              onValueChange={(value) => {
                navigate({
                  to: "/",
                  search: (prev) => ({
                    ...prev,
                    direction: value as RepositorySearch["direction"],
                  }),
                });
              }}
            >
              <SelectTrigger
                id={id}
                className="w-fit whitespace-nowrap capitalize"
              >
                <Label className="font-extrabold">Sort Direction</Label>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                {REPOSITORY_SORT_DIRECTION.map((sortDir) => (
                  <SelectItem
                    key={sortDir}
                    value={sortDir}
                    className="capitalize"
                  >
                    {toCapitalizedCase(sortDir)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Toggle columns visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Columns3Icon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Toggle Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        onSelect={(event) => event.preventDefault()}
                      >
                        {column.columnDef?.header?.toString() || column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="bg-background overflow-hidden rounded-md border">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="h-11"
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <div
                            className={cn(
                              header.column.getCanSort() &&
                                "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              // Enhanced keyboard handling for sorting
                              if (
                                header.column.getCanSort() &&
                                (e.key === "Enter" || e.key === " ")
                              ) {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }}
                            tabIndex={
                              header.column.getCanSort() ? 0 : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <ChevronUpIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="last:py-0">
                        <Link
                          to="/$repo"
                          params={{ repo: cell.row.original.name }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-8">
          {/* Results per page */}
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="max-sm:sr-only">
              Rows per page
            </Label>
            <Select
              value={routeSearch?.per_page?.toString() ?? "10"}
              onValueChange={(value) => {
                navigate({
                  to: "/",
                  search: (prev) => ({
                    ...prev,
                    per_page: parseInt(value),
                  }),
                });
              }}
            >
              <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                {REPOSITORY_PER_PAGE.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Page number information */}
          <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
            <p
              className="text-muted-foreground text-sm whitespace-nowrap"
              aria-live="polite"
            >
              <span className="text-foreground">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
                -
                {Math.min(
                  TOTAL_REPOSITORY_COUNT,
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize
                )}
              </span>{" "}
              of{" "}
              <span className="text-foreground">{TOTAL_REPOSITORY_COUNT}</span>
            </p>
          </div>

          {/* Pagination buttons */}
          <div>
            <Pagination>
              <PaginationContent>
                {/* First page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:opacity-50"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to first page"
                  >
                    <ChevronFirstIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Previous page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeftIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Next page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to next page"
                  >
                    <ChevronRightIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                {/* Last page button */}
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:opacity-50"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to last page"
                  >
                    <ChevronLastIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
}
