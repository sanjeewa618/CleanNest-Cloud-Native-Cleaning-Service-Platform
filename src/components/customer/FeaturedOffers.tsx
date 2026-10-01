'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Tag } from 'lucide-react';
import { useCleanNest } from '@/context/CleanNestContext';

export const FeaturedOffers: React.FC = () => {
  const { services } = useCleanNest();

  const getFeaturedItem = (slug: string, defaultTitle: string, subtitle: string, defaultImg: string, defaultBadge: string) => {
    const srv = services.find(s => s.slug === slug);
    const basePrice = srv ? srv.basePrice : 2000;
    const discount = srv?.discountPercent || 0;
    const discountedPrice = discount > 0 ? Math.round(basePrice * (1 - discount / 100)) : basePrice;

    return {
      id: slug,
      title: srv?.name || defaultTitle,
      subtitle,
      image: srv?.image || defaultImg,
      slug,
      rawPrice: basePrice,
      discountedPrice,
      discount,
      rating: srv?.rating || 4.9,
      badge: discount > 0 ? `${discount}% OFF Promo` : defaultBadge
    };
  };

  const featured = [
    getFeaturedItem('deep-cleaning', 'Deep Cleaning', 'For a healthier home', '/images/female_cleaner_hero.jpg', 'Most Popular'),
    getFeaturedItem('kitchen-cleaning', 'Kitchen Cleaning', 'Sparkling results', '/images/kitchen_cleaning.jpg', 'Best Value'),
    getFeaturedItem('sofa-cleaning', 'Sofa & Couch Care', 'Stain & odor removal', '/images/hero_cleaner.jpg', 'Pet Friendly')
  ];

  return (
    <section style={{ margin: '48px 0' }}>
      {/* Header - Matches Screen 2 */}
      <div className="scroll-animate fade-up" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.65rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Featured Offers
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Handpicked specialized packages with verified 5-star cleaners
          </p>
        </div>

        <Link
          href="/services/deep-cleaning"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--primary)'
          }}
        >
          <span>See All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Cards Grid - Matches Screen 2 cards layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {featured.map((item, idx) => (
          <div
            className={`featured-offer-card scroll-animate fade-up delay-${(idx + 1) * 100}`}
            key={item.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image Box */}
            <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                className="featured-card-img"
              />
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(4px)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#15803d',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {item.badge}
              </div>

              {/* Rating */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Content Bottom - Matches Screen 2 text + round arrow button */}
            <div style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span>{item.subtitle} •</span>
                  <span style={{ fontWeight: 800, color: '#15803d' }}>Rs. {item.discountedPrice.toLocaleString()}/hr</span>
                  {item.discount > 0 && (
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.78rem' }}>
                      Rs. {item.rawPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Round Arrow Button - exactly like Screen 2 */}
              <Link
                href={`/services/${item.slug}`}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#f0fdf4',
                  color: '#15803d',
                  border: '1.5px solid #86efac',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                className="round-arrow-btn"
              >
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .featured-offer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(22, 101, 52, 0.12) !important;
          border-color: #86efac !important;
        }
        .featured-offer-card:hover .featured-card-img {
          transform: scale(1.04);
        }
        .featured-offer-card:hover .round-arrow-btn {
          background-color: #15803d !important;
          color: #ffffff !important;
          border-color: #15803d !important;
        }
      `}</style>
    </section>
  );
};
