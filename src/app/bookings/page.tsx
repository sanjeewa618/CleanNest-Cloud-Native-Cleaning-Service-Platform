'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import { Booking } from '@/data/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Star,
  Sparkles,
  ArrowRight,
  Car,
  FileText,
  RotateCcw,
  X
} from 'lucide-react';

export default function CustomerBookingsPage() {
  const { bookings, cancelBooking, rescheduleBooking, submitReview } = useCleanNest();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<Booking | null>(null);

  // Review modal state
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');

  // Reschedule modal state
  const [newDateInput, setNewDateInput] = useState('Next Monday, Oct 6th');
  const [newTimeInput, setNewTimeInput] = useState('10:00 AM - 01:00 PM');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return b.status !== 'completed' && b.status !== 'cancelled';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'on_the_way':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.8125rem'
          }}>
            <Car size={14} /> Cleaner On The Way
          </span>
        );
      case 'in_progress':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fef3c7',
            color: '#b45309',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.8125rem'
          }}>
            <Sparkles size={14} /> Cleaning In Progress
          </span>
        );
      case 'accepted':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.8125rem'
          }}>
            <CheckCircle2 size={14} /> Cleaner Confirmed
          </span>
        );
      case 'completed':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f1f5f9',
            color: '#334155',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.8125rem'
          }}>
            <CheckCircle2 size={14} color="#15803d" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.8125rem'
          }}>
            <XCircle size={14} /> Cancelled
          </span>
        );
      default:
        return (
          <span style={{
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '0.8125rem'
          }}>
            Pending
          </span>
        );
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingForReview) {
      submitReview(selectedBookingForReview.id, ratingInput, commentInput);
      setSelectedBookingForReview(null);
      setCommentInput('');
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingForReschedule) {
      rescheduleBooking(selectedBookingForReschedule.id, newDateInput, newTimeInput);
      setSelectedBookingForReschedule(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '36px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="scroll-animate fade-up delay-100" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              My Cleanings & Bookings
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Track cleaner ETA in real-time, reschedule, or review completed jobs.
            </p>
          </div>

          <Link
            href="/booking"
            className="btn btn-primary"
            style={{ borderRadius: '9999px', padding: '12px 24px' }}
          >
            <span>+ Book New Cleaning</span>
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="scroll-animate fade-up delay-200" style={{
          display: 'inline-flex',
          backgroundColor: '#ffffff',
          padding: '6px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          marginBottom: '28px',
          gap: '6px'
        }}>
          {(['all', 'active', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                backgroundColor: activeTab === tab ? '#15803d' : 'transparent',
                color: activeTab === tab ? '#ffffff' : '#64748b'
              }}
            >
              {tab === 'all' ? 'All Bookings' : tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="scroll-animate fade-up delay-300" style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <Sparkles size={48} color="#94a3b8" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              No bookings found in this view
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Ready to give your home a sparkling makeover?
            </p>
            <Link href="/booking" className="btn btn-primary">
              Book a Service Now
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredBookings.map((b, idx) => (
              <div
                className={`scroll-animate fade-up delay-${(idx + 1) * 100}`}
                key={b.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '28px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                {/* Top Bar: Code, Date & Status */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '16px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                        {b.bookingCode}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                        {b.serviceName}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        ({b.packageName} • {b.hours} hrs)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '0.85rem', marginTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> {b.selectedDate}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {b.selectedTimeSlot}
                      </span>
                    </div>
                  </div>

                  <div>
                    {getStatusBadge(b.status)}
                  </div>
                </div>

                {/* Real-time Status Tracker Stepper (Uber-style) */}
                {b.status !== 'cancelled' && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}>
                      {[
                        { key: 'accepted', label: 'Accepted' },
                        { key: 'on_the_way', label: 'On The Way' },
                        { key: 'in_progress', label: 'In Progress' },
                        { key: 'completed', label: 'Completed' }
                      ].map((step, idx) => {
                        const stepOrder = ['accepted', 'on_the_way', 'in_progress', 'completed'];
                        const currentIdx = stepOrder.indexOf(b.status);
                        const isDone = currentIdx >= idx;
                        const isCurrent = currentIdx === idx;

                        return (
                          <div
                            key={step.key}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                              flex: 1,
                              position: 'relative'
                            }}
                          >
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isDone ? '#15803d' : '#e2e8f0',
                              color: isDone ? '#ffffff' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              marginBottom: '6px',
                              boxShadow: isCurrent ? '0 0 0 4px rgba(34, 197, 94, 0.25)' : 'none'
                            }}>
                              {idx + 1}
                            </div>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: isCurrent ? 800 : 600,
                              color: isDone ? '#0f172a' : '#94a3b8'
                            }}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Middle Grid: Assigned Cleaner + Address & Price */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  {/* Cleaner Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <img
                      src={b.cleanerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                      alt={b.cleanerName || 'Cleaner'}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Assigned Cleaner:</div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                        {b.cleanerName || 'Top Rated Pro'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#15803d', marginTop: '2px' }}>
                        <Phone size={12} />
                        <span>{b.cleanerPhone || '+1 (555) 234-8901'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Total */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: '#334155' }}>
                      <MapPin size={16} color="#15803d" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{b.customerAddress.street}, {b.customerAddress.apartment && `${b.customerAddress.apartment}, `}{b.customerAddress.city}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Paid:</span>
                      <strong style={{ fontSize: '1.25rem', color: '#15803d' }}>${b.totalAmount.toFixed(2)}</strong>
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#14532d', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                        {b.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Existing Review (if submitted) */}
                {b.rating && (
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#14532d' }}>Your Review:</span>
                      <div style={{ display: 'flex', color: '#f59e0b' }}>
                        {[...Array(b.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#166534', fontStyle: 'italic' }}>
                      "{b.reviewComment}"
                    </p>
                  </div>
                )}

                {/* Bottom Actions Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '16px',
                  flexWrap: 'wrap'
                }}>
                  {b.status !== 'completed' && b.status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => setSelectedBookingForReschedule(b)}
                        className="btn btn-secondary btn-sm"
                        style={{ borderRadius: '9999px' }}
                      >
                        <RotateCcw size={14} />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to cancel booking ${b.bookingCode}?`)) {
                            cancelBooking(b.id);
                          }
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          color: '#b91c1c',
                          backgroundColor: '#fee2e2',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}

                  {b.status === 'completed' && !b.rating && (
                    <button
                      onClick={() => setSelectedBookingForReview(b)}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: '9999px' }}
                    >
                      <Star size={14} />
                      <span>Write Review & Rating</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REVIEW MODAL */}
        {selectedBookingForReview && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Rate Your Cleaning Service
                </h3>
                <button onClick={() => setSelectedBookingForReview(null)}>
                  <X size={20} color="#64748b" />
                </button>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '20px' }}>
                How was your experience with <strong>{selectedBookingForReview.cleanerName}</strong> for {selectedBookingForReview.serviceName}?
              </p>

              <form onSubmit={handleReviewSubmit}>
                {/* Stars selector */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingInput(star)}
                      style={{ padding: '6px' }}
                    >
                      <Star
                        size={32}
                        fill={star <= ratingInput ? '#f59e0b' : 'none'}
                        color={star <= ratingInput ? '#f59e0b' : '#cbd5e1'}
                      />
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Your Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you loved about the cleaning..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedBookingForReview(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* RESCHEDULE MODAL */}
        {selectedBookingForReschedule && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  Reschedule Cleaning
                </h3>
                <button onClick={() => setSelectedBookingForReschedule(null)}>
                  <X size={20} color="#64748b" />
                </button>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '20px' }}>
                Select a new convenient date and time for booking <strong>{selectedBookingForReschedule.bookingCode}</strong>.
              </p>

              <form onSubmit={handleRescheduleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Select New Date
                  </label>
                  <select
                    value={newDateInput}
                    onChange={(e) => setNewDateInput(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  >
                    <option value="Friday, Oct 3rd">Friday, Oct 3rd</option>
                    <option value="Saturday, Oct 4th">Saturday, Oct 4th (Weekend)</option>
                    <option value="Monday, Oct 6th">Monday, Oct 6th</option>
                    <option value="Tuesday, Oct 7th">Tuesday, Oct 7th</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Select New Time Slot
                  </label>
                  <select
                    value={newTimeInput}
                    onChange={(e) => setNewTimeInput(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  >
                    <option value="08:00 AM - 11:00 AM">Morning: 08:00 AM - 11:00 AM</option>
                    <option value="10:00 AM - 01:00 PM">Midday: 10:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 05:00 PM">Afternoon: 02:00 PM - 05:00 PM</option>
                    <option value="05:30 PM - 08:30 PM">Evening: 05:30 PM - 08:30 PM</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedBookingForReschedule(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
