'use client';

import React from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { reviews } = useCleanNest();

  return (
    <section style={{ margin: '64px 0' }}>
      <div className="scroll-animate fade-up" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
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
          <Star size={14} fill="#15803d" /> Verified Customer Reviews
        </div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          marginBottom: '10px'
        }}>
          Loved by 10,000+ Happy Homes
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          See what our satisfied customers have to say about their CleanNest experience.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {reviews.map((rev, idx) => (
          <div
            className={`scroll-animate fade-up delay-${(idx + 1) * 100}`}
            key={rev.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              {/* Rating stars & Service Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {rev.serviceName}
                </span>
              </div>

              {/* Review Text */}
              <p style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{rev.comment}"
              </p>
            </div>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <img
                src={rev.avatar}
                alt={rev.customerName}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{rev.customerName}</span>
                  <CheckCircle size={14} color="#15803d" />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified Resident • {rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
