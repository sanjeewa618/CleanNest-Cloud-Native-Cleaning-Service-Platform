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
        
        {/* Fake Chart UI using CSS */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
          {[
            { month: 'Jan', value: 40 },
            { month: 'Feb', value: 60 },
            { month: 'Mar', value: 45 },
            { month: 'Apr', value: 80 },
            { month: 'May', value: 65 },
            { month: 'Jun', value: 100 },
          ].map((bar, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '12px' }}>
              <div style={{ 
                width: '100%', 
                maxWidth: '60px', 
                height: `${bar.value}%`, 
                backgroundColor: bar.value === 100 ? '#16a34a' : '#dcfce7',
                borderRadius: '8px 8px 0 0',
                transition: 'all 0.3s ease'
              }}></div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>
    </div>
  );
}
