export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  title: string;
  address: string;
  hotline: string;
  email: string;
}

export interface FooterConfig {
  description: string;
  badges: string[];
  columns: FooterColumn[];
  contact: FooterContact;
  copyright: string;
  legalLinks: FooterLink[];
}

export interface FooterProps {
  config?: FooterConfig;
  className?: string;
}
