import {
  calculateLanguagePercentages,
  formatBytes,
  formatDate,
  timeAgo,
  toCapitalizedCase,
} from "@/utils";
import { describe, expect, it } from "vitest";

describe("Utility Functions", () => {
  describe("calculateLanguagePercentages", () => {
    it("should calculate percentages correctly for multiple languages", () => {
      const data = { JavaScript: 50, TypeScript: 30, Python: 20 };
      const result = calculateLanguagePercentages(data);
      expect(result).toEqual([
        { language: "JavaScript", percentage: "50.00" },
        { language: "TypeScript", percentage: "30.00" },
        { language: "Python", percentage: "20.00" },
      ]);
    });

    it("should handle empty data", () => {
      const data = {};
      const result = calculateLanguagePercentages(data);
      expect(result).toEqual([]);
    });

    it("should handle single language", () => {
      const data = { JavaScript: 100 };
      const result = calculateLanguagePercentages(data);
      expect(result).toEqual([
        { language: "JavaScript", percentage: "100.00" },
      ]);
    });
  });

  describe("formatBytes", () => {
    it("should format kilobytes to bytes correctly", () => {
      expect(formatBytes(1)).toBe("1 KB");
    });

    it("should format kilobytes to megabytes correctly", () => {
      expect(formatBytes(1024)).toBe("1 MB");
    });

    it("should handle zero kilobytes", () => {
      expect(formatBytes(0)).toBe("0 Bytes");
    });

    it("should format with specified decimals", () => {
      expect(formatBytes(1.5, 3)).toBe("1.5 KB");
    });
  });

  describe("timeAgo", () => {
    it('should return "Just now" for the current time', () => {
      const now = new Date().toISOString();
      expect(timeAgo(now)).toBe("Just now");
    });

    it("should return correct time for minutes ago", () => {
      const minutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(timeAgo(minutesAgo)).toBe("5 minutes ago");
    });

    it("should return correct time for days ago", () => {
      const daysAgo = new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(timeAgo(daysAgo)).toBe("2 days ago");
    });

    it("should return formatted date for old dates", () => {
      const oldDate = new Date("2020-01-01").toISOString();
      expect(timeAgo(oldDate)).toMatch(/January \d{1,2}, \d{4}/);
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = "2023-10-01T00:00:00Z";
      expect(formatDate(date)).toBe("October 1, 2023");
    });

    it("should handle invalid date", () => {
      const invalidDate = "invalid-date";
      expect(formatDate(invalidDate)).toBe("Invalid Date");
    });
  });

  describe("toCapitalizedCase", () => {
    it("should capitalize words correctly", () => {
      expect(toCapitalizedCase("hello world")).toBe("Hello World");
    });

    it("should handle underscores and hyphens", () => {
      expect(toCapitalizedCase("hello_world")).toBe("Hello World");
      expect(toCapitalizedCase("hello-world")).toBe("Hello World");
    });

    it("should trim whitespace and handle multiple spaces", () => {
      expect(toCapitalizedCase("   hello   world   ")).toBe("Hello World");
    });

    it("should return empty string for empty input", () => {
      expect(toCapitalizedCase("")).toBe("");
      expect(toCapitalizedCase("   ")).toBe("");
    });
  });
});
