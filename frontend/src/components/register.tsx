import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111827] flex flex-col justify-center items-center px-4 py-12 antialiased selection:bg-[#4F46E5] selection:text-white">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-11 h-11 bg-[#111827] rounded-lg shadow-sm mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[20px] font-semibold tracking-tight text-[#111827]">PingWatch</span>
          <h1 className="mt-2 text-[24px] font-bold tracking-tight text-[#111827]">Create your account</h1>
          <p className="mt-1 text-[14px] text-[#6B7280]">Start monitoring your infrastructure in seconds.</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder-[#9CA3AF] bg-white hover:border-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-1.5">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder-[#9CA3AF] bg-white hover:border-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 8 characters"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder-[#9CA3AF] bg-white hover:border-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 flex items-center justify-center rounded-lg bg-[#4F46E5] text-white text-[14px] font-medium hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 transition-colors disabled:opacity-60"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[14px] text-[#6B7280]">
          Already have an account?{' '}
          <a href="#login" className="font-medium text-[#4F46E5] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}