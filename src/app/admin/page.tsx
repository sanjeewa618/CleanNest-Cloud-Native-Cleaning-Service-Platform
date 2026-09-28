'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Shield,
  DollarSign,
  Users,
  Calendar,
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  Filter,
  AlertTriangle,
  Edit3,
  Check,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    services,
    cleaners,
    bookings,
    reviews,
    updateBookingStatus,
    updateCleanerStatus,
    updateServicePackagePrice
  } = useCleanNest();

  const [activeTab, setActiveTab] = useState<'bookings' | 'cleaners' | 'services' | 'reviews'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPrice, setEditingPrice] = useState<{ srvId: string; pkgId: string; price: number } | null>(null);

  // Stats calculation
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;

  const activeCleanersCount = cleaners.filter((c) => c.status === 'active').length;

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '36px 0 80px 0' }}>
      <div className="container">
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
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
                CleanNest Control Center
              </h1>
            </div>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
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
              ${(totalRevenue + 14200).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              +18.4% from last month
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
              {activeCleanersCount} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {cleaners.length}</span>
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
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>Customer Satisfaction</span>
              <Star size={20} color="#f59e0b" fill="#f59e0b" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              4.93 <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              Across 2,340+ ratings
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'bookings', label: `Manage Bookings (${bookings.length})` },
            { id: 'cleaners', label: `Manage Cleaners & Providers (${cleaners.length})` },
            { id: 'services', label: `Services & Pricing Manager (${services.length})` },
            { id: 'reviews', label: `Reviews & Ratings (${reviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 20px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: activeTab === tab.id ? '#0284c7' : '#64748b',
                borderBottom: activeTab === tab.id ? '3px solid #0284c7' : '3px solid transparent',
                marginBottom: '-1px',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BOOKINGS MONITOR & DISPATCH */}
        {activeTab === 'bookings' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '6px 12px', width: '320px', gap: '8px' }}>
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search code or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 14px' }}>Booking Code</th>
                    <th style={{ padding: '12px 14px' }}>Customer</th>
                    <th style={{ padding: '12px 14px' }}>Service / Tier</th>
                    <th style={{ padding: '12px 14px' }}>Assigned Cleaner</th>
                    <th style={{ padding: '12px 14px' }}>Schedule</th>
                    <th style={{ padding: '12px 14px' }}>Amount</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((b) =>
                      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.customerName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '14px', fontWeight: 700, color: '#15803d' }}>
                          {b.bookingCode}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.customerName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.customerPhone}</div>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: 600 }}>{b.serviceName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.packageName}</div>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span style={{ fontWeight: 600, color: '#0f172a' }}>{b.cleanerName || 'Auto-assigning'}</span>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <div>{b.selectedDate}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.selectedTimeSlot}</div>
                        </td>
                        <td style={{ padding: '14px', fontWeight: 700, color: '#15803d' }}>
                          ${b.totalAmount.toFixed(2)}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor:
                              b.status === 'completed' ? '#dcfce7' :
                              b.status === 'cancelled' ? '#fee2e2' : '#e0f2fe',
                            color:
                              b.status === 'completed' ? '#15803d' :
                              b.status === 'cancelled' ? '#b91c1c' : '#0369a1'
                          }}>
                            {b.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          {b.status !== 'completed' && b.status !== 'cancelled' && (
                            <button
                              onClick={() => {
                                if (confirm(`Mark booking ${b.bookingCode} as Completed?`)) {
                                  updateBookingStatus(b.id, 'completed');
                                }
                              }}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                backgroundColor: '#dcfce7',
                                color: '#15803d',
                                fontWeight: 700
                              }}
                            >
                              Force Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CLEANERS MANAGEMENT & SUSPEND/ACTIVATE */}
        {activeTab === 'cleaners' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Cleaners & Service Providers Roster
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Review performance, rating metrics, and suspend or activate service provider accounts.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {cleaners.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    border: c.status === 'active' ? '1px solid #e2e8f0' : '2px solid #ef4444',
                    backgroundColor: c.status === 'active' ? '#ffffff' : '#fff5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{c.name}</h3>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: c.status === 'active' ? '#dcfce7' : '#fee2e2',
                          color: c.status === 'active' ? '#15803d' : '#b91c1c'
                        }}>
                          {c.status.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{c.role}</div>
                      <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
                        ⭐ {c.rating} • {c.jobsCompleted} Jobs • ${c.earnings.total.toLocaleString()} Earned
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Specialties:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {c.specialties.map((spec, i) => (
                        <span key={i} style={{ backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#334155' }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Suspend / Activate Toggle */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                    {c.status === 'active' ? (
                      <button
                        onClick={() => {
                          if (confirm(`Suspend cleaner account for ${c.name}? They will no longer receive booking dispatches.`)) {
                            updateCleanerStatus(c.id, 'suspended');
                          }
                        }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#fee2e2',
                          color: '#b91c1c',
                          fontSize: '0.8125rem',
                          fontWeight: 700
                        }}
                      >
                        Suspend Account
                      </button>
                    ) : (
                      <button
                        onClick={() => updateCleanerStatus(c.id, 'active')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#dcfce7',
                          color: '#15803d',
                          fontSize: '0.8125rem',
                          fontWeight: 700
                        }}
                      >
                        Re-Activate Account
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & PRICING MANAGEMENT */}
        {activeTab === 'services' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Service Catalog & Dynamic Pricing Rates
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Directly edit the hourly rates for packages. Changes reflect instantly in customer checkout.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {services.map((srv) => (
                <div
                  key={srv.id}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '20px',
                    padding: '20px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{srv.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({srv.duration} standard)</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#15803d' }}>
                      Category: {srv.category.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    {srv.packages.map((pkg) => {
                      const isEditing = editingPrice?.srvId === srv.id && editingPrice?.pkgId === pkg.id;

                      return (
                        <div
                          key={pkg.id}
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '14px',
                            padding: '16px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{pkg.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{pkg.description}</div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {isEditing ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input
                                  type="number"
                                  value={editingPrice.price}
                                  onChange={(e) => setEditingPrice({ ...editingPrice, price: parseFloat(e.target.value) || 0 })}
                                  style={{ width: '60px', padding: '4px', borderRadius: '6px', fontSize: '0.85rem' }}
                                />
                                <button
                                  onClick={() => {
                                    updateServicePackagePrice(srv.id, pkg.id, editingPrice.price);
                                    setEditingPrice(null);
                                  }}
                                  style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#15803d', color: '#ffffff' }}
                                >
                                  <Check size={14} />
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#15803d' }}>
                                  ${pkg.pricePerHour}/hr
                                </span>
                                <button
                                  onClick={() => setEditingPrice({ srvId: srv.id, pkgId: pkg.id, price: pkg.pricePerHour })}
                                  style={{ padding: '4px', color: '#64748b' }}
                                >
                                  <Edit3 size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Customer Reviews & Feedback Stream
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Monitor feedback, star distribution, and ensure service quality compliance.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{rev.customerName}</strong>
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                        {rev.serviceName}
                      </span>
                      <div style={{ display: 'flex', color: '#f59e0b' }}>
                        {[...Array(Math.floor(rev.rating))].map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#334155', fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {rev.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
