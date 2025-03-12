type LanguageData = {
  [language: string]: number;
};

export const calculateLanguagePercentages = (
  data: LanguageData
): Array<{ language: string; percentage: string }> => {
  // Calculate the total number of lines
  const totalLines = Object.values(data).reduce((sum, count) => sum + count, 0);

  // Calculate the percentage for each language
  const languagePercentages = Object.entries(data).map(([language, count]) => {
    const percentage = (count / totalLines) * 100;
    return { language, percentage: percentage.toFixed(2) };
  });

  return languagePercentages;
};

export const formatBytes = (kilobytes: number, decimals: number = 2) => {
  const bytes = kilobytes * 1024;
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return formatDate(dateString); // Use actual date if very old
  } else if (months > 0) {
    return formatDate(dateString); // Use actual date if very old
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export const toCapitalizedCase = (input: string) => {
  // Trim the input to remove leading and trailing whitespace
  const trimmedInput = input.trim();

  // Return an empty string if the input is empty after trimming
  if (trimmedInput.length === 0) {
    return "";
  }

  // Replace underscores, hyphens, and multiple spaces with a single space
  const words = trimmedInput
    .replace(/[_-]+/g, " ") // Replace underscores and hyphens with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .split(" ") // Split by single space
    .map((word) => word.toLowerCase()) // Convert all words to lowercase
    .filter((word) => word.length > 0); // Filter out any empty words

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a single string
  return capitalizedWords.join(" ");
};
