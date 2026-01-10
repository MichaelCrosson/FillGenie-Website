import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              className="h-10 w-auto"
              src="/images/PhilGenie.png"
              alt="FillFlow Logo"
            />
            <span className="text-2xl font-bold text-text-main">FillFlow</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-main"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation and CTAs */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-text-main hover:text-sunlit-amber transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          {isAuthenticated ? (
            <>
              <Button variant="text" to="/dashboard" size="sm">
                My Dashboard
              </Button>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-text-muted hover:text-sunlit-amber transition-colors flex items-center gap-1"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Button variant="text" to="/login" size="sm">
                Login
              </Button>
              <Button variant="primary" to="/coming-soon" size="sm">
                Try for Free
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-text-main hover:bg-warm-sand hover:text-sunlit-amber"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Button variant="text" to="/dashboard" size="sm" className="w-full">
                    My Dashboard
                  </Button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-sm font-semibold text-text-muted hover:text-sunlit-amber transition-colors py-2 px-4 rounded-lg hover:bg-warm-sand flex items-center justify-center gap-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button variant="text" to="/login" size="sm" className="w-full">
                    Login
                  </Button>
                  <Button variant="primary" to="/coming-soon" size="sm" className="w-full">
                    Try for Free
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
