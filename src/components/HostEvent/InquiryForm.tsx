"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export interface EventInquiryData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  expectedParticipants: string;
  eventDate: string;
  message: string;
}

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<EventInquiryData>({
    name: "",
    email: "",
    phone: "",
    institution: "",
    role: "Student Coordinator",
    expectedParticipants: "100-250",
    eventDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // POST to backend contact submit endpoint
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";
      const res = await fetch(`${apiBaseUrl}/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Campus Event Inquiry: ${formData.institution}`,
          message: `Host Event Inquiry:
Institution: ${formData.institution}
Role: ${formData.role}
Phone: ${formData.phone}
Expected Participants: ${formData.expectedParticipants}
Tentative Event Date: ${formData.eventDate || "TBD"}
Additional Details: ${formData.message || "None"}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred. Please contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-darkHeroBg p-8 md:p-10 rounded-3xl border border-primary/20 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4 border border-green-500/20">
          <Icon icon="solar:check-circle-bold" width="36" height="36" />
        </div>
        <h3 className="text-2xl font-extrabold text-midnight_text dark:text-white mb-2">
          Inquiry Submitted Successfully! 🎉
        </h3>
        <p className="text-muted dark:text-white/70 text-sm max-w-md mx-auto mb-6">
          Thank you, <span className="font-bold text-midnight_text dark:text-white">{formData.name}</span>! Our campus partnership team will review <span className="font-bold">{formData.institution}</span>&apos;s request and contact you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/918770117256?text=${encodeURIComponent(
              `Hi Saurabh, I just submitted an event inquiry for ${formData.institution} (${formData.name}, ${formData.phone})!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Icon icon="logos:whatsapp-icon" width="18" height="18" />
            <span>Connect Immediately on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                institution: "",
                role: "Student Coordinator",
                expectedParticipants: "100-250",
                eventDate: "",
                message: "",
              });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/10 text-midnight_text dark:text-white font-semibold text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-darkHeroBg p-8 md:p-10 rounded-3xl border border-grey/10 dark:border-white/10 shadow-2xl">
      <h3 className="text-2xl font-extrabold text-midnight_text dark:text-white mb-2">
        Request Event Hosting (100% Free for Colleges)
      </h3>
      <p className="text-muted dark:text-white/70 text-sm mb-6">
        Fill out this quick form and our platform team will help you set up your co-branded event banner, join codes, and leaderboards.
      </p>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
          <Icon icon="solar:danger-triangle-bold" width="20" height="20" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            College / Institution Name *
          </label>
          <input
            type="text"
            name="institution"
            required
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g. Delhi University / NMIMS / Christ"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            Your Role *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="Student Coordinator">Student Coordinator / Event Lead</option>
            <option value="Finance Club Head">Finance / Trading Club Head</option>
            <option value="E-Cell Member">E-Cell / Fest Coordinator</option>
            <option value="Faculty Member">Faculty Member / Professor</option>
            <option value="Corporate / Other">Corporate Representative / Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@college.edu.in"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
            Expected Participants
          </label>
          <select
            name="expectedParticipants"
            value={formData.expectedParticipants}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="50-100">50 - 100 Students</option>
            <option value="100-250">100 - 250 Students</option>
            <option value="250-500">250 - 500 Students</option>
            <option value="500+">500+ Students (Large Fest)</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
          Tentative Event Date (Optional)
        </label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-midnight_text dark:text-white uppercase mb-1.5">
          Additional Details or Requirements (Optional)
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Mention any specific rules, dates, or co-branding requests..."
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-grey/20 dark:border-white/10 text-midnight_text dark:text-white text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Icon icon="line-md:loading-twotone-loop" width="20" height="20" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <Icon icon="solar:letter-bold" width="20" height="20" />
            <span>Submit Event Hosting Request</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-muted dark:text-white/50 mt-4">
        🔒 100% Free for educational institutions. We never spam or sell your contact information.
      </p>
    </form>
  );
};

export default InquiryForm;
