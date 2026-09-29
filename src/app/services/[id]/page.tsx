'use client';

import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Clock,
  ShieldCheck,
  Zap,
  Check,
  ArrowRight,
  Wind,
  Sparkles,
  ChefHat,
  Bath,
  Trash2,
  Layers,
  Phone,
  CheckCircle2
} from 'lucide-react';

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { services, cleaners, reviews, setDraftBooking } = useCleanNest();

  const preselectedCleanerId = searchParams?.get('cleaner');

  const serviceSlug = (params?.id as string) || 'home-cleaning';
  const service = services.find((s) => s.slug === serviceSlug) || services[0];

  const [selectedPackageId, setSelectedPackageId] = useState(
    service.packages.find((p) => p.recommended)?.id || service.packages[0]?.id || ''
  );
  const [selectedHours, setSelectedHours] = useState(3);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const selectedPackage = service.packages.find((p) => p.id === selectedPackageId) || service.packages[0];
  const totalPrice = (selectedPackage ? selectedPackage.pricePerHour : service.basePrice) * selectedHours;

  const categoryCleaners = cleaners.filter(c => c.specialties.includes(service.name));
  const displayCleaners = categoryCleaners.length > 0 ? categoryCleaners : cleaners.slice(0, 2);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleBookNow = () => {
    setDraftBooking({
      serviceId: service.id,
      serviceName: service.name,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      pricePerHour: selectedPackage.pricePerHour,
      hours: selectedHours,
      subtotal: totalPrice
    });
    const queryParams = new URLSearchParams({
      service: service.slug,
      package: selectedPackage.id
    });
    if (preselectedCleanerId) {
      queryParams.set('cleaner', preselectedCleanerId);
    }
    router.push(`/booking?${queryParams.toString()}`);
  };

  const getIncludedIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind size={20} color="#15803d" />;
      case 'Sparkles':
        return <Sparkles size={20} color="#15803d" />;
      case 'ChefHat':
        return <ChefHat size={20} color="#15803d" />;
      case 'Bath':
        return <Bath size={20} color="#15803d" />;
      case 'Trash2':
        return <Trash2 size={20} color="#15803d" />;
      case 'Layers':
        return <Layers size={20} color="#15803d" />;
      default:
        return <Sparkles size={20} color="#15803d" />;
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', paddingBottom: '80px' }}>
      <div className="container" style={{ paddingTop: '24px' }}>
        {/* Back Link Breadcrumb */}
        <div style={{ marginBottom: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Main Grid: Details (matching Screen 3) + Booking Sidebar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Recreating Mobile Screen 3 Content */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '32px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Hero Image with Floating Back, Heart, Share buttons - matches Screen 3 */}
            <div style={{
              position: 'relative',
              height: '360px',
              width: '100%',
              backgroundColor: '#e2e8f0'
            }}>
              <img
                src={service.image}
                alt={service.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Floating Action Buttons */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => router.back()}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f172a',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <ArrowLeft size={20} />
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isFavorite ? '#ef4444' : '#64748b',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} />
                  </button>

                  <button
                    onClick={handleShare}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0f172a',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      position: 'relative'
                    }}
                  >
                    <Share2 size={20} />
                    {copiedShare && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-32px',
                        right: 0,
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap'
                      }}>
                        Copied Link!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Service Details Body */}
            <div style={{ padding: '32px' }}>
              {/* Title & Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.02em'
                }}>
                  {service.name}
                </h1>
              </div>

              {/* Rating & Reviews - matches Screen 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
                  <Star size={18} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{service.rating}</span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.9375rem' }}>
                  ({service.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Badges / Pill Attributes - matches Screen 3 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f5f9',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155'
                }}>
                  <Clock size={16} color="#15803d" />
                  <span>{service.duration}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f5f9',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155'
                }}>
                  <ShieldCheck size={16} color="#15803d" />
                  <span>Insured & Trusted</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f5f9',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155'
                }}>
                  <Zap size={16} color="#f59e0b" />
                  <span>Same Day Available</span>
                </div>
              </div>

              {/* Service Description - matches Screen 3 */}
              <p style={{
                fontSize: '1rem',
                color: '#475569',
                lineHeight: 1.65,
                marginBottom: '32px'
              }}>
                {service.fullDesc}
              </p>

              {/* What's Included Section - matches Screen 3 */}
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '16px'
                }}>
                  What's Included
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {service.whatsIncluded.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: '#dcfce7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getIncludedIcon(item.icon)}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.3 }}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Select Your Package" - matches Screen 3: Standard ($65/hr), Deep Clean ($96/hr), Move In/Out ($120/hr) */}
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '16px'
                }}>
                  Select Your Package
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px'
                }}>
                  {service.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        style={{
                          backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                          border: isSelected ? '2.5px solid #22c55e' : '1.5px solid #e2e8f0',
                          borderRadius: '20px',
                          padding: '20px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          position: 'relative',
                          boxShadow: isSelected ? '0 10px 20px rgba(34, 197, 94, 0.15)' : 'none'
                        }}
                      >
                        {pkg.recommended && (
                          <div style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '16px',
                            backgroundColor: '#15803d',
                            color: '#ffffff',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: 700
                          }}>
                            RECOMMENDED
                          </div>
                        )}

                        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: isSelected ? '#15803d' : '#0f172a', marginBottom: '8px' }}>
                          {pkg.name}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a' }}>
                            ${pkg.pricePerHour}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>/hr</span>
                        </div>

                        <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4, marginBottom: '14px' }}>
                          {pkg.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {pkg.features.map((feat, fIdx) => (
                            <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#334155' }}>
                              <Check size={12} color="#15803d" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Price Calculator Card */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>
                Instant Price Estimate
              </h3>

              {/* Service & Package summary */}
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '16px',
                borderRadius: '16px',
                marginBottom: '20px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{service.name}</span>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>${selectedPackage?.pricePerHour}/hr</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Selected Tier: <strong>{selectedPackage?.name}</strong>
                </div>
              </div>

              {/* Hours Selector Slider */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                    Estimated Cleaning Duration
                  </label>
                  <span style={{ fontWeight: 800, color: '#15803d', fontSize: '1rem' }}>
                    {selectedHours} Hours
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={selectedHours}
                  onChange={(e) => setSelectedHours(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#15803d',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  <span>1 hr (Express)</span>
                  <span>3 hrs (Average)</span>
                  <span>8 hrs (Full House)</span>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Rate (${selectedPackage?.pricePerHour} × {selectedHours} hrs)</span>
                  <span>${(selectedPackage?.pricePerHour || 65) * selectedHours}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Trust & Safety Fee</span>
                  <span>$12</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', marginBottom: '12px', fontWeight: 600 }}>
                  <span>First Booking Discount (CLEAN20)</span>
                  <span>-$20.00</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1.5px dashed #cbd5e1',
                  paddingTop: '12px'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Total Estimated:</span>
                  <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#15803d' }}>
                    ${Math.max(0, (selectedPackage?.pricePerHour || 65) * selectedHours + 12 - 20).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Book Now Button - Matches Screen 3 Bottom Button */}
              <button
                onClick={handleBookNow}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>Book Now</span>
                <ArrowRight size={20} />
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '14px',
                fontSize: '0.78rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={14} color="#15803d" />
                <span>Zero cancellation fee up to 24h before service</span>
              </div>
            </div>

            {/* Available Top Cleaners Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              marginTop: '20px'
            }}>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Cleaners Available Today
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {displayCleaners.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      borderRadius: '16px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{c.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>⭐ {c.rating} • {c.jobsCompleted} jobs done</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '9999px' }}>
                      Available
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
