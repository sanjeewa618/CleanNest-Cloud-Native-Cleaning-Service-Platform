'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{
        background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)',
        borderRadius: '28px',
        padding: '36px 40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 35px -8px rgba(22, 101, 52, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '28px'
      }}>
        {/* Decorative background circle glow */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none'
        }} />

        {/* Left Side: Offer Info */}
        <div style={{ maxWidth: '480px', zIndex: 2 }}>
          {/* Badge: "Special Offer" - matches Screen 2 */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '16px'
          }}>
            <Tag size={14} />
            <span>Special Offer</span>
          </div>

          {/* Headline - matches Screen 2 */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '10px'
          }}>
            Get 20% Off
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            marginBottom: '24px'
          }}>
            on your first booking with code <strong style={{ color: '#ffffff', textDecoration: 'underline' }}>CLEAN20</strong>
          </p>

          {/* Button: "Book Now →" - matches Screen 2 */}
          <Link
            href="/booking?promo=CLEAN20"
            className="btn btn-white"
            style={{
              padding: '14px 28px',
              fontSize: '0.9375rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#14532d'
            }}
          >
            <span>Book Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right Side: Cozy Living Room Image Preview - matches Screen 2 */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '360px',
          height: '210px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          zIndex: 2
        }}>
          <img
            src="/images/living_room_banner.jpg"
            alt="Spotless living room with cozy sofa and plants"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {/* Subtle bottom badge on image */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={12} color="#4ade80" />
            <span>Guaranteed Spotless</span>
          </div>
        </div>
      </div>
    </div>
  );
};
