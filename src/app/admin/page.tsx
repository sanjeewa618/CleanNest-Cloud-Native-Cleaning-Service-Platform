'use client';

import React from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  DollarSign,
  Users,
  Calendar,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    cleaners,
    bookings,
    customers
  } = useCleanNest();

  // Stats calculation
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid' || b.paymentStatus === 'pending')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  // Assuming 20% platform fee / profit margin
  const totalProfit = totalRevenue * 0.2;

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;

  const activeCleanersCount = cleaners.filter((c) => c.status === 'active' || c.status === 'ACTIVE').length;
  const totalCustomers = customers ? customers.length : 0;

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              color: '#0284c7',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              SUPER ADMIN
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              CleanNest Control Center
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: '4px 0 0 0' }}>
            System-wide oversight of bookings, cleaner dispatch, dynamic pricing, and user accounts.
          </p>
        </div>
      </div>

      {/* Admin KPI Overview Cards */}
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Platform Gross GMV</span>
            <DollarSign size={20} color="#15803d" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#15803d' }}>
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
            Profit (20% margin): ${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Live Active Bookings</span>
            <Calendar size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {activeBookingsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            All assigned & dispatching
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Verified Cleaners</span>
            <Users size={20} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {activeCleanersCount} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {cleaners.length || 0}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            100% background-checked
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
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Registered Customers</span>
            <Activity size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {totalCustomers}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
            Active on platform
          </div>
        </div>
      </div>

      {/* Overview specific content can go here, like recent activities or charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Recent Bookings */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 16px 0', color: '#0f172a' }}>Recent Bookings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bookings && bookings.length > 0 ? (
              bookings.slice(0, 5).map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #f1f5f9', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{b.serviceName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{b.customerName} • {b.date}</div>
                  </div>
                  <div style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    backgroundColor: b.status === 'completed' ? '#dcfce7' : b.status === 'cancelled' ? '#fee2e2' : '#dbeafe',
                    color: b.status === 'completed' ? '#16a34a' : b.status === 'cancelled' ? '#ef4444' : '#2563eb'
                  }}>
                    {b.status.toUpperCase().replace('_', ' ')}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>No recent bookings.</div>
            )}
          </div>
        </div>

        {/* Action Needed (Pending Cleaners) */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 16px 0', color: '#0f172a' }}>Pending Approvals</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cleaners && cleaners.filter(c => c.status === 'PENDING').length > 0 ? (
              cleaners.filter(c => c.status === 'PENDING').map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #fef3c7', borderRadius: '12px', backgroundColor: '#fffbeb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#d97706', fontSize: '0.875rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '2px' }}>{c.category || 'General'}</div>
                    </div>
                  </div>
                  <a href="/admin/providers" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', textDecoration: 'none', backgroundColor: '#fef3c7', padding: '4px 10px', borderRadius: '12px' }}>
                    Review
                  </a>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.875rem', color: '#64748b', padding: '24px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                No pending cleaner approvals! 🎉
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
