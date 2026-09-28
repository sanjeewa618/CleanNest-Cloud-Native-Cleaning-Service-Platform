'use client';

import React from 'react';
import { CalendarCheck2, UserCheck, Navigation, Award } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Service & Time',
      desc: 'Select standard, deep, or specialized cleaning. Pick a convenient time slot in 60 seconds.',
      icon: <CalendarCheck2 size={26} color="#15803d" />
    },
    {
      step: '02',
      title: 'Matched with Top Pro',
      desc: 'Our intelligent platform assigns verified, insured, 5-star rated background-checked cleaners.',
      icon: <UserCheck size={26} color="#15803d" />
    },
    {
      step: '03',
      title: 'Uber-Like Live Tracking',
      desc: 'Track your cleaner’s arrival in real time. Receive updates from "On the way" to "Completed".',
      icon: <Navigation size={26} color="#15803d" />
    },
    {
      step: '04',
      title: 'Spotless Guarantee',
      desc: 'Inspect your fresh home. Cashless, seamless payments and instant tipping or review.',
      icon: <Award size={26} color="#15803d" />
    }
  ];

  return (
    <section style={{
      margin: '64px 0',
      padding: '54px 32px',
      backgroundColor: '#ffffff',
      borderRadius: '32px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#dcfce7',
          color: '#15803d',
          fontWeight: 700,
          fontSize: '0.8125rem',
          padding: '4px 14px',
          borderRadius: '9999px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '12px'
        }}>
          Seamless & Predictable
        </div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          marginBottom: '10px'
        }}>
          How CleanNest Works
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Like Uber for home services. Book in seconds, enjoy effortless cleanliness.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '28px'
      }}>
        {steps.map((st) => (
          <div
            key={st.step}
            style={{
              padding: '24px 20px',
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              border: '1px solid #f1f5f9',
              position: 'relative'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {st.icon}
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#cbd5e1',
                fontFamily: 'var(--font-display)'
              }}>
                {st.step}
              </span>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              {st.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
