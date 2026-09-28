'use client';

import React from 'react';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { User, Sparkles, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const RoleSwitcherBanner: React.FC = () => {
  const { role, setRole, currentUser } = useCleanNest();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string; href: string }[] = [
    {
      id: 'customer',
      label: 'Customer Mode',
      icon: <User size={14} />,
      desc: 'Browse, book, and review cleaning services',
      href: '/'
    },
    {
      id: 'cleaner',
      label: 'Cleaner / Provider Portal',
      icon: <Sparkles size={14} />,
      desc: 'Accept jobs, manage schedule & earnings',
      href: '/cleaner'
    },
    {
      id: 'admin',
      label: 'Admin Control Center',
      icon: <Shield size={14} />,
      desc: 'Oversee bookings, cleaners, and pricing',
      href: '/admin'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      padding: '8px 16px',
      fontSize: '0.8125rem',
      borderBottom: '1px solid #1e293b',
      position: 'relative',
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#4ade80',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block'
            }}></span>
            LIVE DEMO ACTORS
          </span>
          <span style={{ color: '#94a3b8' }}>
            Logged in as <strong style={{ color: '#f8fafc' }}>{currentUser.name}</strong> ({role.toUpperCase()})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#64748b', fontSize: '0.75rem', marginRight: '4px' }}>Switch Actor:</span>
          {roles.map((r) => {
            const isActive = role === r.id;
            return (
              <Link
                key={r.id}
                href={r.href}
                onClick={() => setRole(r.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#15803d' : '#1e293b',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  border: isActive ? '1px solid #22c55e' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {r.icon}
                <span>{r.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
