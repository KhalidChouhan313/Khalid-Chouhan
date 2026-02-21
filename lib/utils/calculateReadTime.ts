export const calculateReadTime = (html: string): number => {
  const wordsPerMinute = 225;

  const cleanText = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = cleanText ? cleanText.split(" ").length : 0;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};