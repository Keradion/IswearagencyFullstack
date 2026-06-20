import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { adminLogin } from '../api/blog';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await adminLogin(email.trim(), password);
      login(res.token, res.user);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-primary">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.03]" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header stripe */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-primary-light px-8 pt-10 pb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
              <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Admin Portal</h1>
            <p className="text-white/70 text-sm mt-1">I Swear Employment Agency</p>
          </div>

          {/* Form */}
          <div className="px-8 pt-8 pb-10 -mt-4 bg-white rounded-t-3xl relative">
            <h2 className="text-xl font-bold text-brand-slate mb-6 text-center">
              Sign in to continue
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="admin-email" className="block text-sm font-semibold text-brand-slate">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="mesfin@iswearagency.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="admin-password" className="block text-sm font-semibold text-brand-slate">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-primary transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="admin-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/30 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-brand-gray mt-6">
              This area is restricted to authorized administrators only.
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/70 hover:text-white text-sm transition-colors underline underline-offset-2"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
