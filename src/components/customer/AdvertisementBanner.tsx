'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Tag } from 'lucide-react';

const advertisements = [
  {
    id: 1,
    image: '/images/banner1.jpg',
    tag: 'LIMITED TIME OFFER',
    title: 'Deep Home Cleaning Special',
    highlight: '25% OFF',
    description: 'Transform your home with verified 5-star cleaning professionals. Eco-friendly & pet safe.',
    badge: 'Code: CLEAN25',
    ctaText: 'Book Now & Save',
    ctaLink: '/booking',
    accentColor: '#15803d'
  },
  {
    id: 2,
    image: '/images/banner2.jpg',
    tag: 'KITCHEN & APPLIANCES',
    title: 'Intensive Kitchen Care',
    highlight: '99.9% Bacteria-Free',
    description: 'Deep degreasing, oven sanitization & sparkling marble restoration by certified specialists.',
    badge: 'Starting at Rs. 1,800/hr',
    ctaText: 'Explore Kitchen Clean',
    ctaLink: '/services/kitchen-cleaning',
    accentColor: '#0284c7'
  },
  {
    id: 3,
    image: '/images/banner3.jpg',
    tag: 'UPHOLSTERY & LIVING ROOM',
    title: 'Sofa & Fabric Steam Care',
    highlight: 'Stain & Odor Removal',
    description: 'Deep upholstery extraction for sofas, carpets & curtains. Gentle on fabrics, tough on dirt.',
    badge: 'Pet Friendly Guarantee',
    ctaText: 'Restore Your Sofa',
    ctaLink: '/services/sofa-cleaning',
    accentColor: '#d97706'
  },
  {
    id: 4,
    image: '/images/banner4.jpg',
    tag: 'TRUSTED PLATFORM',
    title: 'Certified Pro Cleaners',
    highlight: '5-Star Top Rated',
    description: 'Over 5,000+ happy homes served with verified background checks and instant re-booking.',
    badge: '100% Satisfaction',
    ctaText: 'Choose Your Cleaner',
    ctaLink: '/services/deep-cleaning',
    accentColor: '#16a34a'
  }
];

export const AdvertisementBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % advertisements.length);
  };

  return (
    <div 
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '16px 0 32px 0',
        backgroundColor: 'transparent',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="scroll-animate fade-up delay-200" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          height: '420px', 
          overflow: 'hidden', 
          borderRadius: '28px', 
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}
      >
        <div style={{
          display: 'flex',
          width: `${advertisements.length * 100}%`,
          height: '100%',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${(currentIndex * 100) / advertisements.length}%)`
        }}>
          {advertisements.map((ad, idx) => (
            <div 
              key={ad.id}
              style={{
                width: `${100 / advertisements.length}%`,
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Image */}
              <img
                src={ad.image}
                alt={ad.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Dynamic Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.72) 48%, rgba(15, 23, 42, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 60px'
              }}>
                <div style={{ maxWidth: '580px', color: '#ffffff', zIndex: 2 }}>
                  {/* Tag badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    marginBottom: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.35)'
                  }}>
                    <Tag size={13} color="#ffffff" />
                    <span style={{ color: '#ffffff' }}>{ad.tag}</span>
                  </div>

                  {/* Title & Highlight */}
                  <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                  }}>
                    <span style={{ color: '#ffffff' }}>{ad.title}</span> <span style={{ color: '#ffffff', opacity: 0.95 }}>({ad.highlight})</span>
                  </h2>

                  {/* Description */}
                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.55,
                    color: '#ffffff',
                    opacity: 0.95,
                    marginBottom: '24px',
                    textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                    fontWeight: 500
                  }}>
                    {ad.description}
                  </p>

                  {/* Action Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <Link
                      href={ad.ctaLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 28px',
                        borderRadius: '9999px',
                        backgroundColor: '#15803d',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        boxShadow: '0 8px 24px rgba(21, 128, 61, 0.45)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      className="ad-cta-btn"
                    >
                      <span style={{ color: '#ffffff' }}>{ad.ctaText}</span>
                      <ArrowRight size={16} color="#ffffff" />
                    </Link>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      border: '1px solid rgba(255, 255, 255, 0.4)'
                    }}>
                      <ShieldCheck size={16} color="#ffffff" />
                      <span style={{ color: '#ffffff' }}>{ad.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            zIndex: 10,
            color: '#0f172a'
          }}
          className="ad-arrow-btn"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            zIndex: 10,
            color: '#0f172a'
          }}
          className="ad-arrow-btn"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
        {advertisements.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '32px' : '8px',
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

      <style jsx>{`
        .ad-cta-btn:hover {
          transform: translateY(-2px);
          background-color: #16a34a !important;
          box-shadow: 0 12px 30px rgba(22, 163, 74, 0.5) !important;
        }
        .ad-arrow-btn:hover {
          background-color: #ffffff !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
      `}</style>
    </div>
  );
};

