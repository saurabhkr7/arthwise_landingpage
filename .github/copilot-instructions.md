# Arthhwise Landing Page - Copilot Instructions

## Project Overview
Arthhwise is a **Next.js 15 trading education platform** with a rebranded landing page, blog system, and authentication. This is a **frontend-driven project** that integrates with external backend APIs for auth, blogs, and user data.

**Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4.0, NextAuth, Axios

---

## Critical Architecture Patterns

### 1. **API Integration Layer** (`src/lib/api/`)
All external API calls are abstracted through `auth.ts` and `blogs.ts` modules:

```typescript
// Example: getBlogs() handles fetching, caching, error handling
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getBlogs(page: number = 1, limit: number = 10): Promise<BlogsResponse>
```

**Key Pattern**: Use fetch with `next: { revalidate: 3600 }` for ISR (Incremental Static Regeneration)

**Backend Endpoints Used**:
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login  
- `GET /blog?page=X&limit=Y` - Blog listing with pagination
- `GET /blog/{slug}` - Individual blog content

**When Adding New APIs**: Create new files in `src/lib/api/`, export TypeScript interfaces, handle localStorage for tokens.

### 2. **Authentication Context** (`src/context/AuthContext.tsx`)
Global auth state wrapper around entire app (via RootLayout). Provides:
- `useAuth()` hook for components
- `user`, `isAuthenticated`, `isLoading` states
- `signIn()`, `signUp()`, `logout()` methods
- Token persistence via localStorage

**Usage in Components**:
```tsx
'use client';
import { useAuth } from '@/context/AuthContext';
const { user, isAuthenticated, signIn } = useAuth();
```

**Important**: All auth-dependent UI must be wrapped with `'use client'` directive.

### 3. **Blog System Architecture**
- **Dynamic Routes**: `/blog/[slug]/page.tsx` fetches individual articles
- **Markdown Rendering**: Uses `react-markdown` to render fetched HTML content
- **API-Driven**: Blog data comes from backend MongoDB, not static MDX files
- **Client Components**: Blog listing and detail pages are client components for real-time fetching

**Pattern**: Fetch in useEffect, handle loading/error states, render markdown content

### 4. **Component Organization**
```
components/
  ├── Auth/          → Login/signup forms and dialogs
  ├── Home/          → Homepage sections (rebranded for trading)
  ├── Blog/          → Blog-specific components
  ├── Layout/        → Header, Footer (persistent across routes)
  ├── Common/        → Reusable UI (Breadcrumb, Loader, ScrollUp)
  └── SharedComponents/ → Blog cards, hero headers
```

**Naming Convention**: 
- Index pattern for main components: `ComponentName/index.tsx`
- Export defaults for page routes, named exports for sub-components

### 5. **Styling Approach** 
- **Tailwind CSS 4.0** with custom theme variables in `globals.css`
- **Custom CSS Variables**: Color palette defined in `@theme` block (e.g., `--color-primary: #2f73f2`)
- **Dark Mode**: Enabled via `next-themes`, CSS uses `.dark` class selector
- **No CSS Modules**: All styling via Tailwind utility classes or CSS variables

**Pattern**: Reference custom vars like `text-primary`, `bg-darkmode`, `border-grey`

---

## Key Development Workflows

### Build & Run
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Run production build
npm run lint     # Run ESLint
```

### Environment Setup
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Adding New Pages
1. Create route in `src/app/(site)/[routeName]/page.tsx`
2. Use `Metadata` export for SEO
3. Import layout components (Header/Footer auto-included via RootLayout)
4. Use `HeroSub` component for sub-page headers

### Data Fetching Patterns
- **Server Components** (default): Use for static content, metadata, initial rendering
- **Client Components** (`'use client'`): Required for hooks (useEffect, useAuth, useState)
- **Real-time Data**: BlogList, SignIn forms must be client components

---

## Rebranding Context (Payment → Trading)
All homepage sections were rebranded from payment/fintech to trading education:

| Original | Current | Component |
|----------|---------|-----------|
| Payment Features | Paper Trading | `Home/Payment/` |
| Spend & Save | Learn & Practice | `Home/Spend/` |
| Many Ways to Pay | Multiple Analysis Tools | `Home/Method/` |
| Benefits | Trading Platform Benefits | `Home/Benefit/` |
| Search/Demo | Sign Up & Get Started | `Home/Search/` |

**When Updating Copy**: Check component files for hardcoded strings; use consistent trading terminology.

---

## Important Type Definitions
Located in `src/types/`:

```typescript
// src/types/blog.ts
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;        // HTML from backend
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  image: string;
  views: number;
  likes: number;
  publishedAt: string;
  isPublished: boolean;
}
```

**Pattern**: Always define response interfaces to match backend schemas.

---

## Common Pitfalls to Avoid

1. **Client vs Server Components**: Hooks only work in client components. If you need `useAuth()` or `useEffect()`, add `'use client'` at the top.

2. **CORS & NEXT_PUBLIC_**: Environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in browsers.

3. **Blog Fetching**: BlogList uses `getBlogs()` with pagination. Don't hardcode page limits in components.

4. **Auth Token Management**: Tokens are stored in localStorage. Check `src/lib/api/auth.ts` for `getToken()` helper before making authenticated requests.

5. **Dynamic Routes**: Blog slug parameter comes from URL: `[slug]/page.tsx` receives `params: { slug: string }`.

---

## Testing & Debugging

- **API Testing**: Use Postman/Thunder Client against `NEXT_PUBLIC_API_URL`
- **Component Testing**: React DevTools extension to inspect context values
- **Type Checking**: Run `tsc --noEmit` to catch TypeScript errors
- **Markdown Rendering**: react-markdown may strip unsafe HTML; use `allowedElements` prop if needed

---

## File Path Reference for Common Tasks

| Task | File |
|------|------|
| Add global styles | `src/Style/style.css` |
| Update auth logic | `src/lib/api/auth.ts` |
| Add API endpoints | Create in `src/lib/api/` |
| Add homepage section | `src/components/Home/[SectionName]/` |
| Update metadata | `src/app/page.tsx` or route's `page.tsx` |
| Modify auth behavior | `src/context/AuthContext.tsx` |

---

## Questions Before Making Changes

- Is this a **server or client component**? (Check if using hooks)
- Does it **need backend data**? (Use API layer pattern)
- Is this **blog-related**? (Check Blog interfaces and components)
- Does it involve **user auth**? (Use useAuth hook)
- Is it **styling**? (Use Tailwind + custom CSS vars)
