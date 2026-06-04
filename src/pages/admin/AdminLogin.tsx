import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { SetupGuideSection } from './SetupGuideSection';

export const AdminLogin: React.FC = () => {
  const { user, firebaseReady, addToast, fbAuth } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseReady || !fbAuth) {
      addToast("Configure the system credentials first using the guide below!", "error");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await fbAuth.createUserWithEmailAndPassword(email, password);
        addToast("Administrator account registered successfully!", "success");
      } else {
        await fbAuth.signInWithEmailAndPassword(email, password);
        addToast("Log-in authentication verified!", "success");
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || "Authentication failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      addToast("Enter your email address in the field to send details.", "error");
      return;
    }
    if (!fbAuth) return;
    try {
      await fbAuth.sendPasswordResetEmail(email);
      addToast("Password recovery dispatch emailed!", "success");
    } catch (err: any) {
      addToast(err.message || "Failed to dispatch recovery", "error");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto bg-[#141414]">
      {/* Form left */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-12 bg-zinc-950 border-r border-zinc-900 min-h-[600px]">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xl font-extrabold tracking-tight text-white">
              DUAL<span className="text-orange-accent">DRIVE</span> & ESTATE
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-heading font-extrabold text-white">
              {isSignUp ? "Create Admin Credentials" : "Admin Dashboard Access"}
            </h1>
            <p className="text-sm text-zinc-500">Secure entry for the DualDrive managing principal.</p>
          </div>

          {!firebaseReady && (
            <div className="p-4 bg-orange-accent/10 border border-orange-accent/20 text-orange-accent text-xs rounded-xl flex items-start gap-2 mb-6 animate-pulse">
              <i className="fa-solid fa-triangle-exclamation mt-0.5 animate-bounce"></i>
              <span><strong>System Offline:</strong> Please fill out the configuration wizard below first to bind Firestore & Auth dependencies.</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4 text-zinc-300">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Security Email Address</label>
              <input 
                type="email" 
                placeholder="admin@dualdrive.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="w-full bg-[#1e1e1e] border border-zinc-805 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-accent" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Access Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="w-full bg-[#1e1e1e] border border-zinc-805 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-accent" 
              />
            </div>

            {!isSignUp && (
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-xs text-zinc-500 hover:text-orange-accent transition-colors block text-left"
              >
                Forgot your security password?
              </button>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-orange-accent to-teal-accent text-zinc-950 font-extrabold py-3.5 px-6 rounded-xl text-sm tracking-wide transition-opacity hover:opacity-90 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <i className="fa-solid fa-spinner animate-spin"></i>}
              <span>{isSignUp ? "Register Master Account" : "Initiate Verification Secure Logging"}</span>
            </button>
          </form>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-xs text-zinc-500 flex justify-between items-center">
          <span>{isSignUp ? "Already configured?" : "First time configuring?"}</span>
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-[#ff6b35] font-bold hover:underline cursor-pointer">
            {isSignUp ? "Access log-in instead" : "Create standard admin profile"}
          </button>
        </div>
      </div>

      {/* Interactive Configurator Area on Right */}
      <div className="lg:col-span-7 bg-[#141414] px-6 py-12 sm:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-white text-md flex items-center gap-2">
              <i className="fa-solid fa-cloud-lock text-[#00b4d8]"></i>
              Certified Protection Directives
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              To secure your workspace, ensure your Firebase Firestore Rules are set to match the following authentication filter:
            </p>
            <pre className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-xs font-mono text-[#00b4d8] overflow-x-auto select-all">
{`rules_version='2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`}
            </pre>
          </div>

          <SetupGuideSection />
        </div>
      </div>
    </div>
  );
};
