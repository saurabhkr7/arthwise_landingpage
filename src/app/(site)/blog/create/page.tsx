"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HeroSub from "@/components/SharedComponents/HeroSub";

const CreateBlogPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "News",
    image: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to create a blog");
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) {
      toast.error("Session expired. Please sign in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Blog created successfully!");
        router.push("/blog");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="pt-44 text-center">Loading...</div>;
  if (!session) return null;

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
                className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
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
