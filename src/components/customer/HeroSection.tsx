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
    const popularSection = document.getElementById('popular-services');
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#popular-services');
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0 100px 0',
      minHeight: '650px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#ecfdf5'
    }}>
      {/* Background Image on the right half - mirrored so cleaner faces inward */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/cleannest_hero_new.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          transform: 'scaleX(-1)'
        }} />
      </div>

      {/* Gradient Overlay (blending the solid left side into the image) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, #ecfdf5 45%, rgba(236, 253, 245, 0.7) 55%, rgba(236, 253, 245, 0) 65%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: '650px'
        }}>
          {/* Left Column: Headlines & Instant Booking Widget */}
          <div>
            {/* Top Rating Pill */}
            <div className="scroll-animate fade-up" style={{
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

            {/* Main Headline */}
            <h1 className="scroll-animate fade-up delay-100" style={{
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

            {/* Subhead */}
            <p className="scroll-animate fade-up delay-200" style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '540px'
            }}>
              A cleaner home, a healthier you. Book trusted, vetted, and background-checked cleaning professionals in minutes.
            </p>

            {/* Instant Booking Quick-Card */}
            <div className="scroll-animate fade-up delay-300" style={{
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
            <div className="scroll-animate fade-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
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
        </div>
      </div>
    </section>
  );
};
