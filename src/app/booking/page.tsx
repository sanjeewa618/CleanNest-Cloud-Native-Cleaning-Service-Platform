'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Plus,
  Tag,
  Star
} from 'lucide-react';

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { services, cleaners, currentUser, createBooking, draftBooking } = useCleanNest();

  const serviceSlug = searchParams.get('service') || 'home-cleaning';
  const packageParam = searchParams.get('package');

  const selectedService = services.find((s) => s.slug === serviceSlug) || services[0];
  const initialPackage =
    selectedService.packages.find((p) => p.id === packageParam) ||
    selectedService.packages.find((p) => p.recommended) ||
    selectedService.packages[0];

  const [packageId, setPackageId] = useState(initialPackage.id);
  const [hours, setHours] = useState(draftBooking?.hours || 3);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Oct 1st');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [cleanerChoice, setCleanerChoice] = useState<string>('auto'); // 'auto' or cleaner ID
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [apt, setApt] = useState('Apt 4B');
  const [city, setCity] = useState('New York, NY');
  const [zip, setZip] = useState('10001');
  const [entryNotes, setEntryNotes] = useState('Buzzer #4B, please ring twice. Friendly golden retriever inside.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [promoCode, setPromoCode] = useState('CLEAN20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const currentPkg = selectedService.packages.find((p) => p.id === packageId) || selectedService.packages[0];

  const addonsList = [
    { id: 'addon-oven', name: 'Interior Oven Degrease', price: 30 },
    { id: 'addon-fridge', name: 'Interior Refrigerator Sanitizing', price: 25 },
    { id: 'addon-laundry', name: '1 Load Laundry & Folding', price: 20 },
    { id: 'addon-eco', name: '100% Organic Plant-Based Supplies', price: 10 }
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = addonsList.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const baseSubtotal = currentPkg.pricePerHour * hours + addonsTotal;
  const discountAmount = promoApplied ? baseSubtotal * 0.2 : 0;
  const serviceFee = 15;
  const grandTotal = Math.max(0, baseSubtotal - discountAmount + serviceFee);

  const timeSlots = [
    '08:00 AM - 11:00 AM',
    '10:00 AM - 01:00 PM',
    '01:30 PM - 04:30 PM',
    '05:00 PM - 08:00 PM'
  ];

  const dateOptions = [
    { day: 'Today', date: 'Sep 30', label: 'Express ($10)' },
    { day: 'Tomorrow', date: 'Oct 1st', label: 'Recommended' },
    { day: 'Thursday', date: 'Oct 2nd', label: 'Standard' },
    { day: 'Friday', date: 'Oct 3rd', label: 'Standard' },
    { day: 'Saturday', date: 'Oct 4th', label: 'Weekend' }
  ];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CLEAN20') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try CLEAN20 for 20% off!');
    }
  };

  const handleCompleteBooking = () => {
    setIsSubmitting(true);

    const chosenCleaner = cleanerChoice !== 'auto'
      ? cleaners.find((c) => c.id === cleanerChoice)
      : cleaners[0];

    setTimeout(() => {
      const created = createBooking({
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone || '+1 (555) 019-2834',
        customerAddress: {
          street: streetAddress,
          apartment: apt,
          city: city,
          zip: zip,
          notes: entryNotes
        },
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        packageId: currentPkg.id,
        packageName: currentPkg.name,
        pricePerHour: currentPkg.pricePerHour,
        hours: hours,
        selectedDate: selectedDate,
        selectedTimeSlot: selectedTimeSlot,
        cleanerId: chosenCleaner?.id,
        cleanerName: chosenCleaner?.name,
        cleanerAvatar: chosenCleaner?.avatar,
        cleanerPhone: chosenCleaner?.phone,
        status: 'accepted',
        subtotal: baseSubtotal,
        discount: discountAmount,
        serviceFee: serviceFee,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod,
        paymentStatus: 'paid'
      });

      setIsSubmitting(false);
      setConfirmedBookingId(created.id);
    }, 1200);
  };

  if (confirmedBookingId) {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '640px', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '32px',
          padding: '48px 36px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 8px 20px rgba(21, 128, 61, 0.3)'
          }}>
            <CheckCircle2 size={44} />
          </div>

          <span style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            fontSize: '0.8125rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            BOOKING CONFIRMED
          </span>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            You're All Set! 🎉
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.5, marginBottom: '28px' }}>
            We've assigned your cleaner for <strong>{selectedService.name}</strong> on <strong>{selectedDate} ({selectedTimeSlot})</strong>.
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '20px',
            padding: '20px',
            textAlign: 'left',
            marginBottom: '28px',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>Assigned Cleaner:</span>
              <strong style={{ color: '#0f172a' }}>{cleaners[0].name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>Service Location:</span>
              <strong style={{ color: '#0f172a' }}>{streetAddress}, {city}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>Total Paid:</span>
              <strong style={{ color: '#15803d', fontSize: '1.1rem' }}>${grandTotal.toFixed(2)}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/bookings"
              className="btn btn-primary"
              style={{ padding: '14px 28px', borderRadius: '9999px', fontSize: '0.95rem' }}
            >
              <span>Track Live Booking</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/"
              className="btn btn-secondary"
              style={{ padding: '14px 24px', borderRadius: '9999px', fontSize: '0.95rem' }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '32px 0 80px 0' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ marginBottom: '28px' }}>
          <Link
            href={`/services/${selectedService.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '10px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to {selectedService.name}</span>
          </Link>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
            Book Your Cleaning Professional
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Schedule in seconds, track in real time, and pay securely.
          </p>
        </div>

        {/* Main Grid: Form Steps + Summary Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Multi-Step Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* 1. Service & Package Selection */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Select Package Tier & Hours
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {selectedService.packages.map((pkg) => {
                  const isSelected = packageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setPackageId(pkg.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid #22c55e' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: isSelected ? '#15803d' : '#0f172a' }}>
                        {pkg.name}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0f172a', margin: '4px 0' }}>
                        ${pkg.pricePerHour}<span style={{ fontSize: '0.75rem', color: '#64748b' }}>/hr</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  Duration: {hours} Hours
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* 2. Date & Time Selection */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Date & Arrival Time Slot
                </h3>
              </div>

              {/* Date selection cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {dateOptions.map((item) => {
                  const fullDateText = `${item.day}, ${item.date}`;
                  const isSelected = selectedDate === fullDateText;
                  return (
                    <div
                      key={item.day}
                      onClick={() => setSelectedDate(fullDateText)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid #22c55e' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.day}</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', margin: '2px 0' }}>
                        {item.date}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: isSelected ? '#15803d' : '#94a3b8', fontWeight: 600 }}>
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time slot chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <div
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #15803d' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        color: isSelected ? '#15803d' : '#334155',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Address & Entry Instructions */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Service Address & Access
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Apt / Suite
                  </label>
                  <input
                    type="text"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    City & State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Entry Instructions / Pet Notes
                </label>
                <textarea
                  rows={2}
                  value={entryNotes}
                  onChange={(e) => setEntryNotes(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            {/* 4. Cleaner Selection */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  4
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Cleaner Matching Preference
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Auto Match */}
                <div
                  onClick={() => setCleanerChoice('auto')}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: cleanerChoice === 'auto' ? '2px solid #22c55e' : '1px solid #e2e8f0',
                    backgroundColor: cleanerChoice === 'auto' ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                        Auto-Match Highest Rated Cleaner (Recommended)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Platform automatically matches the top available 5-star pro nearest to your address
                      </div>
                    </div>
                  </div>
                  {cleanerChoice === 'auto' && <CheckCircle2 size={20} color="#15803d" />}
                </div>

                {/* Specific Cleaners */}
                {cleaners.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCleanerChoice(c.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      border: cleanerChoice === c.id ? '2px solid #22c55e' : '1px solid #e2e8f0',
                      backgroundColor: cleanerChoice === c.id ? '#f0fdf4' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>{c.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          ⭐ {c.rating} ({c.reviewCount} reviews) • {c.jobsCompleted} cleanings completed
                        </div>
                      </div>
                    </div>
                    {cleanerChoice === c.id && <CheckCircle2 size={20} color="#15803d" />}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Optional Add-ons */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  5
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Popular Add-Ons
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        border: isChecked ? '2px solid #22c55e' : '1px solid #e2e8f0',
                        backgroundColor: isChecked ? '#f0fdf4' : '#ffffff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>{addon.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>+${addon.price}</div>
                      </div>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isChecked ? 'none' : '1.5px solid #cbd5e1',
                        backgroundColor: isChecked ? '#15803d' : 'transparent',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isChecked && <CheckCircle2 size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Instant Checkout */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                Booking Summary
              </h3>

              {/* Service info card */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '20px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                  {selectedService.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {currentPkg.name} Tier • {hours} Hours
                </div>
                <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600, marginTop: '6px' }}>
                  📅 {selectedDate} ({selectedTimeSlot})
                </div>
              </div>

              {/* Promo Code Input */}
              <div style={{ marginBottom: '20px' }}>
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. CLEAN20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem' }}
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#15803d', marginTop: '6px', fontWeight: 600 }}>
                    <Tag size={12} />
                    <span>20% Welcome Offer Applied!</span>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: paymentMethod === 'card' ? '2px solid #15803d' : '1px solid #e2e8f0',
                      backgroundColor: paymentMethod === 'card' ? '#f0fdf4' : '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: paymentMethod === 'card' ? '#15803d' : '#475569',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CreditCard size={18} />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: paymentMethod === 'apple_pay' ? '2px solid #15803d' : '1px solid #e2e8f0',
                      backgroundColor: paymentMethod === 'apple_pay' ? '#f0fdf4' : '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: paymentMethod === 'apple_pay' ? '#15803d' : '#475569',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>🍏</span>
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: paymentMethod === 'cash' ? '2px solid #15803d' : '1px solid #e2e8f0',
                      backgroundColor: paymentMethod === 'cash' ? '#f0fdf4' : '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: paymentMethod === 'cash' ? '#15803d' : '#475569',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>💵</span>
                    <span>Cash Post-Clean</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Service ({currentPkg.pricePerHour} × {hours} hrs)</span>
                  <span>${currentPkg.pricePerHour * hours}</span>
                </div>

                {addonsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                    <span>Selected Add-ons</span>
                    <span>+${addonsTotal}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Trust, Insurance & Safety</span>
                  <span>${serviceFee}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', fontWeight: 600, marginBottom: '8px' }}>
                    <span>20% Welcome Promo</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1.5px dashed #cbd5e1',
                  paddingTop: '12px',
                  marginTop: '10px'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Total Amount</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803d' }}>
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Confirm Booking CTA Button */}
              <button
                type="button"
                onClick={handleCompleteBooking}
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (
                  <span>Securing Cleaner...</span>
                ) : (
                  <>
                    <span>Confirm & Book Now</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '14px',
                fontSize: '0.78rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <ShieldCheck size={14} color="#15803d" />
                <span>100% Money-Back Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#15803d' }}>
            Loading CleanNest Booking System...
          </div>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
