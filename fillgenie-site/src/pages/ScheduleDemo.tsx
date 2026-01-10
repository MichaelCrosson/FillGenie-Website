import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircleIcon, UserGroupIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export const ScheduleDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    useCase: '',
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
    // TODO: Integrate with actual booking/email system
    console.log('Demo request submitted:', formData);
    setSubmitted(true);
  };

  const benefits = [
    {
      icon: UserGroupIcon,
      title: 'Personalized Walkthrough',
      description: 'See how FillFlow works with your team\'s specific forms and workflows',
    },
    {
      icon: CalendarIcon,
      title: 'Flexible Scheduling',
      description: '30-45 minute session at a time that works for you',
    },
    {
      icon: ClockIcon,
      title: 'Quick Response',
      description: 'We\'ll get back to you within 24 hours to schedule',
    },
  ];

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
            We've received your demo request and will contact you at <strong>{formData.email}</strong> within 24 hours to schedule a time.
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
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-main mb-6">
            Schedule a Personalized Demo
          </h1>
          <p className="text-xl text-text-muted mb-8">
            See how FillFlow can save your team hours on form-based workflows. 
            We'll show you exactly how it works with your use case.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-10">
            What to Expect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-lavender-mist bg-opacity-20 p-4 rounded-full mb-4">
                    <benefit.icon className="w-8 h-8 text-sunlit-amber" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Form */}
          <Card className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-main mb-6">
              Request a Demo
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-main mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-text-main mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-text-main mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  placeholder="HR Manager, Finance Director, etc."
                />
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-semibold text-text-main mb-2">
                  Team Size *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  required
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>

              <div>
                <label htmlFor="useCase" className="block text-sm font-semibold text-text-main mb-2">
                  Primary Use Case *
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  required
                  value={formData.useCase}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                >
                  <option value="">Select a use case</option>
                  <option value="hr-onboarding">Employee Onboarding</option>
                  <option value="expense-reports">Expense Reports</option>
                  <option value="vendor-management">Vendor Management</option>
                  <option value="compliance-forms">Compliance Forms</option>
                  <option value="data-entry">General Data Entry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-main mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors resize-none"
                  placeholder="Tell us more about your needs, specific forms you work with, or questions you have..."
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" size="lg">
                Request Demo
              </Button>

              <p className="text-sm text-text-muted text-center mt-4">
                By submitting this form, you agree to our <a href="/privacy" className="text-sunlit-amber hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* Alternative Contact */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-main mb-4">
            Prefer to Email?
          </h2>
          <p className="text-lg text-text-muted mb-6">
            You can also reach us directly at{' '}
            <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline font-semibold">
              FillFlow@gmail.com
            </a>
          </p>
          <p className="text-text-muted">
            We typically respond within 24 hours on business days.
          </p>
        </div>
      </Section>
    </div>
  );
};
