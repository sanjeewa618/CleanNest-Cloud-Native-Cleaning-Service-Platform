'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Heart, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/register' || pathname?.startsWith('/admin') || pathname?.startsWith('/cleaner')) {
    return null;
  }

  return (
    <>
      <style>{`
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-weight: 500;
        }
        .footer-link:hover {
          color: #4ade80;
          transform: translateX(4px);
        }
        .portal-link {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-weight: 500;
        }
        .portal-link:hover {
          color: #38bdf8;
          transform: translateX(4px);
        }
        .footer-badge {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid transparent;
        }
        .footer-badge:hover {
          transform: translateY(-6px);
          background-color: rgba(30, 41, 59, 0.8);
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 15px 30px -10px rgba(34, 197, 94, 0.15);
        }
        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          background: #1e293b;
          color: #94a3b8;
          transition: all 0.3s ease;
          border: 1px solid #334155;
        }
        .social-icon:hover {
          background: #22c55e;
          color: #ffffff;
          border-color: #22c55e;
          transform: translateY(-3px);
          box-shadow: 0 8px 15px -5px rgba(34, 197, 94, 0.4);
        }
        .glass-panel {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <footer style={{
        backgroundColor: '#0b1120', // Darker, more premium background
        color: '#cbd5e1',
        position: 'relative',
        marginTop: '80px',
        overflow: 'hidden'
      }}>
        {/* Top gradient separator line */}
        <div style={{ height: '3px', width: '100%', background: 'linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%)', opacity: 0.8 }} />

        {/* Subtle background glow effect */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '72px', paddingBottom: '32px' }}>
          
          {/* Trust Badges Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '56px'
          }}>
            <div className="footer-badge scroll-animate fade-up delay-100" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.25) 0%, rgba(21, 128, 61, 0.1) 100%)',
                color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(74, 222, 128, 0.2)'
              }}>
                <ShieldCheck size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem', marginBottom: '4px', letterSpacing: '-0.01em' }}>100% Insured & Bonded</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Every cleaning task is fully insured</p>
              </div>
            </div>

            <div className="footer-badge scroll-animate fade-up delay-200" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.25) 0%, rgba(21, 128, 61, 0.1) 100%)',
                color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(74, 222, 128, 0.2)'
              }}>
                <Sparkles size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem', marginBottom: '4px', letterSpacing: '-0.01em' }}>Eco-Friendly Cleaning</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Safe for children, pets & the planet</p>
              </div>
            </div>

            <div className="footer-badge scroll-animate fade-up delay-300" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.25) 0%, rgba(21, 128, 61, 0.1) 100%)',
                color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(74, 222, 128, 0.2)'
              }}>
                <Heart size={26} strokeWidth={2.2} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem', marginBottom: '4px', letterSpacing: '-0.01em' }}>Top Rated Cleaners</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Average 4.9★ rating from 10k+ homes</p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            paddingBottom: '56px'
          }}>
            {/* Col 1: About */}
            <div className="scroll-animate fade-up delay-100">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                  boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Clean<span style={{ color: '#4ade80' }}>Nest</span>
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#94a3b8', marginBottom: '28px' }}>
                The modern on-demand cleaning service platform. Like Uber for spotless homes, offices, and upholstery care.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
                <a href="tel:+18005556378" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#4ade80'} onMouseOut={e => e.currentTarget.style.color = '#cbd5e1'}>
                  <div style={{ padding: '6px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '8px' }}><Phone size={16} color="#4ade80" /></div>
                  <span style={{ fontWeight: 600 }}>+1 (800) 555-NEST</span>
                </a>
                <a href="mailto:support@cleannest.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#4ade80'} onMouseOut={e => e.currentTarget.style.color = '#cbd5e1'}>
                  <div style={{ padding: '6px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '8px' }}><Mail size={16} color="#4ade80" /></div>
                  <span>support@cleannest.com</span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1' }}>
                  <div style={{ padding: '6px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '8px' }}><MapPin size={16} color="#4ade80" /></div>
                  <span>New York, NY • Nationwide</span>
                </div>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="scroll-animate fade-up delay-200">
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '0.02em', position: 'relative', display: 'inline-block' }}>
                Our Services
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', backgroundColor: '#22c55e', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', padding: 0, margin: 0 }}>
                <li><Link href="/services/home-cleaning" className="footer-link">Home Cleaning</Link></li>
                <li><Link href="/services/sofa-cleaning" className="footer-link">Sofa & Couch Cleaning</Link></li>
                <li><Link href="/services/carpet-cleaning" className="footer-link">Carpet & Rug Washing</Link></li>
                <li><Link href="/services/window-cleaning" className="footer-link">Window Cleaning</Link></li>
                <li><Link href="/services/deep-cleaning" className="footer-link">Deep Home Sanitization</Link></li>
                <li><Link href="/services/kitchen-cleaning" className="footer-link">Kitchen Intensive</Link></li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div className="scroll-animate fade-up delay-300">
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '0.02em', position: 'relative', display: 'inline-block' }}>
                Quick Links
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', backgroundColor: '#38bdf8', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', padding: 0, margin: 0 }}>
                <li><Link href="/about" className="portal-link">About Us</Link></li>
                <li><Link href="/how-it-works" className="portal-link">How It Works</Link></li>
                <li><Link href="/pricing" className="portal-link">Pricing & Packages</Link></li>
                <li><Link href="/faq" className="portal-link">FAQs</Link></li>
                <li><Link href="/contact" className="portal-link">Help Center</Link></li>
              </ul>
            </div>

            {/* Col 4: Guarantee & Social */}
            <div className="scroll-animate fade-up delay-400">
              <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '0.02em', position: 'relative', display: 'inline-block' }}>
                CleanNest Guarantee
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', backgroundColor: '#eab308', borderRadius: '2px' }}></span>
              </h4>
              <div className="glass-panel" style={{
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#4ade80' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ade80', fontWeight: 800, marginBottom: '8px', fontSize: '0.95rem' }}>
                  <ShieldCheck size={20} />
                  <span>Spotless Promise</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                  Not 100% satisfied with your cleaner? We will re-clean your space free of charge. No questions asked.
                </p>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            <div style={{ fontWeight: 500 }}>
              © {new Date().getFullYear()} CleanNest Inc. All rights reserved. <span style={{ color: '#cbd5e1' }}>Clean Home, Happy Life.</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontWeight: 500 }}>
              <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
              <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Terms of Service</a>
              <a href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Cleaner Safety</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

