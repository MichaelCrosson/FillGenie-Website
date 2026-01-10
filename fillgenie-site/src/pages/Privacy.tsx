import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';

export const Privacy: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-text-muted mb-4">
            Last Updated: December 14, 2024
          </p>
          <p className="text-lg text-text-muted">
            FillFlow is committed to protecting your privacy. This policy explains how we collect, 
            use, and safeguard your personal information.
          </p>
        </div>
      </Section>

      {/* Main Content */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-text-muted">
              <div>
                <h3 className="font-semibold text-text-main mb-2">Account Information</h3>
                <p>When you create an account, we collect your email address and password (encrypted). This is required to provide you with access to your account and to communicate with you about the service.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-main mb-2">Uploaded Documents</h3>
                <p>We store the documents you upload to use for form filling. These documents are encrypted and accessible only to you. We do not view, analyze, or use your documents for any purpose other than providing the service you request.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-main mb-2">Usage Information</h3>
                <p>We collect basic usage data such as which features you use, forms filled, and error logs to improve our service. This data is anonymized and aggregated.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-main mb-2">Technical Information</h3>
                <p>We automatically collect browser type, IP address, device information, and cookies to ensure the service functions properly and to detect security issues.</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-text-muted list-disc list-inside">
              <li>To provide and maintain the FillFlow service</li>
              <li>To fill forms with data from your uploaded documents when you request</li>
              <li>To communicate with you about your account, updates, and support</li>
              <li>To improve our service through aggregated, anonymized usage analytics</li>
              <li>To detect and prevent fraud, security incidents, and technical issues</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              How We Protect Your Information
            </h2>
            <div className="space-y-3 text-text-muted">
              <p>
                <strong className="text-text-main">Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
              </p>
              <p>
                <strong className="text-text-main">Access Controls:</strong> Only you can access your documents. Our team cannot view your uploaded files.
              </p>
              <p>
                <strong className="text-text-main">Secure Infrastructure:</strong> We use enterprise-grade cloud infrastructure with regular security audits.
              </p>
              <p>
                <strong className="text-text-main">Data Minimization:</strong> We collect only what's necessary to provide the service.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Information Sharing and Disclosure
            </h2>
            <div className="space-y-3 text-text-muted">
              <p className="font-semibold text-text-main">We do NOT sell your data. Ever.</p>
              <p>We may share your information only in these limited circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-text-main">Service Providers:</strong> Trusted third-party services (hosting, email, payment processing) who are contractually bound to protect your data and use it only for providing services to us.</li>
                <li><strong className="text-text-main">Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety.</li>
                <li><strong className="text-text-main">Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred. You'll be notified and have the option to delete your account.</li>
                <li><strong className="text-text-main">With Your Consent:</strong> We'll ask for explicit permission before sharing your data for any other reason.</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Your Privacy Rights
            </h2>
            <div className="space-y-3 text-text-muted">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-text-main">Access:</strong> Request a copy of all data we have about you</li>
                <li><strong className="text-text-main">Correction:</strong> Update or correct inaccurate information</li>
                <li><strong className="text-text-main">Deletion:</strong> Delete your account and all associated data at any time</li>
                <li><strong className="text-text-main">Export:</strong> Download your documents and data in a portable format</li>
                <li><strong className="text-text-main">Opt-Out:</strong> Unsubscribe from marketing emails (account-related emails are required)</li>
                <li><strong className="text-text-main">Object:</strong> Object to certain data processing activities</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, email us at <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline">FillFlow@gmail.com</a>
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Data Retention
            </h2>
            <p className="text-text-muted">
              We retain your account data and uploaded documents as long as your account is active. When you delete your account, 
              all your data is permanently removed from our systems within 30 days. Backup copies are deleted within 90 days. 
              We may retain anonymized usage data for analytics purposes.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-text-muted mb-3">
              We use cookies to maintain your session, remember your preferences, and analyze site usage. We use:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-muted ml-4">
              <li><strong className="text-text-main">Essential Cookies:</strong> Required for the service to function (login, security)</li>
              <li><strong className="text-text-main">Analytics Cookies:</strong> Help us understand how users interact with our service (anonymized)</li>
            </ul>
            <p className="text-text-muted mt-3">
              You can disable cookies in your browser settings, but this may limit functionality.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Children's Privacy
            </h2>
            <p className="text-text-muted">
              FillFlow is not intended for users under 18 years old. We do not knowingly collect data from children. 
              If you believe we've collected information from a child, please contact us immediately at FillFlow@gmail.com.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              International Data Transfers
            </h2>
            <p className="text-text-muted">
              Your data may be processed and stored in the United States or other countries where our service providers operate. 
              We ensure appropriate safeguards are in place to protect your data regardless of location, in compliance with GDPR 
              and other applicable laws.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Changes to This Policy
            </h2>
            <p className="text-text-muted">
              We may update this Privacy Policy from time to time. We'll notify you of material changes via email and by updating 
              the "Last Updated" date at the top of this page. Continued use of FillFlow after changes constitutes acceptance 
              of the updated policy. If you disagree with changes, you may delete your account.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              Contact Us
            </h2>
            <p className="text-text-muted mb-4">
              If you have questions or concerns about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="text-text-muted">
              <p><strong className="text-text-main">Email:</strong> <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline">FillFlow@gmail.com</a></p>
              <p className="mt-2"><strong className="text-text-main">Response Time:</strong> We aim to respond to privacy inquiries within 48 hours.</p>
            </div>
          </Card>

        </div>
      </Section>
    </div>
  );
};
