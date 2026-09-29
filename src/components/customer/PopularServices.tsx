'use client';

import React from 'react';
import Link from 'next/link';
import { useCleanNest } from '@/context/CleanNestContext';
import {
  Home,
  Armchair,
  Sparkles,
  AppWindow,
  ShieldCheck,
  ChefHat,
  ArrowRight
} from 'lucide-react';

export const PopularServices: React.FC = () => {
  const { services } = useCleanNest();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home size={28} />;
      case 'Armchair': return <Armchair size={28} />;
      case 'Sparkles': return <Sparkles size={28} />;
      case 'AppWindow': return <AppWindow size={28} />;
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      case 'ChefHat': return <ChefHat size={28} />;
      default: return <Sparkles size={28} />;
    }
  };

  // We will display 6 featured services
  const featuredSlugs = ['home-cleaning', 'garden-cleaning', 'sofa-cleaning', 'kitchen-cleaning', 'deep-cleaning', 'window-cleaning'];
  const displayServices = featuredSlugs
    .map(slug => services.find(s => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <section id="popular-services" style={{ padding: '80px 0', backgroundColor: '#f8fafc', backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div className="container">
        {/* Headings */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#16a34a', // Using theme green instead of yellow
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px'
          }}>
            Featured service
          </h4>
          <h2 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '2.8rem',
            fontWeight: 800,
            color: '#1e3a8a',
            lineHeight: 1.2,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We provide the best services<br />for your help!
          </h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid-container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          {/* Left Column (3 Services) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {displayServices.slice(0, 3).map((service) => (
              <Link 
                href={`/categories/${service.slug}`} 
                key={service.id}
                className="feature-card-link"
                style={{
                  display: 'flex',
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Offset Icon Box */}
                <div style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '30px',
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '8px 8px 0 #22c55e', // Green offset instead of yellow
                  zIndex: 2
                }}>
                  {getServiceIcon(service.iconName)}
                </div>

                <div style={{ paddingLeft: '50px' }}>
                  <h3 style={{ 
                    fontFamily: 'Georgia, "Times New Roman", serif', 
                    fontSize: '1.4rem', 
                    fontWeight: 700, 
                    color: '#1e3a8a', 
                    marginBottom: '12px' 
                  }}>
                    {service.name}
                  </h3>
                  <p style={{ 
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.95rem', 
                    color: '#334155', 
                    lineHeight: 1.7, 
                    marginBottom: '16px' 
                  }}>
                    {service.shortDesc}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: '#15803d',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    gap: '4px'
                  }}>
                    <span>View Service</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Center Column (Image) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/images/female_cleaner_hero.jpg" 
              alt="CleanNest Professionals" 
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(21, 128, 61, 0.15)',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Right Column (3 Services) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {displayServices.slice(3, 6).map((service) => (
              <Link 
                href={`/categories/${service.slug}`} 
                key={service.id}
                className="feature-card-link"
                style={{
                  display: 'flex',
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  textAlign: 'right',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ paddingRight: '50px' }}>
                  <h3 style={{ 
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '1.4rem', 
                    fontWeight: 700, 
                    color: '#1e3a8a', 
                    marginBottom: '12px' 
                  }}>
                    {service.name}
                  </h3>
                  <p style={{ 
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.95rem', 
                    color: '#334155', 
                    lineHeight: 1.7, 
                    marginBottom: '16px' 
                  }}>
                    {service.shortDesc}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%',
                    color: '#15803d',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    gap: '4px'
                  }}>
                    <span>View Service</span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Offset Icon Box (Right aligned) */}
                <div style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '30px',
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '-8px 8px 0 #22c55e', // Green offset on left side
                  zIndex: 2
                }}>
                  {getServiceIcon(service.iconName)}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
      
      <style jsx>{`
        .feature-card-link:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(21, 128, 61, 0.15) !important;
        }

        @media (max-width: 992px) {
          .grid-container {
            grid-template-columns: 1fr !important;
          }
          .feature-card-link {
            text-align: left !important;
          }
          .feature-card-link > div:last-child { /* Right offset icon */
            left: -20px;
            right: auto !important;
            box-shadow: 8px 8px 0 #22c55e !important;
          }
          .feature-card-link > div:first-child {
            padding-right: 0 !important;
            padding-left: 50px !important;
          }
          .feature-card-link [style*="justify-content: flex-end"] {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
};
