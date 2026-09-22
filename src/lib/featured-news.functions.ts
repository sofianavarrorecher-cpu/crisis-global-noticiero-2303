import { createServerFn } from "@tanstack/react-start";

export const getFeaturedNews = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchFeaturedNews } = await import("./featured-news.server");
  return fetchFeaturedNews(9);
});
