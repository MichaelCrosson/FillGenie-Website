import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { 
  LightBulbIcon,
  RocketLaunchIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export const About: React.FC = () => {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI to solve real problems and make automation accessible to everyone.',
    },
    {
      icon: HeartIcon,
      title: 'User-First',
      description: 'Every feature we build starts with understanding what frustrates our users and how we can help.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Simplicity',
      description: 'Powerful automation shouldn\'t be complicated. We make it simple so you can focus on what matters.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            About FillFlow
          </h1>
          <p className="text-xl text-text-muted mb-8">
            We're on a mission to eliminate tedious form filling and give you back hours every week.
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-8">
            Our Story
          </h2>
          <Card className="mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-muted leading-relaxed mb-4">
                FillFlow was born from frustration. After spending countless hours filling out repetitive 
                forms—job applications, government paperwork, medical intake forms—we realized there had to 
                be a better way.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Traditional form fillers just weren't smart enough. They'd fumble with field recognition, 
                require complex setup, or only work on specific websites. We knew AI could do better.
              </p>
              <p className="text-text-muted leading-relaxed">
                So we built FillFlow: an intelligent form-filling assistant that actually understands forms, 
                learns from context, and works everywhere. What used to take 10 minutes now takes seconds. 
                What used to be error-prone is now accurate. What used to be frustrating is now effortless.
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-lavender-mist to-teal-softwave bg-opacity-10">
            <h3 className="text-2xl font-bold text-text-main mb-4">
              Beyond the Extension
            </h3>
            <p className="text-text-muted leading-relaxed">
              While FillFlow started as a Chrome extension for individuals, we've expanded to solve unique 
              automation challenges for enterprises. From building BottleVision for Kaiser Permanente—using 
              OCR and AI to extract prescription information from pill bottles—to creating custom pipelines 
              for HR, finance, and healthcare workflows, we're pushing the boundaries of what's possible with 
              intelligent automation.
            </p>
          </Card>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-10">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-sunlit-amber bg-opacity-20 p-4 rounded-full mb-4">
                    <value.icon className="w-10 h-10 text-sunlit-amber" />
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-muted">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-text-muted mb-8">
            Have questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-sunlit-amber text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Contact Us
            </a>
            <a
              href="mailto:FillFlow@gmail.com"
              className="inline-block px-6 py-3 border-2 border-sunlit-amber text-sunlit-amber font-semibold rounded-lg hover:bg-sunlit-amber hover:text-white transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
