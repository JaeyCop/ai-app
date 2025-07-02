"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Shield, 
  Headphones, 
  BarChart3, 
  Download,
  Sparkles,
  CreditCard,
  Users
} from "lucide-react";
import { Plan, Testimonial } from "@/app/types";
import { plans, testimonials } from "./data";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleSubscribe = async () => {
    if (selectedPlan === "starter") return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ai-green/10 to-ai-blue/10 blur-3xl"></div>
        <div className="relative px-6 py-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-ai-green mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent">
                Choose Your Plan
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Unlock the full potential of AI-powered SEO tools and dominate search rankings
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-ai-surface border border-ai-border rounded-xl p-1 flex">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-ai-green text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                    billingCycle === "yearly"
                      ? "bg-ai-green text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-ai-orange text-xs px-2 py-1 rounded-full text-white font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.id;
              const displayPrice = billingCycle === "yearly" && plan.price > 0 
                ? Math.round(plan.price * 0.8) 
                : plan.price;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-ai-black border-2 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "border-ai-green shadow-2xl shadow-ai-green/20"
                      : plan.popular
                      ? "border-ai-orange shadow-xl shadow-ai-orange/10"
                      : "border-ai-border hover:border-ai-gray"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-ai-orange to-ai-green px-6 py-2 rounded-full flex items-center">
                        <Star className="h-4 w-4 mr-2 text-white" />
                        <span className="text-white font-bold text-sm">Most Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <plan.icon className={`h-8 w-8 ${
                        plan.popular ? "text-ai-orange" : "text-ai-green"
                      }`} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    
                    <div className="flex items-center justify-center">
                      {plan.originalPrice && billingCycle === "monthly" && (
                        <span className="text-gray-500 line-through mr-2 text-lg">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <div className="text-4xl font-bold">
                        {displayPrice === 0 ? (
                          <span className="text-ai-green">Free</span>
                        ) : (
                          <>
                            <span className="text-ai-orange">${displayPrice}</span>
                            <span className="text-lg text-gray-400 font-medium">
                              /{billingCycle === "yearly" ? "mo" : "mo"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {billingCycle === "yearly" && plan.price > 0 && (
                      <p className="text-sm text-ai-green mt-2">
                        Billed annually (${displayPrice * 12}/year)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Check className="h-5 w-5 text-ai-green mr-2" />
                      What's included:
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-start text-gray-300"
                        >
                          <Check className="h-5 w-5 text-ai-green mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Limitations for free plan */}
                    {plan.limitations && (
                      <div className="mt-6 pt-6 border-t border-ai-border">
                        <h4 className="text-gray-400 font-medium mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-start text-gray-500 text-sm">
                              <div className="h-2 w-2 bg-gray-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isSelected
                        ? plan.popular
                          ? "bg-gradient-to-r from-ai-orange to-ai-green text-white shadow-lg hover:shadow-xl"
                          : "bg-ai-green text-white shadow-lg hover:shadow-xl"
                        : "bg-ai-surface border border-ai-border text-gray-300 hover:bg-ai-gray hover:text-white hover:border-ai-green"
                    }`}
                  >
                    {isSelected ? "Selected Plan" : plan.buttonText}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Subscribe Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.button
                  key="subscribe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleSubscribe}
                  disabled={isLoading || selectedPlan === "starter"}
                  className={`inline-flex items-center px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
                    selectedPlan === "starter"
                      ? "bg-ai-surface text-gray-400 cursor-not-allowed"
                      : isLoading
                      ? "bg-ai-green/50 text-white cursor-wait"
                      : "bg-gradient-to-r from-ai-green to-ai-blue text-white hover:shadow-2xl hover:shadow-ai-green/30 hover:scale-105"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : selectedPlan === "starter" ? (
                    <>
                      <Users className="h-6 w-6 mr-3" />
                      Current Plan - Free
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-6 w-6 mr-3" />
                      {selectedPlanData?.buttonText} - ${billingCycle === "yearly" && selectedPlanData?.price 
                        ? Math.round(selectedPlanData.price * 0.8) 
                        : selectedPlanData?.price}/mo
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center px-8 py-4 bg-ai-green rounded-xl text-white font-bold text-xl"
                >
                  <Check className="h-6 w-6 mr-3" />
                  Successfully Subscribed!
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-gray-400 mt-4 text-sm">
              🔒 Secure payment processing • Cancel anytime • 30-day money-back guarantee
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Trusted by 10,000+ SEO professionals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-ai-green to-ai-blue rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-gray-300 mb-3">"{testimonial.content}"</p>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-ai-surface border border-ai-border rounded-xl p-8">
              <Shield className="h-8 w-8 text-ai-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Solution Available</h3>
              <p className="text-gray-300 mb-4">
                Need custom features, dedicated support, or volume pricing? 
                We offer tailored solutions for larger organizations.
              </p>
              <button className="text-ai-green hover:text-ai-blue font-semibold transition-colors">
                Contact Sales →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}