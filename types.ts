
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

export interface SiteConfig {
  heroTitle: string;
  heroSub: string;
  accentColor: string;
  brandName: string;
}

export interface AppState {
  config: SiteConfig;
  portfolios: PortfolioItem[];
  pricing: PricingPlan[];
  inquiries: Inquiry[];
}
