import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';

export const PricingCards: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for individuals getting started',
      features: [
        'Unlimited forms filled',
        'Up to 30 documents',
        'Basic support',
        'Works on all websites',
        'Chrome extension access',
        'Email support',
      ],
      testimonial: {
        quote: 'As a student applying to multiple opportunities, this tool has been helpful for managing repetitive forms.',
        role: 'UT Austin Student',
        rating: 5,
      },
      cta: 'Get Started Free',
      ctaLink: '/coming-soon',
      highlighted: false,
      badge: null,
    },
    {
      name: 'Premium',
      price: '$20',
      period: '/month',
      description: 'For professionals who need more',
      features: [
        'Everything in Free, plus:',
        'Unlimited document storage',
        'Priority AI processing',
        'Priority support',
        'Early access to new features',
        'Usage analytics',
      ],
      testimonial: {
        quote: 'Our finance team has found FillGenie useful for handling expense reports more efficiently.',
        role: 'Finance Analyst',
        rating: 5,
      },
      cta: 'Start Free Trial',
      ctaLink: '/coming-soon',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For teams that need advanced features',
      features: [
        'Everything in Premium, plus:',
        'Custom document limits',
        'Team management dashboard',
        'SSO & advanced security',
        'Dedicated support',
        'SLA guarantees',
        'Custom training & onboarding',
        'API access (coming soon)',
      ],
      testimonial: {
        quote: 'FillGenie has helped streamline our employee onboarding process. We\'ve seen measurable time savings.',
        role: 'HR Analyst',
        rating: 5,
      },
      cta: 'Contact Sales',
      ctaLink: '/custom-solutions',
      highlighted: false,
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className="relative"
        >
          <Card
            className={`h-full flex flex-col ${
              tier.highlighted
                ? 'border-4 border-sunlit-amber shadow-2xl scale-105'
                : ''
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sunlit-amber text-white px-4 py-1 rounded-full text-sm font-semibold">
                {tier.badge}
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-text-main mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-sunlit-amber">
                  {tier.price}
                </span>
                <span className="text-text-muted">{tier.period}</span>
              </div>
              <p className="text-sm text-text-muted mt-2">{tier.description}</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <CheckCircleIcon
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      feature.startsWith('Everything')
                        ? 'text-lavender-mist'
                        : 'text-teal-softwave'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      feature.startsWith('Everything')
                        ? 'font-semibold text-text-main'
                        : 'text-text-muted'
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Social Proof Testimonial */}
            <div className="mb-6 pb-6 border-t border-b border-gray-200">
              <div className="pt-6">
                {/* Rating stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(tier.testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-sunlit-amber" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-text-muted italic mb-3">
                  "{tier.testimonial.quote}"
                </p>

                {/* Author info */}
                <p className="text-xs text-text-muted font-medium">
                  {tier.testimonial.role}
                </p>
              </div>
            </div>

            <Button
              variant={tier.highlighted ? 'primary' : 'secondary'}
              to={tier.ctaLink.startsWith('#') ? undefined : tier.ctaLink}
              href={tier.ctaLink.startsWith('#') ? tier.ctaLink : undefined}
              className="w-full"
            >
              {tier.cta}
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};
