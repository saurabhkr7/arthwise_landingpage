"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "android-app",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Thank you for your feedback!");
        setFormData({ name: "", email: "", feedbackType: "android-app", message: "" });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Feedback Submission Error:", error);
      toast.error("Failed to connect to server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="dark:bg-darkmode py-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="max-w-[800px] mx-auto bg-white dark:bg-dark_border p-8 md:p-12 rounded-2xl shadow-testimonial">
          <div className="mb-10 text-center">
            <h2 className="text-32 md:text-40 font-bold mb-4 dark:text-white">
              App Feedback
            </h2>
            <p className="text-18 text-body dark:text-white/70">
              Your insights help us improve the Arthwise experience.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="feedbackType" className="text-17 font-medium dark:text-white">
                What are you providing feedback for?*
              </label>
              <select
                id="feedbackType"
                required
                className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all"
                value={formData.feedbackType}
                onChange={(e) => setFormData({ ...formData, feedbackType: e.target.value })}
              >
                <option value="android-app">Android App</option>
                <option value="ios-app">iOS App</option>
                <option value="landing-page">Landing Page</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-17 font-medium dark:text-white">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-17 font-medium dark:text-white">
                  Email address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-17 font-medium dark:text-white">
                Your Feedback*
              </label>
              <textarea
                id="message"
                rows={5}
                required
                placeholder="Please describe your experience, issues, or suggestions..."
                className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-testimonial disabled:bg-opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
