import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { ShieldCheckIcon, LockClosedIcon, ServerIcon, KeyIcon, EyeSlashIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

export const Security: React.FC = () => {
  const securityMeasures = [
    {
      icon: LockClosedIcon,
      title: 'End-to-End Encryption',
      description: 'All documents and data are encrypted both in transit (TLS 1.3) and at rest (AES-256). Your information is unreadable to anyone without proper authorization.',
    },
    {
      icon: ServerIcon,
      title: 'Secure Cloud Infrastructure',
      description: 'We use enterprise-grade cloud infrastructure with automatic backups, redundancy, and 99.9% uptime. Your data is stored in secure, geographically distributed data centers.',
    },
    {
      icon: KeyIcon,
      title: 'Access Controls',
      description: 'Multi-factor authentication (MFA), role-based access controls, and session management ensure only you can access your account and documents.',
    },
    {
      icon: EyeSlashIcon,
      title: 'Privacy by Design',
      description: 'We collect only the minimum data necessary to provide our service. We never sell, share, or use your documents for any purpose other than filling forms at your request.',
    },
    {
      icon: DocumentCheckIcon,
      title: 'Data Retention Controls',
      description: 'You have complete control over your data. Delete individual documents or your entire account at any time. Deleted data is permanently removed from our systems within 30 days.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Regular Security Audits',
      description: 'We conduct regular security assessments, penetration testing, and code reviews to identify and address potential vulnerabilities before they become issues.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Security & Data Protection
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Your trust is our priority. We've built FillGenie with enterprise-grade security 
            to protect your sensitive documents and personal information.
          </p>
        </div>
      </Section>

      {/* Security Measures */}
      <Section background="white" className="py-12 sm:py-16">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-10">
            How We Protect Your Data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMeasures.map((measure, index) => (
              <Card key={index} className="h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-teal-softwave p-4 rounded-full mb-4">
                    <measure.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">
                    {measure.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {measure.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* What We Don't Do */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-8">
            Our Commitments to You
          </h2>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-bold text-text-main mb-2">
                We Never Sell Your Data
              </h3>
              <p className="text-text-muted">
                Your documents and personal information will never be sold to third parties, used for advertising, 
                or shared with anyone without your explicit consent.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text-main mb-2">
                We Don't Train AI on Your Documents
              </h3>
              <p className="text-text-muted">
                Your uploaded documents are used solely to fill forms you request. We do not use your data to train 
                our AI models or for any other purpose.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text-main mb-2">
                Minimal Data Collection
              </h3>
              <p className="text-text-muted">
                We only collect what's necessary to provide our service: your email, the documents you upload, 
                and basic usage information to improve functionality.
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-text-main mb-2">
                No Surprise Policy Changes
              </h3>
              <p className="text-text-muted">
                We'll notify you via email before making any material changes to our security practices or privacy policy. 
                You'll always have the option to delete your data if you disagree.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Questions Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">
            Questions About Security?
          </h2>
          <p className="text-lg text-text-muted mb-6">
            We're happy to answer any questions about how we protect your data.
          </p>
          <a
            href="mailto:fillgenie@gmail.com"
            className="inline-block px-6 py-3 bg-sunlit-amber text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Contact Security Team
          </a>
        </div>
      </Section>
    </div>
  );
};
