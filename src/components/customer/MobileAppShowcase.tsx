'use client';

import React from 'react';
import { ShieldCheck, Clock, Star, Sparkles } from 'lucide-react';

export const MobileAppShowcase: React.FC = () => {
  return (
    <section style={{
      margin: '80px 0 40px 0',
      padding: '80px 32px',
      backgroundColor: '#f0fdf4',
      borderRadius: '36px',
      border: '1px solid #bbf7d0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="scroll-animate fade-up" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
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
            marginBottom: '16px'
          }}>
            <Sparkles size={14} /> The CleanNest Difference
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            lineHeight: 1.1
          }}>
            Why choose our services?
          </h2>
          <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6 }}>
            We provide a premium, hassle-free cleaning experience tailored to your lifestyle. 
            Discover the benefits of a truly spotless home.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'stretch'
        }}>
          {/* Feature 1 */}
          <div className="scroll-animate fade-up delay-100" style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 10px 40px -10px rgba(21, 128, 61, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img src="/images/hero_cleaner.jpg" alt="Vetted Professionals" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <ShieldCheck size={28} color="#15803d" />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Vetted Professionals
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>
                Every cleaner undergoes a rigorous background check and comprehensive training to ensure your peace of mind and top-tier service.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="scroll-animate fade-up delay-200" style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 10px 40px -10px rgba(21, 128, 61, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img src="/images/living_room_banner.jpg" alt="Flexible Scheduling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Clock size={28} color="#15803d" />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Flexible Scheduling
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>
                Book a cleaning that fits perfectly into your busy life. We offer same-day service, weekly plans, and custom times just for you.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="scroll-animate fade-up delay-300" style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 10px 40px -10px rgba(21, 128, 61, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img src="/images/female_cleaner_hero.jpg" alt="Satisfaction Guarantee" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '32px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Star size={28} color="#15803d" />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Satisfaction Guarantee
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>
                We pride ourselves on excellence. If you are not 100% satisfied with the results, we will re-clean your space for free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
