import React from 'react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { StarIcon } from '@heroicons/react/24/solid';

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      quote: 'FillFlow has helped streamline our employee onboarding process. We\'ve seen measurable time savings.',
      role: 'HR Analyst',
      rating: 5,
    },
    {
      quote: 'As a student applying to multiple opportunities, this tool has been helpful for managing repetitive forms.',
      role: 'UT Austin Student',
      rating: 5,
    },
    {
      quote: 'Our finance team has found FillFlow useful for handling expense reports more efficiently.',
      role: 'Finance Analyst',
      rating: 5,
    },
  ];

  return (
    <Section background="warm-sand" id="testimonials" className="py-6 sm:py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-6">
          Trusted by professionals who value their time
        </h2>
        
        <p className="text-center text-text-muted mb-8 max-w-2xl mx-auto">
          Currently piloting with HR teams, finance professionals, and students.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-sunlit-amber" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-muted italic mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
