'use client';

import React, { useState, useEffect } from 'react';
import { useCleanNest, UserRole } from '@/context/CleanNestContext';
import { User, Sparkles, Shield, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

export const RoleSwitcherBanner: React.FC = () => {
  const { role, setRole, currentUser } = useCleanNest();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500 }}>
          <Clock size={16} color="#94a3b8" />
          <span style={{ minWidth: '80px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '...'}
          </span>
        </div>
      </div>
    </div>
  );
};
