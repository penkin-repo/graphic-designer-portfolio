import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string(),
        category: z.string(),
        image: image(), // Using Astro's image helper for local image optimization
        author: z.object({
            name: z.string(),
            role: z.string(),
            avatar: z.string(),
        }),
    }),
});

const portfolioCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        category: z.string(),
        image: image().optional(), // Using Astro's image helper for local image optimization
        desc: z.string(),
        fullDescription: z.string().optional(),
        client: z.string().optional(),
        year: z.string().optional(),
        services: z.array(z.string()).optional(),
        // images: z.array(z.string()).optional(),
        images: z.array(image()).optional(),
        id: z.number().optional(), // Adding id back for compatibility if needed
    }),
});

export const collections = {
    'articles': articlesCollection,
    'portfolio': portfolioCollection,
};
