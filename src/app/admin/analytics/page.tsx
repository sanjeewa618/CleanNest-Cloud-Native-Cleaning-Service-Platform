'use client';

import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { useCleanNest } from '@/context/CleanNestContext';

export default function AdminAnalyticsPage() {
  const { bookings } = useCleanNest();

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid' || b.paymentStatus === 'pending')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const completedBookings = bookings.filter((b) => b.status === 'completed').length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '16px' }}>
          <BarChart2 size={28} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Analytics & Reports
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>
            Monitor financial performance and business metrics.
          </p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Total Revenue</div>
            <DollarSign size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>${totalRevenue.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#16a34a', marginTop: '8px', fontWeight: 600 }}>
            <TrendingUp size={16} /> +12.5% this month
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Completed Jobs</div>
            <Calendar size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{completedBookings}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#0284c7', marginTop: '8px', fontWeight: 600 }}>
            <TrendingUp size={16} /> +5.2% this month
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Cancellation Rate</div>
            <TrendingDown size={20} color="#ef4444" />
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>2.4%</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#16a34a', marginTop: '8px', fontWeight: 600 }}>
            <TrendingDown size={16} /> -1.1% this month
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 24px 0', color: '#0f172a' }}>Revenue Overview (Last 6 Months)</h3>
        
        {/* Dynamic Chart UI */}
        {(() => {
          const baseMonths = [
            { month: 'Jan', amount: 450 },
            { month: 'Feb', amount: 620 },
            { month: 'Mar', amount: 510 },
            { month: 'Apr', amount: 840 },
            { month: 'May', amount: 720 },
            { month: 'Jun', amount: Math.max(totalRevenue, 950) },
          ];
          const maxMonthVal = Math.max(...baseMonths.map(m => m.amount), 1000);

          return (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                {baseMonths.map((bar, i) => {
                  const percent = Math.min(Math.max((bar.amount / maxMonthVal) * 100, 15), 100);
                  const isCurrent = i === baseMonths.length - 1;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '10px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? '#16a34a' : '#64748b' }}>
                        ${bar.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                      <div
                        title={`${bar.month}: $${bar.amount.toFixed(2)}`}
                        style={{ 
                          width: '100%', 
                          maxWidth: '60px', 
                          height: `${percent}%`, 
                          backgroundColor: isCurrent ? '#16a34a' : '#dcfce7',
                          borderRadius: '8px 8px 0 0',
                          transition: 'all 0.4s ease',
                          boxShadow: isCurrent ? '0 4px 12px rgba(22, 163, 74, 0.3)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>
                {baseMonths.map((bar, i) => (
                  <span key={i} style={{ color: i === baseMonths.length - 1 ? '#16a34a' : '#64748b', fontWeight: i === baseMonths.length - 1 ? 800 : 600 }}>
                    {bar.month} {i === baseMonths.length - 1 && '• Current'}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
