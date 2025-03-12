import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRepositories } from "./get-repositories"; // Adjust the import path as necessary

describe("getRepositories", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    vi.clearAllMocks();
  });

  it("should return repositories for valid search parameters", async () => {
    const mockResponse = [
      { id: 1, name: "repo1", full_name: "godaddy/repo1" },
      { id: 2, name: "repo2", full_name: "godaddy/repo2" },
    ];

    // Mock the fetch response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const searchParams = {
      type: "all" as const, // Use 'as const' to ensure the type matches
      sort: "created" as const, // Use 'as const' to ensure the type matches
      direction: "asc" as const, // Use 'as const' to ensure the type matches
      page: 1,
      per_page: 30,
    };

    const result = await getRepositories(searchParams);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/orgs/godaddy/repos?")
    );
  });

  it("should throw an error for a 404 response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const searchParams = {
      type: "all" as const,
      sort: "created" as const,
      direction: "asc" as const,
      page: 1,
      per_page: 30,
    };

    await expect(getRepositories(searchParams)).rejects.toThrow(
      "Organization not found"
    );
  });

  it("should throw an error for a 403 response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    });

    const searchParams = {
      type: "all" as const,
      sort: "created" as const,
      direction: "asc" as const,
      page: 1,
      per_page: 30,
    };

    await expect(getRepositories(searchParams)).rejects.toThrow(
      "Rate limit exceeded. Please try again later."
    );
  });

  it("should throw an error for other HTTP errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const searchParams = {
      type: "all" as const,
      sort: "created" as const,
      direction: "asc" as const,
      page: 1,
      per_page: 30,
    };

    await expect(getRepositories(searchParams)).rejects.toThrow(
      "Error fetching repositories: Internal Server Error"
    );
  });
});
