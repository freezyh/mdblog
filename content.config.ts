import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        date: z.string(),
        year: z.string(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        /* url: z.string().url(),
        minRead: z.number(),
        image: z.string(),
        technologies: z.array(z.string()),
        teamName: z.string().optional(),
        roles: z.array(z.string()),
        authors: z.array(z.object({
          name: z.string(),
          description: z.string(),
          to: z.string(),
          target: z.string(),
          avatar: z.object({
            src: z.string(),
            alt: z.string()
          }).optional()
        })), */
      })
    }),
  },
});
