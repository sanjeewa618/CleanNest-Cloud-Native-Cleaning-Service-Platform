'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  Cleaner,
  CustomerReview,
  INITIAL_BOOKINGS,
  INITIAL_CLEANERS,
  INITIAL_REVIEWS,
  INITIAL_SERVICES,
  ServiceItem,
  ServicePackage
} from '@/data/mockData';

export type UserRole = 'customer' | 'cleaner' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  address?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface CleanerAlert {
  id: string;
  bookingId: string;
  cleanerId?: string;
  customerName: string;
  customerAddress: string;
  serviceName: string;
  selectedDate: string;
  selectedTimeSlot: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  dismissed: boolean;
}

interface CleanNestContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  services: ServiceItem[];
  cleaners: Cleaner[];
  customers: UserProfile[];
  bookings: Booking[];
  reviews: CustomerReview[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  // Cleaner alert inbox
  cleanerAlerts: CleanerAlert[];
  acceptBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string) => void;
  // Booking operations
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  // Cleaner operations
  toggleCleanerOnline: (cleanerId: string) => void;
  updateCleanerServices: (cleanerId: string, specialties: string[]) => void;
  updateCleanerProfile: (cleanerId: string, data: Partial<Cleaner>) => void;
  // Admin & Cleaner Service Pricing & Discount operations
  updateCleanerStatus: (cleanerId: string, status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED') => void;
  updateServicePackagePrice: (serviceId: string, packageId: string, newPrice: number) => void;
  updateServicePriceAndDiscount: (serviceId: string, basePrice: number, discountPercent: number, packages?: ServicePackage[]) => void;
  addNewService: (service: ServiceItem) => void;
  // Draft / active booking state for multi-step checkout
  draftBooking: Partial<Booking> | null;
  setDraftBooking: React.Dispatch<React.SetStateAction<Partial<Booking> | null>>;
  logout: () => void;
  isInitialized: boolean;
}

const CleanNestContext = createContext<CleanNestContextType | undefined>(undefined);

export const CleanNestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('New York, NY');
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [draftBooking, setDraftBooking] = useState<Partial<Booking> | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [cleanerAlerts, setCleanerAlerts] = useState<CleanerAlert[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Cleaner On The Way 🚗',
      message: 'Marcus Vance is heading to your address for Home Cleaning.',
      time: '10 mins ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-2',
      title: '20% Welcome Offer Applied',
      message: 'Use code CLEAN20 at checkout for 20% off your booking.',
      time: '1 hour ago',
      read: false,
      type: 'success'
    }
  ]);

  // Load from LocalStorage and API
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const token = localStorage.getItem('cleannest_token');
        
        // Fetch cleaners
        const cleanersRes = await fetch('http://localhost:5000/api/cleaners');
        if (cleanersRes.ok) {
          const cleanersData = await cleanersRes.json();
          // Map category string to specialties array for frontend compatibility and ensure clean defaults
          const formattedCleaners = cleanersData.map((c: any) => ({
            ...c,
            specialties: c.category ? [c.category] : ['Home Cleaning'],
            role: c.category || 'Professional Cleaner',
            rating: typeof c.rating === 'number' ? c.rating : 5.0,
            reviewCount: typeof c.reviewCount === 'number' ? c.reviewCount : 0,
            jobsCompleted: typeof c.jobsCount === 'number' ? c.jobsCount : 0,
            isOnline: c.isOnline ?? true,
            earnings: c.earnings || { today: 0, thisWeek: 0, total: 0 },
            availability: c.availability || ['09:00 AM - 12:00 PM', '01:00 PM - 04:00 PM', '05:00 PM - 08:00 PM']
          }));
          setCleaners(formattedCleaners);
        }

        // Fetch customers
        const customersRes = await fetch('http://localhost:5000/api/auth/customers');
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          setCustomers(customersData);
        }

        // Load saved local bookings (filtering out all legacy test bookings)
        let savedLocalBookings: Booking[] = [];
        try {
          const legacyCodes = [
            'bkg-101', 'bkg-102', 'bkg-103',
            'CN-8921', 'CN-7452', 'CN-5120',
            'CN-8432', 'CN-7240', 'CN-3B2E'
          ];
          const saved = localStorage.getItem('cleannest_local_bookings');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              savedLocalBookings = parsed
                .filter(b => !legacyCodes.includes(b.id) && !legacyCodes.includes(b.bookingCode))
                .map(b => ({
                  ...b,
                  status: (b.status as any) === 'confirmed' ? 'accepted' : b.status
                }));
              // Permanently update local storage to clean state
              localStorage.setItem('cleannest_local_bookings', JSON.stringify(savedLocalBookings));
            }
          }
        } catch {
          // ignore
        }

        let backendMappedBookings: Booking[] = [];
        try {
          const headers: Record<string, string> = {};
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
          const bookingsRes = await fetch('http://localhost:5000/api/bookings', { headers });
          if (bookingsRes.ok) {
            const bookingsData = await bookingsRes.json();
            if (Array.isArray(bookingsData)) {
              backendMappedBookings = bookingsData.map((b: any) => {
                const rawStatus = (b.status || 'pending').toLowerCase();
                let mappedStatus: Booking['status'] = 'pending';
                if (rawStatus === 'confirmed') {
                  mappedStatus = 'confirmed';
                } else if (rawStatus === 'accepted') {
                  mappedStatus = 'accepted';
                } else if (rawStatus === 'on_the_way') {
                  mappedStatus = 'on_the_way';
                } else if (rawStatus === 'in_progress') {
                  mappedStatus = 'in_progress';
                } else if (rawStatus === 'completed') {
                  mappedStatus = 'completed';
                } else if (rawStatus === 'cancelled') {
                  mappedStatus = 'cancelled';
                }

                const bookingPrice = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;

                return {
                  id: b.id,
                  bookingCode: `CN-${(b.id || '').substring(0, 4).toUpperCase() || '8821'}`,
                  customerId: b.customerId || 'usr-cust',
                  customerName: b.customerName || b.customer?.name || 'Customer',
                  customerEmail: b.customerEmail || b.customer?.email,
                  customerPhone: b.customer?.phone || '+94 77 123 4567',
                  customerAddress: typeof b.address === 'object' && b.address !== null
                    ? { ...b.address, notes: b.notes || b.address.notes }
                    : { street: b.address || 'Service Location', city: 'Colombo', notes: b.notes },
                  serviceId: b.serviceId || 'srv-1',
                  serviceName: b.serviceType || b.serviceName || 'Home Cleaning',
                  packageId: b.packageId || 'pkg-std',
                  packageName: b.packageName || 'Standard Clean',
                  pricePerHour: bookingPrice,
                  hours: b.hours || 3,
                  selectedDate: b.date ? (isNaN(new Date(b.date).getTime()) ? b.date : new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })) : 'Today',
                  selectedTimeSlot: b.timeSlot || '10:00 AM - 01:00 PM',
                  cleanerId: b.cleanerId,
                  cleanerName: b.cleanerName || b.cleaner?.name || b.cleanerName || 'Marcus Vance',
                  cleanerEmail: b.cleanerEmail || b.cleaner?.email,
                  cleanerAvatar: b.cleaner?.avatar || b.cleanerAvatar,
                  cleanerPhone: b.cleaner?.phone || b.cleanerPhone || '+94 71 234 8901',
                  status: mappedStatus,
                  subtotal: bookingPrice,
                  discount: 0,
                  serviceFee: 0,
                  totalAmount: bookingPrice,
                  paymentMethod: b.paymentMethod || 'card',
                  paymentStatus: b.paymentStatus || 'paid',
                  createdAt: b.createdAt || new Date().toISOString()
                };
              });
            }
          }
        } catch (err) {
          console.error('Failed to fetch backend bookings', err);
        }

        // If backend bookings exist, they are the single source of truth
        let finalBookings: Booking[] = [];
        if (backendMappedBookings.length > 0) {
          finalBookings = backendMappedBookings;
          try {
            localStorage.setItem('cleannest_local_bookings', JSON.stringify(finalBookings));
          } catch {}
        } else {
          finalBookings = savedLocalBookings;
        }

        setBookings(finalBookings);
      } catch (err) {
        console.error('Failed to fetch API data', err);
      }
    };

    fetchApiData();
    
    try {
      const savedUser = localStorage.getItem('cleannest_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setRoleState(parsedUser.role);
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem('cleannest_role', newRole);
    } catch {
      // ignore
    }
  };

  const logout = () => {
    localStorage.removeItem('cleannest_token');
    localStorage.removeItem('cleannest_user');
    localStorage.removeItem('cleannest_role');
    
    // Revert to unauthenticated state
    setCurrentUser(null);
    setRoleState('customer');
    setBookings([]);
    
    window.location.href = '/login';
  };

  const createBooking = async (newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Promise<Booking> => {
    if (!currentUser) {
      alert('You must sign in to proceed with booking! Please sign in first.');
      window.location.href = '/login';
      throw new Error('Sign in required to create a booking');
    }

    const token = localStorage.getItem('cleannest_token');
    
    // Convert human-readable selectedDate (e.g. "Tomorrow, Oct 2nd") to a real ISO date
    const parseBookingDate = (label: string): string => {
      const today = new Date();
      const dayLabel = label.split(',')[0].trim().toLowerCase();
      const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      if (dayLabel === 'today') {
        return today.toISOString();
      } else if (dayLabel === 'tomorrow') {
        const d = new Date(today); d.setDate(today.getDate() + 1); return d.toISOString();
      } else {
        // Find how many days ahead this weekday is
        const targetIdx = dayNames.indexOf(dayLabel);
        if (targetIdx >= 0) {
          let diff = targetIdx - today.getDay();
          if (diff <= 0) diff += 7;
          const d = new Date(today); d.setDate(today.getDate() + diff); return d.toISOString();
        }
        return today.toISOString(); // fallback
      }
    };

    // Convert frontend structure to backend schema structure
    const backendData = {
      serviceType: newBookingData.serviceName,
      date: parseBookingDate(newBookingData.selectedDate),
      timeSlot: newBookingData.selectedTimeSlot,
      price: newBookingData.totalAmount,
      address: `${newBookingData.customerAddress.street}, ${newBookingData.customerAddress.city}`,
      notes: newBookingData.customerAddress.notes,
      cleanerId: newBookingData.cleanerId,
      customerName: newBookingData.customerName || currentUser?.name,
      customerEmail: newBookingData.customerEmail || currentUser?.email,
      cleanerName: newBookingData.cleanerName,
      cleanerEmail: newBookingData.cleanerEmail || cleaners.find(c => c.id === newBookingData.cleanerId)?.email
    };


    if (token) {
      try {
        const res = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(backendData)
        });
        
        if (res.ok) {
          const createdBackendBooking = await res.json();
          const newBooking: Booking = {
            ...newBookingData,
            id: createdBackendBooking.id,
            bookingCode: `CN-${(createdBackendBooking.id || '').substring(0, 4).toUpperCase() || Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: createdBackendBooking.createdAt
          };
          setBookings(prev => {
            const updated = [newBooking, ...prev.filter(b => b.id !== newBooking.id)];
            try {
              const saved = localStorage.getItem('cleannest_local_bookings');
              const local: Booking[] = saved ? JSON.parse(saved) : [];
              localStorage.setItem('cleannest_local_bookings', JSON.stringify([newBooking, ...local.filter(b => b.id !== newBooking.id)]));
            } catch {}
            return updated;
          });

          // Add a cleaner alert so cleaner portal sees it
          setCleanerAlerts((prev) => [
            {
              id: `alert-${Date.now()}`,
              bookingId: newBooking.id,
              cleanerId: newBooking.cleanerId,
              customerName: newBooking.customerName,
              customerAddress: `${newBooking.customerAddress.street}, ${newBooking.customerAddress.apartment ? newBooking.customerAddress.apartment + ', ' : ''}${newBooking.customerAddress.city}, ${newBooking.customerAddress.zip}`,
              serviceName: newBooking.serviceName,
              selectedDate: newBooking.selectedDate,
              selectedTimeSlot: newBooking.selectedTimeSlot,
              totalAmount: newBooking.totalAmount,
              paymentStatus: newBooking.paymentStatus || 'paid',
              createdAt: new Date().toISOString(),
              dismissed: false
            },
            ...prev
          ]);

          // Customer notification
          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              title: 'Booking Request Sent! ⏳',
              message: `Your booking for ${newBooking.serviceName} on ${newBooking.selectedDate} is awaiting cleaner confirmation.`,
              time: 'Just now',
              read: false,
              type: 'info'
            },
            ...prev
          ]);

          return newBooking;
        }
      } catch (err) {
        console.error('Failed to create booking on backend', err);
      }
    }

    // Fallback if no token (shouldn't happen if logged in)
    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...newBookingData,
      id: `bkg-${Date.now()}`,
      bookingCode: `CN-${codeNumber}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings.filter(b => b.id !== newBooking.id)];
    setBookings(updated);
    try {
      const saved = localStorage.getItem('cleannest_local_bookings');
      const local: Booking[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem('cleannest_local_bookings', JSON.stringify([newBooking, ...local.filter(b => b.id !== newBooking.id)]));
    } catch {}

    // Add a cleaner alert so cleaner portal sees it
    setCleanerAlerts((prev) => [
      {
        id: `alert-${Date.now()}`,
        bookingId: newBooking.id,
        cleanerId: newBooking.cleanerId,
        customerName: newBooking.customerName,
        customerAddress: `${newBooking.customerAddress.street}, ${newBooking.customerAddress.apartment ? newBooking.customerAddress.apartment + ', ' : ''}${newBooking.customerAddress.city}, ${newBooking.customerAddress.zip}`,
        serviceName: newBooking.serviceName,
        selectedDate: newBooking.selectedDate,
        selectedTimeSlot: newBooking.selectedTimeSlot,
        totalAmount: newBooking.totalAmount,
        paymentStatus: newBooking.paymentStatus || 'paid',
        createdAt: new Date().toISOString(),
        dismissed: false
      },
      ...prev
    ]);

    // Customer notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Booking Request Sent! ⏳',
        message: `Your booking for ${newBooking.serviceName} on ${newBooking.selectedDate} is awaiting cleaner confirmation.`,
        time: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);

    return newBooking;
  };





  const toggleCleanerOnline = (cleanerId: string) => {
    setCleaners((prev) =>
      prev.map((c) => (c.id === cleanerId ? { ...c, isOnline: !c.isOnline } : c))
    );
  };

  const updateCleanerServices = (cleanerId: string, specialties: string[]) => {
    setCleaners((prev) =>
      prev.map((c) => (c.id === cleanerId ? { ...c, specialties } : c))
    );
  };

  const updateCleanerProfile = async (cleanerId: string, data: Partial<Cleaner>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cleaners/${cleanerId}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setCleaners((prev) =>
          prev.map((c) => (c.id === cleanerId ? { ...c, ...data } : c))
        );
        // Also update currentUser if it matches
        if (currentUser?.id === cleanerId) {
          setCurrentUser(prev => {
            if (!prev) return null;
            const updatedUser = {
              ...prev,
              name: data.name || prev.name,
              email: data.email || prev.email,
              phone: data.phone || prev.phone,
              avatar: data.avatar || prev.avatar
            };
            try {
              const storageSafe = {
                ...updatedUser,
                avatar: (updatedUser.avatar && updatedUser.avatar.length > 50000)
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedUser.name)}&background=random`
                  : updatedUser.avatar
              };
              localStorage.setItem('cleannest_user', JSON.stringify(storageSafe));
            } catch {}
            return updatedUser;
          });
        }
      }
    } catch (error) {
      console.error('Failed to update cleaner profile', error);
    }
  };

  const updateCleanerStatus = async (cleanerId: string, status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED') => {
    try {
      const res = await fetch(`http://localhost:5000/api/cleaners/${cleanerId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setCleaners((prev) =>
          prev.map((c) => (c.id === cleanerId ? { ...c, status } : c))
        );
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const updateServicePackagePrice = (serviceId: string, packageId: string, newPrice: number) => {
    setServices((prev) => {
      const updated = prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            packages: s.packages.map((p) =>
              p.id === packageId ? { ...p, pricePerHour: newPrice } : p
            )
          };
        }
        return s;
      });
      try {
        localStorage.setItem('cleannest_services', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateServicePriceAndDiscount = (
    serviceId: string,
    basePrice: number,
    discountPercent: number,
    packages?: ServicePackage[]
  ) => {
    let targetServiceName = '';

    setServices((prev) => {
      const updated = prev.map((s) => {
        if (s.id === serviceId) {
          targetServiceName = s.name;
          return {
            ...s,
            basePrice,
            discountPercent,
            packages: packages || s.packages
          };
        }
        return s;
      });
      try {
        localStorage.setItem('cleannest_services', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Automatically recalculate and update existing bookings with the new prices & discounts
    setBookings((prevBookings) => {
      const updatedBookings = prevBookings.map((b) => {
        const isTarget = b.serviceId === serviceId || b.serviceName === targetServiceName;
        if (!isTarget) return b;

        // Match the relevant package or fallback to base price
        const matchedPkg = packages?.find(p => p.id === b.packageId || p.name === b.packageName);
        const pkgBaseRate = matchedPkg ? matchedPkg.pricePerHour : basePrice;
        const effectiveRate = discountPercent > 0
          ? Math.round(pkgBaseRate * (1 - discountPercent / 100))
          : pkgBaseRate;

        const hours = b.hours || 3;
        const newSubtotal = effectiveRate * hours;
        const serviceFee = b.serviceFee || 450;
        const newTotalAmount = newSubtotal + serviceFee;
        const rawOriginalSubtotal = pkgBaseRate * hours;
        const newDiscount = discountPercent > 0 ? (rawOriginalSubtotal - newSubtotal) : (b.discount || 0);

        return {
          ...b,
          pricePerHour: effectiveRate,
          subtotal: newSubtotal,
          discount: newDiscount,
          totalAmount: newTotalAmount
        };
      });

      try {
        localStorage.setItem('cleannest_local_bookings', JSON.stringify(updatedBookings));
      } catch {}

      // Update cleaner earnings dynamically based on the updated booking revenue
      setCleaners((prevCleaners) =>
        prevCleaners.map((c) => {
          const completedForCleaner = updatedBookings.filter(
            (b) =>
              b.status === 'completed' &&
              (b.cleanerId === c.id || b.cleanerName === c.name || (c.specialties && c.specialties.includes(b.serviceName)))
          );
          const computedTotalPayout = completedForCleaner.reduce(
            (sum, b) => sum + (b.totalAmount * 0.85),
            0
          );
          return {
            ...c,
            earnings: {
              today: (c.earnings?.today ? Math.max(c.earnings.today, computedTotalPayout) : computedTotalPayout),
              thisWeek: (c.earnings?.thisWeek ? Math.max(c.earnings.thisWeek, computedTotalPayout) : computedTotalPayout),
              total: (c.earnings?.total ? Math.max(c.earnings.total, computedTotalPayout) : computedTotalPayout)
            }
          };
        })
      );

      return updatedBookings;
    });
  };

  const addNewService = (service: ServiceItem) => {
    setServices((prev) => {
      const updated = [service, ...prev];
      try {
        localStorage.setItem('cleannest_services', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    let targetBooking: Booking | undefined = bookings.find((b) => b.id === bookingId);

    setBookings((prev) => {
      const found = prev.find((b) => b.id === bookingId);
      if (found) targetBooking = found;
      const updated = prev.map((b) => (b.id === bookingId ? { ...b, status } : b));
      try {
        localStorage.setItem('cleannest_local_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (status === 'accepted' || status === 'cancelled' || status === 'completed') {
      setCleanerAlerts((prev) =>
        prev.map((a) => (a.bookingId === bookingId ? { ...a, dismissed: true } : a))
      );
    }

    // Immediately update cleaner's completed job count and earnings when marked completed
    if (status === 'completed') {
      const payout = (targetBooking?.totalAmount || 0) * 0.85;
      setCleaners((prev) =>
        prev.map((c) => {
          const isTarget = Boolean(targetBooking?.cleanerId) && c.id === targetBooking?.cleanerId;
          if (isTarget) {
            return {
              ...c,
              jobsCompleted: (c.jobsCompleted || 0) + 1,
              earnings: {
                today: (c.earnings?.today || 0) + payout,
                thisWeek: (c.earnings?.thisWeek || 0) + payout,
                total: (c.earnings?.total || 0) + payout,
              }
            };
          }
          return c;
        })
      );
    }

    // Update in backend database (with or without JWT token)
    const token = typeof window !== 'undefined' ? localStorage.getItem('cleannest_token') : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status })
    })
      .then((res) => {
        if (!res.ok) {
          console.warn('DB booking status update status:', res.status);
        }
      })
      .catch((err) => console.error('Failed to update status in DB', err));

    const cleanerName = targetBooking?.cleanerName || 'Your cleaner';
    const serviceName = targetBooking?.serviceName || 'Cleaning Service';
    const dateStr = targetBooking?.selectedDate || 'the scheduled date';
    const timeStr = targetBooking?.selectedTimeSlot ? ` (${targetBooking.selectedTimeSlot})` : '';

    let title = 'Booking Status Updated 🔔';
    let message = `Your booking for ${serviceName} status changed to ${status.replace('_', ' ')}.`;
    let type: 'info' | 'success' | 'warning' = 'info';

    if (status === 'accepted') {
      title = '✅ Booking Accepted!';
      message = `Great news! ${cleanerName} has accepted your ${serviceName} booking for ${dateStr}${timeStr}. They will arrive on time!`;
      type = 'success';
    } else if (status === 'on_the_way') {
      title = '🚗 Cleaner On The Way!';
      message = `${cleanerName} is on the way to your location for ${serviceName}!`;
      type = 'info';
    } else if (status === 'in_progress') {
      title = '🧹 Cleaning Started!';
      message = `${cleanerName} has arrived and started working on ${serviceName}.`;
      type = 'info';
    } else if (status === 'completed') {
      title = '✨ Cleaning Completed!';
      message = `Your ${serviceName} by ${cleanerName} is complete! Thank you for choosing CleanNest.`;
      type = 'success';
    } else if (status === 'cancelled') {
      title = '❌ Booking Cancelled';
      message = `Your booking for ${serviceName} has been cancelled.`;
      type = 'warning';
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title,
        message,
        time: 'Just now',
        read: false,
        type
      },
      ...prev
    ]);
  };

  const acceptBooking = (bookingId: string) => {
    if (currentUser?.role === 'cleaner' && currentUser?.id) {
      setBookings((prev) => {
        const updated = prev.map((b) =>
          b.id === bookingId
            ? { ...b, cleanerId: currentUser.id, cleanerName: currentUser.name || 'Cleaner', cleanerPhone: currentUser.phone || '', cleanerAvatar: currentUser.avatar || '', status: 'accepted' as Booking['status'] }
            : b
        );
        try {
          localStorage.setItem('cleannest_local_bookings', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
    updateBookingStatus(bookingId, 'accepted');
  };

  const rejectBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId
          ? { ...b, selectedDate: newDate, selectedTimeSlot: newTime }
          : b
      );
      try {
        localStorage.setItem('cleannest_local_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '📅 Booking Rescheduled',
        message: `Your booking has been updated to ${newDate} (${newTime}).`,
        time: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);
  };

  const submitReview = (bookingId: string, rating: number, comment: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, rating, reviewComment: comment } : b
      );
      try {
        localStorage.setItem('cleannest_local_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      const newReview: CustomerReview = {
        id: `rev-${Date.now()}`,
        customerName: booking.customerName || currentUser?.name || 'Customer',
        avatar: currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.customerName || 'Customer')}&background=random`,
        rating,
        date: 'Today',
        comment,
        serviceName: booking.serviceName
      };
      setReviews((prev) => [newReview, ...prev]);
    }
  };

  return (
    <CleanNestContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        currentLocation,
        setCurrentLocation,
        services,
        cleaners,
        customers,
        bookings,
        reviews,
        notifications,
        markNotificationAsRead,
        clearNotifications,
        cleanerAlerts,
        acceptBooking,
        rejectBooking,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        rescheduleBooking,
        submitReview,
        toggleCleanerOnline,
        updateCleanerServices,
        updateCleanerProfile,
        updateCleanerStatus,
        updateServicePackagePrice,
        updateServicePriceAndDiscount,
        addNewService,
        draftBooking,
        setDraftBooking,
        logout,
        isInitialized
      }}
    >
      {children}
    </CleanNestContext.Provider>
  );
};

export const useCleanNest = () => {
  const context = useContext(CleanNestContext);
  if (!context) {
    throw new Error('useCleanNest must be used within a CleanNestProvider');
  }
  return context;
};
