export interface Property {
  id: string;
  title: string;
  price: number;
  type: 'Residential' | 'Commercial' | 'Garage';
  beds?: number;
  baths?: number;
  sqft: number;
  address: string;
  image: string;
  features: string[];
}

export interface Instructor {
  id: string;
  name: string;
  experience: string;
  avatar: string;
  rating: number;
  specialty: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

export interface CoursePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended: boolean;
  accent: string;
}

export interface TimelineItem {
  year: number;
  title: string;
  description: string;
  iconType: 'driving' | 'expansion' | 'realtor' | 'merger' | 'milestone';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: 'driving' | 'realestate' | 'both' | '';
  message: string;
}
