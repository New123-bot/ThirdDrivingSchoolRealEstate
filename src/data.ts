import { Property, Instructor, Testimonial, CoursePackage, TimelineItem } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: '2 BHK Downtown Condo',
    price: 180000,
    type: 'Residential',
    beds: 2,
    baths: 2,
    sqft: 1200,
    address: '224 Concrete Highrise Blvd, Downtown',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    features: ['Near Transit', 'Balcony Skyview', 'Rooftop Access']
  },
  {
    id: 'prop-2',
    title: '3 BHK with Double Garage',
    price: 250000,
    type: 'Residential',
    beds: 3,
    baths: 2,
    sqft: 1800,
    address: '404 Asphalt Way, Pines Subdivision',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    features: ['2-Car Garage Included', 'Open Plan Kitchen', 'Fenced Backyard']
  },
  {
    id: 'prop-3',
    title: 'DualDrive Commercial Space',
    price: 450000,
    type: 'Commercial',
    sqft: 2400,
    address: '512 Business Grid Ave, Commercial Central',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    features: ['High-Foot-Traffic Location', 'Renovated in 2025', 'Loading Bay Access']
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Michael Reynolds',
    experience: '15+ Years',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', // professional portrait
    rating: 5,
    specialty: 'Defensive Driving & Parallel Parking Coach / Licensed Realtor'
  },
  {
    id: 'inst-2',
    name: 'Sarah Jenkins',
    experience: '8+ Years',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    specialty: 'Highway Confidence & Severe Weather Prep'
  },
  {
    id: 'inst-3',
    name: 'David Chen',
    experience: '6+ Years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    specialty: 'DMV Practical Test Optimization'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Jessica Porter',
    role: 'Homeowner & Reynolds Graduate',
    review: 'Michael taught me parallel parking on Monday and negotiated $10,000 off my condo closing cost on Friday! Best multi-talented coach in Cityville.',
    rating: 5,
    date: 'April 2026'
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Licensed Driver',
    review: 'I had driving anxiety on high-speed bypasses. Coach Sarah was wonderfully patient. Her Highway Confidence curriculum is worth every dollar. Passed on my first attempt!',
    rating: 5,
    date: 'May 2026'
  }
];

export const COURSE_PACKAGES: CoursePackage[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Safety Kickstart',
    price: 299,
    duration: '5 Lessons (1 hour each)',
    features: [
      'Pre-License Fundamentals',
      'Behind-the-Wheel Driving Prep',
      'Basic Parking (Parallel, Angle, Perpendicular)',
      'Certified Simulator Mock Trial',
      'Local DMV Scheduling Support'
    ],
    recommended: false,
    accent: '#ff6b35'
  },
  {
    id: 'pkg-advanced',
    name: 'Advanced Highway Mastery',
    price: 499,
    duration: '10 Lessons (1 hour each)',
    features: [
      'ALL Basic Package inclusions',
      'High-Speed Turnpike & Interstate Merging',
      'Hazard Avoidance & Nighttime Operations',
      'Official Reynolds Certificate (Saves on premium)',
      'Free Pickup & Dropoff of student'
    ],
    recommended: true,
    accent: '#ff6b35'
  },
  {
    id: 'pkg-complete',
    name: 'Complete "Drive to Own" Fleet',
    price: 899,
    duration: '20 Lessons + Car Rental for DMV',
    features: [
      'ALL Advanced Inclusions',
      'Manual AND Automatic training access',
      'DMV Drive Exam car rental reservation',
      'Guarantee Pass (Free refresher if failure)',
      'Exclusive: $1,000 Credit for Real Estate services'
    ],
    recommended: false,
    accent: '#ff6b35'
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: 2010,
    title: 'Reynolds Driving Academy Opened',
    description: 'Michael Reynolds starts teaching behind-the-wheel lessons with only a single dual-control sedan and a mission to cure driving anxiety.',
    iconType: 'driving'
  },
  {
    year: 2015,
    title: 'Fleet Expansion',
    description: 'The driving school expands to a robust fleet of 10 modern training vehicles, introducing computer simulator training programs.',
    iconType: 'expansion'
  },
  {
    year: 2018,
    title: 'Real Estate Board Licensure',
    description: 'Witnessing students transition into careers, adult lives, and need for stable housing, Michael fulfills a lifelong interest in structural blueprints and gets certified as a Realtor.',
    iconType: 'realtor'
  },
  {
    year: 2021,
    title: 'DualDrive & Estate Synergy',
    description: 'Launches the revolutionary "Drive to Own" framework, offering direct estate commission credits to school graduates buying homes. Driving and buying merged under one roof.',
    iconType: 'merger'
  },
  {
    year: 2024,
    title: 'Golden Milestones',
    description: 'Celebrated over 500+ defensive driver credentials awarded and $15M+ in volume residential units closed under Michael’s direct representation.',
    iconType: 'milestone'
  }
];
