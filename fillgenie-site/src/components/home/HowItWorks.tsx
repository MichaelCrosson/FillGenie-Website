import React from 'react';
import { Section } from '../common/Section';
import { Button } from '../common/Button';
import { ArrowUpTrayIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: ArrowUpTrayIcon,
      title: 'Upload your documents',
      description: 'Add PDFs, receipts, resumes, or forms you\'ve filled before. FillFlow learns from your data.',
    },
    {
      number: '2',
      icon: GlobeAltIcon,
      title: 'Open any form',
      description: 'Works on any website—HR portals, job sites, government forms, expense systems. No integrations needed.',
    },
    {
      number: '3',
      icon: SparklesIcon,
      title: 'FillFlow fills it for you',
      description: 'Click the extension, describe what you need, and watch it populate. Review, edit if needed, and submit.',
    },
  ];

  return (
    <Section background="white" id="how-it-works" className="py-6 sm:py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-3">
          Three steps to never copy-paste again
        </h2>

        <div className="mt-8 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Step number circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sunlit-amber text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-lavender-mist bg-opacity-20 p-4 rounded-full">
                  <step.icon className="w-8 h-8 text-sunlit-amber" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-text-main mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-lavender-mist">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-lavender-mist"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="primary" size="lg" to="/coming-soon">
            Get Started Free
          </Button>
        </div>
      </div>
    </Section>
  );
};