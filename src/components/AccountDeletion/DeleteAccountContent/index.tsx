"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DeleteAccountContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    confirm: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.confirm) {
      toast.error("Please confirm that you understand the data deletion consequences.");
      return;
    }

    try {
      setSubmitting(true);
      
      // Using the existing contact submission endpoint with a specific subject
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: "Account Deletion Request",
          message: `Reason: ${formData.reason || "Not provided"}\n\nUser has requested permanent deletion of their account and all associated data.`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Deletion request submitted successfully. We will process it shortly.");
        setFormData({ name: "", email: "", reason: "", confirm: false });
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Deletion Request Error:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="dark:bg-darkmode py-16 lg:py-24">
      <div className="container mx-auto lg:max-w-4xl md:max-w-2xl px-4">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-4">
              Account Deletion & Data Privacy
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              At Arthhwise, we respect your right to privacy and data ownership. If you wish to stop using our services and have your data permanently removed, you can request account deletion here.
            </p>
          </div>

          {/* What happens when you delete */}
          <div className="mb-12 bg-red-50 dark:bg-red-900 dark:bg-opacity-10 p-8 rounded-xl border border-red-100 dark:border-red-800">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
              </svg>
              What happens when your account is deleted?
            </h3>
            <ul className="space-y-3 text-DeepOcean dark:text-white dark:text-opacity-80">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Permanent Action:</strong> Account deletion is permanent and cannot be undone. You will lose access to your account and all associated data.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Personal Data:</strong> Your profile information, including name, email, and social connections, will be permanently removed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Trading History:</strong> All paper trading history, portfolios, and performance metrics will be deleted.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Social Content:</strong> Your posts, comments, and messages will be permanently erased from our servers.</span>
              </li>
            </ul>
          </div>

          {/* Request Form */}
          <div className="bg-white dark:bg-dark_border p-8 rounded-xl border border-border dark:border-dark_border shadow-sm">
            <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
              Request Deletion
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-DeepOcean dark:text-white dark:text-opacity-80 mb-2">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name as per account"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-DeepOcean dark:text-white dark:text-opacity-80 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Enter your registered email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-DeepOcean dark:text-white dark:text-opacity-80 mb-2">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us why you're leaving so we can improve"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                ></textarea>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="confirm"
                    type="checkbox"
                    required
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-transparent dark:border-dark_border"
                    checked={formData.confirm}
                    onChange={(e) => setFormData({ ...formData, confirm: e.target.checked })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="confirm" className="font-medium text-DeepOcean dark:text-white dark:text-opacity-70">
                    I understand that account deletion is permanent and all my data will be erased.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Permanently Delete My Account"
                )}
              </button>
            </form>
          </div>

          {/* Compliance Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-DeepOcean dark:text-white dark:text-opacity-50">
              Compliant with Google Play Store User Data Policy regarding Account Deletion.
              <br />
              For further assistance, contact us at <a href="mailto:Arthhwise@gmail.com" className="text-primary hover:underline">Arthhwise@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccountContent;
