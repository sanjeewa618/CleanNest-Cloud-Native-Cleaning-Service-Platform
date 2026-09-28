'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Star, ShieldCheck, Clock, ArrowRight, Search, MapPin } from 'lucide-react';
import { useCleanNest } from '@/context/CleanNestContext';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { services, currentLocation } = useCleanNest();
  const [selectedService, setSelectedService] = useState('home-cleaning');
  const [zipInput, setZipInput] = useState('10001');

  const handleStartBooking = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/services/${selectedService}`);
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)',
      padding: '48px 0 64px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative leaf background blurs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px'
        }}>
          {/* Left Column: Headlines & Instant Booking Widget */}
          <div>
            {/* Top Rating Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              padding: '6px 14px',
              borderRadius: '9999px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: '20px',
              border: '1px solid #dcfce7'
            }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
                <Star size={16} fill="#f59e0b" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14532d' }}>4.9 / 5.0</span>
              <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>(2,340+ Verified Reviews)</span>
            </div>

            {/* Main Headline - Matches Screen 1 text */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              marginBottom: '18px'
            }}>
              Professional Cleaning Services at{' '}
              <span style={{
                color: '#15803d',
                position: 'relative',
                display: 'inline-block'
              }}>
                Your Door
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    width: '100%',
                    height: '10px',
                    color: '#86efac'
                  }}
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subhead - Matches Screen 1 text */}
            <p style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '540px'
            }}>
              A cleaner home, a healthier you. Book trusted, vetted, and background-checked cleaning professionals in minutes.
            </p>

            {/* Instant Booking Quick-Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 20px 40px -10px rgba(21, 128, 61, 0.12), 0 0 0 1px #e2e8f0',
              marginBottom: '28px'
            }}>
              <form onSubmit={handleStartBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px'
                }}>
                  {/* Select Service */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Choose Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#0f172a'
                      }}
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.slug}>
                          {s.name} (from ${s.basePrice}/hr)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Location / ZIP
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      padding: '0 12px'
                    }}>
                      <MapPin size={18} color="#15803d" />
                      <input
                        type="text"
                        value={zipInput}
                        onChange={(e) => setZipInput(e.target.value)}
                        placeholder="ZIP (e.g. 10001)"
                        style={{
                          width: '100%',
                          padding: '12px 8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '0.9375rem',
                          fontWeight: 600
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Big Green Pill Action Button - Matches Screen 1 CTA */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1.05rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.01em'
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>

            {/* Feature Guarantees */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#334155', fontWeight: 600 }}>
                <Clock size={18} color="#15803d" />
                <span>Instant Confirmation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#334155', fontWeight: 600 }}>
                <ShieldCheck size={18} color="#15803d" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#334155', fontWeight: 600 }}>
                <Sparkles size={18} color="#15803d" />
                <span>Eco-Friendly Supplies</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Matching Screen 1 & App Aesthetics */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Main Hero Cleaner Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(22, 101, 52, 0.25)',
              border: '6px solid #ffffff'
            }}>
              <img
                src="/images/hero_cleaner.jpg"
                alt="Professional cleaner vacuuming living room sofa"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />

              {/* Floating Verified Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                padding: '10px 16px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>Background Checked</div>
                  <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>Vetted & Insured</div>
                </div>
              </div>

              {/* Floating Service Card at Bottom Right */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '12px 18px',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                maxWidth: '240px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Home Cleaning</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>From $65/hr • Same-day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
