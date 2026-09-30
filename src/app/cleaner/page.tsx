'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCleanNest } from '@/context/CleanNestContext';
import { Booking } from '@/data/mockData';
import {
  Sparkles,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Power,
  Calendar,
  AlertTriangle,
  Car,
  Check,
  X,
  User,
  ShieldCheck,
  TrendingUp,
  Settings
} from 'lucide-react';

export default function CleanerPortalPage() {
  const {
    cleaners,
    bookings,
    updateBookingStatus,
    toggleCleanerOnline,
    updateCleanerServices,
    services,
    currentUser
  } = useCleanNest();
  const router = useRouter();

  // Find the logged-in cleaner
  const cleaner = cleaners.find(c => c.id === currentUser?.id) || cleaners[0]; // fallback to mock for dev if needed
  
  const [activeTab, setActiveTab] = useState<'jobs' | 'services' | 'schedule' | 'earnings'>('jobs');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'cleaner') {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!cleaner) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading cleaner profile...</div>;
  }

  // Filter bookings for this cleaner
  const cleanerBookings = bookings.filter(
    (b) => b.cleanerId === cleaner.id || (!b.cleanerId && cleaner.specialties?.includes(b.serviceName))
  );

  const activeJobs = cleanerBookings.filter(
    (b) => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress'
  );

  const completedJobs = cleanerBookings.filter((b) => b.status === 'completed');

  const handleStatusChange = (bookingId: string, nextStatus: Booking['status']) => {
    updateBookingStatus(bookingId, nextStatus);
  };

  const handleToggleSpecialty = (serviceName: string) => {
    const currentSpecialties = cleaner.specialties || [];
    const updated = currentSpecialties.includes(serviceName)
      ? currentSpecialties.filter((s) => s !== serviceName)
      : [...currentSpecialties, serviceName];
    updateCleanerServices(cleaner.id, updated);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '36px 0 80px 0' }}>
      <div className="container">
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
                <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
                  {cleaner.name}
                </h1>
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
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
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
                position: 'relative'
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
              ${cleaner.earnings?.today || 0}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              +2 completed today
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
              ${cleaner.earnings?.thisWeek || 0}
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
              ${cleaner.earnings?.total?.toLocaleString() || 0}
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

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '28px'
        }}>
          {[
            { id: 'jobs', label: `Active & Incoming Jobs (${activeJobs.length})` },
            { id: 'services', label: 'My Offered Services' },
            { id: 'schedule', label: 'Availability & Working Slots' },
            { id: 'earnings', label: 'Payout History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 20px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: activeTab === tab.id ? '#15803d' : '#64748b',
                borderBottom: activeTab === tab.id ? '3px solid #15803d' : '3px solid transparent',
                marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ACTIVE JOBS PIPELINE (Accepted -> On the way -> Started -> Completed) */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                Job Execution Pipeline
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Update customer job status in real time: <strong>Accepted ➔ On the way ➔ Started ➔ Completed</strong>
              </p>
            </div>

            {cleanerBookings.length === 0 ? (
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
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
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
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
                          ${(b.totalAmount * 0.85).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Live Lifecycle Controls (The requested core feature) */}
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
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a'
                        }}>
                          {b.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {b.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(b.id, 'accepted')}
                              className="btn btn-primary btn-sm"
                            >
                              <Check size={14} /> Accept Booking
                            </button>
                            <button
                              onClick={() => handleStatusChange(b.id, 'cancelled')}
                              style={{ padding: '8px 16px', borderRadius: '9999px', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '0.85rem', fontWeight: 600 }}
                            >
                              <X size={14} /> Decline
                            </button>
                          </>
                        )}

                        {b.status === 'accepted' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'on_the_way')}
                            className="btn btn-primary btn-sm"
                            style={{ backgroundColor: '#2563eb' }}
                          >
                            <Car size={16} /> Mark "On The Way 🚗"
                          </button>
                        )}

                        {b.status === 'on_the_way' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'in_progress')}
                            className="btn btn-primary btn-sm"
                            style={{ backgroundColor: '#d97706' }}
                          >
                            <Sparkles size={16} /> Mark "Arrived & Started 🧹"
                          </button>
                        )}

                        {b.status === 'in_progress' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="btn btn-primary btn-sm"
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
        )}

        {/* TAB 2: MANAGE PROVIDED SERVICES */}
        {activeTab === 'services' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              My Cleaning Services & Specialties
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Select which cleaning types you accept jobs for. You will only be matched with customer bookings for checked categories.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              {services.map((srv) => {
                const isSelected = (cleaner.specialties || []).includes(srv.name);
                return (
                  <div
                    key={srv.id}
                    onClick={() => handleToggleSpecialty(srv.name)}
                    style={{
                      padding: '20px',
                      borderRadius: '18px',
                      border: isSelected ? '2px solid #22c55e' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                        {srv.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                        Base rate: ${srv.basePrice}/hr
                      </div>
                    </div>

                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      backgroundColor: isSelected ? '#15803d' : '#f1f5f9',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <Check size={16} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULE & WORKING SLOTS */}
        {activeTab === 'schedule' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Working Time Slots & Availability
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Configure your daily shift availability for dispatch matching.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
              {(cleaner.availability || []).map((slot, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock size={18} color="#15803d" />
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                      {slot}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '3px 10px', borderRadius: '9999px' }}>
                    ACTIVE SHIFT
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PAYOUT HISTORY */}
        {activeTab === 'earnings' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Direct Deposit & Payout Ledger
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Track earnings, platform commissions, and completed job payouts.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {completedJobs.map((b) => (
                <div
                  key={b.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                      {b.serviceName} ({b.bookingCode})
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Customer: {b.customerName} • {b.selectedDate}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#15803d' }}>
                      +${(b.totalAmount * 0.85).toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>
                      Paid to Checking ••••4920
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
