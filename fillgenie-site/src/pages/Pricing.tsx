import React from 'react';
import { Section } from '../components/common/Section';
import { PricingCards } from '../components/pricing/PricingCards';

export const Pricing: React.FC = () => {
  const faqs = [
    {
      question: 'What happens when I reach my limit on the Free plan?',
      answer: 'On the Free plan, you can store up to 30 documents. If you need more, you can upgrade to Premium for unlimited storage. Your forms will continue to work with your existing documents.',
    },
    {
      question: 'Can I upgrade or downgrade anytime?',
      answer: 'Yes! You can upgrade to Premium or Enterprise at any time. If you downgrade, you\'ll keep access to Premium features until the end of your billing period.',
    },
    {
      question: 'What\'s the difference between Premium and Enterprise?',
      answer: 'Premium unlocks unlimited document storage, priority support, and advanced features. Enterprise adds team management, SSO, dedicated support, SLA guarantees, and custom onboarding for organizations.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 14-day money-back guarantee on Premium plans. If you\'re not satisfied, contact us at FillFlow@gmail.com for a full refund.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can also pay via invoice.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Plans that scale with your needs
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
            From individual professionals to enterprise teams
          </p>
        </div>

        {/* Pricing Cards */}
        <PricingCards />
      </Section>

      {/* FAQ Section */}
      <Section background="white" className="py-12 sm:py-16">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-main text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Additional info as FAQ-style items */}
            <div className="bg-warm-sand rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-main mb-3">
                What do I need to start with the Free plan?
              </h3>
              <p className="text-text-muted">Nothing! No credit card required. Just install the extension and start using FillFlow immediately.</p>
            </div>
            
            <div className="bg-warm-sand rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-main mb-3">
                Does the Premium plan include a free trial?
              </h3>
              <p className="text-text-muted">Yes, Premium includes a 14-day free trial. Plus, we offer a money-back guarantee if you're not satisfied.</p>
            </div>
            
            <div className="bg-warm-sand rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-main mb-3">
                Do you offer team or volume pricing?
              </h3>
              <p className="text-text-muted">Yes! For teams of 10+, we offer volume discounts and custom onboarding. Contact us at FillFlow@gmail.com or schedule a demo to discuss your needs.</p>
            </div>

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-warm-sand rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-text-main mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section background="warm-sand" id="contact" className="py-12 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Our team is here to help. Contact us for a personalized demo or custom pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:FillFlow@gmail.com"
              className="btn-primary"
            >
              Email Us
            </a>
            <a
              href="/schedule-demo"
              className="btn-secondary"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
