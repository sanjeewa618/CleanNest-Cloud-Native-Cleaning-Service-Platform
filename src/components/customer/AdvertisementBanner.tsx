'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

const advertisements = [
  {
    id: 1,
    title: 'Get 20% Off',
    subtitle: 'on your first booking with code CLEAN20',
    tag: 'Special Offer',
    image: '/images/living_room_banner.jpg',
    badge: 'Guaranteed Spotless'
  },
  {
    id: 2,
    title: 'Free Deep Clean',
    subtitle: 'upgrade when you book 4 hours or more',
    tag: 'Limited Time',
    image: '/images/female_cleaner_hero.jpg',
    badge: 'Top Rated Pros'
  },
  {
    id: 3,
    title: 'Sofa Cleaning',
    subtitle: 'Remove 99% of allergens this spring',
    tag: 'Seasonal Deal',
    image: '/images/hero_cleaner.jpg',
    badge: 'Eco-Friendly'
  }
];

export const AdvertisementBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const activeAd = advertisements[currentIndex];

  return (
    <div 
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '20px 0',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="scroll-animate fade-up delay-200" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', minHeight: '380px', overflow: 'hidden', borderRadius: '28px' }}>
        <div style={{
          display: 'flex',
          width: `${advertisements.length * 100}%`,
          height: '100%',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${(currentIndex * 100) / advertisements.length}%)`
        }}>
          {advertisements.map((ad) => (
            <div 
              key={ad.id}
              style={{
                width: `${100 / advertisements.length}%`,
                height: '100%',
                backgroundColor: '#16a34a',
                padding: '40px 60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#ffffff',
                position: 'relative'
              }}
            >
              {/* Subtle background gradient overlay for the card */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Left Content */}
              <div style={{ zIndex: 2, maxWidth: '400px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '16px'
                }}>
                  <Tag size={14} />
                  {ad.tag}
                </div>

                <h3 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.1 }}>
                  {ad.title}
                </h3>
                <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '32px' }}>
                  {ad.subtitle}
                </p>

                <Link href="/#popular-services" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#16a34a',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}>
                  <span>Book Now</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Right Image */}
              <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
                <img
                  src={ad.image}
                  alt={ad.title}
                  style={{
                    width: '450px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={12} color="#4ade80" />
                  {ad.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
        {advertisements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: idx === currentIndex ? '#16a34a' : '#cbd5e1',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
