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
  ArrowRight,
  Bell,
  CheckCircle,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  CreditCard,
  User
} from 'lucide-react';

export default function CleanerOverviewPage() {
  const {
    cleaners,
    bookings,
    toggleCleanerOnline,
    currentUser,
    isInitialized,
    cleanerAlerts,
    acceptBooking,
    rejectBooking,
    updateBookingStatus
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
    (b) =>
      b.cleanerId === cleaner.id ||
      b.cleanerName === cleaner.name ||
      !b.cleanerId ||
      (cleaner.specialties && cleaner.specialties.includes(b.serviceName))
  );

  const activeJobs = cleanerBookings.filter(
    (b) => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress'
  );

  const completedJobs = cleanerBookings.filter((b) => b.status === 'completed');

  // Compute dynamic completed jobs revenue (85% cleaner payout)
  const completedEarningsTotal = completedJobs.reduce((sum, b) => sum + ((b.totalAmount || (b as any).price || 0) * 0.85), 0);
  const todayEarnings = (cleaner.earnings?.today || 0) + completedEarningsTotal;
  const thisWeekEarnings = (cleaner.earnings?.thisWeek || 0) + completedEarningsTotal;
  const totalLifetimeEarnings = (cleaner.earnings?.total || 0) + completedEarningsTotal;

  // Filter active (non-dismissed) alerts for this cleaner
  const pendingAlerts = cleanerAlerts.filter((a) => !a.dismissed && (!a.cleanerId || a.cleanerId === cleaner.id));

  return (
    <div>
      {/* ===== NEW BOOKING ALERT INBOX ===== */}
      {pendingAlerts.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={22} color="#15803d" />
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                backgroundColor: '#ef4444', color: '#fff', fontSize: '0.6rem',
                fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{pendingAlerts.length}</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              New Booking Requests
            </h2>
            <span style={{
              backgroundColor: '#fef9c3', color: '#854d0e', fontSize: '0.72rem',
              fontWeight: 700, padding: '3px 10px', borderRadius: '9999px',
              border: '1px solid #fde047'
            }}>
              {pendingAlerts.length} Pending
            </span>
          </div>

          {/* Alert Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingAlerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '2px solid #22c55e',
                  boxShadow: '0 4px 20px rgba(34,197,94,0.12)',
                  overflow: 'hidden',
                  animation: 'pulse-border 2s infinite'
                }}
              >
                {/* Alert top bar */}
                <div style={{
                  background: 'linear-gradient(90deg, #15803d, #22c55e)',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Sparkles size={16} />
                    New Booking Request — Action Required!
                  </div>
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff',
                    fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px',
                    borderRadius: '9999px'
                  }}>
                    {alert.paymentStatus === 'paid' ? '💳 Paid' : '⏳ Pending Payment'}
                  </span>
                </div>

                {/* Alert body */}
                <div style={{ padding: '20px 24px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    {/* Customer */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '10px' }}>
                        <User size={18} color="#15803d" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>CUSTOMER</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{alert.customerName}</div>
                      </div>
                    </div>

                    {/* Service */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '10px' }}>
                        <Sparkles size={18} color="#15803d" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>SERVICE</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{alert.serviceName}</div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '10px' }}>
                        <Clock size={18} color="#15803d" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>DATE & TIME</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{alert.selectedDate}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{alert.selectedTimeSlot}</div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '10px' }}>
                        <CreditCard size={18} color="#15803d" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>TOTAL PAID</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>Rs. {alert.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{
                    backgroundColor: '#f8fafc', borderRadius: '12px', padding: '12px 16px',
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    border: '1px solid #e2e8f0', marginBottom: '20px'
                  }}>
                    <MapPin size={18} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>SERVICE ADDRESS</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>{alert.customerAddress}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => acceptBooking(alert.bookingId)}
                      style={{
                        flex: 1, padding: '13px',
                        background: 'linear-gradient(135deg, #15803d, #22c55e)',
                        color: '#fff', border: 'none', borderRadius: '12px',
                        fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: '0 4px 12px rgba(21,128,61,0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <CheckCircle size={18} />
                      Accept Booking
                    </button>
                    <button
                      onClick={() => rejectBooking(alert.bookingId)}
                      style={{
                        flex: 1, padding: '13px',
                        backgroundColor: '#fff1f2', color: '#ef4444',
                        border: '1.5px solid #fecaca', borderRadius: '12px',
                        fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <XCircle size={18} />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            Rs. {todayEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
            +{completedJobs.length} completed jobs
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
            Rs. {thisWeekEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            Rs. {totalLifetimeEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

      {/* Recent Assigned Jobs List */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Assigned Jobs & Requests</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Accept incoming booking requests and update active job status in real time.</p>
          </div>
          <Link href="/cleaner/bookings" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#15803d',
            color: '#ffffff',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}>
            View Full Pipeline <ArrowRight size={16} />
          </Link>
        </div>

        {cleanerBookings.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
            No assigned jobs yet. Make sure your availability is set to Online!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cleanerBookings.map((b) => (
              <div key={b.id} style={{
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px' }}>
                      {b.bookingCode}
                    </span>
                    <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{b.serviceName}</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({b.packageName})</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                    📅 {b.selectedDate} ({b.selectedTimeSlot}) • 👤 {b.customerName} ({b.customerAddress.street})
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: b.status === 'completed' ? '#dcfce7' : (b.status === 'accepted' || (b.status as any) === 'confirmed') ? '#dcfce7' : b.status === 'pending' ? '#fef9c3' : '#e2e8f0',
                    color: b.status === 'completed' ? '#14532d' : (b.status === 'accepted' || (b.status as any) === 'confirmed') ? '#14532d' : b.status === 'pending' ? '#854d0e' : '#334155'
                  }}>
                    {(b.status === 'accepted' || (b.status as any) === 'confirmed') ? 'ACCEPTED' : b.status.replace('_', ' ').toUpperCase()}
                  </span>

                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => acceptBooking(b.id)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Accept Booking
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, 'completed')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '9999px',
                          backgroundColor: '#15803d',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Sparkles size={14} /> Mark Completed ✨
                      </button>
                    </>
                  )}

                  {(b.status === 'accepted' || (b.status as any) === 'confirmed' || b.status === 'on_the_way' || b.status === 'in_progress') && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={14} /> Mark Completed ✨
                    </button>
                  )}

                  {b.status === 'completed' && (
                    <span style={{
                      color: '#15803d',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={14} /> Completed & Paid
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
