/**
 * API utilities for fetching content previews and full content for SEO pages
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

/** Extended content with full body for SEO-rendered pages */
export interface FullContent extends ContentPreview {
  body?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  participants?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  curriculum?: string[];
  instructor?: string;
  difficulty?: string;
  duration?: string;
  stats?: {
    totalTrades?: number;
    winRate?: number;
    totalPnL?: number;
    rank?: number;
    followers?: number;
    following?: number;
  };
  questions?: Array<{
    question: string;
    options?: string[];
    topic?: string;
  }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Fetch post content (preview)
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
      author: data.author?.name || data.author?.displayname,
      createdAt: data.createdAt,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * Fetch full post content for SEO page rendering
 */
export async function fetchFullPostContent(id: string): Promise<FullContent | null> {
  try {
    const response = await fetch(`${API_BASE}/api/post/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      title: data.title || "Post",
      description: data.description || data.content?.substring(0, 160) || "Check this out on Arthhwise",
      body: data.content || data.body || "",
      image: data.image || data.thumbnail,
      category: "Post",
      author: data.author?.name || data.author?.displayname || "Arthhwise User",
      createdAt: data.createdAt,
      tags: data.tags || [],
      views: data.views || 0,
      likes: data.likes || data.likesCount || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch contest content (preview)
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
 * Fetch full contest content for SEO page
 */
export async function fetchFullContestContent(id: string): Promise<FullContent | null> {
  try {
    const response = await fetch(`${API_BASE}/api/contest/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const contest = data.contest || data;
    return {
      title: contest.title || "Trading Contest",
      description: contest.description || "Join this trading contest and compete with other traders",
      body: contest.rules || contest.description || "",
      image: contest.image || contest.banner,
      category: "Contest",
      createdAt: contest.startDate || contest.createdAt,
      startDate: contest.startDate,
      endDate: contest.endDate,
      status: contest.status || "active",
      participants: contest.participants?.length || contest.participantCount || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch user profile (preview)
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
 * Fetch full profile content for SEO page
 */
export async function fetchFullProfileContent(id: string): Promise<FullContent | null> {
  try {
    const response = await fetch(`${API_BASE}/api/user/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const user = data.user || data;
    return {
      title: user.displayname || user.username || "Trader Profile",
      description: user.description || user.bio || `${user.displayname || user.username}'s trading profile on Arthhwise — paper trading with real NSE data`,
      image: user.profilePicture,
      category: "Trader Profile",
      author: user.displayname || user.username,
      createdAt: user.createdAt,
      stats: {
        totalTrades: user.totalTrades || 0,
        winRate: user.winRate || 0,
        totalPnL: user.totalPnL || 0,
        rank: user.rank || 0,
        followers: user.followers?.length || user.followersCount || 0,
        following: user.following?.length || user.followingCount || 0,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Fetch course content (preview)
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
 * Fetch full course content for SEO page
 */
export async function fetchFullCourseContent(id: string): Promise<FullContent | null> {
  try {
    const response = await fetch(`${API_BASE}/api/course/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const course = data.course || data;
    return {
      title: course.title || "Trading Course",
      description: course.description || "Learn trading from experts on Arthhwise",
      body: course.description || "",
      image: course.image || course.thumbnail,
      category: "Course",
      author: course.instructor?.name || "Arthhwise Team",
      instructor: course.instructor?.name,
      difficulty: course.difficulty || course.level || "Beginner",
      duration: course.duration,
      curriculum: Array.isArray(course.lessons)
        ? course.lessons.map((l: any) => l.title || l.name || "Lesson")
        : Array.isArray(course.modules)
          ? course.modules.map((m: any) => m.title || m.name || "Module")
          : [],
    };
  } catch {
    return null;
  }
}

/**
 * Fetch daily quiz content (preview) — now actually calls the API
 */
export async function fetchDailyQuizContent(id: string): Promise<ContentPreview | null> {
  try {
    const response = await fetch(`${API_BASE}/api/daily-quiz/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Fallback to generic quiz content if API doesn't have this endpoint
      return {
        title: "Daily Stock Market Quiz Challenge 🧠",
        description: "Test your stock market knowledge with today's Daily Quiz on Arthhwise! Answer questions about trading, markets, and investing to earn points and climb the leaderboard.",
        category: "Daily Quiz",
      };
    }

    const data = await response.json();
    const quiz = data.quiz || data;
    return {
      title: quiz.title || "Daily Stock Market Quiz Challenge 🧠",
      description: quiz.description || "Test your stock market knowledge with today's quiz on Arthhwise!",
      image: quiz.image,
      category: "Daily Quiz",
      createdAt: quiz.createdAt || quiz.date,
    };
  } catch {
    return {
      title: "Daily Stock Market Quiz Challenge 🧠",
      description: "Test your stock market knowledge with today's Daily Quiz on Arthhwise! Answer questions about trading, markets, and investing to earn points and climb the leaderboard.",
      category: "Daily Quiz",
    };
  }
}

/**
 * Fetch full quiz content for SEO page
 */
export async function fetchFullDailyQuizContent(id: string): Promise<FullContent | null> {
  try {
    const response = await fetch(`${API_BASE}/api/daily-quiz/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const quiz = data.quiz || data;
    return {
      title: quiz.title || "Daily Stock Market Quiz",
      description: quiz.description || "Test your market knowledge on Arthhwise",
      category: "Daily Quiz",
      createdAt: quiz.createdAt || quiz.date,
      difficulty: quiz.difficulty || "Medium",
      questions: Array.isArray(quiz.questions)
        ? quiz.questions.map((q: any) => ({
            question: q.question || q.text || "",
            options: q.options || [],
            topic: q.topic || q.category || "",
          }))
        : [],
    };
  } catch {
    return null;
  }
}

/**
 * Fetch content by type (preview — used for metadata)
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
 * Fetch full content by type (used for SSR page rendering)
 */
export async function fetchFullContent(
  type: DeepLinkType,
  id: string
): Promise<FullContent | null> {
  switch (type) {
    case "post":
      return fetchFullPostContent(id);
    case "contest":
      return fetchFullContestContent(id);
    case "profile":
      return fetchFullProfileContent(id);
    case "course":
      return fetchFullCourseContent(id);
    case "daily_quiz":
      return fetchFullDailyQuizContent(id);
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

/**
 * Full fallback content with body text for SEO pages
 */
export function getFullFallbackContent(type: DeepLinkType, id: string): FullContent {
  const typeDescriptions: Record<DeepLinkType, { title: string; description: string; body: string }> = {
    post: {
      title: "Trading Post on Arthhwise",
      description: "Explore trading insights and discussions from the Arthhwise community. Join India's most active paper trading community.",
      body: "This post is from the Arthhwise trading community — India's most active paper trading platform. Our community of traders shares insights, strategies, and market analysis every day. Download the Arthhwise app to join the conversation, share your own trades, and learn from fellow traders.",
    },
    contest: {
      title: "Trading Contest on Arthhwise",
      description: "Compete in paper trading contests with real NSE data on Arthhwise. Test your strategies against other traders and climb the leaderboard.",
      body: "Arthhwise trading contests let you compete against other traders using real NSE market data and virtual capital. Each contest challenges you to build the best-performing portfolio within a set timeframe. Top performers earn leaderboard rankings and community recognition. Download the Arthhwise app to join the next contest.",
    },
    profile: {
      title: "Trader Profile on Arthhwise",
      description: "View this trader's profile on Arthhwise — India's leading paper trading app with real NSE data.",
      body: "This is a trader profile on Arthhwise, India's leading paper trading platform. Arthhwise traders practice with ₹10,00,000 in virtual capital using live NSE and BSE market data. Download the app to see their full trading history, follow their strategies, and start your own trading journey.",
    },
    course: {
      title: "Trading Course on Arthhwise",
      description: "Learn stock market trading with structured courses on Arthhwise. From candlestick basics to advanced risk management.",
      body: "Arthhwise offers structured trading courses designed for Indian market beginners. Each course covers essential topics from basic stock market concepts to advanced trading strategies, complete with practical exercises using our paper trading simulator. Download the app to start learning today.",
    },
    daily_quiz: {
      title: "Daily Stock Market Quiz on Arthhwise",
      description: "Take today's daily quiz challenge on Arthhwise. Test your market knowledge, earn points, and climb the global leaderboard.",
      body: "The Arthhwise Daily Quiz challenges you with questions about stock markets, trading strategies, and financial concepts. Answer correctly to earn points, climb the leaderboard, and track your learning progress. New questions every day — download the app to take today's challenge.",
    },
  };

  const content = typeDescriptions[type];
  return {
    ...content,
    category: type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

