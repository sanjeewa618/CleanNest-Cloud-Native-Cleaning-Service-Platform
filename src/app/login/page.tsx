'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { Sparkles, User, Shield, ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useCleanNest();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('alex.m@example.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'customer') {
      setEmail('alex.m@example.com');
    } else if (role === 'cleaner') {
      setEmail('marcus.v@cleannest.com');
    } else {
      setEmail('admin@cleannest.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    if (selectedRole === 'customer') {
      router.push('/');
    } else if (selectedRole === 'cleaner') {
      router.push('/cleaner');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '36px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            margin: '0 auto 14px auto',
            boxShadow: '0 8px 20px rgba(21, 128, 61, 0.3)'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <path d="M9 22V12h6v10"></path>
            </svg>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Welcome to CleanNest
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Sign in to access your bookings or provider dashboard
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
            Select User Persona:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '14px'
          }}>
            {[
              { id: 'customer', label: 'Customer', icon: <User size={14} /> },
              { id: 'cleaner', label: 'Cleaner', icon: <Sparkles size={14} /> },
              { id: 'admin', label: 'Admin', icon: <Shield size={14} /> }
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => handleRoleChange(tab.id as UserRole)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: selectedRole === tab.id ? 700 : 500,
                  backgroundColor: selectedRole === tab.id ? '#ffffff' : 'transparent',
                  color: selectedRole === tab.id ? '#15803d' : '#64748b',
                  boxShadow: selectedRole === tab.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                style={{
                  width: '100%',
                  padding: '12px 10px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.9rem'
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
                style={{
                  width: '100%',
                  padding: '12px 10px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Quick Demo Credential Note */}
          <div style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '12px',
            padding: '10px 14px',
            border: '1px solid #bbf7d0',
            fontSize: '0.78rem',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} color="#15803d" />
            <span>One-click test: Click Sign In to instantly access as {selectedRole.toUpperCase()}</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '9999px', fontSize: '0.95rem', marginTop: '6px' }}
          >
            <span>Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account yet?{' '}
          <Link href="/register" style={{ color: '#15803d', fontWeight: 700 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
