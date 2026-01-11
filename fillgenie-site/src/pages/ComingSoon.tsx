import React from 'react';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { WaitlistForm } from '../components/waitlist/WaitlistForm';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

export const ComingSoon: React.FC = () => {
  return (
    <Section background="warm-sand" className="min-h-[80vh] flex items-center py-12 sm:py-16">
      <div className="text-center w-full">
        <div className="mb-8">
          <RocketLaunchIcon className="w-24 h-24 mx-auto text-sunlit-amber" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
          Chrome Extension Coming Soon!
        </h1>
        
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          We're putting the finishing touches on the FillFlow Chrome extension. 
          Sign up to be notified when it launches!
        </p>

        <div className="mb-8">
          <WaitlistForm />
        </div>

        <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-text-main mb-4">
            What to expect:
          </h2>
          <ul className="text-left text-text-muted space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-teal-softwave">✓</span>
              <span>One-click form filling on any website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-softwave">✓</span>
              <span>Smart document matching with confidence scores</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-softwave">✓</span>
              <span>Secure, encrypted storage of your documents</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-softwave">✓</span>
              <span>Free plan with 10 documents and unlimited forms</span>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <Button variant="text" to="/">
            ← Back to Home
          </Button>
        </div>3
      </div>
    </Section>
  );
};
