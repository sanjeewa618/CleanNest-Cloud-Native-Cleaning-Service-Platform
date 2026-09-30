'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import { ArrowLeft, Star, Briefcase, ChevronRight } from 'lucide-react';

export default function CategoryCleanersPage() {
  const params = useParams();
  const router = useRouter();
  const { services, cleaners } = useCleanNest();

  const serviceSlug = (params?.id as string) || 'home-cleaning';
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Service not found</h2>
        <button onClick={() => router.push('/')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Go Home
        </button>
      </div>
    );
  }

  // Find all cleaners who have this service name in their specialties
  const availableCleaners = cleaners.filter((c) => c.specialties.includes(service.name));

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#15803d',
        backgroundImage: `url(${service.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#ffffff',
        padding: '60px 0 40px 0',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(20,83,45,0.6) 0%, rgba(21,128,61,0) 100%)',
          zIndex: 0
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/"
            className="scroll-animate fade-up delay-100"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <h1 className="scroll-animate fade-up delay-200" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px', color: '#ffffff' }}>
            {service.name} Professionals
          </h1>
          <p className="scroll-animate fade-up delay-300" style={{ fontSize: '1.1rem', color: '#f0fdf4', maxWidth: '600px' }}>
            Select one of our top-rated {service.name.toLowerCase()} experts to see their details and book a service.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-20px' }}>
        {availableCleaners.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <h3>No professionals found for this category currently.</h3>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {availableCleaners.map((cleaner, idx) => (
              <div
                className={`scroll-animate fade-up delay-${(idx + 1) * 100}`}
                key={cleaner.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                  <img
                    src={cleaner.avatar}
                    alt={cleaner.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #f0fdf4'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                      {cleaner.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
                      {cleaner.role}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
                        <Star size={14} fill="#f59e0b" />
                        {cleaner.rating}
                      </div>
                      <span style={{ color: '#cbd5e1' }}>|</span>
                      <span style={{ color: '#64748b' }}>{cleaner.jobsCompleted} jobs</span>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Specialties
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cleaner.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: spec === service.name ? '#dcfce7' : '#f1f5f9',
                          color: spec === service.name ? '#15803d' : '#475569',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/services/${service.slug}?cleaner=${cleaner.id}`}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '0.95rem'
                  }}
                >
                  <span>View Details & Book</span>
                  <ChevronRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
