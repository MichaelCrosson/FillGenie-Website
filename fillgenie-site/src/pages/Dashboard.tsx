import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { DocumentIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-warm-sand">
      <Section background="white" className="py-12 sm:py-16">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-main mb-2">
              Welcome back{user?.full_name ? `, ${user.full_name}` : ''}!
            </h1>
            <p className="text-lg text-text-muted">
              Your FillFlow dashboard is coming soon
            </p>
          </div>

          {/* User Info Card */}
          <Card className="mb-8 bg-lavender-mist">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-text-main mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-text-main">Email:</span>
                  <span className="ml-2 text-text-muted">{user?.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-text-main">User ID:</span>
                  <span className="ml-2 text-text-muted font-mono text-xs">{user?.id}</span>
                </div>
                {user?.s3_bucket_prefix && (
                  <div>
                    <span className="font-semibold text-text-main">S3 Prefix:</span>
                    <span className="ml-2 text-text-muted font-mono text-xs">{user.s3_bucket_prefix}</span>
                  </div>
                )}
                {user?.pinecone_namespace && (
                  <div>
                    <span className="font-semibold text-text-main">Pinecone Namespace:</span>
                    <span className="ml-2 text-text-muted font-mono text-xs">{user.pinecone_namespace}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Coming Soon Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="flex flex-col items-center">
                <div className="bg-teal-softwave p-4 rounded-full mb-4">
                  <DocumentIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  Document Management
                </h3>
                <p className="text-text-muted text-sm">
                  Upload, view, and manage your documents stored in AWS S3
                </p>
                <span className="mt-4 inline-block px-3 py-1 bg-sunlit-amber text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </Card>

            <Card className="text-center">
              <div className="flex flex-col items-center">
                <div className="bg-lavender-mist p-4 rounded-full mb-4">
                  <ChartBarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  Usage Analytics
                </h3>
                <p className="text-text-muted text-sm">
                  Track your form fills, document usage, and storage metrics
                </p>
                <span className="mt-4 inline-block px-3 py-1 bg-sunlit-amber text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </Card>

            <Card className="text-center">
              <div className="flex flex-col items-center">
                <div className="bg-sunlit-amber p-4 rounded-full mb-4">
                  <Cog6ToothIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  Account Settings
                </h3>
                <p className="text-text-muted text-sm">
                  Manage your subscription, preferences, and security settings
                </p>
                <span className="mt-4 inline-block px-3 py-1 bg-sunlit-amber text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </span>
              </div>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mt-8 bg-warm-sand">
            <h2 className="text-2xl font-bold text-text-main mb-4">Get Started with FillFlow</h2>
            <div className="space-y-3 text-text-muted">
              <div className="flex items-start gap-3">
                <span className="text-sunlit-amber font-bold text-xl">1.</span>
                <div>
                  <p className="font-semibold text-text-main">Install the Chrome Extension</p>
                  <p className="text-sm">Download from the Chrome Web Store to start auto-filling forms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sunlit-amber font-bold text-xl">2.</span>
                <div>
                  <p className="font-semibold text-text-main">Upload Your Documents</p>
                  <p className="text-sm">Use the extension or dashboard to upload PDFs, resumes, and other documents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sunlit-amber font-bold text-xl">3.</span>
                <div>
                  <p className="font-semibold text-text-main">Start Filling Forms</p>
                  <p className="text-sm">Navigate to any web form and click the FillFlow extension to auto-fill</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/faq"
                className="inline-block bg-sunlit-amber text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
};
