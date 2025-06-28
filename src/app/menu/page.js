"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import {
  Clock,
  Users,
  Star,
  Heart,
  ShoppingCart,
  Search,
  Utensils,
  Leaf,
  Zap,
  Award,
} from "lucide-react";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
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

  const categories = [
    { id: "all", name: "All Meals", icon: <Utensils className="w-5 h-5" /> },
    { id: "breakfast", name: "Breakfast", icon: <Zap className="w-5 h-5" /> },
    { id: "lunch", name: "Lunch", icon: <Users className="w-5 h-5" /> },
    { id: "dinner", name: "Dinner", icon: <Leaf className="w-5 h-5" /> },
    { id: "snacks", name: "Snacks", icon: <Award className="w-5 h-5" /> },
  ];

  const mealPlans = [
    {
      id: 1,
      name: "Healthy Start",
      description:
        "A nutritious breakfast to kickstart your day with fresh fruits, whole grains, and protein.",
      price: "Rp. 50.000",
      originalPrice: "Rp. 65.000",
      category: "breakfast",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 124,
      prepTime: "15 min",
      calories: "320 kcal",
      tags: ["High Protein", "Gluten Free", "Fresh"],
      ingredients: [
        "Oats",
        "Fresh Berries",
        "Greek Yogurt",
        "Honey",
        "Almonds",
      ],
      nutritionHighlights: ["25g Protein", "8g Fiber", "Vitamin C"],
    },
    {
      id: 2,
      name: "Power Lunch",
      description:
        "A balanced lunch option to keep you energized throughout the afternoon with lean proteins and vegetables.",
      price: "Rp. 75.000",
      originalPrice: "Rp. 90.000",
      category: "lunch",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 89,
      prepTime: "20 min",
      calories: "450 kcal",
      tags: ["Balanced", "Low Carb", "Fresh"],
      ingredients: [
        "Grilled Chicken",
        "Quinoa",
        "Mixed Vegetables",
        "Avocado",
        "Olive Oil",
      ],
      nutritionHighlights: ["35g Protein", "12g Fiber", "Omega-3"],
    },
    {
      id: 3,
      name: "Guilt-Free Dinner",
      description:
        "A light and healthy dinner choice perfect for evening meals without compromising on taste.",
      price: "Rp. 100.000",
      originalPrice: "Rp. 120.000",
      category: "dinner",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      reviews: 156,
      prepTime: "25 min",
      calories: "380 kcal",
      tags: ["Low Calorie", "Organic", "Keto Friendly"],
      ingredients: [
        "Salmon",
        "Steamed Broccoli",
        "Sweet Potato",
        "Herbs",
        "Lemon",
      ],
      nutritionHighlights: ["30g Protein", "Omega-3", "Vitamin D"],
    },
    {
      id: 4,
      name: "Energy Boost",
      description:
        "Perfect mid-day snack packed with nutrients to keep your energy levels high.",
      price: "Rp. 35.000",
      originalPrice: "Rp. 45.000",
      category: "snacks",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviews: 78,
      prepTime: "5 min",
      calories: "180 kcal",
      tags: ["Quick", "Natural", "Vegan"],
      ingredients: ["Mixed Nuts", "Dried Fruits", "Dark Chocolate", "Seeds"],
      nutritionHighlights: ["8g Protein", "Antioxidants", "Healthy Fats"],
    },
    {
      id: 5,
      name: "Morning Detox",
      description:
        "Cleansing breakfast smoothie bowl with superfoods to detoxify and energize your morning.",
      price: "Rp. 60.000",
      originalPrice: "Rp. 75.000",
      category: "breakfast",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 203,
      prepTime: "10 min",
      calories: "280 kcal",
      tags: ["Detox", "Superfood", "Vegan"],
      ingredients: ["Acai", "Spinach", "Banana", "Chia Seeds", "Coconut"],
      nutritionHighlights: ["Antioxidants", "Vitamin K", "Fiber"],
    },
    {
      id: 6,
      name: "Mediterranean Feast",
      description:
        "A hearty lunch inspired by Mediterranean cuisine with fresh ingredients and bold flavors.",
      price: "Rp. 85.000",
      originalPrice: "Rp. 100.000",
      category: "lunch",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 167,
      prepTime: "30 min",
      calories: "520 kcal",
      tags: ["Mediterranean", "Heart Healthy", "Fresh"],
      ingredients: ["Grilled Fish", "Olives", "Tomatoes", "Feta", "Herbs"],
      nutritionHighlights: ["40g Protein", "Omega-3", "Vitamin E"],
    },
  ];

  const filteredMeals = mealPlans.filter((meal) => {
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (mealId) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const addToCart = (meal) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === meal.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Menu</h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Discover our carefully crafted healthy meals designed to nourish
              your body and delight your taste buds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.8 Average Rating</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">10,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>

            {/* Cart Counter */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section
        id="menu-grid"
        data-animate
        className={`py-16 transition-all duration-1000 ${
          isVisible["menu-grid"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal, index) => (
              <div
                key={meal.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={meal.image || "/placeholder.svg"}
                    alt={meal.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {meal.originalPrice && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(meal.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(meal.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {meal.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{meal.rating}</span>
                          <span>({meal.reviews})</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{meal.prepTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Nutrition Highlights */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Nutrition Highlights:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meal.nutritionHighlights.map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Calories */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <Zap className="w-4 h-4" />
                    <span>{meal.calories}</span>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {meal.price}
                      </span>
                      {meal.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {meal.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(meal)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No meals found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
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
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
              Order Your First Meal
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
              View Subscription Plans
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
