'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCleanNest } from '@/context/CleanNestContext';
import { ServiceItem } from '@/data/mockData';
import {
  Check,
  Clock,
  User,
  ShieldCheck,
  Edit2,
  Save,
  X,
  Tag,
  DollarSign,
  Percent,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

export default function CleanerProfilePage() {
  const {
    cleaners,
    services,
    updateCleanerServices,
    updateCleanerProfile,
    updateServicePriceAndDiscount,
    currentUser,
    isInitialized
  } = useCleanNest();
  const router = useRouter();

  // Find the logged-in cleaner specifically for currentUser without hardcoded fallback
  const cleaner = cleaners.find(c => c.id === currentUser?.id || (currentUser?.email && c.email?.toLowerCase() === currentUser?.email.toLowerCase())) || (
    currentUser && (currentUser.role === 'cleaner' || (currentUser.role as string) === 'CLEANER') ? {
      id: currentUser.id,
      name: currentUser.name || 'Cleaner',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'Cleaner')}&background=random`,
      role: 'Professional Cleaner',
      rating: 5.0,
      reviewCount: 0,
      jobsCompleted: 0,
      isOnline: true,
      status: 'ACTIVE',
      specialties: ['Home Cleaning'],
      earnings: { today: 0, thisWeek: 0, total: 0 },
      availability: ['09:00 AM - 12:00 PM', '01:00 PM - 04:00 PM', '05:00 PM - 08:00 PM']
    } : null
  );

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  // Service Pricing & Discount State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPricingForm, setEditPricingForm] = useState<{
    basePrice: number;
    discountPercent: number;
    packages: { id: string; name: string; pricePerHour: number }[];
  } | null>(null);
  const [pricingSaveSuccess, setPricingSaveSuccess] = useState<string | null>(null);

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

  const handleStartEditPricing = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setEditPricingForm({
      basePrice: srv.basePrice,
      discountPercent: srv.discountPercent || 0,
      packages: srv.packages.map(p => ({
        id: p.id,
        name: p.name,
        pricePerHour: p.pricePerHour
      }))
    });
  };

  const handleSavePricing = (serviceId: string) => {
    if (!editPricingForm) return;
    const targetService = services.find(s => s.id === serviceId);
    if (!targetService) return;

    const updatedPackages = targetService.packages.map(pkg => {
      const match = editPricingForm.packages.find(p => p.id === pkg.id);
      return match ? { ...pkg, pricePerHour: match.pricePerHour } : pkg;
    });

    updateServicePriceAndDiscount(
      serviceId,
      editPricingForm.basePrice,
      editPricingForm.discountPercent,
      updatedPackages
    );

    setEditingServiceId(null);
    setEditPricingForm(null);
    setPricingSaveSuccess(targetService.name);
    setTimeout(() => setPricingSaveSuccess(null), 4000);
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>My Profile & Rates</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Manage your personal details, accepted specialties, hourly rates, and customer promotional discounts.
        </p>
      </div>

      {pricingSaveSuccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '24px',
          color: '#14532d',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(21, 128, 61, 0.1)'
        }}>
          <CheckCircle2 size={22} color="#15803d" />
          <div>
            <strong>Pricing & Discount Updated!</strong>
            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#166534', marginTop: '2px' }}>
              Your new hourly rates and discounts for <strong>{pricingSaveSuccess}</strong> are now live on the customer app and booking checkout.
            </div>
          </div>
        </div>
      )}

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

        {/* NEW: Service Pricing & Discounts Configuration */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Tag size={24} color="#15803d" /> Service Pricing & Promotional Discounts
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px', marginBottom: 0 }}>
                Set your custom hourly rates and add special discounts to attract more bookings. Changes instantly update on customer service pages and checkout.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
            {services.map((srv) => {
              const isSpecialty = (cleaner.specialties || []).includes(srv.name);
              const isEditing = editingServiceId === srv.id;
              const discount = srv.discountPercent || 0;
              const discountedBase = discount > 0 ? Math.round(srv.basePrice * (1 - discount / 100)) : srv.basePrice;

              return (
                <div
                  key={srv.id}
                  style={{
                    borderRadius: '20px',
                    border: isEditing ? '2px solid #22c55e' : '1px solid #e2e8f0',
                    backgroundColor: isEditing ? '#fcfdfd' : '#f8fafc',
                    padding: '24px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img
                        src={srv.image}
                        alt={srv.name}
                        style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>{srv.name}</span>
                          {isSpecialty && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '3px 10px', borderRadius: '9999px' }}>
                              Offered By You
                            </span>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Base Hourly:</span>
                            {discount > 0 ? (
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                <span style={{ fontWeight: 800, color: '#15803d', fontSize: '1.15rem' }}>
                                  Rs. {discountedBase.toLocaleString()}/hr
                                </span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.85rem' }}>
                                  Rs. {srv.basePrice.toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.15rem' }}>
                                Rs. {srv.basePrice.toLocaleString()}/hr
                              </span>
                            )}
                          </div>

                          {discount > 0 ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              backgroundColor: '#fef08a',
                              color: '#854d0e',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              padding: '2px 10px',
                              borderRadius: '8px'
                            }}>
                              <Percent size={13} /> {discount}% Active Discount
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                              No discount active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => handleStartEditPricing(srv)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 18px',
                          borderRadius: '12px',
                          backgroundColor: '#15803d',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(21, 128, 61, 0.2)'
                        }}
                      >
                        <Edit2 size={15} /> Edit Price & Discounts
                      </button>
                    )}
                  </div>

                  {/* Pricing Edit Form */}
                  {isEditing && editPricingForm && (
                    <div style={{
                      marginTop: '24px',
                      paddingTop: '20px',
                      borderTop: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                        {/* Base Price input */}
                        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                            <DollarSign size={16} color="#15803d" /> Base Hourly Rate (Rs.)
                          </label>
                          <input
                            type="number"
                            min="500"
                            step="50"
                            value={editPricingForm.basePrice}
                            onChange={(e) => setEditPricingForm({ ...editPricingForm, basePrice: Number(e.target.value) || 0 })}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: '1.5px solid #cbd5e1',
                              width: '100%',
                              fontSize: '1rem',
                              fontWeight: 700,
                              color: '#0f172a'
                            }}
                          />
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                            Standard starting rate per hour for this service.
                          </div>
                        </div>

                        {/* Discount Percentage selector */}
                        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                            <Percent size={16} color="#f59e0b" /> Promotional Discount (%)
                          </label>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            {[0, 5, 10, 15, 20, 25, 30].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => setEditPricingForm({ ...editPricingForm, discountPercent: pct })}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  border: editPricingForm.discountPercent === pct ? '2px solid #15803d' : '1px solid #e2e8f0',
                                  backgroundColor: editPricingForm.discountPercent === pct ? '#dcfce7' : '#ffffff',
                                  color: editPricingForm.discountPercent === pct ? '#14532d' : '#475569',
                                  cursor: 'pointer'
                                }}
                              >
                                {pct === 0 ? 'No Discount' : `${pct}% OFF`}
                              </button>
                            ))}
                          </div>

                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={editPricingForm.discountPercent}
                            onChange={(e) => setEditPricingForm({ ...editPricingForm, discountPercent: Math.min(80, Math.max(0, Number(e.target.value) || 0)) })}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '10px',
                              border: '1.5px solid #cbd5e1',
                              width: '100%',
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              color: '#0f172a'
                            }}
                          />
                        </div>
                      </div>

                      {/* Package Tiers Custom Pricing */}
                      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '12px' }}>
                          Package Tier Rates (per hour)
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                          {editPricingForm.packages.map((pkg, pIdx) => {
                            const discRate = editPricingForm.discountPercent > 0
                              ? Math.round(pkg.pricePerHour * (1 - editPricingForm.discountPercent / 100))
                              : pkg.pricePerHour;
                            return (
                              <div key={pkg.id} style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                                  {pkg.name} Tier
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Rs.</span>
                                  <input
                                    type="number"
                                    min="500"
                                    step="50"
                                    value={pkg.pricePerHour}
                                    onChange={(e) => {
                                      const val = Number(e.target.value) || 0;
                                      const updated = [...editPricingForm.packages];
                                      updated[pIdx] = { ...updated[pIdx], pricePerHour: val };
                                      setEditPricingForm({ ...editPricingForm, packages: updated });
                                    }}
                                    style={{
                                      padding: '6px 10px',
                                      borderRadius: '8px',
                                      border: '1px solid #cbd5e1',
                                      width: '100%',
                                      fontSize: '0.95rem',
                                      fontWeight: 700
                                    }}
                                  />
                                </div>
                                {editPricingForm.discountPercent > 0 && (
                                  <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600, marginTop: '6px' }}>
                                    Customers pay: Rs. {discRate.toLocaleString()}/hr
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Customer Preview Box */}
                      <div style={{
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Customer Live View Preview
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14532d' }}>
                              Rs. {(editPricingForm.discountPercent > 0
                                ? Math.round(editPricingForm.basePrice * (1 - editPricingForm.discountPercent / 100))
                                : editPricingForm.basePrice).toLocaleString()}/hr
                            </span>
                            {editPricingForm.discountPercent > 0 && (
                              <span style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '0.9rem' }}>
                                Rs. {editPricingForm.basePrice.toLocaleString()}
                              </span>
                            )}
                            {editPricingForm.discountPercent > 0 && (
                              <span style={{ backgroundColor: '#15803d', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                                {editPricingForm.discountPercent}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleSavePricing(srv.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '10px 20px',
                              borderRadius: '12px',
                              backgroundColor: '#15803d',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(21, 128, 61, 0.2)'
                            }}
                          >
                            <Save size={16} /> Save & Apply Rate
                          </button>
                          <button
                            onClick={() => {
                              setEditingServiceId(null);
                              setEditPricingForm(null);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '10px 16px',
                              borderRadius: '12px',
                              backgroundColor: '#ffffff',
                              color: '#64748b',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              border: '1px solid #cbd5e1',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} /> Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
              const discount = srv.discountPercent || 0;
              const discountedBase = discount > 0 ? Math.round(srv.basePrice * (1 - discount / 100)) : srv.basePrice;
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
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Rate: Rs. {discountedBase.toLocaleString()}/hr</span>
                      {discount > 0 && (
                        <span style={{ color: '#854d0e', backgroundColor: '#fef08a', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                          {discount}% OFF
                        </span>
                      )}
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
