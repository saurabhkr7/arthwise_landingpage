import React from "react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "We're working on something exciting. Stay tuned!",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600 ${className}`}>
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m0 0h-6"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-DeepOcean dark:text-white dark:text-opacity-60 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default ComingSoon;
