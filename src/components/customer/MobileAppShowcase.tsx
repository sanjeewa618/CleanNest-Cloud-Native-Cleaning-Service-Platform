'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Star,
  MapPin,
  Bell,
  Search,
  Tag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  Check,
  Heart,
  Share2,
  Home,
  Calendar,
  Plus,
  MessageSquare,
  User
} from 'lucide-react';

export const MobileAppShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'screen1' | 'screen2' | 'screen3'>('screen2');

  return (
    <section style={{
      margin: '80px 0 40px 0',
      padding: '60px 32px',
      backgroundColor: '#f0fdf4',
      borderRadius: '36px',
      border: '1px solid #bbf7d0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            fontWeight: 700,
            fontSize: '0.8125rem',
            padding: '4px 14px',
            borderRadius: '9999px',
            marginBottom: '12px'
          }}>
            <Smartphone size={14} /> Built From CleanNest Mobile Experience
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            marginBottom: '12px'
          }}>
            The Uber for Cleaning Services
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Seamless experience on web, tablet, and mobile. Explore the 3 core screens recreated from the native app design.
          </p>

          {/* Interactive Screen Selector Pills */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: '#ffffff',
            padding: '6px',
            borderRadius: '9999px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            marginTop: '20px',
            gap: '6px'
          }}>
            <button
              onClick={() => setActiveTab('screen1')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'screen1' ? '#15803d' : 'transparent',
                color: activeTab === 'screen1' ? '#ffffff' : '#64748b'
              }}
            >
              1. Welcome & Onboarding
            </button>
            <button
              onClick={() => setActiveTab('screen2')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'screen2' ? '#15803d' : 'transparent',
                color: activeTab === 'screen2' ? '#ffffff' : '#64748b'
              }}
            >
              2. Home & Discovery
            </button>
            <button
              onClick={() => setActiveTab('screen3')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'screen3' ? '#15803d' : 'transparent',
                color: activeTab === 'screen3' ? '#ffffff' : '#64748b'
              }}
            >
              3. Service Details & Packages
            </button>
          </div>
        </div>

        {/* 3 Screen Interactive Mockups Carousel/Preview */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          {/* SCREEN 1: ONBOARDING */}
          <div style={{
            width: '320px',
            height: '620px',
            backgroundColor: '#ffffff',
            borderRadius: '40px',
            boxShadow: activeTab === 'screen1' ? '0 25px 60px -10px rgba(21, 128, 61, 0.4)' : '0 15px 35px rgba(0,0,0,0.1)',
            border: activeTab === 'screen1' ? '4px solid #22c55e' : '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            opacity: activeTab === 'screen1' ? 1 : 0.65,
            transform: activeTab === 'screen1' ? 'scale(1.03)' : 'scale(0.96)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {/* Top cleaner image */}
            <div style={{ height: '360px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="/images/hero_cleaner.jpg"
                alt="Onboarding cleaner"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Brand logo top left */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '4px 10px',
                borderRadius: '9999px',
                backdropFilter: 'blur(6px)'
              }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: '#15803d' }}></div>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a' }}>CleanNest</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '8px' }}>
                Professional Cleaning Services at <span style={{ color: '#15803d' }}>Your Door</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '20px' }}>
                A cleaner home, a healthier you. Book trusted professionals in minutes.
              </p>

              <Link
                href="/services/home-cleaning"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.875rem', borderRadius: '9999px' }}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>

              {/* Dots indicator */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#15803d' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></span>
              </div>
            </div>
          </div>

          {/* SCREEN 2: HOME / DISCOVERY */}
          <div style={{
            width: '320px',
            height: '620px',
            backgroundColor: '#ffffff',
            borderRadius: '40px',
            boxShadow: activeTab === 'screen2' ? '0 25px 60px -10px rgba(21, 128, 61, 0.4)' : '0 15px 35px rgba(0,0,0,0.1)',
            border: activeTab === 'screen2' ? '4px solid #22c55e' : '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            opacity: activeTab === 'screen2' ? 1 : 0.65,
            transform: activeTab === 'screen2' ? 'scale(1.03)' : 'scale(0.96)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {/* Header */}
            <div style={{ padding: '16px 18px 8px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b' }}>
                    <MapPin size={12} color="#15803d" />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>New York, NY ⌄</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>Good morning, Alex 👋</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={14} color="#334155" />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Alex"
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Search bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '6px 10px',
                fontSize: '0.75rem',
                color: '#94a3b8'
              }}>
                <Search size={14} />
                <span>Search for cleaning services...</span>
              </div>
            </div>

            {/* Middle: 20% Offer & Popular Services */}
            <div style={{ padding: '0 18px', overflowY: 'auto' }}>
              {/* Mini Green Offer Card */}
              <div style={{
                background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                borderRadius: '16px',
                padding: '12px 14px',
                color: '#ffffff',
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.25)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    Special Offer
                  </span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '4px' }}>Get 20% Off</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>on your first booking</div>
                </div>
                <div style={{ width: '60px', height: '50px', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src="/images/living_room_banner.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* Popular Services Section */}
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                <span>Popular Services</span>
                <span style={{ color: '#15803d', fontSize: '0.72rem' }}>See All &gt;</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '14px' }}>
                <div style={{ border: '1.5px solid #22c55e', backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                  <Home size={18} color="#15803d" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#15803d' }}>Home</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '2px' }}>🛋️</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 600 }}>Sofa</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '2px' }}>🧶</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 600 }}>Carpet</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px 2px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '2px' }}>🪟</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 600 }}>Window</div>
                </div>
              </div>

              {/* Featured Offers */}
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                <span>Featured Offers</span>
                <span style={{ color: '#15803d', fontSize: '0.72rem' }}>See All &gt;</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="/images/female_cleaner_hero.jpg" style={{ width: '100%', height: '55px', objectFit: 'cover' }} />
                  <div style={{ padding: '6px 8px', fontSize: '0.7rem', fontWeight: 700 }}>Deep Clean</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="/images/living_room_banner.jpg" style={{ width: '100%', height: '55px', objectFit: 'cover' }} />
                  <div style={{ padding: '6px 8px', fontSize: '0.7rem', fontWeight: 700 }}>Kitchen</div>
                </div>
              </div>
            </div>

            {/* Bottom Nav Bar - matches Screen 2 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '10px 16px',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#ffffff'
            }}>
              <Home size={18} color="#15803d" />
              <Calendar size={18} color="#94a3b8" />
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#15803d',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(21, 128, 61, 0.4)'
              }}>
                <Plus size={20} />
              </div>
              <MessageSquare size={18} color="#94a3b8" />
              <User size={18} color="#94a3b8" />
            </div>
          </div>

          {/* SCREEN 3: SERVICE DETAILS & PACKAGES */}
          <div style={{
            width: '320px',
            height: '620px',
            backgroundColor: '#ffffff',
            borderRadius: '40px',
            boxShadow: activeTab === 'screen3' ? '0 25px 60px -10px rgba(21, 128, 61, 0.4)' : '0 15px 35px rgba(0,0,0,0.1)',
            border: activeTab === 'screen3' ? '4px solid #22c55e' : '1px solid #e2e8f0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            opacity: activeTab === 'screen3' ? 1 : 0.65,
            transform: activeTab === 'screen3' ? 'scale(1.03)' : 'scale(0.96)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {/* Top Image Hero with back, heart, share icons - matches Screen 3 */}
            <div style={{ height: '220px', position: 'relative' }}>
              <img
                src="/images/female_cleaner_hero.jpg"
                alt="Home Cleaning pro"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={16} color="#ef4444" />
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Share2 size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Details Content - matches Screen 3 */}
            <div style={{ padding: '16px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>Home Cleaning</h3>
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', marginBottom: '8px' }}>
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700 }}>4.9</span>
                <span style={{ color: '#64748b' }}>(2.3k reviews)</span>
              </div>

              {/* Metadata Badges - matches Screen 3 */}
              <div style={{ display: 'flex', gap: '4px', fontSize: '0.65rem', color: '#475569', marginBottom: '12px' }}>
                <span style={{ backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '6px' }}>⏱️ 2-3 Hours</span>
                <span style={{ backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '6px' }}>🛡️ Insured</span>
                <span style={{ backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '6px' }}>⚡ Same Day</span>
              </div>

              {/* Packages selection: Standard $65, Deep Clean $96, Move In/Out $120 */}
              <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>Select Your Package</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Standard</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>$65<span style={{ fontSize: '0.6rem' }}>/hr</span></div>
                </div>
                <div style={{ border: '1.5px solid #22c55e', backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#15803d', fontWeight: 700 }}>Deep Clean</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d' }}>$96<span style={{ fontSize: '0.6rem' }}>/hr</span></div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Move In/Out</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>$120<span style={{ fontSize: '0.6rem' }}>/hr</span></div>
                </div>
              </div>
            </div>

            {/* Bottom Book Button - matches Screen 3 */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
              <Link
                href="/services/home-cleaning"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.875rem', borderRadius: '9999px' }}
              >
                <span>Book Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
