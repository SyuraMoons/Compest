"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Star,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "subscription", label: "Subscription Questions" },
    { value: "menu", label: "Menu & Nutrition" },
    { value: "delivery", label: "Delivery Issues" },
    { value: "billing", label: "Billing & Payments" },
    { value: "feedback", label: "Feedback & Suggestions" },
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Speak directly with our customer service team",
      contact: "(+62) 8123456789",
      availability: "Mon-Fri: 9AM-6PM",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description:
        "Send us a detailed message and we'll respond within 24 hours",
      contact: "hello@seacatering.com",
      availability: "24/7 Response",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help through our live chat support",
      contact: "Available on website",
      availability: "Mon-Fri: 9AM-9PM",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come to our headquarters for in-person assistance",
      contact: "Jakarta, Indonesia",
      availability: "By Appointment",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const teamMembers = [
    {
      name: "Brian",
      role: "Customer Success Manager",
      description: "Specializes in subscription plans and customer onboarding",
      avatar: "/placeholder.svg?height=80&width=80",
      contact: "(+62) 8123456789",
    },
    {
      name: "Sarah",
      role: "Nutrition Specialist",
      description: "Expert in meal planning and dietary requirements",
      avatar: "/placeholder.svg?height=80&width=80",
      contact: "nutrition@seacatering.com",
    },
    {
      name: "Michael",
      role: "Delivery Coordinator",
      description: "Handles delivery schedules and logistics",
      avatar: "/placeholder.svg?height=80&width=80",
      contact: "delivery@seacatering.com",
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Have questions or feedback? We'd love to hear from you! Reach out
              through any of our contact methods
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">24/7 Support Available</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9/5 Support Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section
        id="contact-methods"
        data-animate
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible["contact-methods"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`bg-gradient-to-r ${method.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {method.description}
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    {method.contact}
                  </p>
                  <p className="text-sm text-gray-500">{method.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div
              id="contact-form"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible["contact-form"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800">
                      Failed to send message. Please try again or contact us
                      directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
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

                  {/* Phone and Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812 3456 789"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject of your message"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.subject
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Please provide details about your inquiry..."
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
                      {formData.message.length}/500 characters (minimum 10
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Team Members */}
            <div
              id="team"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible.team
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Meet Our Team
              </h2>
              <p className="text-gray-600 mb-8">
                Our dedicated team is here to help you with any questions or
                concerns
              </p>

              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-2">
                          {member.role}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {member.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {member.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Our Support Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Less than 2 hours</div>
                    <div className="text-sm opacity-90">
                      Average Response Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm opacity-90">
                      Customer Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                Quick answers to common questions. Can't find what you're
                looking for? Contact us!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How quickly do you respond to inquiries?",
                  answer:
                    "We typically respond to all inquiries within 2 hours during business hours and within 24 hours on weekends.",
                },
                {
                  question: "Can I schedule a call with your team?",
                  answer:
                    "Yes! Contact us to schedule a call with our customer success team. We're happy to discuss your needs in detail.",
                },
                {
                  question: "Do you offer support in multiple languages?",
                  answer:
                    "Currently, we provide support in Indonesian and English. Our team is fluent in both languages.",
                },
                {
                  question: "What's the best way to report delivery issues?",
                  answer:
                    "For urgent delivery issues, please call us directly. For non-urgent matters, email or the contact form works great.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold mb-3 text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
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
            Still Have Questions?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Our team is standing by to help you get started with SEA Catering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Headphones className="w-5 h-5" />
              Start Live Chat
            </button>
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
