import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { liveTopics } from "@/data/live-topics";

const topicIds = liveTopics.map((t) => t.id) as [string, ...string[]];

export const getTopicNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ topic: z.enum(topicIds) }).parse(data))
  .handler(async ({ data }) => {
    const { fetchTopicNews } = await import("./live-news.server");
    return fetchTopicNews(data.topic);
  });

export const getUnHeadlines = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchUnNews } = await import("./live-news.server");
  return fetchUnNews(6);
});
