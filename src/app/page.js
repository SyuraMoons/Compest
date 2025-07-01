"use client";
import Navbar from "./components/navbar";
import Link from "next/link";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Utensils,
  MapPin,
  Heart,
  Phone,
  User,
  CheckCircle,
  Star,
  ArrowRight,
  ForkAndKnife,
} from "lucide-react";
export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // ✅ data from DB via API
      });
  }, []);

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
      { threshold: 0.5 }
    );
    // note ini aga berbeda
    const elements = document.querySelectorAll(".observe");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Utensils className="w-8 h-8 text-blue-600" />,
      title: "Meal Customization",
      description:
        "Personalize your meals according to your diet and nutrition goals",
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Delivery to major cities",
      description: "Choose your delivery time and location",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Dietary Options for All Needs",
      description:
        "From vegan to keto, we cater to all dietary requirements and lifestyle choices.",
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      title: "24/7 Customer Support",
      description: "We're here to help you anytime, anywhere",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing service! The meals are always fresh and perfectly portioned.",
      location: "Jakarta",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "SEA Catering has transformed my eating habits. Highly recommended!",
      location: "Surabaya",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "The customization options are fantastic. Love the variety!",
      location: "Bandung",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black-800">
      {/* Hero Section */}
      <section
        id="hero"
        data-animate
        className={`observe not-[]:relative bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-20 lg:py-32 text-center overflow-hidden transition-all duration-1000 ${
          isVisible.hero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Sea <span className="text-blue-600">Catering</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 mb-8 font-light">
              Healthy Meals, Anytime, Anywhere
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2">
                Contact Us
                <Link href="/contact"></Link>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                View Menu
                <Link href="/menu"></Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`observe py-20 lg:py-32 bg-gray-50 transition-all duration-1000 ${
          isVisible.about
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              About Us
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-blue-600">
                  SEA Catering
                </span>
                , your personalized solution for healthy and delicious meals
                delivered right to your doorstep, anywhere in Indonesia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that nutritious eating should seamlessly integrate
                into your lifestyle, whether you're at home, at work, or on the
                go. Our customizable meal plans are thoughtfully designed to
                nourish your body and delight your taste buds, no matter where
                you are in the archipelago.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Fresh Ingredients
                </span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  Locally Sourced
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Expert Chefs
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-blue-100">
                    To make healthy eating accessible, convenient, and delicious
                    for everyone across Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        data-animate
        className={`observe py-20 lg:py-32 bg-white transition-all duration-1000 ${
          isVisible.features
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our Features
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              Discover what makes SEA Catering the perfect choice for your
              healthy lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* View All Testimonials Button */}
          <div className="text-center mt-12">
            <Link
              href="/testimonial"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Testimonials
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        data-animate
        className={`observe py-20 lg:py-32 bg-white transition-all duration-1000 ${
          isVisible.contact
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Manager Brian
                  </div>
                  <div className="text-gray-600">(+62) 8123456789</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="mb-6 opacity-90">
                Ready to start your healthy meal journey? Contact us today and
                let's discuss your personalized meal plan!
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Contact Now <Link href="/contact"></Link>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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
