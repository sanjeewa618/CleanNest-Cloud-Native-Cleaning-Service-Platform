export interface ServicePackage {
  id: string;
  name: string;
  pricePerHour: number;
  description: string;
  recommended?: boolean;
  features: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  badges: string[];
  whatsIncluded: {
    icon: string;
    title: string;
    description: string;
  }[];
  packages: ServicePackage[];
  basePrice: number;
}

export interface Cleaner {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  phone: string;
  email: string;
  isOnline: boolean;
  status: 'active' | 'suspended' | 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED';
  specialties: string[];
  earnings: {
    today: number;
    thisWeek: number;
    total: number;
  };
  availability: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: {
    street: string;
    apartment?: string;
    city: string;
    zip: string;
    notes?: string;
  };
  serviceId: string;
  serviceName: string;
  packageId: string;
  packageName: string;
  pricePerHour: number;
  hours: number;
  selectedDate: string;
  selectedTimeSlot: string;
  cleanerId?: string;
  cleanerName?: string;
  cleanerAvatar?: string;
  cleanerPhone?: string;
  status: 'pending' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
  subtotal: number;
  discount: number;
  serviceFee: number;
  totalAmount: number;
  paymentMethod: 'card' | 'apple_pay' | 'cash';
  paymentStatus: 'paid' | 'pending';
  createdAt: string;
  rating?: number;
  reviewComment?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  serviceName: string;
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'home-cleaning',
    name: 'Home Cleaning',
    category: 'residential',
    rating: 4.9,
    reviewCount: 2340,
    duration: '2-3 Hours',
    image: '/images/female_cleaner_hero.jpg',
    iconName: 'Home',
    shortDesc: 'Complete residential cleaning with safe, eco-friendly products.',
    fullDesc: 'Our professional home cleaning service gives you a fresh, spotless space. We use safe, eco-friendly products and experienced cleaners you can trust to care for your home with meticulous attention.',
    badges: ['2-3 Hours', 'Insured & Trusted', 'Same Day Available'],
    whatsIncluded: [
      { icon: 'Wind', title: 'Dusting', description: 'All surfaces, shelves, ceiling fans, and baseboards dusted' },
      { icon: 'Sparkles', title: 'Vacuuming', description: 'Thorough vacuuming of all carpets, rugs, and stairs' },
      { icon: 'ChefHat', title: 'Kitchen Cleaning', description: 'Countertops, stovetops, sinks, and exterior appliances' },
      { icon: 'Bath', title: 'Bathroom Cleaning', description: 'Deep disinfection of toilets, tubs, showers, and mirrors' },
      { icon: 'Trash2', title: 'Trash Removal', description: 'Emptying all bins and replacing trash liners' },
      { icon: 'Layers', title: 'Floor Mopping', description: 'Hardwood and tile sanitizing with organic formulas' }
    ],
    packages: [
      {
        id: 'pkg-std',
        name: 'Standard',
        pricePerHour: 65,
        description: 'Ideal for routine maintenance and regular touch-ups.',
        features: ['Surface Dusting', 'Vacuuming & Mopping', 'Kitchen & Bath Refresh', 'Trash Emptying']
      },
      {
        id: 'pkg-deep',
        name: 'Deep Clean',
        pricePerHour: 96,
        recommended: true,
        description: 'Thorough disinfection of grout, baseboards, and hard-to-reach areas.',
        features: ['All Standard items', 'Inside microwave & oven exterior', 'Detailed baseboards & doors', 'Bathroom lime/mold treatment']
      },
      {
        id: 'pkg-move',
        name: 'Move In/Out',
        pricePerHour: 120,
        description: 'Comprehensive cleaning designed for lease handovers and new homes.',
        features: ['Full deep clean', 'Inside empty cabinets & drawers', 'Inside fridge & oven interior', 'Spot wall cleaning & windows']
      }
    ],
    basePrice: 65
  },
  {
    id: 'srv-2',
    slug: 'sofa-cleaning',
    name: 'Sofa Cleaning',
    category: 'upholstery',
    rating: 4.8,
    reviewCount: 1420,
    duration: '1-2 Hours',
    image: '/images/hero_cleaner.jpg',
    iconName: 'Armchair',
    shortDesc: 'Deep fabric & leather upholstery sanitization and stain removal.',
    fullDesc: 'Revitalize your living room furniture. Our high-grade steam extraction eliminates dust mites, tough stains, pet odors, and allergen buildup without damaging delicate fabric threads.',
    badges: ['1-2 Hours', 'Fabric Safe Tech', 'Pet Odor Elimination'],
    whatsIncluded: [
      { icon: 'Sparkles', title: 'Pre-Vacuuming', description: 'Removal of loose crumbs, hair, and dry debris' },
      { icon: 'Layers', title: 'Spot Treatment', description: 'Targeted enzyme solution for stubborn stains' },
      { icon: 'Wind', title: 'Hot Steam Wash', description: 'Deep fiber sanitizing extracting 99.8% of allergens' },
      { icon: 'ShieldCheck', title: 'Fabric Guard', description: 'Protective shield layer against future spills' }
    ],
    packages: [
      {
        id: 'pkg-sofa-std',
        name: '2-3 Seater Sofa',
        pricePerHour: 55,
        description: 'Standard 2 or 3 seater fabric or leather sofa.',
        features: ['Deep Steam Extraction', 'Stain Pre-treatment', 'Eco Sanitizer Spray']
      },
      {
        id: 'pkg-sofa-lshape',
        name: 'L-Shape Sectional',
        pricePerHour: 85,
        recommended: true,
        description: 'Large corner sectional sofa with chaise lounge.',
        features: ['Sectional extraction', 'Cushion deep sanitizing', 'Odor neutralizer treatment']
      },
      {
        id: 'pkg-sofa-deluxe',
        name: 'Full Living Set',
        pricePerHour: 130,
        description: 'Sofa + 2 accent armchairs + ottomans.',
        features: ['Complete furniture suite', 'Leather conditioning or fabric protector', 'Express drying technology']
      }
    ],
    basePrice: 55
  },
  {
    id: 'srv-3',
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    category: 'floor',
    rating: 4.9,
    reviewCount: 980,
    duration: '2 Hours',
    image: '/images/living_room_banner.jpg',
    iconName: 'Sparkles',
    shortDesc: 'Professional industrial hot water extraction for carpets & rugs.',
    fullDesc: 'Eliminate embedded dirt, pet dander, and tough stains with our dual-chamber hot water extraction process. Dries rapidly in just 3-4 hours.',
    badges: ['Rapid Dry Tech', 'Pet & Child Safe', 'Eco Certified'],
    whatsIncluded: [
      { icon: 'Sparkles', title: 'High-Power Vacuum', description: 'Removes deep embedded grit before washing' },
      { icon: 'Wind', title: 'Steam Extraction', description: '220°F steam cleans down to carpet backing' },
      { icon: 'ShieldCheck', title: 'Deodorizing', description: 'Fresh herbal scent neutralizing pet odors' }
    ],
    packages: [
      {
        id: 'pkg-carpet-1room',
        name: '1-2 Rooms',
        pricePerHour: 60,
        description: 'Living area or 2 bedrooms.',
        features: ['Steam Extraction', 'Spot stain treatment', 'Fast drying airflow']
      },
      {
        id: 'pkg-carpet-whole',
        name: 'Whole Apartment',
        pricePerHour: 110,
        recommended: true,
        description: 'Up to 3-4 rooms and hallway runner.',
        features: ['All rooms & hallway', 'High-traffic lane booster', 'Anti-static conditioning']
      }
    ],
    basePrice: 60
  },
  {
    id: 'srv-4',
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    category: 'specialty',
    rating: 4.8,
    reviewCount: 820,
    duration: '1.5 Hours',
    image: '/images/hero_cleaner.jpg',
    iconName: 'AppWindow',
    shortDesc: 'Streak-free interior and exterior window and frame washing.',
    fullDesc: 'Crystal clear views using purified de-ionized water and soft-bristle squeegee systems that leave glass gleaming with zero residue or water marks.',
    badges: ['Streak Free Guarantee', 'Screens & Tracks', 'Non-Toxic'],
    whatsIncluded: [
      { icon: 'Sparkles', title: 'Glass Polishing', description: 'Streak-free inside and reachable exterior pane shine' },
      { icon: 'Wind', title: 'Track Vacuuming', description: 'Clearing dirt and bugs from sliding window tracks' },
      { icon: 'Layers', title: 'Screen Washing', description: 'Brushing and wiping mesh window screens' }
    ],
    packages: [
      {
        id: 'pkg-win-std',
        name: 'Standard (Up to 10 Panes)',
        pricePerHour: 50,
        description: 'Standard apartment or small townhouse.',
        features: ['Interior & exterior panes', 'Sill wipedown']
      },
      {
        id: 'pkg-win-large',
        name: 'Full Home (Up to 20 Panes)',
        pricePerHour: 90,
        recommended: true,
        description: 'Medium to large single-family home.',
        features: ['Full window suite', 'Tracks & screens included', 'Hydrophobic rain repellent']
      }
    ],
    basePrice: 50
  },
  {
    id: 'srv-5',
    slug: 'deep-cleaning',
    name: 'Deep Cleaning',
    category: 'specialty',
    rating: 5.0,
    reviewCount: 3120,
    duration: '3-5 Hours',
    image: '/images/female_cleaner_hero.jpg',
    iconName: 'ShieldCheck',
    shortDesc: 'Comprehensive top-to-bottom sanitization for a healthier home.',
    fullDesc: 'Our most thorough clean. We target areas commonly missed in standard routines: behind appliances, inside vents, scrubbing grout, and disinfecting high-touch points.',
    badges: ['Top-to-Bottom', '99.9% Bacteria Kill', 'Hospital Grade'],
    whatsIncluded: [
      { icon: 'Sparkles', title: 'Behind Appliances', description: 'Moving reachable appliances to scrub accumulated grime' },
      { icon: 'Wind', title: 'Grout Scrubbing', description: 'Rotary brush tile and grout whitening' },
      { icon: 'ChefHat', title: 'Degreasing Range Hood', description: 'Removing heavy grease filters and baking pans' },
      { icon: 'Bath', title: 'Limescale Dissolving', description: 'Restoring chrome faucets and glass shower doors' }
    ],
    packages: [
      {
        id: 'pkg-deep-condo',
        name: '1-2 Bedroom Deep',
        pricePerHour: 95,
        description: 'Ideal for condos and apartments.',
        features: ['Full intensive protocol', 'Eco sanitizers', '2 cleaners assigned']
      },
      {
        id: 'pkg-deep-house',
        name: '3+ Bedroom House',
        pricePerHour: 145,
        recommended: true,
        description: 'Large family homes needing restorative cleaning.',
        features: ['Dedicated team of 3', 'Appliance interior included', 'Air filter refresh']
      }
    ],
    basePrice: 95
  },
  {
    id: 'srv-6',
    slug: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    category: 'residential',
    rating: 4.9,
    reviewCount: 1650,
    duration: '2 Hours',
    image: '/images/living_room_banner.jpg',
    iconName: 'ChefHat',
    shortDesc: 'Sparkling countertops, oven degreasing & refrigerator refresh.',
    fullDesc: 'Turn grease and baked-on food into a restaurant-grade spotless food prep zone. We handle the messiest parts of your kitchen with food-safe degreasers.',
    badges: ['Food Safe Tech', 'Oven Degreasing', 'Sink Polishing'],
    whatsIncluded: [
      { icon: 'ChefHat', title: 'Oven Deep Clean', description: 'Baked grease dissolved without noxious chemical fumes' },
      { icon: 'Sparkles', title: 'Stainless Polish', description: 'Eliminating fingerprints and water streaks on fridge and dishwasher' },
      { icon: 'Trash2', title: 'Cabinet Exterior', description: 'Wiping splatters and cooking oil off cabinet doors' }
    ],
    packages: [
      {
        id: 'pkg-kitch-std',
        name: 'Kitchen Standard',
        pricePerHour: 58,
        description: 'Exterior appliances, counters, sink and backsplash.',
        features: ['Degrease stovetop', 'Sanitize counters', 'Polish sink & faucet']
      },
      {
        id: 'pkg-kitch-deep',
        name: 'Kitchen Intensive',
        pricePerHour: 88,
        recommended: true,
        description: 'Includes inside oven and inside refrigerator.',
        features: ['Inside oven soak', 'Inside fridge sanitized', 'Pantry wipe-down']
      }
    ],
    basePrice: 58
  },
  {
    id: 'srv-7',
    slug: 'garden-cleaning',
    name: 'Garden Cleaning',
    category: 'outdoor',
    rating: 4.7,
    reviewCount: 420,
    duration: '2-4 Hours',
    image: '/images/hero_cleaner.jpg',
    iconName: 'Sparkles',
    shortDesc: 'Keeping your garden and parking area clean is a tough job, but we are here to help.',
    fullDesc: 'We provide outdoor cleaning too. Keep your garden, patio, and driveways perfectly clean and presentable with our specialized outdoor cleaning equipment and eco-friendly moss/algae removers.',
    badges: ['Outdoor Specialists', 'Eco-Friendly', 'Pressure Washing'],
    whatsIncluded: [
      { icon: 'Sparkles', title: 'Pressure Washing', description: 'Deep cleaning of patios and driveways' },
      { icon: 'Wind', title: 'Debris Removal', description: 'Sweeping and bagging fallen leaves and debris' },
      { icon: 'ShieldCheck', title: 'Weed Control', description: 'Eco-friendly moss and weed treatment' }
    ],
    packages: [
      {
        id: 'pkg-garden-std',
        name: 'Standard Sweep',
        pricePerHour: 45,
        description: 'Basic sweep and debris bagging for small yards.',
        features: ['Sweeping', 'Leaf Bagging']
      },
      {
        id: 'pkg-garden-deep',
        name: 'Full Outdoor Revival',
        pricePerHour: 80,
        recommended: true,
        description: 'Includes pressure washing and weed treatment.',
        features: ['Pressure Washing', 'Weed Treatment', 'Full Sweeping']
      }
    ],
    basePrice: 45
  }
];

export const INITIAL_CLEANERS: Cleaner[] = [
  {
    id: 'cln-1',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Senior Master Cleaner',
    rating: 4.98,
    reviewCount: 420,
    jobsCompleted: 610,
    phone: '+1 (555) 234-8901',
    email: 'marcus.v@cleannest.com',
    isOnline: true,
    status: 'active',
    specialties: ['Deep Cleaning', 'Sofa Cleaning', 'Move In/Out'],
    earnings: {
      today: 185,
      thisWeek: 940,
      total: 18450
    },
    availability: ['09:00 AM - 12:00 PM', '01:00 PM - 04:00 PM', '05:00 PM - 08:00 PM']
  },
  {
    id: 'cln-2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'Home Sanitization Specialist',
    rating: 4.95,
    reviewCount: 380,
    jobsCompleted: 512,
    phone: '+1 (555) 345-6789',
    email: 'elena.r@cleannest.com',
    isOnline: true,
    status: 'active',
    specialties: ['Home Cleaning', 'Kitchen Cleaning', 'Organic Products'],
    earnings: {
      today: 210,
      thisWeek: 1120,
      total: 21300
    },
    availability: ['08:00 AM - 11:00 AM', '12:00 PM - 03:00 PM', '03:30 PM - 06:30 PM']
  },
  {
    id: 'cln-3',
    name: 'David Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'Carpet & Upholstery Tech',
    rating: 4.91,
    reviewCount: 290,
    jobsCompleted: 385,
    phone: '+1 (555) 456-7890',
    email: 'david.s@cleannest.com',
    isOnline: false,
    status: 'active',
    specialties: ['Carpet Cleaning', 'Window Cleaning', 'Stain Removal'],
    earnings: {
      today: 0,
      thisWeek: 640,
      total: 14200
    },
    availability: ['10:00 AM - 01:00 PM', '02:00 PM - 05:00 PM']
  }
];

export const INITIAL_BOOKINGS: Booking[] = [];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '2 days ago',
    comment: 'The team was punctual, respectful, and left my apartment smelling so fresh! The deep cleaning removed stains on my tile grout I thought were permanent.',
    serviceName: 'Home Cleaning'
  },
  {
    id: 'rev-2',
    customerName: 'Michael Chang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'Like Uber for cleaning! Booked at 8 AM, Marcus arrived at 10 AM, and my sectional sofa looks brand new. Super smooth booking experience.',
    serviceName: 'Sofa Cleaning'
  },
  {
    id: 'rev-3',
    customerName: 'Jessica Taylor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    rating: 4.9,
    date: '2 weeks ago',
    comment: 'Eco-friendly supplies were a huge plus since I have newborn twins and two Golden Retrievers. No harsh chemical smell at all.',
    serviceName: 'Deep Cleaning'
  }
];
