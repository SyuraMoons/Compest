"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Quote,
} from "lucide-react";

export default function TestimonialPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Jakarta",
      rating: 5,
      message:
        "SEA Catering has completely transformed my eating habits! The meals are always fresh, delicious, and perfectly portioned. I've been a subscriber for 8 months now and couldn't be happier.",
      plan: "Standard Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Surabaya",
      rating: 5,
      message:
        "As a busy professional, SEA Catering has been a lifesaver. The variety is amazing, and the nutritional information helps me stay on track with my fitness goals. Highly recommend!",
      plan: "Premium Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Bandung",
      rating: 5,
      message:
        "The customization options are fantastic! They accommodate my dietary restrictions perfectly, and the customer service is exceptional. Every meal feels like it's made just for me.",
      plan: "Basic Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Wong",
      location: "Medan",
      rating: 4,
      message:
        "Great quality meals with excellent packaging. The delivery is always on time, and the variety keeps me excited for each meal. Only wish there were more dessert options!",
      plan: "Standard Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "1 week ago",
    },
    {
      id: 5,
      name: "Lisa Martinez",
      location: "Jakarta",
      rating: 5,
      message:
        "I've tried many meal delivery services, but SEA Catering stands out. The ingredients are fresh, the flavors are incredible, and it's helped me maintain a healthy lifestyle effortlessly.",
      plan: "Premium Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "2 months ago",
    },
    {
      id: 6,
      name: "Ahmad Rahman",
      location: "Yogyakarta",
      rating: 5,
      message:
        "Perfect for my family! The portion sizes are just right, and my kids actually enjoy eating healthy now. The meal planning feature is a game-changer for busy parents.",
      plan: "Standard Plan",
      avatar: "/placeholder.svg?height=80&width=80",
      date: "3 weeks ago",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Review message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Review message must be at least 20 characters long";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          rating: formData.rating,
          // You can include email if you want to store it
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          rating: 0,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Customer Testimonials
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Hear what our amazing customers have to say about their SEA
              Catering experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9/5 Average Rating</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">1000+ Happy Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section
        id="testimonial-carousel"
        data-animate
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible["testimonial-carousel"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600">
                Real reviews from real customers who love SEA Catering
              </p>
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:p-12 mx-4 rounded-2xl">
                        <div className="text-center">
                          <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6 opacity-50" />
                          <div className="flex justify-center mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-6 h-6 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                            "{testimonial.message}"
                          </p>
                          <div className="flex items-center justify-center gap-4">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="text-left">
                              <div className="font-bold text-gray-900 text-lg">
                                {testimonial.name}
                              </div>
                              <div className="text-gray-600">
                                {testimonial.location}
                              </div>
                              <div className="text-sm text-blue-600 font-medium">
                                {testimonial.plan}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-4">
                            {testimonial.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Testimonial Form */}
      <section
        id="submit-testimonial"
        data-animate
        className={`py-16 bg-gray-50 transition-all duration-1000 ${
          isVisible["submit-testimonial"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Share Your Experience</h2>
              <p className="text-xl text-gray-600">
                We'd love to hear about your SEA Catering journey! Your feedback
                helps us improve and helps others discover healthy eating.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">
                    Thank you for your review! It will be published after
                    moderation.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">
                    Failed to submit review. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || formData.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {formData.rating > 0 &&
                        `${formData.rating} out of 5 stars`}
                    </span>
                  </div>
                  {errors.rating && (
                    <p className="text-red-500 text-sm">{errors.rating}</p>
                  )}
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us about your experience with SEA Catering. What did you love most? How has it helped you?"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                      errors.message
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.message.length}/500 characters (minimum 20
                    required)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Review...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Healthy Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers and experience the SEA
            Catering difference
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
