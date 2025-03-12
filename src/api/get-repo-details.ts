import { Repository } from "@/types";

export const getRepositoryDetails = async (repo: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/godaddy/${repo}`
    );

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 404) {
        throw new Error("Repository not found");
      } else if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(
          `Error fetching repository details: ${response.statusText}`
        );
      }
    }

    const data = (await response.json()) as Repository;
    return data;
  } catch (error) {
    console.error("Error in getRepositoryDetails:", error);
    throw error;
  }
};

export const getRepositoryLanguages = async (repo: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/godaddy/${repo}/languages`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Repository not found");
      } else if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(
          `Error fetching repository languages: ${response.statusText}`
        );
      }
    }

    const data = (await response.json()) as Record<string, number>;
    return data;
  } catch (error) {
    console.error("Error in getRepositoryLanguages:", error);
    throw error;
  }
};
