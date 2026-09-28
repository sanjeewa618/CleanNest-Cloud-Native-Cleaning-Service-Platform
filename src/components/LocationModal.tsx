'use client';

import React, { useState } from 'react';
import { MapPin, X, Check, Navigation } from 'lucide-react';
import { useCleanNest } from '@/context/CleanNestContext';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { currentLocation, setCurrentLocation } = useCleanNest();
  const [customZip, setCustomZip] = useState('');

  if (!isOpen) return null;

  const popularLocations = [
    { city: 'New York, NY', state: 'Manhattan & Downtown', zip: '10001' },
    { city: 'Brooklyn, NY', state: 'Williamsburg & DUMBO', zip: '11201' },
    { city: 'Queens, NY', state: 'Astoria & LIC', zip: '11101' },
    { city: 'Jersey City, NJ', state: 'Downtown & Waterfront', zip: '07302' },
    { city: 'San Francisco, CA', state: 'Bay Area', zip: '94103' },
    { city: 'Los Angeles, CA', state: 'West Hollywood & Beverly', zip: '90069' }
  ];

  const handleSelect = (city: string) => {
    setCurrentLocation(city);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customZip.trim()) {
      setCurrentLocation(`ZIP ${customZip.trim()}`);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '460px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Select Service Area</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Choose where you want cleaning service</p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleCustomSubmit} style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '4px 6px 4px 14px',
            gap: '8px'
          }}>
            <MapPin size={18} color="var(--primary)" />
            <input
              type="text"
              placeholder="Enter ZIP code (e.g. 10001)"
              value={customZip}
              onChange={(e) => setCustomZip(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                padding: '8px 0',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ padding: '6px 14px', borderRadius: '10px' }}
            >
              Apply
            </button>
          </div>
        </form>

        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Popular Service Zones
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {popularLocations.map((loc) => {
            const isCurrent = currentLocation === loc.city;
            return (
              <div
                key={loc.city}
                onClick={() => handleSelect(loc.city)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: isCurrent ? 'var(--primary-soft)' : '#ffffff',
                  border: isCurrent ? '1.5px solid var(--primary)' : '1px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: isCurrent ? 'var(--primary-mint)' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCurrent ? 'var(--primary)' : '#64748b'
                  }}>
                    <Navigation size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{loc.city}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{loc.state} • {loc.zip}</div>
                  </div>
                </div>

                {isCurrent && <Check size={18} color="var(--primary)" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
