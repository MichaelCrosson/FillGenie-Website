import React, { useState } from 'react';
import { Section } from '../components/common/Section';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  CpuChipIcon, 
  DocumentMagnifyingGlassIcon, 
  ServerStackIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export const CustomSolutions: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    challenge: '',
    currentProcess: '',
    volume: '',
    systems: '',
    timeline: '',
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
    console.log('Custom solution request:', formData);
    setSubmitted(true);
  };

  const capabilities = [
    {
      icon: DocumentMagnifyingGlassIcon,
      title: 'Document Intelligence',
      description: 'OCR, text extraction, and document classification for any file type or format',
    },
    {
      icon: CpuChipIcon,
      title: 'Custom AI Pipelines',
      description: 'LLM integration, natural language processing, and intelligent field mapping',
    },
    {
      icon: ServerStackIcon,
      title: 'System Integration',
      description: 'Connect to your existing tools, databases, and workflows seamlessly',
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
            We've received your custom solution request and will contact you at <strong>{formData.email}</strong> within 24 hours to discuss your project.
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
            Custom Automation Solutions
          </h1>
          <p className="text-xl text-text-muted mb-8">
            We build tailored automation pipelines for unique workflows that off-the-shelf tools can't handle. 
            From healthcare to finance, we've solved complex form-filling challenges with custom AI solutions.
          </p>
        </div>
      </Section>

      {/* Example: BottleVision */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-10">
            Example: BottleVision for Kaiser Permanente
          </h2>
          
          <Card className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-text-main mb-4">The Challenge</h3>
                <p className="text-text-muted mb-4">
                  Kaiser Permanente patients needed to transfer prescriptions to their app, but manually typing 
                  information from pill bottles was slow, error-prone, and frustrating.
                </p>
                <p className="text-text-muted">
                  Traditional form-filling tools couldn't handle the complexity of reading physical prescription 
                  labels with varying formats, fonts, and image quality.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-text-main mb-4">Our Solution</h3>
                <p className="text-text-muted mb-4">
                  We built <strong>BottleVision</strong>, a custom pipeline that:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-softwave mt-1">1.</span>
                    <span className="text-text-muted text-sm">Captures images of prescription bottles through the mobile app camera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-softwave mt-1">2.</span>
                    <span className="text-text-muted text-sm">Uses advanced OCR to extract text from labels (medication names, dosages, instructions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-softwave mt-1">3.</span>
                    <span className="text-text-muted text-sm">Employs LLMs to interpret and structure the extracted information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-softwave mt-1">4.</span>
                    <span className="text-text-muted text-sm">Automatically fills prescription transfer forms with verified data</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-3xl font-bold text-sunlit-amber mb-2">30 sec</div>
              <p className="text-text-muted text-sm">Down from 10 minutes per prescription</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-sunlit-amber mb-2">95%</div>
              <p className="text-text-muted text-sm">OCR accuracy rate on prescription labels</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-sunlit-amber mb-2">Zero</div>
              <p className="text-text-muted text-sm">Manual entry errors in medication names</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* What We Can Build */}
      <Section background="lavender-mist" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-10">
            What We Can Build for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {capabilities.map((capability, index) => (
              <Card key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-sunlit-amber bg-opacity-20 p-4 rounded-full mb-4">
                    <capability.icon className="w-8 h-8 text-sunlit-amber" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {capability.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section background="white" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-main text-center mb-6">
            Tell Us About Your Challenge
          </h2>
          <p className="text-center text-text-muted mb-10">
            We'll analyze your workflow and propose a custom solution tailored to your needs.
          </p>

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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-text-main mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
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
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-text-main mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                >
                  <option value="">Select your industry</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="hr">HR & Recruiting</option>
                  <option value="legal">Legal</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-semibold text-text-main mb-2">
                  What's Your Automation Challenge? *
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  required
                  rows={4}
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors resize-none"
                  placeholder="Describe the forms, documents, and workflow you need to automate..."
                />
              </div>

              <div>
                <label htmlFor="currentProcess" className="block text-sm font-semibold text-text-main mb-2">
                  Current Process
                </label>
                <textarea
                  id="currentProcess"
                  name="currentProcess"
                  rows={3}
                  value={formData.currentProcess}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors resize-none"
                  placeholder="How do you currently handle this? How long does it take?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="volume" className="block text-sm font-semibold text-text-main mb-2">
                    Volume
                  </label>
                  <input
                    type="text"
                    id="volume"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="e.g., 100 forms per week"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-text-main mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="soon">Soon (1 month)</option>
                    <option value="planning">Planning (2-3 months)</option>
                    <option value="exploring">Exploring options</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="systems" className="block text-sm font-semibold text-text-main mb-2">
                  Systems/Tools Involved
                </label>
                <input
                  type="text"
                  id="systems"
                  name="systems"
                  value={formData.systems}
                  onChange={handleChange}
                  placeholder="e.g., Salesforce, SAP, custom database"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sunlit-amber transition-colors"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" size="lg">
                Submit Request
              </Button>

              <p className="text-sm text-text-muted text-center mt-4">
                We'll respond within 24 hours to discuss feasibility, timeline, and pricing.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* Alternative Contact */}
      <Section background="warm-sand" className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-text-main mb-4">
            Prefer to Talk First?
          </h3>
          <p className="text-lg text-text-muted mb-6">
            Email us at{' '}
            <a href="mailto:FillFlow@gmail.com" className="text-sunlit-amber hover:underline font-semibold">
              FillFlow@gmail.com
            </a>
            {' '}to schedule a discovery call.
          </p>
        </div>
      </Section>
    </div>
  );
};
