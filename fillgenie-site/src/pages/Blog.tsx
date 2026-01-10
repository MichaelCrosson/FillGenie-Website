import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { 
  DocumentTextIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export const Blog: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            FillFlow Blog
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Insights on automation, productivity, and the future of form filling.
          </p>
        </div>
      </Section>

      {/* Coming Soon Content */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Card>
            <div className="flex flex-col items-center py-8">
              <div className="bg-lavender-mist bg-opacity-20 p-6 rounded-full mb-6">
                <DocumentTextIcon className="w-16 h-16 text-lavender-mist" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-4">
                Articles Coming Soon
              </h2>
              <p className="text-text-muted mb-6 max-w-xl">
                We're working on helpful content about form automation, productivity tips, 
                and how to make the most of FillFlow. Check back soon for our first posts!
              </p>
              <div className="flex items-center gap-2 text-text-muted">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm">New articles publishing soon</span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Newsletter Signup (Optional) */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">
            Get Notified
          </h2>
          <p className="text-lg text-text-muted mb-6">
            Want to know when we publish new articles? Drop us a line at{' '}
            <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline font-semibold">
              FillFlow@gmail.com
            </a>
          </p>
        </div>
      </Section>
    </div>
  );
};
