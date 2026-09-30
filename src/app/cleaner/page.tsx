'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Sparkles,
  DollarSign,
  Star,
  TrendingUp,
  Power,
  ArrowRight
} from 'lucide-react';

export default function CleanerOverviewPage() {
  const {
    cleaners,
    bookings,
    toggleCleanerOnline,
    currentUser,
    isInitialized
  } = useCleanNest();
  const router = useRouter();

  // Find the logged-in cleaner
  const cleaner = cleaners.find(c => c.id === currentUser?.id) || cleaners[0];

  useEffect(() => {
    if (isInitialized && (!currentUser || currentUser.role !== 'cleaner')) {
      router.push('/login');
    }
  }, [currentUser, isInitialized, router]);

  if (!isInitialized || !cleaner) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading cleaner profile...</div>;
  }

  // Filter bookings for this cleaner
  const cleanerBookings = bookings.filter(
    (b) => b.cleanerId === cleaner.id || (!b.cleanerId && cleaner.specialties?.includes(b.serviceName))
  );

  const activeJobs = cleanerBookings.filter(
    (b) => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress'
  );

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Overview</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Welcome back, {cleaner.name}! Here is a summary of your performance.
        </p>
      </div>

      {/* Cleaner Top Profile & Status Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '28px',
        padding: '28px 32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        {/* Avatar & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={cleaner.avatar}
              alt={cleaner.name}
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #15803d'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: cleaner.isOnline ? '#22c55e' : '#94a3b8',
              border: '3px solid #ffffff'
            }}></span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {cleaner.name}
              </h2>
              <span style={{
                backgroundColor: '#dcfce7',
                color: '#15803d',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                PRO CLEANER
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
              {cleaner.role} • {cleaner.phone} • {cleaner.email}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                <Star size={15} fill="#f59e0b" color="#f59e0b" /> {cleaner.rating || '5.0'}
                <span style={{ color: '#64748b', fontWeight: 400 }}>({cleaner.reviewCount || 0} reviews)</span>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d' }}>
                {cleaner.jobsCompleted || 0} Completed Jobs
              </span>
            </div>
          </div>
        </div>

        {/* Online / Offline Toggle Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Availability Mode</div>
            <strong style={{ fontSize: '1rem', color: cleaner.isOnline ? '#15803d' : '#64748b' }}>
              {cleaner.isOnline ? 'ONLINE & ACCEPTING JOBS' : 'OFFLINE (PAUSED)'}
            </strong>
          </div>

          <button
            onClick={() => toggleCleanerOnline(cleaner.id)}
            style={{
              width: '64px',
              height: '36px',
              borderRadius: '9999px',
              backgroundColor: cleaner.isOnline ? '#15803d' : '#cbd5e1',
              padding: '4px',
              transition: 'all 0.25s ease',
              position: 'relative',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transform: cleaner.isOnline ? 'translateX(28px)' : 'translateX(0)',
              transition: 'transform 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cleaner.isOnline ? '#15803d' : '#94a3b8'
            }}>
              <Power size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Cleaner KPI Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Today's Earnings</span>
            <DollarSign size={18} color="#15803d" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#15803d' }}>
            ${cleaner.earnings?.today || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
            +2 completed today
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>This Week</span>
            <TrendingUp size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            ${cleaner.earnings?.thisWeek || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Payout scheduled for Monday
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Total Lifetime</span>
            <DollarSign size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            ${cleaner.earnings?.total?.toLocaleString() || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Direct bank deposit verified
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Active Jobs</span>
            <Sparkles size={18} color="#15803d" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#15803d' }}>
            {activeJobs.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Ready for progression
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Manage Your Jobs</h2>
          <p style={{ color: '#64748b', margin: 0 }}>View your job pipeline, accept new incoming jobs, and update current job statuses.</p>
        </div>
        <Link href="/cleaner/bookings" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: '#15803d',
          color: '#ffffff',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Go to Bookings <ArrowRight size={18} />
        </Link>
      </div>

    </div>
  );
}
