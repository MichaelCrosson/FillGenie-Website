import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';

export const Terms: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-text-muted mb-4">
            Last Updated: December 14, 2024
          </p>
          <p className="text-lg text-text-muted">
            Please read these Terms of Service carefully before using FillFlow. By accessing or using our service, 
            you agree to be bound by these terms.
          </p>
        </div>
      </Section>

      {/* Main Content */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-text-muted">
              By creating an account or using FillFlow, you agree to these Terms of Service and our Privacy Policy. 
              If you do not agree, you may not use the service. These terms constitute a legally binding agreement between 
              you and FillFlow.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              2. Description of Service
            </h2>
            <p className="text-text-muted mb-3">
              FillFlow is a browser extension and web service that uses AI to automatically fill online forms using 
              information from documents you upload. The service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-muted ml-4">
              <li>Document upload and secure storage</li>
              <li>AI-powered extraction of information from documents</li>
              <li>Automatic form filling based on extracted data</li>
              <li>Confidence scoring and review interfaces</li>
            </ul>
            <p className="text-text-muted mt-3">
              We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              3. Account Registration and Eligibility
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">Age Requirement:</strong> You must be at least 18 years old to use FillFlow.</p>
              <p><strong className="text-text-main">Account Information:</strong> You agree to provide accurate, current, and complete information during registration and to keep it updated.</p>
              <p><strong className="text-text-main">Account Security:</strong> You are responsible for maintaining the confidentiality of your password and account. You agree to notify us immediately of any unauthorized access.</p>
              <p><strong className="text-text-main">One Account Per User:</strong> You may not create multiple accounts or share accounts with others.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              4. Acceptable Use
            </h2>
            <p className="text-text-muted mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-text-muted ml-4">
              <li>Use the service for any illegal purpose or to violate any laws</li>
              <li>Upload documents you don't own or have permission to use</li>
              <li>Fill forms fraudulently or with false information</li>
              <li>Attempt to bypass security measures or access other users' data</li>
              <li>Reverse engineer, decompile, or extract the source code of our software</li>
              <li>Use the service to send spam or engage in phishing</li>
              <li>Overload our systems through excessive automated requests</li>
              <li>Resell or redistribute the service without permission</li>
            </ul>
            <p className="text-text-muted mt-3">
              Violation of these terms may result in immediate account termination.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              5. Your Content and Data
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">Ownership:</strong> You retain all ownership rights to the documents and data you upload. We claim no ownership over your content.</p>
              <p><strong className="text-text-main">License to Use:</strong> By uploading content, you grant us a limited license to store, process, and use your documents solely for the purpose of providing the FillFlow service to you.</p>
              <p><strong className="text-text-main">Responsibility:</strong> You are solely responsible for the accuracy, legality, and appropriateness of the content you upload and the forms you fill.</p>
              <p><strong className="text-text-main">Prohibited Content:</strong> You may not upload content that is illegal, infringes on others' rights, contains malware, or violates our policies.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              6. Payment and Subscriptions
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">Free Plan:</strong> FillFlow offers a free plan with limited features. No payment information is required for the free plan.</p>
              <p><strong className="text-text-main">Paid Plans:</strong> Premium and Enterprise plans require payment. By subscribing, you authorize us to charge your payment method on a recurring basis.</p>
              <p><strong className="text-text-main">Billing:</strong> Subscriptions are billed in advance on a monthly or annual basis. Prices are subject to change with 30 days' notice.</p>
              <p><strong className="text-text-main">Cancellation:</strong> You may cancel your subscription at any time. You'll retain access until the end of your billing period. No refunds for partial months.</p>
              <p><strong className="text-text-main">Refunds:</strong> We offer a 14-day money-back guarantee for Premium plans. Contact us at FillFlow@gmail.com to request a refund.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              7. Disclaimers and Limitations
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">No Warranty:</strong> FillFlow is provided "as is" without warranties of any kind. We do not guarantee that the service will be error-free, secure, or continuously available.</p>
              <p><strong className="text-text-main">Accuracy:</strong> While we strive for accuracy, AI-based form filling may contain errors. You are responsible for reviewing all filled information before submitting forms.</p>
              <p><strong className="text-text-main">Third-Party Sites:</strong> We are not responsible for the content, policies, or practices of third-party websites where you use FillFlow.</p>
              <p><strong className="text-text-main">Limitation of Liability:</strong> To the maximum extent permitted by law, FillFlow and its team shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the service.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              8. Indemnification
            </h2>
            <p className="text-text-muted">
              You agree to indemnify and hold FillFlow harmless from any claims, losses, liabilities, and expenses 
              (including legal fees) arising from your use of the service, your violation of these terms, or your 
              violation of any rights of another person or entity.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              9. Termination
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">By You:</strong> You may terminate your account at any time by deleting it through your account settings or emailing us.</p>
              <p><strong className="text-text-main">By Us:</strong> We reserve the right to suspend or terminate your account if you violate these terms, engage in fraudulent activity, or for any other reason at our discretion.</p>
              <p><strong className="text-text-main">Effect of Termination:</strong> Upon termination, your right to use the service ceases immediately. Your data will be deleted according to our Privacy Policy.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-text-muted">
              We may modify these Terms of Service at any time. We'll notify you of material changes via email and by 
              updating the "Last Updated" date. Continued use after changes constitutes acceptance. If you disagree with 
              the new terms, you must stop using the service and may delete your account.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              11. Governing Law and Disputes
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">Governing Law:</strong> These terms are governed by the laws of the United States and the state where FillFlow is registered, without regard to conflict of law principles.</p>
              <p><strong className="text-text-main">Dispute Resolution:</strong> Any disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be settled through binding arbitration.</p>
              <p><strong className="text-text-main">Class Action Waiver:</strong> You agree to resolve disputes individually and waive the right to participate in class actions or collective proceedings.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              12. Miscellaneous
            </h2>
            <div className="space-y-3 text-text-muted">
              <p><strong className="text-text-main">Entire Agreement:</strong> These terms, together with our Privacy Policy, constitute the entire agreement between you and FillFlow.</p>
              <p><strong className="text-text-main">Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
              <p><strong className="text-text-main">No Waiver:</strong> Our failure to enforce any right or provision does not constitute a waiver of that right.</p>
              <p><strong className="text-text-main">Assignment:</strong> You may not assign these terms without our written consent. We may assign our rights to any successor or affiliate.</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-text-main mb-4">
              13. Contact Information
            </h2>
            <p className="text-text-muted mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="text-text-muted">
              <p><strong className="text-text-main">Email:</strong> <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline">FillFlow@gmail.com</a></p>
              <p className="mt-2"><strong className="text-text-main">Response Time:</strong> We aim to respond to inquiries within 48 hours.</p>
            </div>
          </Card>

        </div>
      </Section>
    </div>
  );
};
