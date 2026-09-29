'use client';

import React from 'react';

export const AboutUsSection: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center'
        }}>
          {/* Left Column - Image with Badge */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(21, 128, 61, 0.15)'
            }}>
              <img
                src="/images/about_us_cleaner.jpg"
                alt="CleanNest professional cleaning"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            {/* Circular Badge overlapping top left */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '0px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(21, 128, 61, 0.3)',
              border: '6px solid #ffffff',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>10k+</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Clients</span>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#15803d', lineHeight: 1, letterSpacing: '-0.05em' }}>
                15
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Years Of Experience</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#22c55e' }}>We Provide</span>
              </div>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.2,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              We Will Make Absolutely Any Place Clean, Neat
            </h2>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '16px' }}>
              CleanNest was established with the motive to be a helping hand to homeowners and busy professionals. We provide a comprehensive range of services related to household and commercial cleaning, including deep cleaning, sanitization, and organizational tasks.
            </p>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Our expert team knows exactly what it takes to deliver an immaculate space. We believe that a clean environment inspires peace of mind and productivity. This inspires us to do our work with the best techniques and provide service with utmost dedication and perfection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
