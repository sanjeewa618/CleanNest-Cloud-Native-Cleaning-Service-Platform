'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CalendarCheck, 
  BarChart2, 
  Settings, 
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { useCleanNest } from '@/context/CleanNestContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useCleanNest();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Service Providers', path: '/admin/providers', icon: Briefcase },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: '#16a34a', // Site's green theme
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0,0,0,0.05)',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ padding: '32px 24px 12px 24px' }}>
          <Link href="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'rgba(255,255,255,0.9)', 
            textDecoration: 'none',
            fontSize: '0.875rem',
            marginBottom: '32px',
            transition: 'color 0.2s',
            fontWeight: 500
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
          onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '42px', height: '42px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '1.5rem' }}>C</span>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
                Clean<span style={{ color: '#dcfce7' }}>Nest</span>
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#dcfce7', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  color: isActive ? '#16a34a' : '#ffffff',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px 16px' }}>
          <button 
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '32px' }}>
        {children}
      </main>

    </div>
  );
}
