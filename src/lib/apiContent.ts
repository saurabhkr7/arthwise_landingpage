/**
 * API utilities for fetching content previews
 */

import { DeepLinkType } from "@/lib/deeplink";

export interface ContentPreview {
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  createdAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Fetch post content
 */
export async function fetchPostContent(id: string): Promise<ContentPreview | null> {
  try {
    const response = await fetch(`${API_BASE}/api/post/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Failed to fetch post ${id}:`, response.status);
      return null;
    }

    const data = await response.json();
    return {
      title: data.title || "Post",
      description: data.description || data.content?.substring(0, 150) || "Check this out on Arthhwise",
      image: data.image || data.thumbnail,
      category: "Post",
      author: data.author?.name,
      createdAt: data.createdAt,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * Fetch contest content
 */
export async function fetchContestContent(id: string): Promise<ContentPreview | null> {
  try {
    const response = await fetch(`${API_BASE}/api/contest/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch contest ${id}:`, response.status);
      return null;
    }

    const data = await response.json();
    return {
      title: data.title || "Trading Contest",
      description: data.description || "Join this trading contest and compete for prizes",
      image: data.image || data.banner,
      category: "Contest",
      createdAt: data.startDate,
    };
  } catch (error) {
    console.error("Error fetching contest:", error);
    return null;
  }
}

/**
 * Fetch user profile
 */
export async function fetchProfileContent(id: string): Promise<ContentPreview | null> {
  try {
    const response = await fetch(`${API_BASE}/api/user/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch profile ${id}:`, response.status);
      return null;
    }

    const data = await response.json();
    const userInfo = data.user || data;
    return {
      title: userInfo.displayname || userInfo.username || "Trader Profile",
      description: userInfo.description || `${userInfo.displayname || userInfo.username}'s trading profile on Arthhwise`,
      image: userInfo.profilePicture,
      category: "Trader Profile",
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

/**
 * Fetch course content
 */
export async function fetchCourseContent(id: string): Promise<ContentPreview | null> {
  try {
    const response = await fetch(`${API_BASE}/api/course/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch course ${id}:`, response.status);
      return null;
    }

    const data = await response.json();
    return {
      title: data.title || "Trading Course",
      description: data.description || "Learn trading from experts on Arthhwise",
      image: data.image || data.thumbnail,
      category: "Course",
      author: data.instructor?.name,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

/**
 * Fetch daily quiz preview content
 */
export async function fetchDailyQuizContent(id: string): Promise<ContentPreview | null> {
  return {
    title: "Daily Stock Challenge! 🧠",
    description: "Take today's Daily Quiz Challenge on Arthwise! Test your market strategy, claim your global rank, and earn real-time points & credits! 🚀",
    category: "Daily Quiz",
  };
}

/**
 * Fetch content by type
 */
export async function fetchContent(
  type: DeepLinkType,
  id: string
): Promise<ContentPreview | null> {
  switch (type) {
    case "post":
      return fetchPostContent(id);
    case "contest":
      return fetchContestContent(id);
    case "profile":
      return fetchProfileContent(id);
    case "course":
      return fetchCourseContent(id);
    case "daily_quiz":
      return fetchDailyQuizContent(id);
    default:
      return null;
  }
}

/**
 * Fallback content based on type
 */
export function getFallbackContent(type: DeepLinkType, id: string): ContentPreview {
  const typeLabels: Record<DeepLinkType, string> = {
    post: "Post",
    contest: "Trading Contest",
    profile: "Trader Profile",
    course: "Trading Course",
    daily_quiz: "Daily Quiz",
  };

  return {
    title: `${typeLabels[type]} on Arthhwise`,
    description: `Check out this ${typeLabels[type].toLowerCase()} on the Arthhwise app. Experience real-time trading with live NSE market data.`,
    category: typeLabels[type],
  };
}
