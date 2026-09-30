'use client';

import React, { useState } from 'react';
import { useCleanNest } from '@/context/CleanNestContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle,
  CreditCard,
  Edit2,
  Package,
  Shield,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, bookings, logout } = useCleanNest();
  const router = useRouter();

  // Redirect if not logged in
  if (!currentUser || currentUser.role !== 'customer') {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = { ...currentUser, avatar: base64String };
        setCurrentUser(updatedUser);
        localStorage.setItem('cleannest_user', JSON.stringify(updatedUser));
        alert('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero Header */}
      <div style={{
        position: 'relative',
        padding: '100px 0 60px 0',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(21, 128, 61, 0.8)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '4px solid #fff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                overflow: 'hidden'
              }}>
                <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <label 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: '2px solid #fff'
                }}
                title="Change Profile Picture"
              >
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </label>
            </div>
            <div>
              <h1 className="scroll-animate fade-up" style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 8px 0', color: '#fff' }}>
                {currentUser.name}
              </h1>
              <div className="scroll-animate fade-up" style={{ animationDelay: '0.1s', display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0.9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={16} />
                  <span>{currentUser.email}</span>
                </div>
                {currentUser.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={16} />
                    <span>{currentUser.phone}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={16} />
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '40px 20px', flex: 1, display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar */}
        <div className="scroll-animate fade-up" style={{ flex: '1 1 300px', maxWidth: '350px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Account Details</h3>
              <button style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                <Edit2 size={14} /> Edit
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '12px' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 500 }}>{currentUser.name}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '12px' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Address</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 500, lineHeight: 1.4 }}>
                    {currentUser.address || 'No address added yet.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ padding: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '12px' }}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Method</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 500 }}>
                    •••• •••• •••• 4242
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>{bookings.length}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Bookings</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="currentColor" /> 5.0
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>User Rating</div>
              </div>
            </div>

            <button 
              onClick={logout}
              style={{ width: '100%', padding: '12px', marginTop: '24px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fca5a5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="scroll-animate fade-up" style={{ animationDelay: '0.1s', flex: '1 1 500px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent Activity</h2>
            <Link href="/bookings" style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <Package size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeBookings.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Active Bookings</h4>
                {activeBookings.slice(0, 2).map((booking) => (
                  <Link href="/bookings" key={booking.id} style={{ textDecoration: 'none' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '20px',
                      padding: '20px',
                      marginBottom: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                      border: '1px solid #e2e8f0',
                      borderLeft: '4px solid #16a34a',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '20px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
                    }}>
                      <div style={{ flex: '1 1 200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {booking.status.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>{booking.bookingCode}</span>
                        </div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a' }}>{booking.serviceName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} />
                            <span>{new Date(booking.selectedDate).toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            <span>{booking.selectedTimeSlot}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>${booking.totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {pastBookings.length > 0 && (
              <div style={{ marginTop: activeBookings.length > 0 ? '20px' : '0' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Past Bookings</h4>
                {pastBookings.slice(0, 3).map((booking) => (
                  <Link href="/bookings" key={booking.id} style={{ textDecoration: 'none' }}>
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '20px',
                      padding: '20px',
                      marginBottom: '12px',
                      border: '1px solid #f1f5f9',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '20px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{ flex: '1 1 200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          {booking.status === 'completed' ? (
                            <span style={{ padding: '4px 10px', backgroundColor: '#f1f5f9', color: '#64748b', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle size={12} /> COMPLETED
                            </span>
                          ) : (
                            <span style={{ padding: '4px 10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                              CANCELLED
                            </span>
                          )}
                        </div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#334155' }}>{booking.serviceName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '0.875rem' }}>
                          <span>{new Date(booking.selectedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {bookings.length === 0 && (
              <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px 20px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
                <Package size={48} color="#94a3b8" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#334155' }}>No bookings yet</h3>
                <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                  You haven't made any bookings yet. Discover our services and book your first clean today!
                </p>
                <Link href="/#popular-services" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '12px' }}>
                  Book a Service
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
