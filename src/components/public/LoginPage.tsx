import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Key, ArrowRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { loginAsDemo } = useLM();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('trader');
  const [email, setEmail] = useState<string>('trader@lmdvs.demo');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') setEmail('admin@lmdvs.demo');
    else if (role === 'inspector') setEmail('inspector@lmdvs.demo');
    else setEmail('trader@lmdvs.demo');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      loginAsDemo(selectedRole);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-left">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gov-navy text-white p-6 text-center space-y-2 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="font-heading font-extrabold text-xl text-white">LM-DVS Secure Portal Login</h2>
          <p className="text-xs text-slate-300">Government of India — Legal Metrology Division</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-1.5 text-xs font-bold text-center">
          <button
            onClick={() => handleRoleChange('trader')}
            className={`py-2 rounded-lg border transition-all ${
              selectedRole === 'trader'
                ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Trader / Mfg
          </button>

          <button
            onClick={() => handleRoleChange('inspector')}
            className={`py-2 rounded-lg border transition-all ${
              selectedRole === 'inspector'
                ? 'bg-gov-navy text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Field Inspector
          </button>

          <button
            onClick={() => handleRoleChange('admin')}
            className={`py-2 rounded-lg border transition-all ${
              selectedRole === 'admin'
                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Government Official
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Official Email / User ID *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Secure Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center space-x-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-500" />
              <span>Remember session</span>
            </label>
            <a href="#" className="text-amber-700 hover:underline font-semibold">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3 bg-gov-navy hover:bg-slate-800 text-white font-extrabold text-sm rounded-lg transition-all shadow flex items-center justify-center space-x-2"
          >
            {isAuthenticating ? (
              <span>Authenticating Government Session...</span>
            ) : (
              <>
                <Key className="w-4 h-4 text-amber-400" />
                <span>Login to {selectedRole.toUpperCase()} Portal</span>
              </>
            )}
          </button>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-4 border-t border-slate-200 text-center space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              SIH 2026 Instant Demo Accounts
            </span>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => loginAsDemo('trader')}
                className="w-full py-1.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md text-amber-900 text-left flex items-center justify-between font-medium"
              >
                <span>Trader: trader@lmdvs.demo</span>
                <span className="font-bold text-[10px] uppercase">Login →</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('inspector')}
                className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md text-blue-900 text-left flex items-center justify-between font-medium"
              >
                <span>Inspector: inspector@lmdvs.demo</span>
                <span className="font-bold text-[10px] uppercase">Login →</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('admin')}
                className="w-full py-1.5 px-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md text-purple-900 text-left flex items-center justify-between font-medium"
              >
                <span>Admin: admin@lmdvs.demo</span>
                <span className="font-bold text-[10px] uppercase">Login →</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
