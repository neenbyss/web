import { defineCollection, z } from "astro:content";

const tutorialesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
    tags: z.array(z.string())
  }),
});

export const collections = {
  tutorials: tutorialesCollection
};