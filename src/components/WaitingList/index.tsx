"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const WaitingListForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waiting-list/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Thank you for joining our waiting list!");
        setFormData({ name: "", email: "", comments: "" });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Waiting List Submission Error:", error);
      toast.error("Failed to connect to server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="dark:bg-darkmode py-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: App Concept */}
          <div className="lg:col-span-5">
            <h2 className="text-32 md:text-40 font-bold mb-6 dark:text-white">
              Why Join Arthwise?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-20 font-bold mb-2 dark:text-white">Risk-Free Learning</h4>
                  <p className="text-16 text-body dark:text-white/70">
                    Master the stock market with ₹10,00,000 virtual capital. Practice without real financial risk.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">02</span>
                </div>
                <div>
                  <h4 className="text-20 font-bold mb-2 dark:text-white">Real-Time Data</h4>
                  <p className="text-16 text-body dark:text-white/70">
                    Experience the thrill of live markets with real-time NSE data and instant order execution.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">03</span>
                </div>
                <div>
                  <h4 className="text-20 font-bold mb-2 dark:text-white">Fantasy Contests</h4>
                  <p className="text-16 text-body dark:text-white/70">
                    Compete in stock fantasy leagues and showcase your trading skills on the global leaderboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-white dark:bg-dark_border p-8 md:p-12 rounded-2xl shadow-testimonial">
            <div className="mb-10">
              <h3 className="text-28 font-bold mb-2 dark:text-white">
                Get Early Access
              </h3>
              <p className="text-18 text-body dark:text-white/70">
                Sign up to get notified when we launch on Play Store and App Store.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-17 font-medium dark:text-white">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-17 font-medium dark:text-white">
                    App Store Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Email used on App Store"
                    className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="comments" className="text-17 font-medium dark:text-white">
                  Any specific interests or comments?
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  placeholder="Tell us what features you're looking forward to..."
                  className="w-full text-17 px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:border-primary focus:outline-none transition-all resize-none"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                ></textarea>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto bg-primary text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-testimonial disabled:bg-opacity-50"
                >
                  {submitting ? "Joining..." : "Join Waiting List"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListForm;
