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
  ServiceItem
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

interface CleanNestContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
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
  // Booking operations
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  // Cleaner operations
  toggleCleanerOnline: (cleanerId: string) => void;
  updateCleanerServices: (cleanerId: string, specialties: string[]) => void;
  // Admin operations
  updateCleanerStatus: (cleanerId: string, status: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED') => void;
  updateServicePackagePrice: (serviceId: string, packageId: string, newPrice: number) => void;
  addNewService: (service: ServiceItem) => void;
  // Draft / active booking state for multi-step checkout
  draftBooking: Partial<Booking> | null;
  setDraftBooking: React.Dispatch<React.SetStateAction<Partial<Booking> | null>>;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  customer: {
    id: 'usr-alex',
    name: 'Alex Morgan',
    email: 'alex.m@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Apt 4B, New York, NY'
  },
  cleaner: {
    id: 'cln-1',
    name: 'Marcus Vance',
    email: 'marcus.v@cleannest.com',
    role: 'cleaner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    phone: '+1 (555) 234-8901'
  },
  admin: {
    id: 'adm-1',
    name: 'Eleanor Sterling',
    email: 'admin@cleannest.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  }
};

const CleanNestContext = createContext<CleanNestContextType | undefined>(undefined);

export const CleanNestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USERS.customer);
  const [currentLocation, setCurrentLocation] = useState<string>('New York, NY');
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [draftBooking, setDraftBooking] = useState<Partial<Booking> | null>(null);

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
          // Map category string to specialties array for frontend compatibility
          const formattedCleaners = cleanersData.map((c: any) => ({
            ...c,
            specialties: c.category ? [c.category] : []
          }));
          setCleaners(formattedCleaners);
        }

        // Fetch customers
        const customersRes = await fetch('http://localhost:5000/api/auth/customers');
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          setCustomers(customersData);
        }

        // Fetch bookings if logged in
        if (token) {
          const bookingsRes = await fetch('http://localhost:5000/api/bookings', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (bookingsRes.ok) {
            const bookingsData = await bookingsRes.json();
            setBookings(bookingsData);
          } else {
            setBookings([]);
          }
        } else {
          setBookings([]);
        }
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
    
    // Revert to default so UI doesn't crash on null properties
    setCurrentUser(DEFAULT_USERS.customer);
    setRoleState('customer');
    setBookings([]);
    
    window.location.href = '/login';
  };

  const createBooking = async (newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Promise<Booking> => {
    const token = localStorage.getItem('cleannest_token');
    
    // Convert frontend structure to backend schema structure
    const backendData = {
      serviceType: newBookingData.serviceName,
      date: new Date(newBookingData.selectedDate).toISOString(),
      timeSlot: newBookingData.selectedTimeSlot,
      price: newBookingData.totalAmount,
      address: `${newBookingData.customerAddress.street}, ${newBookingData.customerAddress.city}`,
      notes: newBookingData.customerAddress.notes,
      cleanerId: newBookingData.cleanerId
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
          // To keep UI happy while it waits for a refresh, we can still prepend a mapped booking
          const newBooking: Booking = {
            ...newBookingData,
            id: createdBackendBooking.id,
            bookingCode: `CN-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: createdBackendBooking.createdAt
          };
          setBookings(prev => [newBooking, ...prev]);
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

    const updated = [newBooking, ...bookings];
    setBookings(updated);

    // Add alert notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Booking Confirmed! 🎉',
        message: `Your booking for ${newBooking.serviceName} (${newBooking.packageName}) has been scheduled.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status };
        }
        return b;
      })
    );

    // Notify user
    const statusLabels: Record<Booking['status'], string> = {
      pending: 'Pending Cleaner Confirmation',
      accepted: 'Booking Accepted by Cleaner',
      on_the_way: 'Cleaner is on the way 🚗',
      in_progress: 'Cleaning job started 🧹',
      completed: 'Cleaning completed successfully ✨',
      cancelled: 'Booking was cancelled'
    };

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Booking Update`,
        message: statusLabels[status] || `Status updated to ${status}`,
        time: 'Just now',
        read: false,
        type: status === 'cancelled' ? 'warning' : 'info'
      },
      ...prev
    ]);
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            selectedDate: newDate,
            selectedTimeSlot: newTime,
            status: 'accepted'
          };
        }
        return b;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Booking Rescheduled',
        message: `Your booking was moved to ${newDate} (${newTime}).`,
        time: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);
  };

  const submitReview = (bookingId: string, rating: number, comment: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, rating, reviewComment: comment };
        }
        return b;
      })
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      const newReview: CustomerReview = {
        id: `rev-${Date.now()}`,
        customerName: booking.customerName || 'Alex Morgan',
        avatar: currentUser.avatar,
        rating,
        date: 'Today',
        comment,
        serviceName: booking.serviceName
      };
      setReviews((prev) => [newReview, ...prev]);
    }
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
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            packages: s.packages.map((p) =>
              p.id === packageId ? { ...p, pricePerHour: newPrice } : p
            )
          };
        }
        return s;
      })
    );
  };

  const addNewService = (service: ServiceItem) => {
    setServices((prev) => [service, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
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
        createBooking,
        updateBookingStatus,
        cancelBooking,
        rescheduleBooking,
        submitReview,
        toggleCleanerOnline,
        updateCleanerServices,
        updateCleanerStatus,
        updateServicePackagePrice,
        addNewService,
        draftBooking,
        setDraftBooking,
        logout
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
