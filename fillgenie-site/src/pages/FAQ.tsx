import React from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I install FillFlow?',
          answer: 'Simply visit the Chrome Web Store and search for "FillFlow" or use the download link on our homepage. Click "Add to Chrome" and the extension will be installed instantly. You can start using it immediately on any form.',
        },
        {
          question: 'Is FillFlow free to use?',
          answer: 'Yes! FillFlow offers a free tier that includes up to 30 documents and all basic form-filling features. For unlimited documents and advanced features, check out our Premium plan at $9.99/month.',
        },
        {
          question: 'What browsers does FillFlow support?',
          answer: 'Currently, FillFlow is available as a Chrome extension. Support for Firefox, Edge, and Safari is coming soon.',
        },
      ],
    },
    {
      category: 'How It Works',
      questions: [
        {
          question: 'How does FillFlow know what information to fill in?',
          answer: 'FillFlow uses advanced AI to understand form fields and match them with your stored information. You create a profile with your details once, and our smart matching system figures out which information goes where on any form.',
        },
        {
          question: 'Can FillFlow handle complex forms?',
          answer: 'Yes! FillFlow works with all types of forms including job applications, government forms, medical intake forms, financial applications, and more. Our AI adapts to different form structures and field types.',
        },
        {
          question: 'How fast does it work?',
          answer: 'FillFlow fills most forms in under 10 seconds. Complex multi-page forms may take a bit longer, but you\'ll still save significant time compared to manual entry.',
        },
        {
          question: 'Do I need to review the filled information?',
          answer: 'Yes, we always recommend reviewing before submitting. FillFlow is highly accurate, but you should verify that all information is correct and appropriate for each specific form.',
        },
      ],
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. Your data is encrypted both in transit and at rest using industry-standard encryption. We never share or sell your personal information. Visit our Security page for detailed information about our practices.',
        },
        {
          question: 'Where is my data stored?',
          answer: 'Your profile information is stored securely in the cloud with enterprise-grade encryption. You can delete your data at any time from your account settings.',
        },
        {
          question: 'Does FillFlow store my form submissions?',
          answer: 'No, we do not store the actual form submissions or the content you submit to third-party websites. We only store your profile information that you explicitly provide to us.',
        },
        {
          question: 'Can I use FillFlow for sensitive information?',
          answer: 'Yes, FillFlow uses bank-level encryption to protect your data. However, we recommend not storing highly sensitive information like full credit card numbers or passwords in your profile.',
        },
      ],
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          question: 'What\'s included in the free plan?',
          answer: 'The free plan includes up to 30 documents, basic form filling, Chrome extension access, email support, and works on all websites.',
        },
        {
          question: 'Can I cancel my Premium subscription anytime?',
          answer: 'Yes, you can cancel anytime with no penalties. You\'ll continue to have access to Premium features until the end of your billing period.',
        },
        {
          question: 'Do you offer team or enterprise plans?',
          answer: 'Yes! We offer custom Enterprise plans for teams with features like team management, SSO, dedicated support, and API access. Contact us at FillFlow@gmail.com or schedule a demo to learn more.',
        },
        {
          question: 'Is there a trial for Premium?',
          answer: 'Yes, we offer a free trial of Premium features. Sign up to get started and experience unlimited documents and priority support.',
        },
      ],
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          question: 'FillFlow isn\'t working on a specific website. What should I do?',
          answer: 'Some websites may have compatibility issues. First, try refreshing the page. If that doesn\'t work, please email us at FillFlow@gmail.com with the website URL, and we\'ll investigate and add support if possible.',
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Click the FillFlow extension icon in your browser, then go to Settings > Profile. You can edit any of your stored information there.',
        },
        {
          question: 'Can I have multiple profiles?',
          answer: 'Currently, each account supports one profile. If you need multiple profiles (e.g., for different businesses), please contact us about our Enterprise plan which supports team members with individual profiles.',
        },
        {
          question: 'I found a bug. How do I report it?',
          answer: 'We appreciate bug reports! Please email FillFlow@gmail.com with a description of the issue, the website where it occurred, and any screenshots if possible.',
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Everything you need to know about FillFlow. Can't find your answer? Email us at{' '}
            <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline font-semibold">
              FillFlow@gmail.com
            </a>
          </p>
        </div>
      </Section>

      {/* FAQ Content */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-text-main mb-6">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, questionIndex) => (
                  <Card key={questionIndex}>
                    <h3 className="text-lg font-semibold text-text-main mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Still Have Questions */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-main mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-text-muted mb-6">
            We're here to help! Reach out to our support team and we'll get back to you within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-sunlit-amber text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Contact Support
          </a>
        </div>
      </Section>
    </div>
  );
};
