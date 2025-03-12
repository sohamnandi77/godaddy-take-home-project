import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getRepositoryDetails,
  getRepositoryLanguages,
} from "./get-repo-details";

describe("API Calls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRepositoryDetails", () => {
    it("should return repository details for a valid repo", async () => {
      const mockResponse = {
        id: 123,
        name: "example-repo",
        full_name: "godaddy/example-repo",
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const result = await getRepositoryDetails("example-repo");
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/godaddy/example-repo"
      );
    });

    it("should throw an error for a 404 response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(getRepositoryDetails("non-existent-repo")).rejects.toThrow(
        "Repository not found"
      );
    });

    it("should throw an error for a 403 response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        statusText: "Forbidden",
      });

      await expect(getRepositoryDetails("example-repo")).rejects.toThrow(
        "Rate limit exceeded. Please try again later."
      );
    });

    it("should throw an error for other HTTP errors", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(getRepositoryDetails("example-repo")).rejects.toThrow(
        "Error fetching repository details: Internal Server Error"
      );
    });
  });

  describe("getRepositoryLanguages", () => {
    it("should return repository languages for a valid repo", async () => {
      const mockResponse = {
        JavaScript: 100,
        TypeScript: 50,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const result = await getRepositoryLanguages("example-repo");
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/godaddy/example-repo/languages"
      );
    });

    it("should throw an error for a 404 response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(getRepositoryLanguages("non-existent-repo")).rejects.toThrow(
        "Repository not found"
      );
    });

    it("should throw an error for a 403 response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        statusText: "Forbidden",
      });

      await expect(getRepositoryLanguages("example-repo")).rejects.toThrow(
        "Rate limit exceeded. Please try again later."
      );
    });

    it("should throw an error for other HTTP errors", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(getRepositoryLanguages("example-repo")).rejects.toThrow(
        "Error fetching repository languages: Internal Server Error"
      );
    });
  });
});
