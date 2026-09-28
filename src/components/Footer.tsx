'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#cbd5e1',
      paddingTop: '64px',
      paddingBottom: '32px',
      marginTop: '60px',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        {/* Trust Badges Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          paddingBottom: '48px',
          borderBottom: '1px solid #1e293b',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(21, 128, 61, 0.2)',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9375rem' }}>100% Insured & Bonded</h4>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Every cleaning task is fully insured</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(21, 128, 61, 0.2)',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9375rem' }}>Eco-Friendly Cleaning</h4>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Safe for children, pets & the planet</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(21, 128, 61, 0.2)',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={24} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9375rem' }}>Top Rated Cleaners</h4>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Average 4.9★ rating from 10k+ homes</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px',
          paddingBottom: '48px'
        }}>
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Clean<span style={{ color: '#4ade80' }}>Nest</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
              The modern on-demand cleaning service platform. Like Uber for spotless homes, offices, and upholstery care.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#4ade80" /> +1 (800) 555-NEST
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#4ade80" /> support@cleannest.com
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#4ade80" /> New York, NY • Nationwide
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '18px' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link href="/services/home-cleaning" style={{ color: '#94a3b8' }}>Home Cleaning</Link></li>
              <li><Link href="/services/sofa-cleaning" style={{ color: '#94a3b8' }}>Sofa & Couch Cleaning</Link></li>
              <li><Link href="/services/carpet-cleaning" style={{ color: '#94a3b8' }}>Carpet & Rug Washing</Link></li>
              <li><Link href="/services/window-cleaning" style={{ color: '#94a3b8' }}>Window Cleaning</Link></li>
              <li><Link href="/services/deep-cleaning" style={{ color: '#94a3b8' }}>Deep Home Sanitization</Link></li>
              <li><Link href="/services/kitchen-cleaning" style={{ color: '#94a3b8' }}>Kitchen Intensive</Link></li>
            </ul>
          </div>

          {/* Col 3: Actors & Portals */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '18px' }}>
              CleanNest Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link href="/" style={{ color: '#94a3b8' }}>Customer Booking App</Link></li>
              <li><Link href="/cleaner" style={{ color: '#4ade80', fontWeight: 600 }}>Cleaner / Provider Dashboard</Link></li>
              <li><Link href="/admin" style={{ color: '#38bdf8', fontWeight: 600 }}>Admin Control Center</Link></li>
              <li><Link href="/bookings" style={{ color: '#94a3b8' }}>Live Job Tracking</Link></li>
              <li><Link href="/login" style={{ color: '#94a3b8' }}>Sign In / Register</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantee */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '18px' }}>
              CleanNest Guarantee
            </h4>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontWeight: 700, marginBottom: '6px' }}>
                <ShieldCheck size={18} />
                <span>Spotless Promise</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Not 100% satisfied with your cleaner? We will re-clean your space free of charge. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8125rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} CleanNest Inc. All rights reserved. Clean Home, Happy Life.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#64748b' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b' }}>Terms of Service</a>
            <a href="#" style={{ color: '#64748b' }}>Cleaner Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
