import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/api/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arthhwise.com';

  // Base routes
  const routes = [
    { path: '', priority: 1, frequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, frequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, frequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, frequency: 'weekly' as const },
    { path: '/waiting-list', priority: 0.6, frequency: 'monthly' as const },
    { path: '/feedback', priority: 0.6, frequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, frequency: 'yearly' as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.frequency,
    priority: route.priority,
  }));

  // Fetch all blogs to include in sitemap
  let blogRoutes: any[] = [];
  try {
    const response = await getBlogs(1, 100); // Fetch up to 100 blogs
    if (response.success && response.data) {
      blogRoutes = response.data.map((blog: any) => {
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

  // Note: Deep link routes (/post/[id], /contest/[id], /user/[id], /course/[id])
  // are accessible but not listed in sitemap as separate URLs. They will be
  // discovered via Open Graph tags when shared on social media.
  // To enable dynamic routes in sitemap: connect to actual data API endpoints

  return [...routes, ...blogRoutes];
}
