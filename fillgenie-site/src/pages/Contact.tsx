import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  EnvelopeIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section background="warm-sand" className="min-h-screen flex items-center py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-teal-softwave rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-text-muted mb-8">
            We've received your message and will get back to you at <strong>{formData.email}</strong> within 24 hours.
          </p>
          <Button variant="primary" to="/">
            Return to Home
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-text-muted mb-8">
            Have a question, feedback, or need support? We're here to help.
          </p>
        </div>
      </Section>

      {/* Contact Form */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text-main mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-text-main mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-semibold text-text-main mb-2">
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  required
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                >
                  <option value="">Select inquiry type</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="press">Press & Media</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-text-main mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your inquiry"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-main mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" size="lg">
                Send Message
              </Button>

              <p className="text-sm text-text-muted text-center mt-4">
                We typically respond within 24 hours on business days.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* Alternative Contact Methods */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text-main text-center mb-8">
            Other Ways to Reach Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="text-center">
              <div className="flex flex-col items-center">
                <div className="bg-sunlit-amber bg-opacity-20 p-4 rounded-full mb-4">
                  <EnvelopeIcon className="w-8 h-8 text-sunlit-amber" />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2">
                  Email Us Directly
                </h3>
                <a 
                  href="mailto:FillFlow@gmail.com"
                  className="text-sunlit-amber hover:underline font-semibold"
                >
                  FillFlow@gmail.com
                </a>
              </div>
            </Card>

            <Card className="text-center">
              <div className="flex flex-col items-center">
                <div className="bg-teal-softwave bg-opacity-20 p-4 rounded-full mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-teal-softwave" />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2">
                  Check Our FAQ
                </h3>
                <p className="text-text-muted text-sm mb-3">
                  Find answers to common questions
                </p>
                <a 
                  href="/faq"
                  className="text-teal-softwave hover:underline font-semibold"
                >
                  Visit FAQ
                </a>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};
