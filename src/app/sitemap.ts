import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/api/blogs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

async function fetchWithTimeout(url: string, timeout = 5000): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

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

  // Fetch posts for deep link routes
  let postRoutes: any[] = [];
  try {
    const postsData = await fetchWithTimeout(`${API_BASE_URL}/posts?limit=50`);
    if (postsData?.data && Array.isArray(postsData.data)) {
      postRoutes = postsData.data.map((post: any) => ({
        url: `${baseUrl}/post/${post.id}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  // Fetch contests for deep link routes
  let contestRoutes: any[] = [];
  try {
    const contestsData = await fetchWithTimeout(`${API_BASE_URL}/contests?limit=50`);
    if (contestsData?.data && Array.isArray(contestsData.data)) {
      contestRoutes = contestsData.data.map((contest: any) => ({
        url: `${baseUrl}/contest/${contest.id}`,
        lastModified: contest.updatedAt ? new Date(contest.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching contests for sitemap:', error);
  }

  // Fetch users for deep link routes
  let userRoutes: any[] = [];
  try {
    const usersData = await fetchWithTimeout(`${API_BASE_URL}/users?limit=50`);
    if (usersData?.data && Array.isArray(usersData.data)) {
      userRoutes = usersData.data.map((user: any) => ({
        url: `${baseUrl}/user/${user.id}`,
        lastModified: user.updatedAt ? new Date(user.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching users for sitemap:', error);
  }

  // Fetch courses for deep link routes
  let courseRoutes: any[] = [];
  try {
    const coursesData = await fetchWithTimeout(`${API_BASE_URL}/courses?limit=50`);
    if (coursesData?.data && Array.isArray(coursesData.data)) {
      courseRoutes = coursesData.data.map((course: any) => ({
        url: `${baseUrl}/course/${course.id}`,
        lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching courses for sitemap:', error);
  }

  return [
    ...routes,
    ...blogRoutes,
    ...postRoutes,
    ...contestRoutes,
    ...userRoutes,
    ...courseRoutes,
  ];
}
