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
  const { services, cleaners, currentUser, createBooking, draftBooking, isInitialized } = useCleanNest();

  useEffect(() => {
    if (isInitialized && !currentUser) {
      alert('You must sign in to proceed with booking! Please sign in first.');
      router.push('/login');
    }
  }, [currentUser, isInitialized, router]);

  const serviceSlug = searchParams.get('service') || 'home-cleaning';
  const packageParam = searchParams.get('package');

  const selectedService = services.find((s) => s.slug === serviceSlug) || services[0];
  const initialPackage =
    selectedService.packages.find((p) => p.id === packageParam) ||
    selectedService.packages.find((p) => p.recommended) ||
    selectedService.packages[0];
  const preselectedCleaner = searchParams.get('cleaner') || draftBooking?.cleanerId;
  const hoursParam = searchParams.get('hours');

  const [packageId, setPackageId] = useState(initialPackage.id);
  const [hours, setHours] = useState(hoursParam ? parseFloat(hoursParam) : (draftBooking?.hours || 3));
  // --- Dynamic Date/Time Logic ---
  const now = new Date();

  // Generate 5 real date options starting from today
  const generateDateOptions = () => {
    const options = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
    const getSuffix = (d: number) => suffixes[d] || (d >= 11 && d <= 13 ? 'th' : suffixes[d % 10] || 'th');

    for (let i = 0; i < 5; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[d.getDay()];
      const dateStr = `${monthNames[d.getMonth()]} ${d.getDate()}${getSuffix(d.getDate())}`;
      const label = i === 0 ? 'Express (Rs. 500)' : i === 1 ? 'Recommended' : d.getDay() === 0 || d.getDay() === 6 ? 'Weekend' : 'Standard';
      options.push({ day: dayLabel, date: dateStr, label, dateObj: d });
    }
    return options;
  };

  const dateOptions = generateDateOptions();
  const todayOption = dateOptions[0];
  const tomorrowOption = dateOptions[1];

  const [selectedDate, setSelectedDate] = useState(`${tomorrowOption.day}, ${tomorrowOption.date}`);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM - 01:00 PM');

  // Check if a time slot has already passed today
  const isSlotPast = (slot: string): boolean => {
    const selectedDayLabel = selectedDate.split(',')[0].trim();
    if (selectedDayLabel !== 'Today') return false; // Future dates: all slots available
    const endTime = slot.split(' - ')[1]; // e.g. "11:00 AM"
    const [timeStr, meridiem] = endTime.trim().split(' ');
    const [hrs, mins] = timeStr.split(':').map(Number);
    let endHour = hrs;
    if (meridiem === 'PM' && hrs !== 12) endHour += 12;
    if (meridiem === 'AM' && hrs === 12) endHour = 0;
    const slotEndMinutes = endHour * 60 + mins;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return nowMinutes >= slotEndMinutes;
  };

  const [cleanerChoice, setCleanerChoice] = useState<string>(preselectedCleaner || draftBooking?.cleanerId || 'auto'); // 'auto' or cleaner ID
  const [streetAddress, setStreetAddress] = useState('742 Galle Road, Bambalapitiya');
  const [apt, setApt] = useState('Apt 4B');
  const [city, setCity] = useState('Colombo');
  const [zip, setZip] = useState('00400');
  const [entryNotes, setEntryNotes] = useState('Buzzer #4B, please ring twice. Friendly golden retriever inside.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [promoCode, setPromoCode] = useState('CLEAN20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const chosenCleaner = (cleanerChoice && cleanerChoice !== 'auto')
    ? cleaners.find((c) => c.id === cleanerChoice)
    : (draftBooking?.cleanerId ? cleaners.find((c) => c.id === draftBooking.cleanerId) : null) ||
      cleaners.find(c => (c.status === 'ACTIVE' || c.status === 'active') && c.specialties?.some(s => s.trim().toLowerCase() === selectedService.name.trim().toLowerCase())) ||
      cleaners.find(c => (c.status === 'ACTIVE' || c.status === 'active') && (c.role?.toLowerCase().includes(selectedService.name.toLowerCase()) || (c as any).category?.toLowerCase() === selectedService.name.toLowerCase())) ||
      cleaners.find(c => c.status === 'ACTIVE' || c.status === 'active') ||
      cleaners[0];

  const currentPkg = selectedService.packages.find((p) => p.id === packageId) || selectedService.packages[0];
  const serviceDiscountPercent = selectedService.discountPercent || 0;
  const effectiveHourlyRate = serviceDiscountPercent > 0
    ? Math.round(currentPkg.pricePerHour * (1 - serviceDiscountPercent / 100))
    : currentPkg.pricePerHour;

  const rawServiceSubtotal = currentPkg.pricePerHour * hours;
  const serviceDiscountSavings = serviceDiscountPercent > 0
    ? rawServiceSubtotal - (effectiveHourlyRate * hours)
    : 0;

  const addonsList = [
    { id: 'addon-oven', name: 'Interior Oven Degrease', price: 1500 },
    { id: 'addon-fridge', name: 'Interior Refrigerator Sanitizing', price: 1200 },
    { id: 'addon-laundry', name: '1 Load Laundry & Folding', price: 1000 },
    { id: 'addon-eco', name: '100% Organic Plant-Based Supplies', price: 500 }
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

  const baseSubtotal = (effectiveHourlyRate * hours) + addonsTotal;
  const promoDiscountAmount = promoApplied ? baseSubtotal * 0.2 : 0;
  const totalDiscount = serviceDiscountSavings + promoDiscountAmount;
  const serviceFee = 450;
  const grandTotal = Math.max(0, baseSubtotal - promoDiscountAmount + serviceFee);

  const timeSlots = [
    '08:00 AM - 11:00 AM',
    '10:00 AM - 01:00 PM',
    '01:30 PM - 04:30 PM',
    '05:00 PM - 08:00 PM'
  ];


  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CLEAN20') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try CLEAN20 for 20% off!');
    }
  };

  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const finalizeBooking = async () => {
    setIsProcessingPayment(true);

    try {
      const created = await createBooking({
        customerId: currentUser?.id || 'guest-customer',
        customerName: currentUser?.name || 'Customer',
        customerEmail: currentUser?.email,
        customerPhone: currentUser?.phone || '+94 77 123 4567',
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
        pricePerHour: effectiveHourlyRate,
        hours: hours,
        selectedDate: selectedDate,
        selectedTimeSlot: selectedTimeSlot,
        cleanerId: chosenCleaner?.id,
        cleanerName: chosenCleaner?.name,
        cleanerEmail: (chosenCleaner as any)?.email,
        cleanerAvatar: chosenCleaner?.avatar,
        cleanerPhone: chosenCleaner?.phone,
        status: 'pending',
        subtotal: rawServiceSubtotal + addonsTotal,
        discount: totalDiscount,
        serviceFee: serviceFee,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod,
        paymentStatus: 'paid'
      });

      // Simulate a small delay for payment processing UI
      setTimeout(() => {
        setIsProcessingPayment(false);
        setIsPaymentModalOpen(false);
        setConfirmedBookingId(created.id);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsProcessingPayment(false);
      alert('Failed to create booking.');
    }
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
              <strong style={{ color: '#0f172a' }}>{chosenCleaner?.name || 'Auto-matched Pro'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>Service Location:</span>
              <strong style={{ color: '#0f172a' }}>{streetAddress}, {city}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b' }}>Total Paid:</span>
              <strong style={{ color: '#15803d', fontSize: '1.1rem' }}>Rs. {grandTotal.toLocaleString()}</strong>
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
            {/* 1. Date & Time Selection */}
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
                  const isPast = isSlotPast(slot);
                  return (
                    <div
                      key={slot}
                      onClick={() => !isPast && setSelectedTimeSlot(slot)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isPast
                          ? '1px solid #fecaca'
                          : isSelected
                          ? '2px solid #15803d'
                          : '1px solid #e2e8f0',
                        backgroundColor: isPast
                          ? '#fff1f2'
                          : isSelected
                          ? '#f0fdf4'
                          : '#ffffff',
                        color: isPast ? '#f87171' : isSelected ? '#15803d' : '#334155',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        cursor: isPast ? 'not-allowed' : 'pointer',
                        opacity: isPast ? 0.7 : 1,
                        textDecoration: isPast ? 'line-through' : 'none'
                      }}
                    >
                      {slot}
                      {isPast && <div style={{ fontSize: '0.65rem', color: '#f87171', fontWeight: 700, marginTop: '2px' }}>Passed</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Address & Entry Instructions */}
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

            {/* 3. Optional Add-ons */}
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
                        <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>+Rs. {addon.price.toLocaleString()}</div>
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
                  <span>Service ({currentPkg.name} Tier × {hours} hrs)</span>
                  <span>Rs. {(currentPkg.pricePerHour * hours).toLocaleString()}</span>
                </div>

                {serviceDiscountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', fontWeight: 600, marginBottom: '8px' }}>
                    <span>Cleaner Promo Discount ({serviceDiscountPercent}% OFF)</span>
                    <span>-Rs. {serviceDiscountSavings.toLocaleString()}</span>
                  </div>
                )}

                {addonsTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                    <span>Selected Add-ons</span>
                    <span>+Rs. {addonsTotal.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Trust, Insurance & Safety</span>
                  <span>Rs. {serviceFee.toLocaleString()}</span>
                </div>

                {promoDiscountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#15803d', fontWeight: 600, marginBottom: '8px' }}>
                    <span>20% Welcome Promo (CLEAN20)</span>
                    <span>-Rs. {promoDiscountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                    Rs. {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Confirm Booking CTA Button */}
              <button
                type="button"
                onClick={handleProceedToPayment}
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

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '500px',
            padding: '36px',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
            position: 'relative',
            border: '1px solid #e2e8f0'
          }}>
            {/* Close button */}
            <button
              onClick={() => !isProcessingPayment && setIsPaymentModalOpen(false)}
              style={{
                position: 'absolute', top: '18px', right: '18px',
                background: '#f1f5f9', border: 'none', width: '32px', height: '32px',
                borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer',
                color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #15803d, #22c55e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <CreditCard size={20} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Secure Checkout</h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '50px' }}>
                {paymentMethod === 'card' ? 'Enter your card details below' : paymentMethod === 'apple_pay' ? 'Apple Pay selected' : 'Cash payment selected'}
              </p>
            </div>

            {/* Total badge */}
            <div style={{
              backgroundColor: '#f0fdf4', borderRadius: '14px', padding: '14px 18px',
              border: '1px solid #dcfce7', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '24px'
            }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#15803d' }}>📅 {selectedDate} · {selectedTimeSlot}</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d' }}>Rs. {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {/* Accepted cards */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>ACCEPTED:</span>
                  {['VISA', 'MC', 'AMEX', 'DISC'].map((brand) => (
                    <div key={brand} style={{
                      padding: '3px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
                      fontSize: '0.65rem', fontWeight: 800,
                      color: brand === 'VISA' ? '#1a1f71' : brand === 'MC' ? '#eb001b' : brand === 'AMEX' ? '#007bc1' : '#ff6600',
                      backgroundColor: '#f8fafc'
                    }}>{brand}</div>
                  ))}
                </div>

                {/* Name on card */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Name on Card</label>
                  <input
                    type="text"
                    placeholder="Enter cardholder's name"
                    style={{
                      width: '100%', padding: '13px 16px', borderRadius: '12px',
                      border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.2s', backgroundColor: '#f8fafc'
                    }}
                    onFocus={e => e.target.style.borderColor = '#22c55e'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Card number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="0000 · 0000 · 0000 · 0000"
                      maxLength={19}
                      style={{
                        width: '100%', padding: '13px 48px 13px 16px', borderRadius: '12px',
                        border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none',
                        backgroundColor: '#f8fafc', letterSpacing: '0.05em'
                      }}
                      onFocus={e => e.target.style.borderColor = '#22c55e'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <CreditCard size={18} color="#94a3b8" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                {/* Expiry + CVC */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Card Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={5}
                      style={{
                        width: '100%', padding: '13px 16px', borderRadius: '12px',
                        border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none',
                        backgroundColor: '#f8fafc'
                      }}
                      onFocus={e => e.target.style.borderColor = '#22c55e'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>CVV</label>
                    <input
                      type="text"
                      placeholder="• • •"
                      maxLength={4}
                      style={{
                        width: '100%', padding: '13px 16px', borderRadius: '12px',
                        border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none',
                        backgroundColor: '#f8fafc', letterSpacing: '0.2em'
                      }}
                      onFocus={e => e.target.style.borderColor = '#22c55e'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* Security note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                  <ShieldCheck size={16} color="#15803d" />
                  <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 600 }}>256-bit SSL encryption · We never store your card details</span>
                </div>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div style={{ padding: '40px 0', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍏</div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Double-click side button to pay</div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f0fdf4', borderRadius: '16px', marginBottom: '24px', border: '1px solid #dcfce7' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💵</div>
                <div style={{ fontWeight: 600, color: '#15803d' }}>Pay Rs. {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in cash to your cleaner after the service is complete.</div>
              </div>
            )}

            {/* Confirm button */}
            <button
              type="button"
              onClick={finalizeBooking}
              disabled={isProcessingPayment}
              style={{
                width: '100%', padding: '16px',
                fontSize: '1.05rem', fontWeight: 700, borderRadius: '9999px',
                background: isProcessingPayment ? '#86efac' : 'linear-gradient(135deg, #15803d, #22c55e)',
                color: '#ffffff', border: 'none', cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: '0 8px 20px -4px rgba(21,128,61,0.4)',
                transition: 'all 0.2s ease',
                marginBottom: '16px'
              }}
            >
              {isProcessingPayment ? (
                <span>⏳ Processing Payment...</span>
              ) : (
                <>
                  <span>Confirm & Pay Rs. {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <CheckCircle2 size={20} />
                </>
              )}
            </button>

            {/* Need support */}
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
              Need Support?{' '}
              <a
                href="/#footer-contact"
                style={{ color: '#15803d', fontWeight: 700, textDecoration: 'none' }}
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}

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
