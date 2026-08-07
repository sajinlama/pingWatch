import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiBaseUrl } from '../env';
import { Link } from 'react-router';

const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to sign in. Please check your credentials.');
  }

  return response.json();
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error: Error) => {
      console.error('Login error:', error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] font-sans text-[#D8E0E8] flex flex-col justify-center items-center px-4 py-12 antialiased selection:bg-[#0088CC]/20 selection:text-[#0088CC] relative overflow-hidden">
      
      {/* Background Grid Accent & Blue Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F232D15_1px,transparent_1px),linear-gradient(to_bottom,#1F232D15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#0088CC]/15 via-[#0088CC]/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* Container */}
      <div className="w-full max-w-[420px] relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-3 group mb-4">
            <div className="relative w-10 h-10 bg-[#181B1F] border border-[#22252B] rounded-lg flex items-center justify-center text-[#0088CC] shadow-[0_0_15px_rgba(0,136,204,0.25)] group-hover:border-[#0088CC]/60 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 6V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V6L12 2Z" fill="#181B1F" stroke="#0088CC" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M7 12H10L12 8L14 16L16 12H17" stroke="#00E599" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
              </span>
            </div>
            <span className="font-bold text-xl tracking-wider text-white font-mono leading-none">
              BISARIC<span className="text-[#0088CC]">WATCH</span>
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold tracking-tight text-white font-mono">
            OPERATOR_LOGIN
          </h1>
          <p className="mt-1.5 text-xs font-mono text-slate-400 tracking-wide">
            AUTHENTICATE TO ACCESS TELEMETRY CONSOLE
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#181B1F] border border-[#22252B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-6 sm:p-8">
          
          {/* Error Message Display */}
          {loginMutation.isError && (
            <div className="mb-5 p-3 rounded bg-[#F2495C]/10 border border-[#F2495C]/40 text-xs font-mono text-[#F2495C] flex items-center gap-2.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{loginMutation.error.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@domain.com"
                className="w-full h-10 px-3 border border-[#22252B] rounded-lg text-xs text-white placeholder-slate-600 bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-3 pr-10 border border-[#22252B] rounded-lg text-xs text-white placeholder-slate-600 bg-[#0B0C10] hover:border-[#0088CC]/40 focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11 mt-4 flex items-center justify-center rounded bg-[#0088CC] hover:bg-[#0099EE] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,136,204,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                'SIGN IN TO CONSOLE →'
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs font-mono text-slate-500">
          NEED AN ACCOUNT?{' '}
          <Link to="/register" className="font-semibold text-[#0088CC] hover:underline hover:text-[#0099EE] transition-colors">
            START FREE TRIAL
          </Link>
        </p>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
          <span>TLS 1.3 ENCRYPTED SESSION</span>
        </div>

      </div>
    </div>
  );
}