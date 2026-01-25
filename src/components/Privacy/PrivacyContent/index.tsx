import React from "react";

const PrivacyContent = () => {
  return (
    <section className="dark:bg-darkmode py-16 lg:py-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="mb-8 pb-6 border-b border-border dark:border-dark_border">
            <p className="text-DeepOcean dark:text-white dark:text-opacity-60 text-sm">
              Last Updated: January 25, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              At Arthwise, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our paper trading 
              platform and financial education services, both on our website and mobile application.
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              By accessing or using Arthwise, you agree to the terms outlined in this Privacy Policy. If you do not agree with 
              our policies and practices, please do not use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-midnight_text dark:text-white mb-3">
              1. Personal Information
            </h3>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We collect information that you voluntarily provide when you:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li>Create an account (name, email address, phone number)</li>
              <li>Complete your profile (educational background, trading experience level)</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter or educational content</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>

            <h3 className="text-xl font-semibold text-midnight_text dark:text-white mb-3">
              2. Trading and Activity Data
            </h3>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              When you use our paper trading platform, we collect:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li>Simulated trades and portfolio data</li>
              <li>Learning progress and course completion status</li>
              <li>Platform usage patterns and preferences</li>
              <li>Performance analytics and trading history</li>
            </ul>

            <h3 className="text-xl font-semibold text-midnight_text dark:text-white mb-3">
              3. Technical Information
            </h3>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We automatically collect technical data when you access our services:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-6 ml-4 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log data (access times, pages viewed, app features used)</li>
              <li>Mobile device identifiers (for app users)</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              How We Use Your Information
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed ml-4 space-y-2">
              <li><strong>Provide Services:</strong> Operate and maintain the paper trading platform and educational features</li>
              <li><strong>Personalization:</strong> Customize your learning experience and trading recommendations</li>
              <li><strong>Communication:</strong> Send account updates, educational content, and important notifications</li>
              <li><strong>Analytics:</strong> Analyze usage patterns to improve our platform and features</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
              <li><strong>Customer Support:</strong> Respond to your inquiries and provide technical assistance</li>
            </ul>
          </div>

          {/* Data Sharing and Disclosure */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Data Sharing and Disclosure
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed ml-4 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our platform (hosting, analytics, email services)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Data Security
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed ml-4 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure data storage with encryption at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mt-4">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, 
              we cannot guarantee absolute security.
            </p>
          </div>

          {/* Your Rights and Choices */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Your Rights and Choices
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed ml-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information we hold</li>
              <li><strong>Correction:</strong> Update or correct inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Cookie Preferences:</strong> Manage cookie settings through your browser</li>
            </ul>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mt-4">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:Arthhwise@gmail.com" className="text-primary hover:underline">
                Arthhwise@gmail.com
              </a>
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Children's Privacy
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              Arthwise is not intended for users under the age of 18. We do not knowingly collect personal information from 
              children. If you believe we have inadvertently collected data from a minor, please contact us immediately, 
              and we will take steps to delete such information.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Third-Party Links and Services
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              Our platform may contain links to third-party websites or integrate with external services. We are not responsible 
              for the privacy practices of these third parties. We encourage you to review their privacy policies before 
              providing any personal information.
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              International Data Transfers
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws different from those in your jurisdiction. By using our services, 
              you consent to such transfers.
            </p>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Data Retention
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal 
              obligations. When you delete your account, we will remove your personal data within 30 days, except where 
              retention is required by law or for legitimate business purposes (e.g., fraud prevention, dispute resolution).
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Changes to This Privacy Policy
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of significant changes by posting the updated policy on this page and updating the 
              "Last Updated" date. Your continued use of Arthwise after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white mb-6">
              Contact Us
            </h2>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-heroBg dark:bg-search p-6 rounded-lg">
              <p className="text-midnight_text dark:text-white font-semibold mb-2">Arthwise</p>
              <p className="text-DeepOcean dark:text-white dark:text-opacity-70">
                Email:{" "}
                <a href="mailto:Arthhwise@gmail.com" className="text-primary hover:underline">
                  Arthhwise@gmail.com
                </a>
              </p>
              <p className="text-DeepOcean dark:text-white dark:text-opacity-70">
                Phone:{" "}
                <a href="tel:+918770117256" className="text-primary hover:underline">
                  +91-8770117256
                </a>
              </p>
              <p className="text-DeepOcean dark:text-white dark:text-opacity-70 mt-2">
                Address: ANS Homes, Gulmohar Enclave<br />
                Bangalore, India 560037
              </p>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-midnight_text dark:text-white font-semibold mb-2">
              Your Consent
            </p>
            <p className="text-DeepOcean dark:text-white dark:text-opacity-70 leading-relaxed">
              By using Arthwise's website and mobile application, you acknowledge that you have read, understood, 
              and agree to be bound by this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;
