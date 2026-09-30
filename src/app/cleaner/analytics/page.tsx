'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  TrendingUp,
  DollarSign,
  BarChart2
} from 'lucide-react';

export default function CleanerAnalyticsPage() {
  const { cleaners, bookings, currentUser, isInitialized } = useCleanNest();
  const router = useRouter();

  const cleaner = cleaners.find(c => c.id === currentUser?.id) || cleaners[0];

  useEffect(() => {
    if (isInitialized && (!currentUser || currentUser.role !== 'cleaner')) {
      router.push('/login');
    }
  }, [currentUser, isInitialized, router]);

  if (!isInitialized || !cleaner) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading analytics...</div>;
  }

  // Filter completed bookings for this cleaner
  const cleanerBookings = bookings.filter(
    (b) => b.cleanerId === cleaner.id || (!b.cleanerId && cleaner.specialties?.includes(b.serviceName))
  );
  const completedJobs = cleanerBookings.filter((b) => b.status === 'completed');

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Analytics & Earnings</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Track your earnings, platform commissions, and completed job payouts.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>Today's Earnings</span>
            <DollarSign size={20} color="#15803d" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#15803d' }}>
            ${cleaner.earnings?.today || 0}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, marginTop: '8px' }}>
            +2 completed today
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>This Week</span>
            <TrendingUp size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>
            ${cleaner.earnings?.thisWeek || 0}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
            Payout scheduled for Monday
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>Total Lifetime</span>
            <BarChart2 size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>
            ${cleaner.earnings?.total?.toLocaleString() || 0}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
            Direct bank deposit verified
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
      }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>
          Payout Ledger
        </h2>

        {completedJobs.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '20px 0' }}>
            No completed jobs yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {completedJobs.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '4px' }}>
                    {b.serviceName} <span style={{ color: '#64748b', fontWeight: 500, fontSize: '0.85rem' }}>({b.bookingCode})</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Customer: {b.customerName} • {b.selectedDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#15803d', marginBottom: '4px' }}>
                    +${(b.totalAmount * 0.85).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                    Paid to Checking ••••4920
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
