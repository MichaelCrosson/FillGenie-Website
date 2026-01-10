import React from 'react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

export const TrustSafety: React.FC = () => {
  const trustElements = [
    {
      icon: ShieldCheckIcon,
      title: 'Privacy by design',
      description: 'Your documents are encrypted and stored securely. We never share or sell your data.',
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Isolated storage',
      description: 'Each user gets their own secure space. Your information never mixes with others.',
    },
    {
      icon: UserCircleIcon,
      title: 'You choose what to share',
      description: 'Control exactly which documents FillFlow can access. Delete your data anytime.',
    },
    {
      icon: CheckBadgeIcon,
      title: 'Enterprise-grade security',
      description: 'Built with the same standards used by financial institutions.',
    },
  ];

  return (
    <Section background="lavender-mist" id="security" className="py-6 sm:py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-6">
          Your data, your control
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustElements.map((element, index) => (
            <div key={index}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-teal-softwave p-3 rounded-lg">
                      <element.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main mb-2">
                      {element.title}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {element.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button variant="text" href="/security">
            Read our Security Practices →
          </Button>
        </div>
      </div>
    </Section>
  );
};
