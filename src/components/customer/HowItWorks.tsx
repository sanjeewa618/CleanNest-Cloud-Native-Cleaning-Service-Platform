'use client';

import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Service & Time',
      desc: 'Select standard, deep, or specialized cleaning. Pick a convenient time slot in 60 seconds.',
      image: '/images/how_it_works_1.jpg'
    },
    {
      step: '02',
      title: 'Matched with Top Pro',
      desc: 'Our intelligent platform assigns verified, insured, 5-star rated background-checked cleaners.',
      image: '/images/how_it_works_2.jpg'
    },
    {
      step: '03',
      title: 'Uber-Like Live Tracking',
      desc: 'Track your cleaner’s arrival in real time. Receive updates from "On the way" to "Completed".',
      image: '/images/female_cleaner_hero.jpg'
    },
    {
      step: '04',
      title: 'Spotless Guarantee',
      desc: 'Inspect your fresh home. Cashless, seamless payments and instant tipping or review.',
      image: '/images/living_room_banner.jpg'
    }
  ];

  return (
    <section style={{
      margin: '80px 0',
      padding: '40px 0'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px auto' }}>
        <div style={{
          display: 'inline-block',
          color: '#facc15',
          fontWeight: 700,
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '12px'
        }}>
          Seamless & Predictable
        </div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          marginBottom: '16px'
        }}>
          How CleanNest Works
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Like Uber for home services. Book in seconds, enjoy effortless cleanliness.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        padding: '0 20px'
      }}>
        {steps.map((st) => (
          <div
            key={st.step}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {/* Circular Image with Border and Badge */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                padding: '8px',
                background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                boxShadow: '0 10px 25px rgba(21, 128, 61, 0.2)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}>
                  <img
                    src={st.image}
                    alt={st.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>

              {/* Step Number Badge */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '-12px',
                backgroundColor: '#facc15',
                color: '#0f172a',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transform: 'rotate(-5deg)'
              }}>
                {st.step}
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
              {st.title}
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65 }}>
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
