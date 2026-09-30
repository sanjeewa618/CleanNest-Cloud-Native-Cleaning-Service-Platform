'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Check,
  Clock,
  User,
  ShieldCheck,
  Edit2,
  Save,
  X
} from 'lucide-react';

export default function CleanerProfilePage() {
  const {
    cleaners,
    services,
    updateCleanerServices,
    updateCleanerProfile,
    currentUser,
    isInitialized
  } = useCleanNest();
  const router = useRouter();

  const cleaner = cleaners.find(c => c.id === currentUser?.id) || cleaners[0];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  useEffect(() => {
    if (cleaner && !isEditingProfile) {
      setEditForm({
        name: cleaner.name,
        email: cleaner.email,
        phone: cleaner.phone || '',
        avatar: cleaner.avatar
      });
    }
  }, [cleaner, isEditingProfile]);

  useEffect(() => {
    if (isInitialized && (!currentUser || currentUser.role !== 'cleaner')) {
      router.push('/login');
    }
  }, [currentUser, isInitialized, router]);

  if (!isInitialized || !cleaner) {
    return <div style={{ padding: '80px', textAlign: 'center' }}>Loading profile...</div>;
  }

  const handleToggleSpecialty = (serviceName: string) => {
    const currentSpecialties = cleaner.specialties || [];
    const updated = currentSpecialties.includes(serviceName)
      ? currentSpecialties.filter((s) => s !== serviceName)
      : [...currentSpecialties, serviceName];
    updateCleanerServices(cleaner.id, updated);
  };

  const handleSaveProfile = () => {
    updateCleanerProfile(cleaner.id, editForm);
    setIsEditingProfile(false);
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    width: '100%',
    maxWidth: '300px',
    fontSize: '0.95rem',
    color: '#0f172a'
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>My Profile</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Manage your personal details, specialties, and working slots.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Personal Details */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <User size={24} color="#15803d" /> Personal Information
            </h2>
            {!isEditingProfile && (
              <button 
                onClick={() => setIsEditingProfile(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                <Edit2 size={16} /> Edit
              </button>
            )}
          </div>
          
          {isEditingProfile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone} 
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Profile Image Upload</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditForm({...editForm, avatar: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{
                      ...inputStyle,
                      padding: '8px',
                      cursor: 'pointer'
                    }}
                  />
                  {editForm.avatar && editForm.avatar.startsWith('data:image') && (
                    <img src={editForm.avatar} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  onClick={handleSaveProfile}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '12px', backgroundColor: '#15803d', color: '#ffffff', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  <Save size={16} /> Save Changes
                </button>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
              <img
                src={cleaner.avatar}
                alt={cleaner.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f1f5f9' }}
              />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{cleaner.name}</div>
                <div style={{ color: '#64748b', marginBottom: '8px', fontSize: '0.95rem' }}>
                  {cleaner.email} <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span> {cleaner.phone}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#dcfce7', padding: '4px 12px', borderRadius: '9999px', width: 'fit-content' }}>
                  <ShieldCheck size={16} /> Verified Background Check
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services & Specialties */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            My Cleaning Services
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Select which cleaning types you accept jobs for.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {services.map((srv) => {
              const isSelected = (cleaner.specialties || []).includes(srv.name);
              return (
                <div
                  key={srv.id}
                  onClick={() => handleToggleSpecialty(srv.name)}
                  style={{
                    padding: '20px',
                    borderRadius: '18px',
                    border: isSelected ? '2px solid #22c55e' : '1px solid #e2e8f0',
                    backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                      {srv.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Base rate: ${srv.basePrice}/hr
                    </div>
                  </div>

                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: isSelected ? '#15803d' : '#f1f5f9',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isSelected && <Check size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Working Time Slots
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Configure your daily shift availability for dispatch matching.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
            {(cleaner.availability || []).map((slot, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={18} color="#15803d" />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                    {slot}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '4px 12px', borderRadius: '9999px' }}>
                  ACTIVE SHIFT
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
