import React from 'react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { ArrowPathIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: ArrowPathIcon,
      title: 'Re-entering the same information is exhausting',
    },
    {
      icon: ClockIcon,
      title: 'Admin work slows down real work',
    },
    {
      icon: ExclamationTriangleIcon,
      title: 'Manual entry creates errors',
    },
  ];

  return (
    <Section background="warm-sand" id="problems" className="py-6 sm:py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-6">
          Forms shouldn't feel like data entry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div key={index}>
              <Card className="h-full text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-sunlit-amber bg-opacity-10 p-4 rounded-full">
                    <problem.icon className="w-10 h-10 text-sunlit-amber" />
                  </div>
                </div>
                <h3 className="text-lg text-text-main">
                  {problem.title}
                </h3>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
