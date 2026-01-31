import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const profiles = await getCollection('profiles');

  const searchData = [
    ...posts.map((post) => ({
      type: 'post' as const,
      title: post.data.title,
      author: post.data.author,
      categories: post.data.categories,
      slug: `/Blog/${post.data.slug || post.slug}/`,
      excerpt: post.body?.slice(0, 200) || '',
    })),
    ...profiles.map((profile) => ({
      type: 'profile' as const,
      title: profile.data.title,
      position: profile.data.position,
      identity: profile.data.identity,
      slug: `/profiles/${profile.data.slug || profile.slug}/`,
      excerpt: profile.body?.slice(0, 200) || '',
    })),
  ];

  return new Response(JSON.stringify(searchData), {
    headers: { 'Content-Type': 'application/json' },
  });
}
