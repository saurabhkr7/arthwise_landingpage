const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  image: string;
  views: number;
  likes: number;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[];
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface BlogDetailResponse {
  success: boolean;
  data: Blog;
  error?: string;
}

export async function getBlogs(page: number = 1, limit: number = 10): Promise<BlogsResponse> {
  try {
    const url = `${API_BASE_URL}/blog?page=${page}&limit=${limit}`;
    console.log('Fetching blogs from:', url);
    
    const response = await fetch(
      url,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching blogs:', errorMessage);
    console.error('API_BASE_URL:', API_BASE_URL);
    return { 
      success: false, 
      data: [], 
      error: errorMessage
    };
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/slug/${slug}`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { 
      success: false, 
      data: {} as Blog,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getBlogById(id: string): Promise<BlogDetailResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/id/${id}`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { 
      success: false, 
      data: {} as Blog,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function likeBlog(blogId: string): Promise<BlogDetailResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/${blogId}/like`,
      { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to like blog: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error liking blog:', error);
    return { 
      success: false, 
      data: {} as Blog,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
