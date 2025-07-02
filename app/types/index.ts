import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

/**
 * Represents a single entry in the content generation history.
 * Used in Dashboard and History pages.
 */
export interface HistoryEntry {
  id: string;
  keyword: string;
  content: any; // Can be a string or a more complex object for structured content
  date: string;
  type?: string;
  wordCount?: number;
  tags?: string[];
}

/**
 * Represents a subscription plan for the Billing page.
 */
export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  limitations?: string[];
}

/**
 * Represents a testimonial for the Billing page.
 */
export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}