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
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isVisible, setIsVisible] = useState({});

  const [subscriptionForm, setSubscriptionForm] = useState({
    fullName: "",
    phoneNumber: "",
    selectedPlan: "",
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  });
  const [subscriptionErrors, setSubscriptionErrors] = useState({});
  const [isSubscriptionSubmitting, setIsSubscriptionSubmitting] =
    useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscriptionInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (subscriptionErrors[name]) {
      setSubscriptionErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePlanSelection = (planId) => {
    setSubscriptionForm((prev) => ({
      ...prev,
      selectedPlan: planId,
    }));
    if (subscriptionErrors.selectedPlan) {
      setSubscriptionErrors((prev) => ({
        ...prev,
        selectedPlan: "",
      }));
    }
  };

  const handleMealTypeToggle = (mealType) => {
    setSubscriptionForm((prev) => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(mealType)
        ? prev.mealTypes.filter((type) => type !== mealType)
        : [...prev.mealTypes, mealType],
    }));
    if (subscriptionErrors.mealTypes) {
      setSubscriptionErrors((prev) => ({
        ...prev,
        mealTypes: "",
      }));
    }
  };

  const handleDeliveryDayToggle = (day) => {
    setSubscriptionForm((prev) => ({
      ...prev,
      deliveryDays: prev.deliveryDays.includes(day)
        ? prev.deliveryDays.filter((d) => d !== day)
        : [...prev.deliveryDays, day],
    }));
    if (subscriptionErrors.deliveryDays) {
      setSubscriptionErrors((prev) => ({
        ...prev,
        deliveryDays: "",
      }));
    }
  };

  const selectAllDays = () => {
    setSubscriptionForm((prev) => ({
      ...prev,
      deliveryDays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    }));
  };

  const selectWeekdays = () => {
    setSubscriptionForm((prev) => ({
      ...prev,
      deliveryDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    }));
  };

  const clearAllDays = () => {
    setSubscriptionForm((prev) => ({
      ...prev,
      deliveryDays: [],
    }));
  };

  const calculateWeeklyCost = () => {
    const planPrices = {
      diet: 30000,
      protein: 40000,
      royal: 60000,
    };

    const pricePerMeal = planPrices[subscriptionForm.selectedPlan] || 0;
    const mealsPerDay = subscriptionForm.mealTypes.length;
    const daysPerWeek = subscriptionForm.deliveryDays.length;
    const totalWeeklyCost = pricePerMeal * mealsPerDay * daysPerWeek;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(totalWeeklyCost)
      .replace("IDR", "Rp");
  };

  const validateSubscriptionForm = () => {
    const newErrors = {};

    if (!subscriptionForm.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!subscriptionForm.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !/^(\+62|62|0)[0-9]{9,13}$/.test(
        subscriptionForm.phoneNumber.replace(/\s/g, "")
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid Indonesian phone number";
    }

    if (!subscriptionForm.selectedPlan) {
      newErrors.selectedPlan = "Please select a meal plan";
    }

    if (subscriptionForm.mealTypes.length === 0) {
      newErrors.mealTypes = "Please select at least one meal type";
    }

    if (subscriptionForm.deliveryDays.length === 0) {
      newErrors.deliveryDays = "Please select at least one delivery day";
    }

    setSubscriptionErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();

    if (!validateSubscriptionForm()) {
      return;
    }

    setIsSubscriptionSubmitting(true);
    setSubscriptionStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubscriptionStatus("success");
      setSubscriptionForm({
        fullName: "",
        phoneNumber: "",
        selectedPlan: "",
        mealTypes: [],
        deliveryDays: [],
        allergies: "",
      });
    } catch (error) {
      setSubscriptionStatus("error");
    } finally {
      setIsSubscriptionSubmitting(false);
    }
  };

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
      {/* Subscription Form Section */}
      <section
        id="subscription-form"
        data-animate
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible["subscription-form"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                Start Your Subscription
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below to customize your meal plan and begin
                your healthy journey
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {subscriptionStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">
                    Subscription submitted successfully! We'll contact you
                    within 24 hours to confirm your plan.
                  </p>
                </div>
              )}

              {subscriptionStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">
                    Failed to submit subscription. Please try again or contact
                    us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubscriptionSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={subscriptionForm.fullName}
                        onChange={handleSubscriptionInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          subscriptionErrors.fullName
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                      />
                      {subscriptionErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {subscriptionErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Active Phone Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={subscriptionForm.phoneNumber}
                        onChange={handleSubscriptionInputChange}
                        placeholder="+62 812 3456 7890"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          subscriptionErrors.phoneNumber
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200"
                        }`}
                      />
                      {subscriptionErrors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {subscriptionErrors.phoneNumber}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        We'll use this number for payment confirmations and
                        delivery updates
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plan Selection */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Select Your Plan <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "diet",
                        name: "Diet Plan",
                        price: "Rp 30.000",
                        description: "Perfect for weight management",
                      },
                      {
                        id: "protein",
                        name: "Protein Plan",
                        price: "Rp 40.000",
                        description: "High protein for fitness goals",
                      },
                      {
                        id: "royal",
                        name: "Royal Plan",
                        price: "Rp 60.000",
                        description: "Premium ingredients & variety",
                      },
                    ].map((plan) => (
                      <div
                        key={plan.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          subscriptionForm.selectedPlan === plan.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handlePlanSelection(plan.id)}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 mr-3 ${
                              subscriptionForm.selectedPlan === plan.id
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {subscriptionForm.selectedPlan === plan.id && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {plan.name}
                          </h4>
                        </div>
                        <p className="text-blue-600 font-bold text-lg mb-1">
                          {plan.price}
                        </p>
                        <p className="text-sm text-gray-600">per meal</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {plan.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {subscriptionErrors.selectedPlan && (
                    <p className="text-red-500 text-sm mt-2">
                      {subscriptionErrors.selectedPlan}
                    </p>
                  )}
                </div>

                {/* Meal Type Selection */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Meal Types <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Select at least one meal type for your subscription
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "breakfast",
                        name: "Breakfast",
                        icon: "🌅",
                        time: "7:00 - 9:00 AM",
                      },
                      {
                        id: "lunch",
                        name: "Lunch",
                        icon: "☀️",
                        time: "12:00 - 2:00 PM",
                      },
                      {
                        id: "dinner",
                        name: "Dinner",
                        icon: "🌙",
                        time: "6:00 - 8:00 PM",
                      },
                    ].map((meal) => (
                      <div
                        key={meal.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          subscriptionForm.mealTypes.includes(meal.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleMealTypeToggle(meal.id)}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{meal.icon}</div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {meal.name}
                          </h4>
                          <p className="text-sm text-gray-500">{meal.time}</p>
                          <div className="mt-3">
                            <div
                              className={`w-5 h-5 rounded border-2 mx-auto ${
                                subscriptionForm.mealTypes.includes(meal.id)
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {subscriptionForm.mealTypes.includes(meal.id) && (
                                <Check className="w-3 h-3 text-white mx-auto mt-0.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {subscriptionErrors.mealTypes && (
                    <p className="text-red-500 text-sm mt-2">
                      {subscriptionErrors.mealTypes}
                    </p>
                  )}
                </div>

                {/* Delivery Days */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Delivery Days <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose which days you'd like your meals delivered
                  </p>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { id: "monday", name: "Mon", full: "Monday" },
                      { id: "tuesday", name: "Tue", full: "Tuesday" },
                      { id: "wednesday", name: "Wed", full: "Wednesday" },
                      { id: "thursday", name: "Thu", full: "Thursday" },
                      { id: "friday", name: "Fri", full: "Friday" },
                      { id: "saturday", name: "Sat", full: "Saturday" },
                      { id: "sunday", name: "Sun", full: "Sunday" },
                    ].map((day) => (
                      <div
                        key={day.id}
                        className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-300 text-center ${
                          subscriptionForm.deliveryDays.includes(day.id)
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                        onClick={() => handleDeliveryDayToggle(day.id)}
                        title={day.full}
                      >
                        <div className="font-semibold text-sm">{day.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={selectAllDays}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Select All Days
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={selectWeekdays}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Weekdays Only
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={clearAllDays}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  {subscriptionErrors.deliveryDays && (
                    <p className="text-red-500 text-sm mt-2">
                      {subscriptionErrors.deliveryDays}
                    </p>
                  )}
                </div>

                {/* Allergies */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Allergies & Dietary Restrictions
                  </h3>
                  <textarea
                    name="allergies"
                    value={subscriptionForm.allergies}
                    onChange={handleSubscriptionInputChange}
                    rows={4}
                    placeholder="Please list any allergies, dietary restrictions, or special requirements (e.g., vegetarian, gluten-free, nut allergy, etc.)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This information helps us customize your meals to meet your
                    dietary needs
                  </p>
                </div>

                {/* Order Summary */}
                {(subscriptionForm.selectedPlan ||
                  subscriptionForm.mealTypes.length > 0 ||
                  subscriptionForm.deliveryDays.length > 0) && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      {subscriptionForm.selectedPlan && (
                        <div className="flex justify-between">
                          <span>Selected Plan:</span>
                          <span className="font-semibold">
                            {subscriptionForm.selectedPlan === "diet" &&
                              "Diet Plan (Rp 30.000/meal)"}
                            {subscriptionForm.selectedPlan === "protein" &&
                              "Protein Plan (Rp 40.000/meal)"}
                            {subscriptionForm.selectedPlan === "royal" &&
                              "Royal Plan (Rp 60.000/meal)"}
                          </span>
                        </div>
                      )}
                      {subscriptionForm.mealTypes.length > 0 && (
                        <div className="flex justify-between">
                          <span>Meal Types:</span>
                          <span className="font-semibold">
                            {subscriptionForm.mealTypes
                              .map(
                                (type) =>
                                  type.charAt(0).toUpperCase() + type.slice(1)
                              )
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      {subscriptionForm.deliveryDays.length > 0 && (
                        <div className="flex justify-between">
                          <span>Delivery Days:</span>
                          <span className="font-semibold">
                            {subscriptionForm.deliveryDays.length} days/week
                          </span>
                        </div>
                      )}
                      {subscriptionForm.selectedPlan &&
                        subscriptionForm.mealTypes.length > 0 &&
                        subscriptionForm.deliveryDays.length > 0 && (
                          <div className="border-t pt-2 mt-3">
                            <div className="flex justify-between text-lg font-bold text-blue-600">
                              <span>Estimated Weekly Cost:</span>
                              <span>{calculateWeeklyCost()}</span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubscriptionSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubscriptionSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting Subscription...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Subscription
                    </>
                  )}
                </button>
              </form>
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
