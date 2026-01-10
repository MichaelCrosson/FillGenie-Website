import React from 'react';
import { Section } from '../common/Section';
import { Card } from '../common/Card';
import {
  PuzzlePieceIcon,
  FolderIcon,
  LightBulbIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const Differentiators: React.FC = () => {
  const features = [
    {
      icon: PuzzlePieceIcon,
      title: 'Works everywhere',
      description: 'No integrations, no API setup, no software installs. Works on any website with forms.',
    },
    {
      icon: FolderIcon,
      title: 'Uses your existing data',
      description: 'Upload documents you already have—FillFlow understands context and pulls the right information.',
    },
    {
      icon: LightBulbIcon,
      title: 'Smart, not just fast',
      description: 'Matches fields intelligently. Shows confidence scores so you know what to review.',
    },
    {
      icon: LockClosedIcon,
      title: 'You stay in control',
      description: 'Review every field before submitting. FillFlow suggests, you approve.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'No complex setup',
      description: 'Install the extension, upload a few docs, start saving time. No training required.',
    },
    {
      icon: UserIcon,
      title: 'Built for humans',
      description: 'Reduces cognitive load and errors. Lets you focus on decisions, not data entry.',
    },
  ];

  return (
    <Section background="white" id="differentiators" className="py-6 sm:py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-4">
          Form filling that fits your workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div key={index}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-sunlit-amber to-lavender-mist p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-text-muted italic">
            Powered by AI that understands context—but you're always in charge.
          </p>
        </div>
      </div>
    </Section>
  );
};
