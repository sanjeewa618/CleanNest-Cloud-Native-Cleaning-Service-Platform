'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { User, Sparkles, ArrowRight, ShieldCheck, Mail, Lock, Phone } from 'lucide-react';

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
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '36px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Create CleanNest Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
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
              padding: '10px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: selectedRole === 'customer' ? 700 : 500,
              backgroundColor: selectedRole === 'customer' ? '#ffffff' : 'transparent',
              color: selectedRole === 'customer' ? '#15803d' : '#64748b',
              boxShadow: selectedRole === 'customer' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
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
              padding: '10px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: selectedRole === 'cleaner' ? 700 : 500,
              backgroundColor: selectedRole === 'cleaner' ? '#ffffff' : 'transparent',
              color: selectedRole === 'cleaner' ? '#15803d' : '#64748b',
              boxShadow: selectedRole === 'cleaner' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <Sparkles size={16} />
            <span>I Am a Cleaner Pro</span>
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', fontSize: '0.9rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '9999px', fontSize: '0.95rem', marginTop: '10px' }}
          >
            <span>Create {selectedRole === 'customer' ? 'Customer' : 'Provider'} Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#15803d', fontWeight: 700 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
