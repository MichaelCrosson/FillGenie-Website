import React from 'react';
import { Button } from '../common/Button';
import { CheckCircleIcon, LockClosedIcon, BoltIcon } from '@heroicons/react/24/outline';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-warm-sand to-white overflow-hidden">
      <div className="section-container py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-4 leading-tight">
              Stop filling out forms. Start getting work done.
            </h1>
            
            <p className="text-lg sm:text-xl text-text-muted mb-6 max-w-2xl">
              FillFlow uses your existing documents to complete forms in seconds so hours of busywork disappear every week.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Button variant="primary" size="lg" to="/coming-soon">
                Try for Free
              </Button>
              <Button variant="secondary" size="lg" href="/#how-it-works">
                See How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-text-muted justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <LockClosedIcon className="w-5 h-5 text-teal-softwave" />
                <span>Your data stays private</span>
              </div>
              <div className="flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-sunlit-amber" />
                <span>Works in &lt;10 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-teal-softwave" />
                <span>99% accuracy</span>
              </div>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-lavender-mist border-opacity-30">
              <div className="aspect-video bg-gradient-to-br from-lavender-mist to-teal-softwave rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-semibold">Product Demo Video</p>
                  <p className="text-sm opacity-80 mt-2">Watch forms fill automatically</p>
                </div>
              </div>
              <p className="text-center text-text-muted text-sm mt-4">
                [Animated demo showing browser with form being auto-filled, 
                fields populating smoothly, confidence scores appearing]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};