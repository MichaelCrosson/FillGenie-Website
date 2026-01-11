import React, { useState } from 'react';

interface WaitlistFormProps {
  apiUrl?: string;
  className?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ 
  apiUrl = import.meta.env.VITE_WAITLIST_API_URL,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully added to waitlist!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      console.error('Waitlist submission error:', error);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sunlit-amber focus:border-sunlit-amber transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-sunlit-amber text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined' : 'Join Waitlist'}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : status === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : ''
            }`}
          >
            {message}
          </div>
        )}
      </form>

      {status !== 'success' && (
        <p className="mt-4 text-xs text-center text-text-muted">
          We'll notify you when we launch. No spam, ever.
        </p>
      )}
    </div>
  );
};
