import { Crown, Users } from "lucide-react";
import { Plan, Testimonial } from "@/app/types";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    features: [
      "5 AI generations per month",
      "3 basic templates",
      "Community support",
      "Standard processing speed",
      "Basic SEO suggestions"
    ],
    limitations: [
      "Limited template variety",
      "No advanced analytics",
      "Community support only"
    ],
    description: "Perfect for trying out our AI-powered SEO tools",
    icon: Users,
    buttonText: "Get Started Free"
  },
  {
    id: "pro",
    name: "Pro",
    price: 20,
    originalPrice: 29,
    popular: true,
    features: [
      "Unlimited AI generations",
      "50+ advanced templates",
      "Priority email support",
      "Advanced analytics dashboard",
      "Export to multiple formats",
      "AI-powered keyword research",
      "Competitor analysis",
      "Custom branding options",
      "API access",
      "Advanced SEO optimization"
    ],
    description: "Everything you need to dominate search rankings",
    icon: Crown,
    buttonText: "Start Pro Trial"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Digital Marketing Manager",
    content: "Increased our organic traffic by 300% in just 3 months!",
    avatar: "SC"
  },
  {
    name: "Mike Rodriguez",
    role: "SEO Specialist",
    content: "The AI suggestions are incredibly accurate and save me hours.",
    avatar: "MR"
  }
];