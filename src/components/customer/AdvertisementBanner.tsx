'use client';

import React, { useState, useEffect } from 'react';

const advertisements = [
  { id: 1, image: '/images/banner1.jpg' },
  { id: 2, image: '/images/banner2.jpg' },
  { id: 3, image: '/images/banner3.jpg' },
  { id: 4, image: '/images/banner4.jpg' },
  { id: 5, image: '/images/banner5.jpg' }
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
      <div className="scroll-animate fade-up delay-200" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', height: '400px', overflow: 'hidden', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
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
                position: 'relative'
              }}
            >
              <img
                src={ad.image}
                alt={`Advertisement ${ad.id}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
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

