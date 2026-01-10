import React from 'react';
import { Section } from '../common/Section';

export const ProductDemo: React.FC = () => {
  return (
    <Section background="teal-softwave" id="product-demo" className="py-6 sm:py-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
          See FillFlow in action
        </h2>

        {/* Video/Demo Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="aspect-video bg-gradient-to-br from-sunlit-amber to-lavender-mist rounded-xl flex items-center justify-center text-white">
              <div className="text-center px-4">
                <div className="text-7xl mb-4">▶️</div>
                <p className="text-xl font-semibold mb-2">30-60 Second Product Demo</p>
                <p className="text-sm opacity-90 max-w-md mx-auto">
                  1. User opens expense report form<br/>
                  2. Clicks FillFlow extension<br/>
                  3. Enters: "Fill my Python training expense from May 17th"<br/>
                  4. Watch fields populate automatically with confidence colors<br/>
                  5. User reviews and submits
                </p>
              </div>
            </div>
            
            <p className="text-text-main font-semibold text-lg mt-6">
              From blank form to filled in 10 seconds
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
