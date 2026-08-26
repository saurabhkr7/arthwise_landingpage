import React from "react";

const TermsContent = () => {
  return (
    <section className="dark:bg-darkmode py-16 lg:py-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="mb-8 pb-6 border-b border-border dark:border-dark_border">
            <p className="text-DeepOcean dark:text-white dark:text-opacity-60 text-sm">
              Last Updated: August 26, 2026
            </p>
          </div>

          {/* Critical Notice: Zero Tolerance Policy */}
          <div className="mb-12 p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border-2 border-red-500/50">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              ⚠️ Strict Zero-Tolerance Policy: Objectionable Content & Abusive Behavior
            </h2>
            <p className="text-red-900 dark:text-red-200 text-sm leading-relaxed mb-3">
              Arthwise enforces a strict <strong>zero-tolerance policy</strong> for objectionable content, harassment, hate speech, bullying, defamation, impersonation, obscenity, or abusive users.
            </p>
            <p className="text-red-900 dark:text-red-200 text-sm leading-relaxed">
              Users have built-in tools on every post and profile to <strong>flag objectionable content</strong> and <strong>block abusive users</strong>. Blocking immediately removes that user&apos;s posts from your feed and alerts our moderation team. Content violating these terms is removed immediately, and offending user accounts are permanently terminated.
            </p>
          </div>

          {/* 1. Agreement & Acceptance */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              1. Acceptance of Terms & End User License Agreement (EULA)
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              Welcome to Arthwise (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service and End User License Agreement (&quot;EULA&quot;) govern your access to and use of our mobile applications, website at arthhwise.com, and related educational paper trading services.
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              By creating an account, downloading, accessing, or using the Arthwise app, you explicitly acknowledge and agree to be bound by these terms. If you do not agree to these terms, you must not use or access Arthwise.
            </p>
          </div>

          {/* 2. User-Generated Content & Code of Conduct */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              2. User-Generated Content (UGC) & Community Standards
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              Arthwise provides social learning features including community timelines, discussions, market commentary, and user profiles. You are solely responsible for the content, comments, and media you post.
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-3 font-semibold">
              Prohibited Content and Conduct:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li><strong>Zero Tolerance for Abuse:</strong> Harassment, stalking, threats, bullying, hate speech, racism, or discrimination of any kind.</li>
              <li><strong>Objectionable Content:</strong> Sexually explicit, obscene, pornographic, excessively violent, gory, or defamatory content.</li>
              <li><strong>Financial Fraud & Misleading Claims:</strong> Pump-and-dump schemes, fraudulent investment schemes, insider tips impersonation, or deceptive market manipulation claims.</li>
              <li><strong>Spam & Unsolicited Promotion:</strong> Commercial spam, affiliate links, repetitive advertisements, or phishing links.</li>
              <li><strong>Intellectual Property Infringement:</strong> Plagiarism or posting copyrighted material without proper authorization.</li>
            </ul>
          </div>

          {/* 3. Safety, Flagging, and Blocking Mechanisms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              3. Content Moderation: Flagging and User Blocking
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              In accordance with Apple App Store Safety Guidelines (Guideline 1.2), Arthwise empowers every user to maintain a safe community:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li><strong>Flagging / Reporting Content:</strong> Every post features a &quot;Report Post&quot; menu option allowing users to categorize and report spam, harassment, inappropriate content, or misinformation.</li>
              <li><strong>Blocking Abusive Users:</strong> Users can block any user directly from any post menu or profile screen. When a user is blocked:
                <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                  <li>The blocked user&apos;s posts and comments are <strong>instantly removed</strong> from the reporting user&apos;s feed.</li>
                  <li>Our moderation team is automatically notified of the blocked account and reason.</li>
                  <li>The blocked user can no longer view or interact with the blocker&apos;s content.</li>
                </ul>
              </li>
              <li><strong>24-Hour Moderation Response:</strong> Our moderation team acts on flagged content and reports within 24 hours, removing offending content and banning repeat violators.</li>
            </ul>
          </div>

          {/* 4. Simulated Trading & Contests */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              4. Paper Trading Simulation & Free Daily Contests
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              Arthwise is 100% free to access and use:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li><strong>Virtual Simulation Only:</strong> The ₹10 Lakh virtual funds, derivative trades, and balances provided are purely fictional simulation tokens for practice and education. They have no real monetary value, cannot be deposited, converted, or withdrawn.</li>
              <li><strong>Daily Contests (StockHub):</strong> Daily contests and simulation events are educational paper-trading challenges. Participation is free, and ranking is based purely on virtual portfolio performance. Contests are not real-money gambling, sports betting, lotteries, or wagering.</li>
              <li><strong>No Financial Advice:</strong> Content, analysis, charts, and simulation metrics provided on Arthwise are solely for educational purposes and do not constitute registered financial, investment, or legal advice.</li>
            </ul>
          </div>

          {/* 5. Account Termination */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              5. Account Suspension & Termination
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We reserve the absolute right to suspend, restrict, or permanently terminate any user account without prior notice if the user violates this EULA, posts objectionable content, engages in abusive behavior, or interferes with the safety and integrity of the platform.
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              Users may delete their account at any time via Settings ➔ Delete Account within the mobile application. Account deletion permanently purges all user data and posts from our servers.
            </p>
          </div>

          {/* 6. Contact Us */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
              6. Safety & Moderation Contact
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-2">
              For urgent safety reports, copyright claims, or EULA inquiries, please contact our moderation team directly:
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              Email: <a href="mailto:support@arthhwise.com" className="text-primary underline">support@arthhwise.com</a><br />
              Website: <a href="https://arthhwise.com" className="text-primary underline">https://arthhwise.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsContent;
