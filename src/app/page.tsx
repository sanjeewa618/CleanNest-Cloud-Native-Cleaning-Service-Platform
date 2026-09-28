'use client';

import React from 'react';
import { HeroSection } from '@/components/customer/HeroSection';
import { SpecialOfferBanner } from '@/components/customer/SpecialOfferBanner';
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
        {/* Special Offer Banner (20% Off) matching Screen 2 */}
        <SpecialOfferBanner />

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
