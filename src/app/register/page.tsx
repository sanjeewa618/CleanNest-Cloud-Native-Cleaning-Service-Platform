'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { User, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setRole, setCurrentUser } = useCleanNest();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'cleaner'>('customer');
  const [fullName, setFullName] = useState('Kasun Perera');
  const [email, setEmail] = useState('kasun@example.com');
  const [phone, setPhone] = useState('+1 (555) 789-0123');
  const [password, setPassword] = useState('password123');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    setCurrentUser({
      id: `usr-${Date.now()}`,
      name: fullName,
      email: email,
      role: selectedRole,
      avatar: selectedRole === 'cleaner'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      phone: phone
    });

    if (selectedRole === 'customer') {
      router.push('/');
    } else {
      router.push('/cleaner');
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
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Join the CleanNest<br/>Community.
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', color: '#ffffff', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
            Experience the best on-demand cleaning service platform, designed for your convenience.
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
        backgroundColor: '#ffffff',
        overflowY: 'auto'
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%'
        }}>
          {/* Heading */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Create Account
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Join the premier on-demand cleaning network
            </p>
          </div>

          {/* Account Type Toggle */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '14px',
            marginBottom: '24px'
          }}>
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: selectedRole === 'customer' ? 700 : 500,
                backgroundColor: selectedRole === 'customer' ? '#ffffff' : 'transparent',
                color: selectedRole === 'customer' ? '#15803d' : '#64748b',
                boxShadow: selectedRole === 'customer' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s'
              }}
            >
              <User size={16} />
              <span>I Need Cleaning</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('cleaner')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: selectedRole === 'cleaner' ? 700 : 500,
                backgroundColor: selectedRole === 'cleaner' ? '#ffffff' : 'transparent',
                color: selectedRole === 'cleaner' ? '#15803d' : '#64748b',
                boxShadow: selectedRole === 'cleaner' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s'
              }}
            >
              <Sparkles size={16} />
              <span>I Am a Cleaner Pro</span>
            </button>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '0.95rem', marginTop: '10px' }}
            >
              <span>Create {selectedRole === 'customer' ? 'Customer' : 'Provider'} Account</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#15803d', fontWeight: 700 }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
