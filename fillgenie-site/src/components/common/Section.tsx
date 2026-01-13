import React from 'react';
import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'warm-sand' | 'white' | 'lavender-mist' | 'teal-softwave';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white',
  id,
}) => {
  const backgroundClasses = {
    'warm-sand': 'bg-warm-sand',
    white: 'bg-white',
    'lavender-mist': 'bg-lavender-mist bg-opacity-10',
    'teal-softwave': 'bg-teal-softwave bg-opacity-10',
  };

  return (
    <section
      id={id}
      className={clsx(backgroundClasses[background], className || 'py-16 sm:py-20 lg:py-24')}
    >
      <div className="section-container">{children}</div>
    </section>
  );
};
