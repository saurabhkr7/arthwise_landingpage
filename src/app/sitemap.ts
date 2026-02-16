import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/api/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arthhwise.com';

  // Base routes
  const routes = [
    '',
    '/blog',
    '/contact',
    '/pricing',
    '/waiting-list',
    '/feedback',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch all blogs to include in sitemap
  let blogRoutes: any[] = [];
  try {
    const response = await getBlogs(1, 100); // Fetch up to 100 blogs for sitemap
    if (response.success && response.data) {
      blogRoutes = response.data.map((blog) => {
        let lastMod = new Date();
        if (blog.updatedAt || blog.publishedAt) {
          const date = new Date(blog.updatedAt || blog.publishedAt);
          if (!isNaN(date.getTime())) {
            lastMod = date;
          }
        }
        return {
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: lastMod,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
    }
  } catch (error) {
    console.error('Error generating sitemap for blogs:', error);
  }

  return [...routes, ...blogRoutes];
}
