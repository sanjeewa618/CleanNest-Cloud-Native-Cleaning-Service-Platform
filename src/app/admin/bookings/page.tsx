'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { Booking } from '@/data/mockData';
import {
  CalendarCheck,
  Search,
  Clock,
  MapPin,
  MoreVertical,
  ChevronRight,
  X,
  User,
  Phone,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function AdminBookingsPage() {
  const { bookings } = useCleanNest();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = (bookings || []).filter(
    (b) =>
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customerName && b.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
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

        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by ID, Service, or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>
      
      {/* Bookings Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking ID</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Details</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr 
                  key={booking.id} 
                  style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s ease' }}
                  className="booking-row"
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{booking.bookingCode}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(booking.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px', fontSize: '0.95rem' }}>{booking.serviceName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} color="#15803d" /> {booking.selectedDate} {booking.selectedTimeSlot}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#15803d" /> {booking.customerAddress?.street?.substring(0, 24)}...
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 800, color: '#15803d', fontSize: '1rem' }}>
                      Rs. {booking.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'capitalize', fontWeight: 600 }}>{booking.paymentStatus}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {booking.status === 'completed' ? (
                      <span style={{ padding: '4px 12px', backgroundColor: '#f1f5f9', color: '#334155', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} color="#15803d" /> COMPLETED
                      </span>
                    ) : booking.status === 'cancelled' ? (
                      <span style={{ padding: '4px 12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                        CANCELLED
                      </span>
                    ) : (
                      <span style={{ padding: '4px 12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#f0fdf4',
                        color: '#15803d',
                        border: '1.5px solid #86efac',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      className="more-details-btn"
                    >
                      <span>More Details</span>
                      <ChevronRight size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  No bookings found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Full Booking Details Modal */}
      {selectedBooking && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            animation: 'fadeIn 0.2s ease'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Booking #{selectedBooking.bookingCode}
                    </h2>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: selectedBooking.status === 'completed' ? '#dcfce7' : '#e0f2fe',
                      color: selectedBooking.status === 'completed' ? '#15803d' : '#0369a1'
                    }}>
                      {selectedBooking.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '2px 0 0 0' }}>
                    Created on {new Date(selectedBooking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#e2e8f0',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="close-modal-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Service & Schedule Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Service Information
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                      {selectedBooking.serviceName}
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Package: <strong>{selectedBooking.packageName}</strong> • {selectedBooking.hours} Hours (Rs. {selectedBooking.pricePerHour?.toLocaleString()}/hr)
                    </div>
                  </div>

                  <div style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#0f172a'
                  }}>
                    <Calendar size={15} color="#15803d" />
                    <span>{selectedBooking.selectedDate}</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <Clock size={15} color="#15803d" />
                    <span>{selectedBooking.selectedTimeSlot}</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Grid: Customer & Cleaner */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Customer Details */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#15803d', fontWeight: 800, fontSize: '0.85rem' }}>
                    <User size={16} />
                    <span>CUSTOMER DETAILS</span>
                  </div>

                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '4px' }}>
                    {selectedBooking.customerName || 'Customer'}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>
                    <Phone size={14} />
                    <span>{selectedBooking.customerPhone || '+94 77 123 4567'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.85rem', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    <MapPin size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>
                      {selectedBooking.customerAddress?.street}, {selectedBooking.customerAddress?.city}
                    </span>
                  </div>

                  {selectedBooking.customerAddress?.notes && (
                    <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', fontSize: '0.78rem', color: '#854d0e' }}>
                      <strong>Note:</strong> {selectedBooking.customerAddress.notes}
                    </div>
                  )}
                </div>

                {/* Assigned Cleaner Details */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#0284c7', fontWeight: 800, fontSize: '0.85rem' }}>
                    <Sparkles size={16} />
                    <span>ASSIGNED CLEANER</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    {selectedBooking.cleanerAvatar ? (
                      <img
                        src={selectedBooking.cleanerAvatar}
                        alt={selectedBooking.cleanerName || 'Cleaner'}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #86efac' }}
                      />
                    ) : (
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#64748b' }}>
                        CL
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                        {selectedBooking.cleanerName || 'Marcus Vance'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700 }}>
                        ⭐ 5.0 • Verified Pro Cleaner
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    <Phone size={14} />
                    <span>{selectedBooking.cleanerPhone || '+94 71 234 8901'}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#0f172a', fontWeight: 800, fontSize: '0.85rem' }}>
                  <CreditCard size={16} color="#15803d" />
                  <span>PAYMENT & PRICE BREAKDOWN</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Service Subtotal ({selectedBooking.hours} hrs @ Rs. {selectedBooking.pricePerHour?.toLocaleString()}/hr)</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>Rs. {selectedBooking.subtotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  {selectedBooking.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d' }}>
                      <span>Promotional Discount</span>
                      <span style={{ fontWeight: 600 }}>-Rs. {selectedBooking.discount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                    <span>Platform & Trust Fee</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>Rs. {selectedBooking.serviceFee?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div style={{
                    borderTop: '1px solid #e2e8f0',
                    marginTop: '8px',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Total Paid</div>
                      <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, textTransform: 'capitalize' }}>
                        Payment Method: {selectedBooking.paymentMethod} ({selectedBooking.paymentStatus})
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>
                      Rs. {selectedBooking.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '20px 28px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: '#f8fafc',
              borderBottomLeftRadius: '28px',
              borderBottomRightRadius: '28px'
            }}>
              <button
                onClick={() => setSelectedBooking(null)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .booking-row:hover {
          background-color: #f8fafc !important;
        }
        .more-details-btn:hover {
          background-color: #15803d !important;
          color: #ffffff !important;
          border-color: #15803d !important;
          transform: translateY(-1px);
        }
        .close-modal-btn:hover {
          background-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
      `}</style>
    </div>
  );
}
