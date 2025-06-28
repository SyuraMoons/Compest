"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import {
  Check,
  X,
  Star,
  Users,
  Truck,
  Heart,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      subtitle: "Perfect for individuals",
      monthlyPrice: 50000,
      yearlyPrice: 540000,
      originalMonthlyPrice: 65000,
      originalYearlyPrice: 720000,
      popular: false,
      color: "from-gray-400 to-gray-600",
      features: [
        { name: "5 meals per week", included: true },
        { name: "Basic meal customization", included: true },
        { name: "Standard delivery", included: true },
        { name: "Email support", included: true },
        { name: "Nutritional information", included: true },
        { name: "Premium ingredients", included: false },
        { name: "Priority delivery", included: false },
        { name: "Personal nutritionist", included: false },
        { name: "Custom meal planning", included: false },
        { name: "24/7 phone support", included: false },
      ],
      highlights: [
        "Great for beginners",
        "Flexible scheduling",
        "No commitment",
      ],
    },
    {
      id: "standard",
      name: "Standard Plan",
      subtitle: "Most popular choice",
      monthlyPrice: 100000,
      yearlyPrice: 1080000,
      originalMonthlyPrice: 125000,
      originalYearlyPrice: 1380000,
      popular: true,
      color: "from-blue-500 to-blue-700",
      features: [
        { name: "10 meals per week", included: true },
        { name: "Advanced meal customization", included: true },
        { name: "Priority delivery", included: true },
        { name: "Email & chat support", included: true },
        { name: "Detailed nutritional tracking", included: true },
        { name: "Premium ingredients", included: true },
        { name: "Meal variety guarantee", included: true },
        { name: "Personal nutritionist", included: false },
        { name: "Custom meal planning", included: false },
        { name: "24/7 phone support", included: false },
      ],
      highlights: ["Best value", "Family friendly", "Premium ingredients"],
    },
    {
      id: "premium",
      name: "Premium Plan",
      subtitle: "Ultimate experience",
      monthlyPrice: 150000,
      yearlyPrice: 1620000,
      originalMonthlyPrice: 180000,
      originalYearlyPrice: 1980000,
      popular: false,
      color: "from-purple-500 to-purple-700",
      features: [
        { name: "15 meals per week", included: true },
        { name: "Full meal customization", included: true },
        { name: "Same-day delivery", included: true },
        { name: "24/7 premium support", included: true },
        { name: "Complete nutritional analysis", included: true },
        { name: "Organic premium ingredients", included: true },
        { name: "Unlimited meal variety", included: true },
        { name: "Personal nutritionist", included: true },
        { name: "Custom meal planning", included: true },
        { name: "VIP customer service", included: true },
      ],
      highlights: ["All-inclusive", "Personal nutritionist", "VIP treatment"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      plan: "Standard Plan",
      rating: 5,
      comment:
        "The Standard Plan is perfect for my family. Great variety and excellent value!",
      avatar: "/placeholder.svg?height=60&width=60",
      duration: "6 months",
    },
    {
      name: "Michael Chen",
      plan: "Premium Plan",
      rating: 5,
      comment:
        "The personal nutritionist feature has transformed my health journey completely.",
      avatar: "/placeholder.svg?height=60&width=60",
      duration: "1 year",
    },
    {
      name: "Priya Sharma",
      plan: "Basic Plan",
      rating: 5,
      comment:
        "Started with Basic and loved it so much! Perfect introduction to healthy eating.",
      avatar: "/placeholder.svg?height=60&width=60",
      duration: "3 months",
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.",
    },
    {
      question: "What if I need to pause my subscription?",
      answer:
        "You can pause your subscription for up to 2 months per year. Just contact our support team 48 hours before your next delivery.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "We cater to various dietary needs including vegetarian, vegan, gluten-free, keto, and more. Specify your preferences during signup.",
    },
    {
      question: "What's your delivery coverage area?",
      answer:
        "We currently deliver to major cities across Indonesia including Jakarta, Surabaya, Bandung, Medan, and 20+ other cities.",
    },
    {
      question: "Is there a minimum commitment period?",
      answer:
        "No minimum commitment required! You can cancel anytime. However, annual plans offer significant savings.",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("IDR", "Rp");
  };

  const getCurrentPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan) => {
    return billingCycle === "monthly"
      ? plan.originalMonthlyPrice
      : plan.originalYearlyPrice;
  };

  const getSavings = (plan) => {
    const current = getCurrentPrice(plan);
    const original = getOriginalPrice(plan);
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Select a subscription plan that fits your lifestyle and enjoy
              healthy meals delivered to your door
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">10,000+ Subscribers</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                  billingCycle === "yearly"
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section
        id="pricing"
        data-animate
        className={`py-16 transition-all duration-1000 ${
          isVisible.pricing
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  plan.popular
                    ? "ring-4 ring-blue-500 ring-opacity-50 scale-105"
                    : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 font-semibold">
                    <Award className="w-4 h-4 inline mr-2" />
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div
                  className={`bg-gradient-to-r ${plan.color} text-white p-8 ${
                    plan.popular ? "pt-16" : ""
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="opacity-90 mb-6">{plan.subtitle}</p>

                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold">
                        {formatPrice(getCurrentPrice(plan))}
                      </span>
                      <span className="text-lg opacity-75">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm line-through opacity-60">
                        {formatPrice(getOriginalPrice(plan))}
                      </span>
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Save {getSavings(plan)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.included ? "text-gray-900" : "text-gray-400"
                          }
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <div className="text-sm font-semibold text-gray-700 mb-3">
                      Plan Highlights:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.highlights.map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected Plan" : "Choose Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose SEA Catering?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best healthy meal experience in
              Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8 text-blue-600" />,
                title: "Fast Delivery",
                description:
                  "Same-day delivery available in major cities across Indonesia",
              },
              {
                icon: <Heart className="w-8 h-8 text-blue-600" />,
                title: "Fresh Ingredients",
                description:
                  "Locally sourced, organic ingredients prepared daily by expert chefs",
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Quality Guaranteed",
                description:
                  "100% satisfaction guarantee or your money back, no questions asked",
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "Flexible Plans",
                description:
                  "Change, pause, or cancel your subscription anytime with no penalties",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              What Our Subscribers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who love their meal
              subscriptions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.plan} • {testimonial.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Got questions? We've got answers to help you make the right
                choice
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Healthy Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who have transformed their
            eating habits with SEA Catering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              Start Your Subscription
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
              <p className="text-gray-300">
                Our team is here to help you find the perfect plan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-300">(+62) 8123456789</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-300">hello@seacatering.com</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
                <p className="text-gray-300">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">SEA Catering</h3>
            <p className="text-gray-400 mb-6">
              Healthy Meals, Anytime, Anywhere
            </p>
            <div className="text-sm text-gray-500">
              © 2024 SEA Catering. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
