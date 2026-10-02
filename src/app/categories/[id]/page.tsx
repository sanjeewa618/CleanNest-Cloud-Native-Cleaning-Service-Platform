'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import { ArrowLeft, Star, Briefcase, ChevronRight, Lock, X, AlertCircle } from 'lucide-react';

export default function CategoryCleanersPage() {
  const params = useParams();
  const router = useRouter();
  const { services, cleaners, currentUser } = useCleanNest();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleBookClick = (cleanerId: string) => {
    if (!currentUser) {
      alert('You must sign in to proceed with booking! Please sign in first.');
      setShowAuthModal(true);
      return;
    }
    router.push(`/services/${service?.slug}?cleaner=${cleanerId}`);
  };

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

  // Find all active cleaners who have this service name in their specialties
  const availableCleaners = cleaners.filter((c) => 
    c.specialties?.includes(service.name) && 
    (c.status === 'ACTIVE' || c.status === 'active')
  );

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

                <button
                  onClick={() => handleBookClick(cleaner.id)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  <span>View Details & Book</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sign In Required Modal Popup */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            maxWidth: '460px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            textAlign: 'center',
            position: 'relative',
            border: '1px solid #e2e8f0',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={18} />
            </button>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <Lock size={32} color="#dc2626" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Sign In Required to Book
            </h3>

            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fef3c7',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '16px',
              color: '#b45309',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              ⚠️ Sign in is required to proceed with booking!
            </div>

            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '24px' }}>
              To ensure trust and safe job scheduling, please sign in to your CleanNest account before booking a service professional.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => router.push('/login')}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(21, 128, 61, 0.3)'
                }}
              >
                Sign In to Continue →
              </button>

              <button
                onClick={() => router.push('/register')}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '14px',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  fontWeight: 600,
                  fontSize: '0.925rem',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
