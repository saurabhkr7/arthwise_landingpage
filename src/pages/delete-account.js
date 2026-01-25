import React, { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/delete-account.module.css';

export default function DeleteAccount() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Delete Your Arthwise Account - Data Deletion Guide</title>
        <meta name="description" content="Learn how to delete your Arthwise account and all your personal data. Complete guide with step-by-step instructions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Delete Your Arthwise Account" />
        <meta property="og:description" content="Complete account deletion guide for Arthwise app." />
      </Head>

      <main className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Delete Your Arthwise Account</h1>
            <p className={styles.subtitle}>
              We respect your choice. Here's how to delete your account and all associated data.
            </p>
          </div>
        </header>

        <div className={styles.content}>
          {/* Quick Links */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Access</h2>
            <div className={styles.quickLinks}>
              <a href="#mobile-steps" className={styles.quickLink}>
                📱 Mobile App
              </a>
              <a href="#email-request" className={styles.quickLink}>
                ✉️ Email Request
              </a>
              <a href="#what-gets-deleted" className={styles.quickLink}>
                📋 What Gets Deleted
              </a>
            </div>
          </section>

          {/* Mobile App Steps */}
          <section className={styles.section} id="mobile-steps">
            <h2 className={styles.sectionTitle}>🚀 Delete via Arthwise Mobile App (Easiest)</h2>
            <p className={styles.sectionDescription}>
              The fastest and most secure way to delete your account is directly through the Arthwise app.
            </p>

            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Open the Arthwise App</h3>
                  <p>Launch the Arthwise app on your mobile device (iOS or Android).</p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Go to Settings</h3>
                  <p>
                    Open the menu drawer and navigate to <strong>Settings/Configuration</strong> (gear icon).
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Select Account & Data</h3>
                  <p>
                    In the Settings screen, scroll to the <strong>"About & Support"</strong> section and tap <strong>"Account & Data"</strong>.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Click Delete Account</h3>
                  <p>
                    Scroll to the bottom and tap the red <strong>"Delete My Account"</strong> button.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3>Review & Confirm</h3>
                  <p>
                    Read what will be deleted, enter your password, and confirm. Your account will be permanently deleted.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>6</div>
                <div className={styles.stepContent}>
                  <h3>Check Your Email</h3>
                  <p>
                    A confirmation email will be sent to your registered email address within 2 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.infoBox} style={{ backgroundColor: '#E8F4F8', borderLeft: '4px solid #0066CC' }}>
              <strong>✓ Recommended Method:</strong> This is the fastest and most secure way. Your account is deleted immediately and all data is purged from our servers within 30 days.
            </div>
          </section>

          {/* Email Request */}
          <section className={styles.section} id="email-request">
            <h2 className={styles.sectionTitle}>✉️ Delete via Email Request</h2>
            <p className={styles.sectionDescription}>
              If you can't access the app or prefer to request deletion via email:
            </p>

            <div className={styles.emailBox}>
              <p>Send an email to:</p>
              <div className={styles.emailDisplay}>
                <code>delete-account@arthwise.com</code>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard('delete-account@arthwise.com')}
                  title="Copy email address"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <p style={{ marginTop: '16px' }}>Include in your email:</p>
              <ul className={styles.checklist}>
                <li>Your registered email address</li>
                <li>Your username (if you remember it)</li>
                <li>A clear statement: "I request permanent deletion of my Arthwise account and all associated data"</li>
              </ul>

              <p style={{ marginTop: '16px' }}>
                <strong>Response Time:</strong> You'll receive a confirmation email within 24 hours. Deletion is processed within 30 days.
              </p>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section className={styles.section} id="what-gets-deleted">
            <h2 className={styles.sectionTitle}>📋 What Gets Deleted</h2>

            <div className={styles.twoColumn}>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>✅ Permanently Deleted</h3>
                <ul className={styles.dataList}>
                  <li>Your user account & profile</li>
                  <li>Email address & password</li>
                  <li>Profile picture & bio</li>
                  <li>All articles & blog posts</li>
                  <li>All comments you wrote</li>
                  <li>All direct messages & conversations</li>
                  <li>Trading portfolio & history</li>
                  <li>Orders & transactions (except for legal records)</li>
                  <li>Contest participation records</li>
                  <li>Course progress & learning records</li>
                  <li>Follower/following relationships</li>
                  <li>Wallet balance & credits</li>
                  <li>Personal preferences & settings</li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3 className={styles.columnTitle}>📅 Retained (Legal Requirement)</h3>
                <ul className={styles.retentionList}>
                  <li>
                    <strong>Payment Records</strong>
                    <br />
                    <span className={styles.retentionNote}>Retained for 7 years per tax compliance laws. Cannot be linked to your identity after deletion.</span>
                  </li>
                  <li>
                    <strong>Anonymized Analytics</strong>
                    <br />
                    <span className={styles.retentionNote}>Usage statistics that cannot identify you personally. Helps us improve the app.</span>
                  </li>
                  <li>
                    <strong>Backup Copies</strong>
                    <br />
                    <span className={styles.retentionNote}>Automatic backups purged within 30 days. Part of disaster recovery only.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>⏱️ Deletion Timeline</h2>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>Immediate</div>
                <div className={styles.timelineContent}>
                  <strong>Account Deleted</strong>
                  <p>Your account is removed from our systems immediately. You can no longer login.</p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>1-2 Hours</div>
                <div className={styles.timelineContent}>
                  <strong>Confirmation Email Sent</strong>
                  <p>You'll receive an email confirming your account has been deleted.</p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>24 Hours</div>
                <div className={styles.timelineContent}>
                  <strong>Cache Cleared</strong>
                  <p>All temporary cached data is removed. Your profile won't appear in searches.</p>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>30 Days</div>
                <div className={styles.timelineContent}>
                  <strong>Backups Purged</strong>
                  <p>All backup copies of your data are permanently deleted. Data is now unrecoverable.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Important Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>⚠️ Important Information</h2>

            <div className={styles.importantBox}>
              <h3>Account Deletion is Permanent</h3>
              <p>
                Once you delete your account, it <strong>cannot be recovered</strong>. We do not maintain restorable backups of deleted accounts. Make sure you want to delete before confirming.
              </p>
            </div>

            <div className={styles.importantBox}>
              <h3>Content Attribution</h3>
              <p>
                Articles and posts you created may still appear in feeds attributed to "Deleted User" for context. The content itself is deleted, but historical references may remain for a short period.
              </p>
            </div>

            <div className={styles.importantBox}>
              <h3>Related Accounts</h3>
              <p>
                If you signed up with Google OAuth, deleting your Arthwise account does <strong>not</strong> delete your Google account. You'll need to manage that separately in Google Settings.
              </p>
            </div>

            <div className={styles.importantBox}>
              <h3>No Recovery After 48 Hours</h3>
              <p>
                Deletion requests cannot be reversed after 48 hours. Contact support immediately if you change your mind.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>❓ Frequently Asked Questions</h2>

            <div className={styles.faqContainer}>
              <details className={styles.faqItem}>
                <summary>Can I recover my account after deletion?</summary>
                <p>No. Account deletion is permanent and irreversible after 48 hours. If you change your mind, contact support@arthwise.com immediately.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>How long does deletion take?</summary>
                <p>Immediate from the live system (1-2 hours), but full data purging including backups takes up to 30 days per our backup retention policy.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>Will my posts and comments be deleted?</summary>
                <p>Yes, all your posts, articles, and comments are deleted. They won't appear in feeds or search results after deletion.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>What about my payment history?</summary>
                <p>Payment records are retained for 7 years per tax law requirements. They are stored separately and cannot be linked to your personal identity.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>Can I delete specific data without deleting my account?</summary>
                <p>Yes! In the app, go to Account & Data and select "Delete Specific Data" to remove articles, messages, or portfolio data without removing your account.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>Will my data be visible on the internet after deletion?</summary>
                <p>Your data will be removed from Arthwise servers and your account won't be searchable. However, Google's indexing may take time to update (typically 1-2 weeks).</p>
              </details>

              <details className={styles.faqItem}>
                <summary>Do I need to confirm my password?</summary>
                <p>Yes. For security, we require password confirmation when deleting your account via the app. This prevents unauthorized account deletion.</p>
              </details>

              <details className={styles.faqItem}>
                <summary>What if I forgot my password?</summary>
                <p>Use the "Forgot Password" feature to reset it first, then proceed with account deletion. Or email delete-account@arthwise.com with your request.</p>
              </details>
            </div>
          </section>

          {/* Support */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🆘 Need Help?</h2>

            <div className={styles.supportGrid}>
              <div className={styles.supportCard}>
                <h3>Account Deletion</h3>
                <p>For deletion requests or if you have issues deleting your account:</p>
                <a href="mailto:delete-account@arthwise.com" className={styles.emailLink}>
                  delete-account@arthwise.com
                </a>
              </div>

              <div className={styles.supportCard}>
                <h3>Deletion Support</h3>
                <p>If your deletion didn't complete or you have questions:</p>
                <a href="mailto:delete-support@arthwise.com" className={styles.emailLink}>
                  delete-support@arthwise.com
                </a>
              </div>

              <div className={styles.supportCard}>
                <h3>Privacy Questions</h3>
                <p>General privacy and data protection inquiries:</p>
                <a href="mailto:privacy@arthwise.com" className={styles.emailLink}>
                  privacy@arthwise.com
                </a>
              </div>

              <div className={styles.supportCard}>
                <h3>GDPR/Legal</h3>
                <p>Data protection officer for EU regulations:</p>
                <a href="mailto:dpo@arthwise.com" className={styles.emailLink}>
                  dpo@arthwise.com
                </a>
              </div>
            </div>
          </section>

          {/* Links to Policies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📄 Learn More</h2>
            <div className={styles.policyLinks}>
              <a href="/privacy-policy" className={styles.policyLink}>
                🔒 Privacy Policy
              </a>
              <a href="/data-deletion-policy" className={styles.policyLink}>
                📋 Data Deletion Policy
              </a>
              <a href="/terms-of-service" className={styles.policyLink}>
                ⚖️ Terms of Service
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            <strong>Arthwise</strong> is committed to protecting your privacy and giving you control over your data.
          </p>
          <p style={{ fontSize: '14px', marginTop: '12px', opacity: 0.8 }}>
            Last updated: January 2026 | Compliant with GDPR, CCPA, and Google Play Store requirements
          </p>
        </footer>
      </main>
    </>
  );
}
