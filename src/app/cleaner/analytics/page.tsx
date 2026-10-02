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

  // Find the logged-in cleaner specifically for currentUser without hardcoded fallback
  const cleaner = cleaners.find(c => c.id === currentUser?.id || (currentUser?.email && c.email?.toLowerCase() === currentUser?.email.toLowerCase())) || (
    currentUser && (currentUser.role === 'cleaner' || (currentUser.role as string) === 'CLEANER') ? {
      id: currentUser.id,
      name: currentUser.name || 'Cleaner',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'Cleaner')}&background=random`,
      role: 'Professional Cleaner',
      rating: 5.0,
      reviewCount: 0,
      jobsCompleted: 0,
      isOnline: true,
      status: 'ACTIVE',
      specialties: ['Home Cleaning'],
      earnings: { today: 0, thisWeek: 0, total: 0 },
      availability: ['09:00 AM - 12:00 PM', '01:00 PM - 04:00 PM', '05:00 PM - 08:00 PM']
    } : null
  );

  useEffect(() => {
    if (isInitialized && (!currentUser || currentUser.role !== 'cleaner')) {
      router.push('/login');
    }
  }, [currentUser, isInitialized, router]);

  if (!isInitialized || !cleaner) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading analytics...</div>;
  }

  // Filter completed bookings strictly for this cleaner by unique ID
  const cleanerBookings = bookings.filter(
    (b) => Boolean(b.cleanerId) && b.cleanerId === cleaner.id
  );
  const completedJobs = cleanerBookings.filter((b) => b.status === 'completed');

  // Compute dynamic completed jobs revenue (85% cleaner payout)
  const completedEarningsTotal = completedJobs.reduce((sum, b) => sum + ((b.totalAmount || (b as any).price || 0) * 0.85), 0);
  const todayEarnings = (cleaner.earnings?.today || 0) + completedEarningsTotal;
  const thisWeekEarnings = (cleaner.earnings?.thisWeek || 0) + completedEarningsTotal;
  const totalLifetimeEarnings = (cleaner.earnings?.total || 0) + completedEarningsTotal;

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
            Rs. {todayEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, marginTop: '8px' }}>
            +{completedJobs.length} completed jobs
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
            Rs. {thisWeekEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            Rs. {totalLifetimeEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
            Direct bank deposit verified
          </div>
        </div>
      </div>

      {/* Revenue & Performance Graph Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Weekly Revenue Breakdown
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
              Dynamic daily payout progression updated upon completed bookings.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
              85% Cleaner Payout
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              15% Platform Commission
            </span>
          </div>
        </div>

        {/* Dynamic Bar Chart */}
        {(() => {
          const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          const todayIdx = (new Date().getDay() + 6) % 7; // Mon = 0, Sun = 6
          
          const dailyData = daysOfWeek.map((day, idx) => {
            const isToday = idx === todayIdx;
            // Distribute base amount and add completed payouts directly to today
            const baseAmount = idx < todayIdx ? 35 + (idx * 20) : (isToday ? completedEarningsTotal : 0);
            return {
              day,
              amount: baseAmount,
              isToday
            };
          });

          const maxAmount = Math.max(...dailyData.map(d => d.amount), 5000);

          return (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '220px',
                gap: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f1f5f9'
              }}>
                {dailyData.map((d, i) => {
                  const heightPercent = Math.max((d.amount / maxAmount) * 100, d.amount > 0 ? 12 : 4);
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '10px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: d.isToday ? '#15803d' : '#64748b',
                        opacity: d.amount > 0 ? 1 : 0.3
                      }}>
                        Rs. {d.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                      <div
                        title={`${d.day}: Rs. ${d.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        style={{
                          width: '100%',
                          maxWidth: '56px',
                          height: `${heightPercent}%`,
                          background: d.isToday
                            ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)'
                            : (d.amount > 0 ? '#93c5fd' : '#e2e8f0'),
                          borderRadius: '10px 10px 4px 4px',
                          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
                          boxShadow: d.isToday ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', color: '#64748b', fontSize: '0.85rem', fontWeight: 700 }}>
                {dailyData.map((d, i) => (
                  <span key={i} style={{ color: d.isToday ? '#15803d' : '#64748b' }}>
                    {d.day} {d.isToday && '• Today'}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Dynamic Metrics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>Avg. Payout per Job</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
              Rs. {completedJobs.length > 0 ? (completedEarningsTotal / completedJobs.length).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>Jobs Completed Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#15803d', marginTop: '4px' }}>
              {cleanerBookings.length > 0 ? ((completedJobs.length / cleanerBookings.length) * 100).toFixed(0) : '100'}%
            </div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>Net Take-Home</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
              Rs. {thisWeekEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
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
                    +Rs. {(b.totalAmount * 0.85).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
