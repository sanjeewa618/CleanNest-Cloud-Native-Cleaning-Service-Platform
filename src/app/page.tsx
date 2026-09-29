'use client';

import React from 'react';
import { HeroSection } from '@/components/customer/HeroSection';
import { AdvertisementBanner } from '@/components/customer/AdvertisementBanner';
import { AboutUsSection } from '@/components/customer/AboutUsSection';
import { PopularServices } from '@/components/customer/PopularServices';
import { FeaturedOffers } from '@/components/customer/FeaturedOffers';
import { HowItWorks } from '@/components/customer/HowItWorks';
import { MobileAppShowcase } from '@/components/customer/MobileAppShowcase';
import { Testimonials } from '@/components/customer/Testimonials';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section matching Screen 1 */}
      <HeroSection />

      <div className="container">
        {/* Advertisement Scrolling Banner */}
        <div style={{ marginTop: '40px' }}>
          <AdvertisementBanner />
        </div>

        {/* About Us Section */}
        <AboutUsSection />

        {/* Popular Services category grid matching Screen 2 */}
        <PopularServices />

        {/* Featured Offers with real images matching Screen 2 */}
        <FeaturedOffers />

        {/* 4-step Uber-like workflow */}
        <HowItWorks />

        {/* Interactive Mobile App Showcase matching the exact screenshot */}
        <MobileAppShowcase />

        {/* Verified Customer Reviews & Testimonials */}
        <Testimonials />
      </div>
    </div>
  );
}
