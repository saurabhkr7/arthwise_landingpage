"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HeroSub from "@/components/SharedComponents/HeroSub";

const TITLE_MAX_CHARS = 120;
const CONTENT_MAX_WORDS = 2500;
const IMAGE_URL_MAX_CHARS = 2048;

function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const CreateBlogPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "News",
    image: "",
  });

  const wordCount = useMemo(() => countWords(formData.content), [formData.content]);
  const slugPreview = useMemo(() => slugify(formData.title), [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = formData.title.trim();
    const content = formData.content.trim();
    const image = formData.image.trim();

    if (!title) return toast.error("Title is required");
    if (title.length > TITLE_MAX_CHARS) return toast.error(`Title must be ≤ ${TITLE_MAX_CHARS} characters`);
    if (!content) return toast.error("Content is required");
    if (wordCount > CONTENT_MAX_WORDS) return toast.error(`Content must be ≤ ${CONTENT_MAX_WORDS} words`);
    if (image.length > IMAGE_URL_MAX_CHARS) return toast.error(`Image URL must be ≤ ${IMAGE_URL_MAX_CHARS} characters`);

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        {
          ...formData,
          title,
          content,
          image,
          slug: slugPreview || undefined,
        },
        {
          headers: { Accept: "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Blog created successfully!");
        router.push(response.data?.data?.slug ? `/blog/${response.data.data.slug}` : "/blog");
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (error.response?.status === 401 || error.response?.status === 403
          ? "Backend rejected the request (auth required). Enable public blog create on the API."
          : "Failed to create blog");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroSub
        title="Create Blog"
        description="Share your insights and trading experiences with the Arthhwise community."
        breadcrumbLinks={[
          { href: "/", text: "Home" },
          { href: "/blog", text: "Blog" },
          { href: "/blog/create", text: "Create" },
        ]}
      />

      <section className="py-20 dark:bg-darkmode">
        <div className="container mx-auto max-w-3xl px-4">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark_border p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-17 font-medium mb-2 dark:text-white">Title</label>
              <input
                type="text"
                required
                maxLength={TITLE_MAX_CHARS}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                <span>URL preview: /blog/{slugPreview || "your-title"}</span>
                <span>{formData.title.length}/{TITLE_MAX_CHARS}</span>
              </div>
            </div>

            <div>
              <label className="block text-17 font-medium mb-2 dark:text-white">Category</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Trading">Trading</option>
                <option value="Learning">Learning</option>
                <option value="News">News</option>
                <option value="Analysis">Analysis</option>
                <option value="Tips">Tips</option>
              </select>
            </div>

            <div>
              <label className="block text-17 font-medium mb-2 dark:text-white">Featured Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                maxLength={IMAGE_URL_MAX_CHARS}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary outline-none"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-17 font-medium mb-2 dark:text-white">Content</label>
              <textarea
                required
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary outline-none resize-none"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              ></textarea>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-end">
                <span>{wordCount}/{CONTENT_MAX_WORDS} words</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateBlogPage;
