import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'For Individuals', href: '/#individuals' },
      { name: 'For Teams', href: '/#enterprise' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Security', href: '/security' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Schedule Demo', href: '/schedule-demo' },
      { name: 'Contact Us', href: '/contact' },
    ],
    resources: [
      { name: 'FAQ & Help', href: '/faq' },
      { name: 'Custom Solutions', href: '/custom-solutions' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Security Practices', href: '/security' },
    ],
  };

  return (
    <footer className="bg-warm-sand border-t border-text-muted border-opacity-20">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                className="h-8 w-auto"
                src="/images/PhilGenie.png"
                alt="FillFlow Logo"
              />
              <span className="text-xl font-bold text-text-main">FillFlow</span>
            </div>
            <p className="text-sm text-text-muted">
              Automatically fill forms using your existing data. Stop copy-pasting. Start saving time.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-sm font-semibold text-text-main mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-sunlit-amber transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-main mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-sunlit-amber transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-text-main mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-sunlit-amber transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-main mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-muted hover:text-sunlit-amber transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:FillFlow@gmail.com"
                  className="text-sm text-text-muted hover:text-sunlit-amber transition-colors"
                >
                  FillFlow@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-text-muted border-opacity-20 pt-8">
          <p className="text-xs text-center text-text-muted">
            © 2025 FillFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
