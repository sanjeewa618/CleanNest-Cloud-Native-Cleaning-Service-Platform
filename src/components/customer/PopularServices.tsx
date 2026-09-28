'use client';

import React from 'react';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Home,
  Armchair,
  Sparkles,
  AppWindow,
  ShieldCheck,
  ChefHat,
  ArrowRight,
  Star
} from 'lucide-react';

export const PopularServices: React.FC = () => {
  const { services } = useCleanNest();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home size={28} />;
      case 'Armchair':
        return <Armchair size={28} />;
      case 'Sparkles':
        return <Sparkles size={28} />;
      case 'AppWindow':
        return <AppWindow size={28} />;
      case 'ShieldCheck':
        return <ShieldCheck size={28} />;
      case 'ChefHat':
        return <ChefHat size={28} />;
      default:
        return <Sparkles size={28} />;
    }
  };

  return (
    <section id="popular-services" style={{ margin: '48px 0' }}>
      {/* Section Header - matches Screen 2 */}
      <div style={{
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
            Popular Services
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Choose from our top-rated residential and specialty cleaning categories
          </p>
        </div>

        <Link
          href="/services/home-cleaning"
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

      {/* Services Grid (matches the rounded service cards in Screen 2) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: '16px'
      }}>
        {services.map((service, index) => {
          const isFirst = index === 0; // Home cleaning is primary in screenshot
          return (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              style={{
                backgroundColor: isFirst ? '#f0fdf4' : '#ffffff',
                border: isFirst ? '2px solid #22c55e' : '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '20px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isFirst ? '0 8px 20px rgba(34, 197, 94, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)'
              }}
              className="popular-service-card"
            >
              {/* Service Icon Box */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: isFirst ? '#dcfce7' : '#f8fafc',
                color: isFirst ? '#15803d' : '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                transition: 'transform 0.2s ease'
              }} className="icon-wrapper">
                {getServiceIcon(service.iconName)}
              </div>

              {/* Service Title */}
              <h3 style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '6px',
                lineHeight: 1.2
              }}>
                {service.name}
              </h3>

              {/* Rating & Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b' }}>
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{service.rating}</span>
                <span>• from ${service.basePrice}/hr</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .popular-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(21, 128, 61, 0.15) !important;
          border-color: #22c55e !important;
        }
        .popular-service-card:hover .icon-wrapper {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};
