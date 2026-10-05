export interface BookReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verifiedPurchase: boolean;
}

export interface BookFormat {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

export interface BookCoverDesign {
  bg: string;
  spineBg: string;
  textColor: string;
  accentColor: string;
  foilColor: string;
  pattern: 'geometric' | 'botanical' | 'constellation' | 'waves' | 'marbled' | 'vintage-border';
  motifIcon: string;
  texture: 'linen' | 'leather' | 'buckram' | 'vellum';
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio: string;
  translator?: string;
  year: number;
  pages: number;
  isbn: string;
  publisher: string;
  genre: 'Literary Fiction' | 'Essays & Philosophy' | 'Natural History' | 'Art & Architecture' | 'Poetry & Letters' | 'Speculative Fiction' | 'Rare & Antiquarian';
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isStaffPick: boolean;
  staffRecommendation?: {
    curator: string;
    role: string;
    quote: string;
  };
  isBestseller?: boolean;
  isCollectorEdition?: boolean;
  coverDesign: BookCoverDesign;
  formats: BookFormat[];
  synopsis: string;
  excerpt: {
    chapterTitle: string;
    paragraphs: string[];
  };
  specs: {
    binding: string;
    paperStock: string;
    dimensions: string;
    weight: string;
    editionInfo: string;
  };
  reviews: BookReview[];
}

export interface CartItem {
  id: string;
  bookId: string;
  book: Book;
  formatId: string;
  formatName: string;
  price: number;
  quantity: number;
  giftWrap: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    giftNote?: string;
  };
  shippingMethod: 'Heritage Post (3-5 days)' | 'Express Courier (Next Day)' | 'Bloomsbury Shop Pickup';
  status: 'Processing in Bindery' | 'Shipped via Heritage Post' | 'Delivered';
}

export interface BookClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  author: string;
  moderator: string;
  bookTitle: string;
  spotsLeft: number;
  location: string;
  description: string;
}
