'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { CalendarCheck, Search, Clock, MapPin, MoreVertical } from 'lucide-react';

export default function AdminBookingsPage() {
  const { bookings } = useCleanNest();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = (bookings || []).filter(
    (b) =>
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '16px' }}>
            <CalendarCheck size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Bookings
            </h1>
            <p style={{ color: '#64748b', margin: '4px 0 0 0', fontWeight: 500 }}>
              Monitor and dispatch active bookings across the platform.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by ID or Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>
      
      <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking ID</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Details</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', width: '60px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{booking.bookingCode}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(booking.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{booking.serviceName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {booking.selectedDate} {booking.selectedTimeSlot}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {booking.customerAddress?.street?.substring(0, 20)}...</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 700, color: '#15803d' }}>${booking.totalAmount.toFixed(2)}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'capitalize' }}>{booking.paymentStatus}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {booking.status === 'completed' ? (
                      <span style={{ padding: '4px 10px', backgroundColor: '#f1f5f9', color: '#64748b', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        COMPLETED
                      </span>
                    ) : booking.status === 'cancelled' ? (
                      <span style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        CANCELLED
                      </span>
                    ) : (
                      <span style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {booking.status.toUpperCase()}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
