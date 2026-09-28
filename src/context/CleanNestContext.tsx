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
  bookings: Booking[];
  reviews: CustomerReview[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  // Booking operations
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  // Cleaner operations
  toggleCleanerOnline: (cleanerId: string) => void;
  updateCleanerServices: (cleanerId: string, specialties: string[]) => void;
  // Admin operations
  updateCleanerStatus: (cleanerId: string, status: 'active' | 'suspended') => void;
  updateServicePackagePrice: (serviceId: string, packageId: string, newPrice: number) => void;
  addNewService: (service: ServiceItem) => void;
  // Draft / active booking state for multi-step checkout
  draftBooking: Partial<Booking> | null;
  setDraftBooking: React.Dispatch<React.SetStateAction<Partial<Booking> | null>>;
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
  const [cleaners, setCleaners] = useState<Cleaner[]>(INITIAL_CLEANERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
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

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('cleannest_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedRole = localStorage.getItem('cleannest_role') as UserRole;
      if (savedRole && DEFAULT_USERS[savedRole]) {
        setRoleState(savedRole);
        setCurrentUser(DEFAULT_USERS[savedRole]);
      }
    } catch {
      // LocalStorage error or SSR
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setCurrentUser(DEFAULT_USERS[newRole]);
    try {
      localStorage.setItem('cleannest_role', newRole);
    } catch {
      // ignore
    }
  };

  const createBooking = (newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Booking => {
    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...newBookingData,
      id: `bkg-${Date.now()}`,
      bookingCode: `CN-${codeNumber}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('cleannest_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }

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

  const updateCleanerStatus = (cleanerId: string, status: 'active' | 'suspended') => {
    setCleaners((prev) =>
      prev.map((c) => (c.id === cleanerId ? { ...c, status } : c))
    );
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
        setDraftBooking
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
