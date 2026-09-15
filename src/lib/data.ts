export interface ServiceItem {
  id: string;
  name: string;
  category: "hair" | "beard" | "shave" | "package";
  price: number;
  durationMin: number;
  description: string;
  popular?: boolean;
}

export interface BarberProfile {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialties: string[];
  avatar: string;
  bio: string;
  chairNumber: number;
  chairStatus: "available" | "in_chair" | "off_duty";
  currentClient?: string;
  rating: number;
  reviewCount: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  barberName: string;
  barberId: string;
  serviceId: string;
  beforeImg: string;
  afterImg: string;
  stylingNotes: string;
  pomadeRecommended: string;
  hairType: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  haircutType: string;
  barberName: string;
  comment: string;
  ownerReply?: string;
}

export interface StudioInfo {
  name: string;
  address: string;
  suite: string;
  cityStateZip: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  announcement: string;
  hours: { [key: string]: { open: string; close: string; isClosed: boolean } };
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "sig-cut",
    name: "The Signature Atelier Haircut",
    category: "hair",
    price: 55,
    durationMin: 45,
    description: "Bespoke consultation, precision shear or clipper work, hot lather neck shave, and tailored styling.",
    popular: true,
  },
  {
    id: "cut-beard",
    name: "Master Cut & Sculpted Beard",
    category: "package",
    price: 85,
    durationMin: 65,
    description: "Full signature haircut combined with hot towel steam, beard contouring, straight razor edge, and organic beard oil.",
    popular: true,
  },
  {
    id: "skin-fade",
    name: "Precision Skin Fade & Taper",
    category: "hair",
    price: 60,
    durationMin: 45,
    description: "Foil shaver zero fade to desired crown length, foil blending, crisp temple taper, and matte styling balm.",
  },
  {
    id: "royal-shave",
    name: "Traditional Hot Towel Straight Razor Shave",
    category: "shave",
    price: 45,
    durationMin: 35,
    description: "Multi-step essential oil steam towels, pre-shave cream, badger brush lather, straight razor shave, and cold eucalyptus compress.",
  },
  {
    id: "beard-sculpt",
    name: "Artisan Beard Sculpt & Razor Line",
    category: "beard",
    price: 35,
    durationMin: 30,
    description: "Detailed length reduction, cheek line razor alignment, mustache shaping, and conditioning treatment.",
  },
  {
    id: "executive-ritual",
    name: "The Executive Grooming Ritual",
    category: "package",
    price: 125,
    durationMin: 90,
    description: "Haircut, straight razor beard treatment, invigorating scalp massage, purifying charcoal eye compress, and craft beverage.",
  },
];

export const MASTER_BARBERS: BarberProfile[] = [
  {
    id: "julian",
    name: "Julian Vance",
    title: "Master Barber & Creative Director",
    experienceYears: 14,
    specialties: ["Classic Scissor Work", "Modern Editorial Quiffs", "Texture Flow"],
    avatar: "https://images.pexels.com/photos/3998404/pexels-photo-3998404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
    bio: "Trained on Savile Row and Manhattan. Specializes in timeless silhouettes and customized hair architectural flow.",
    chairNumber: 1,
    chairStatus: "available",
    rating: 5.0,
    reviewCount: 218,
  },
  {
    id: "marcus",
    name: "Marcus Cole",
    title: "Fade Specialist & Razor Artisan",
    experienceYears: 9,
    specialties: ["Seamless Low Fades", "Razor Sharp Lineups", "Textured Crops"],
    avatar: "https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
    bio: "Renowned for sub-millimeter taper precision and seamless skin blends. Passionate about modern street elegance.",
    chairNumber: 2,
    chairStatus: "in_chair",
    currentClient: "David L. (In Chair)",
    rating: 4.9,
    reviewCount: 164,
  },
  {
    id: "stefan",
    name: "Stefan Rossi",
    title: "Master Barber & Beard Architect",
    experienceYears: 12,
    specialties: ["Hot Towel Shaves", "Full Beard Architecture", "Old-World Grooming"],
    avatar: "https://images.pexels.com/photos/3998413/pexels-photo-3998413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600",
    bio: "Apprenticed in Florence. Master of straight razor ergonomics, facial symmetry contouring, and hot towel rituals.",
    chairNumber: 3,
    chairStatus: "available",
    rating: 5.0,
    reviewCount: 100,
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-1",
    title: "Executive High Fade & Textured Crop",
    category: "Fades & Tapers",
    barberName: "Marcus Cole",
    barberId: "marcus",
    serviceId: "skin-fade",
    beforeImg: "https://images.pexels.com/photos/8638711/pexels-photo-8638711.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/12074386/pexels-photo-12074386.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Clean zero foil transition on temples into a blunt point-cut fringe with micro-texture throughout the crown.",
    pomadeRecommended: "Atelier Matte Clay (High Hold, Zero Shine)",
    hairType: "Medium Density • Straight to Wavy",
  },
  {
    id: "look-2",
    title: "Gentleman's Taper & Full Sculpted Beard",
    category: "Beard & Shave",
    barberName: "Stefan Rossi",
    barberId: "stefan",
    serviceId: "cut-beard",
    beforeImg: "https://images.pexels.com/photos/9286929/pexels-photo-9286929.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/3998408/pexels-photo-3998408.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Natural low temple taper preserving ear line, paired with straight razor cheek demarcation and tapered neckline.",
    pomadeRecommended: "Atelier Cedarwood Conditioning Oil & Medium Paste",
    hairType: "Thick Density • Coarse Beard",
  },
  {
    id: "look-3",
    title: "Modern Editorial Quiff & Shear Flow",
    category: "Scissor Craft",
    barberName: "Julian Vance",
    barberId: "julian",
    serviceId: "sig-cut",
    beforeImg: "https://images.pexels.com/photos/35584578/pexels-photo-35584578.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/34702982/pexels-photo-34702982.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Scissor over comb sides tapered to 1/2 inch. Top layered with internal weight removal for effortless backward sweep.",
    pomadeRecommended: "Atelier Sea Salt Spray + Featherweight Cream",
    hairType: "Fine to Medium • Wavy Flow",
  },
  {
    id: "look-4",
    title: "Precision Temple Fade & Razor Edge",
    category: "Fades & Tapers",
    barberName: "Marcus Cole",
    barberId: "marcus",
    serviceId: "skin-fade",
    beforeImg: "https://images.pexels.com/photos/15659458/pexels-photo-15659458.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/12464841/pexels-photo-12464841.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Sub-millimeter foil blend across occipital bone into clean razor-carved temporal points.",
    pomadeRecommended: "Atelier Natural Finish Texture Powder",
    hairType: "Coarse / Thick Density",
  },
  {
    id: "look-5",
    title: "Traditional Hot Towel Straight Razor Shave",
    category: "Beard & Shave",
    barberName: "Stefan Rossi",
    barberId: "stefan",
    serviceId: "royal-shave",
    beforeImg: "https://images.pexels.com/photos/3998403/pexels-photo-3998403.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/9315046/pexels-photo-9315046.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Triple-steam herbal infusion towels, badger brush warm lather, dual-pass straight razor shave, and chilled eucalyptus compress.",
    pomadeRecommended: "Atelier Soothing Post-Shave Botanical Tonic",
    hairType: "Sensitive Skin • Dense Growth",
  },
  {
    id: "look-6",
    title: "Classic Low Taper & Textured Side Part",
    category: "Classic Heritage",
    barberName: "Julian Vance",
    barberId: "julian",
    serviceId: "sig-cut",
    beforeImg: "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=800",
    afterImg: "https://images.pexels.com/photos/2805050/pexels-photo-2805050.jpeg?auto=compress&cs=tinysrgb&w=800",
    stylingNotes: "Scissor-over-comb gradual taper around the neckline and ears, paired with a razor-etched soft part line and natural finger-combed flow.",
    pomadeRecommended: "Atelier Classic High-Hold Low-Shine Water Pomade",
    hairType: "Medium to Thick • Natural Wave",
  },
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Harrison Wright",
    rating: 5,
    date: "3 days ago",
    verified: true,
    haircutType: "Master Cut & Sculpted Beard",
    barberName: "Stefan Rossi",
    comment: "Hands down the best barbershop experience I have had in the US. No loud music, no rushed 15-minute clippers. Stefan took his time with the hot towels and straight razor. Left looking like a new man.",
    ownerReply: "Thank you Harrison. Stefan's precision with the straight razor is unmatched. Look forward to seeing you in 3 weeks!",
  },
  {
    id: "rev-2",
    author: "Dr. Bradley Mercer",
    rating: 5,
    date: "1 week ago",
    verified: true,
    haircutType: "The Signature Atelier Haircut",
    barberName: "Julian Vance",
    comment: "Julian is a master of scissor mechanics. I've had cowlicks that other barbers butchered for a decade; Julian figured out the natural growth pattern in 2 minutes. The studio ambiance is pure luxury.",
    ownerReply: "Much appreciated Dr. Mercer! Respecting hair geometry is our golden rule.",
  },
  {
    id: "rev-3",
    author: "Marcus Vance",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    haircutType: "Precision Skin Fade & Taper",
    barberName: "Marcus Cole",
    comment: "The skin fade from Marcus is flawless. Blended seamlessly to zero with no harsh lines. Also loved booking directly online with live calendar slots instead of calling or waiting around.",
  },
  {
    id: "rev-4",
    author: "Christopher Evans",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    haircutType: "The Executive Grooming Ritual",
    barberName: "Stefan Rossi",
    comment: "Booked the 90-minute ritual before my wedding. The hot steam towels, scalp treatment, and beard sculpt were top tier. Worth every single dollar.",
    ownerReply: "Congratulations Christopher! Honored to get you sharp for your big day.",
  },
];

export const INITIAL_STUDIO_INFO: StudioInfo = {
  name: "Atelier Men's Grooming",
  address: "142 Elm Street",
  suite: "Suite 104 (Courtyard Level)",
  cityStateZip: "Auburn, AL 36830",
  phone: "(334) 555-0192",
  email: "concierge@atelierbarbershop.com",
  coordinates: { lat: 32.6099, lng: -85.4808 },
  announcement: "Complimentary single-malt tasting with every Thursday & Friday evening service.",
  hours: {
    Monday: { open: "10:00 AM", close: "6:00 PM", isClosed: false },
    Tuesday: { open: "9:00 AM", close: "8:00 PM", isClosed: false },
    Wednesday: { open: "9:00 AM", close: "8:00 PM", isClosed: false },
    Thursday: { open: "9:00 AM", close: "8:00 PM", isClosed: false },
    Friday: { open: "8:30 AM", close: "8:00 PM", isClosed: false },
    Saturday: { open: "8:00 AM", close: "6:00 PM", isClosed: false },
    Sunday: { open: "10:00 AM", close: "4:00 PM", isClosed: true },
  },
};
