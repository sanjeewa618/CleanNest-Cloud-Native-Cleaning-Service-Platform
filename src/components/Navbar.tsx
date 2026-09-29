'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  MapPin,
  ChevronDown,
  Bell,
  Sparkles,
  User,
  Calendar,
  Shield,
  Menu,
  X,
  CheckCircle2,
  Trash2,
  LogOut
} from 'lucide-react';
import { LocationModal } from './LocationModal';

export const Navbar: React.FC = () => {
  const {
    role,
    currentUser,
    currentLocation,
    bookings,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    setRole
  } = useCleanNest();

  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') {
        if (pathname.includes('/bookings')) setActiveSection('bookings');
        else setActiveSection('');
        return;
      }

      // Check sections for home page
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const aboutSection = document.getElementById('about-us');
      const servicesSection = document.getElementById('popular-services');
      
      if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection('about-us');
      } else if (servicesSection && scrollPosition >= servicesSection.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="container" style={{
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Left: Brand Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* CleanNest House+Leaf Logo */}
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(21, 128, 61, 0.3)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <path d="M9 22V12h6v10"></path>
                  <path d="M12 7c2 0 3 1.5 3 3"></path>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#0f172a',
                  lineHeight: 1.1
                }}>
                  Clean<span style={{ color: '#15803d' }}>Nest</span>
                </span>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#15803d',
                  textTransform: 'uppercase'
                }}>
                  Clean Home • Happy Life
                </span>
              </div>
            </Link>

            {/* Location Selector (matches Screen 2: New York, NY ⌄) */}
            <button
              onClick={() => setLocationModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f8fafc',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#334155'
              }}
            >
              <MapPin size={16} color="var(--primary)" />
              <span>{currentLocation}</span>
              <ChevronDown size={14} color="#94a3b8" />
            </button>
          </div>

          {/* Center Links (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav-links">
            <Link href="/" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
              Home
            </Link>

            <Link href="/#popular-services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>
              Services
            </Link>

            <Link href="/#about-us" className={`nav-link ${activeSection === 'about-us' ? 'active' : ''}`}>
              About Us
            </Link>

            <Link href="/bookings" className={`nav-link ${activeSection === 'bookings' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>Bookings</span>
              {activeBookingsCount > 0 && (
                <span style={{
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {activeBookingsCount}
                </span>
              )}
            </Link>

            {/* Role-specific links removed from navbar per user request */}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Notification Bell with Badge */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  position: 'relative'
                }}
              >
                <Bell size={19} />
                {unreadNotifsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '9px',
                    height: '9px',
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    border: '2px solid #ffffff'
                  }}></span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '52px',
                  right: 0,
                  width: '320px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  zIndex: 60
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Notifications</h4>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={12} /> Clear all
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                      No new notifications
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '12px',
                            backgroundColor: n.read ? '#ffffff' : '#f0fdf4',
                            border: n.read ? '1px solid #f1f5f9' : '1px solid #bbf7d0',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{n.title}</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.time}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{n.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile Avatar with dropdown (matches Screen 2 avatar) */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 8px 4px 4px',
                  borderRadius: '9999px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }} className="user-name-text">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '12px',
                  zIndex: 60
                }}>
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.email}</div>
                    <div style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--primary-mint)',
                      color: 'var(--primary-deep)'
                    }}>
                      Role: {role.toUpperCase()}
                    </div>
                  </div>

                  <Link
                    href="/bookings"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      color: '#334155'
                    }}
                  >
                    <Calendar size={16} color="var(--primary)" />
                    <span>My Bookings</span>
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      color: '#334155'
                    }}
                  >
                    <User size={16} color="#64748b" />
                    <span>Profile</span>
                  </Link>

                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '6px', paddingTop: '6px' }}>
                    <Link
                      href="/login"
                      onClick={() => setShowUserMenu(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: '#ef4444'
                      }}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick "Book Now" CTA Button */}
            <Link
              href="/#popular-services"
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.875rem'
              }}
            >
              <span>Book Now</span>
              <span>→</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                color: '#334155'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, padding: '8px 0' }}>Home</Link>
            <Link href="/#popular-services" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, padding: '8px 0' }}>Services</Link>
            <Link href="/#about-us" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, padding: '8px 0' }}>About Us</Link>
            <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, padding: '8px 0' }}>Bookings</Link>
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, padding: '8px 0' }}>Profile</Link>
          </div>
        )}
      </nav>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .user-name-text {
            display: none;
          }
        }
        .nav-link {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1e293b;
          position: relative;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #15803d;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0%;
          height: 3px;
          background-color: #15803d;
          border-radius: 4px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};
