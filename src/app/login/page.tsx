'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, setCurrentUser } = useCleanNest();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Save token
      localStorage.setItem('cleannest_token', data.token);

      const userProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role.toLowerCase(),
        avatar: data.user.avatar,
        phone: data.user.phone
      };

      // Save full user data so it persists on refresh
      localStorage.setItem('cleannest_user', JSON.stringify(userProfile));

      // Update context
      setRole(data.user.role.toLowerCase());
      setCurrentUser(userProfile);

      if (data.user.role === 'CUSTOMER' || data.user.role === 'customer') {
        router.push('/');
      } else if (data.user.role === 'ADMIN' || data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/cleaner');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
    }}>
      {/* Back Button */}
      <Link href="/" style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ffffff',
        padding: '10px 16px',
        borderRadius: '9999px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: '#0f172a',
        fontWeight: 600,
        zIndex: 10,
        textDecoration: 'none'
      }}>
        <ArrowLeft size={18} />
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <path d="M9 22V12h6v10"></path>
            <path d="M12 7c2 0 3 1.5 3 3"></path>
          </svg>
        </div>
        <span>Home</span>
      </Link>

      {/* Left Image Panel */}
      <div className="auth-left-panel" style={{
        flex: 1,
        position: 'relative',
        backgroundImage: 'url("/images/auth-bg-green.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(21,128,61,0) 0%, rgba(20,83,45,0.6) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          color: '#fff'
        }}>
          <h2 className="scroll-animate fade-up delay-100" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Sparkling Clean.<br/>Every Time.
          </h2>
          <p className="scroll-animate fade-up delay-200" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', color: '#ffffff', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
            Join thousands of satisfied customers who trust CleanNest with their homes.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%'
        }}>
          {/* Brand Icon & Heading */}
          <div className="scroll-animate fade-up delay-100" style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Welcome back
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Sign in to manage your bookings and cleanings
            </p>
          </div>

          {/* Login Form */}
          <form className="scroll-animate fade-up delay-200" onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '0 14px'
              }}>
                <Mail size={16} color="#94a3b8" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="new-password"
                  placeholder="cashier123@gmail.com"
                  style={{
                    width: '100%',
                    padding: '12px 10px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '0 14px'
              }}>
                <Lock size={16} color="#94a3b8" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                  title="Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
                  style={{
                    width: '100%',
                    padding: '12px 10px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                Must be at least 8 characters, include uppercase, lowercase, number, and special character.
              </div>
            </div>

            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '10px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '0.95rem', marginTop: '8px', opacity: isLoading ? 0.7 : 1 }}
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Social Logins */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              
              <button style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: '#64748b' }}>
            Don't have an account yet?{' '}
            <Link href="/register" style={{ color: '#15803d', fontWeight: 700 }}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
