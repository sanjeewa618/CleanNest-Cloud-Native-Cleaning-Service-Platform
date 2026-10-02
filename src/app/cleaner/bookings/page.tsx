'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCleanNest } from '@/context/CleanNestContext';
import { Booking } from '@/data/mockData';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Car,
  Check,
  X
} from 'lucide-react';

export default function CleanerBookingsPage() {
  const {
    cleaners,
    bookings,
    updateBookingStatus,
    currentUser,
    isInitialized
  } = useCleanNest();
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
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading bookings...</div>;
  }

  // Filter bookings strictly assigned to this cleaner by unique ID
  const cleanerBookings = bookings.filter(
    (b) => Boolean(b.cleanerId) && b.cleanerId === cleaner.id
  );

  const handleStatusChange = (bookingId: string, nextStatus: Booking['status']) => {
    updateBookingStatus(bookingId, nextStatus);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Job Execution Pipeline</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Update customer job status in real time: <strong>Accepted ➔ On the way ➔ Started ➔ Completed</strong>
        </p>
      </div>

      {cleanerBookings.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          No jobs assigned yet. Make sure your availability is set to Online!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cleanerBookings.map((b) => (
            <div
              key={b.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.8rem', padding: '3px 8px', borderRadius: '6px' }}>
                    {b.bookingCode}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {b.serviceName} - {b.packageName}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Customer:</span>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{b.customerName}</strong>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <span style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>{b.customerPhone}</span>
                </div>
              </div>

              {/* Schedule & Location */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                fontSize: '0.875rem'
              }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Schedule Time:</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#15803d" /> {b.selectedDate} ({b.selectedTimeSlot})
                  </div>
                </div>

                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Address:</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#15803d" /> {b.customerAddress.street}, {b.customerAddress.city}
                  </div>
                  {b.customerAddress.notes && (
                    <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '2px' }}>
                      Note: {b.customerAddress.notes}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Payout for Job:</div>
                  <div style={{ fontWeight: 800, color: '#15803d', fontSize: '1.15rem' }}>
                    Rs. {(b.totalAmount * 0.85).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Live Lifecycle Controls */}
              <div style={{
                borderTop: '1px solid #f1f5f9',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Current Status:</span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backgroundColor: b.status === 'completed' ? '#dcfce7' : (b.status === 'accepted' || (b.status as any) === 'confirmed') ? '#eff6ff' : '#f1f5f9',
                    color: b.status === 'completed' ? '#15803d' : (b.status === 'accepted' || (b.status as any) === 'confirmed') ? '#1d4ed8' : '#0f172a'
                  }}>
                    {(b.status === 'accepted' || (b.status as any) === 'confirmed') ? 'ACCEPTED' : b.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'accepted')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <Check size={14} /> Accept Booking
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'completed')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#15803d', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <CheckCircle2 size={16} /> Mark "Completed ✨"
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'cancelled')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <X size={14} /> Decline
                      </button>
                    </>
                  )}

                  {(b.status === 'accepted' || (b.status as any) === 'confirmed') && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'on_the_way')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <Car size={16} /> Mark "On The Way 🚗"
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'completed')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#15803d', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <CheckCircle2 size={16} /> Mark "Completed ✨"
                      </button>
                    </>
                  )}

                  {b.status === 'on_the_way' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'in_progress')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#d97706', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <Sparkles size={16} /> Mark "Arrived & Started 🧹"
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'completed')}
                        style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#15803d', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                      >
                        <CheckCircle2 size={16} /> Mark "Completed ✨"
                      </button>
                    </>
                  )}

                  {b.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(b.id, 'completed')}
                      style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#15803d', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: 'none', cursor: 'pointer' }}
                    >
                      <CheckCircle2 size={16} /> Mark "Job Completed ✨"
                    </button>
                  )}

                  {b.status === 'completed' && (
                    <span style={{ color: '#15803d', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Job Completed & Payout Credited
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
