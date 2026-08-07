import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your auth logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111827] flex flex-col justify-center items-center px-4 py-12 antialiased selection:bg-[#4F46E5] selection:text-white">
      {/* Container */}
      <div className="w-full max-w-[400px]">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-11 h-11 bg-[#111827] rounded-lg shadow-sm mb-3">
            {/* Pulse / Radar Ping Icon */}
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[20px] font-semibold tracking-tight text-[#111827]">
            PingWatch
          </span>
          <h1 className="mt-2 text-[24px] font-bold tracking-tight text-[#111827]">
            Sign in to your account
          </h1>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            Welcome back. Enter your details to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 sm:p-8">
          
          {/* SSO / OAuth Option */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 h-10 px-4 border border-[#E5E7EB] rounded-lg text-[14px] font-medium text-[#111827] bg-white hover:bg-[#F5F5F5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#E5E7EB]"></div>
            </div>
            <div className="relative flex justify-center text-[12px] uppercase">
              <span className="bg-white px-2 text-[#9CA3AF] font-medium tracking-wider">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-[14px] font-medium text-[#111827] mb-1.5"
              >
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder-[#9CA3AF] bg-white hover:border-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="block text-[14px] font-medium text-[#111827]"
                >
                  Password
                </label>
                <a 
                  href="#forgot-password" 
                  className="text-[12px] font-medium text-[#4F46E5] hover:underline focus:outline-none focus:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-3 pr-10 border border-[#E5E7EB] rounded-lg text-[14px] text-[#111827] placeholder-[#9CA3AF] bg-white hover:border-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9CA3AF] hover:text-[#6B7280] focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 012.122-.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#E5E7EB] text-[#4F46E5] focus:ring-[#4F46E5] focus:ring-offset-0 transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 text-[14px] text-[#6B7280]">
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 flex items-center justify-center rounded-lg bg-[#4F46E5] text-white text-[14px] font-medium hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 transition-colors disabled:opacity-60"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <p className="mt-6 text-center text-[14px] text-[#6B7280]">
          Don't have an account?{' '}
          <a href="#register" className="font-medium text-[#4F46E5] hover:underline focus:outline-none focus:underline">
            Start a free trial
          </a>
        </p>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF]">
          <svg className="w-3.5 h-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>256-bit SSL Encrypted • Enterprise Uptime SLA</span>
        </div>

      </div>
    </div>
  );
}