import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    affiliation: z.string(),
    date: z.coerce.date(),
    img: z.string().optional(),
    alt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    slug: z.string().optional(),
  }),
});

const profilesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    img: z.string(),
    alt: z.string().optional(),
    'profile-name': z.string().optional(),
    'degree-held': z.string(),
    position: z.string(),
    pronouns: z.string(),
    identity: z.string().nullable().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  profiles: profilesCollection,
};
