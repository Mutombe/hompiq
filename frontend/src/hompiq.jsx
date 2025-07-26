import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Heart,
  Filter,
  User,
  Bell,
  Plus,
  Menu,
  X,
  Star,
  Calendar,
  Phone,
  Mail,
  Camera,
  Upload,
  Settings,
  LogOut,
  Grid,
  List,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Wifi,
  Car,
  Shield,
  Zap,
  Coffee,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy data
const dummyProperties = [
  {
    id: 1,
    title: "Modern 2BR Apartment in Avondale",
    price: 450,
    location: "Avondale, Harare",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    ],
    amenities: ["WiFi", "Parking", "Security"],
    rating: 4.8,
    reviews: 24,
    landlord: "John Mwangi",
    available: "Jan 15, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "Cozy 1BR Studio in CBD",
    price: 350,
    location: "CBD, Harare",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: "Studio",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    ],
    amenities: ["WiFi", "Gym"],
    rating: 4.5,
    reviews: 18,
    landlord: "Sarah Chikwava",
    available: "Available Now",
    featured: false,
  },
  {
    id: 3,
    title: "Spacious 3BR House in Mount Pleasant",
    price: 800,
    location: "Mount Pleasant, Harare",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "House",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop",
    ],
    amenities: ["Parking", "Garden", "Security"],
    rating: 4.9,
    reviews: 31,
    landlord: "David Mukamuri",
    available: "Feb 1, 2025",
    featured: true,
  },
  {
    id: 4,
    title: "Budget-Friendly Room in Mbare",
    price: 180,
    location: "Mbare, Harare",
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    type: "Room",
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=400&h=300&fit=crop",
    ],
    amenities: ["Shared Kitchen"],
    rating: 4.2,
    reviews: 12,
    landlord: "Grace Mutindi",
    available: "Available Now",
    featured: false,
  },
  {
    id: 5,
    title: "Luxury 2BR Penthouse in Borrowdale",
    price: 1200,
    location: "Borrowdale, Harare",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    type: "Penthouse",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop",
    ],
    amenities: ["Pool", "Gym", "Concierge", "Parking"],
    rating: 5.0,
    reviews: 8,
    landlord: "Michael Tendai",
    available: "March 1, 2025",
    featured: true,
  },
  {
    id: 6,
    title: "Family Home in Marlborough",
    price: 650,
    location: "Marlborough, Harare",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    type: "House",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    ],
    amenities: ["Garden", "Parking", "Security"],
    rating: 4.7,
    reviews: 19,
    landlord: "Patricia Nyathi",
    available: "Jan 20, 2025",
    featured: false,
  },
];

const searchSuggestions = [
  "$400 2bed house in Avondale",
  "Cheap rooms near CBD",
  "Luxury apartments Borrowdale",
  "Student accommodation Avondale",
  "Family house with garden",
  "Studio apartment under $400",
  "Pet-friendly rentals",
  "Furnished apartments",
];

const trendingSearches = [
  "Avondale apartments",
  "CBD studios",
  "Mount Pleasant houses",
  "Budget rooms",
  "Luxury penthouses",
];

const App2 = () => {
  const [currentView, setCurrentView] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [properties, setProperties] = useState(dummyProperties);
  const [filteredProperties, setFilteredProperties] = useState(dummyProperties);
  const [viewMode, setViewMode] = useState("grid");
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "$400 2bed house in Avondale",
    "Studio apartment CBD",
  ]);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchExpanded(false);

    // Add to recent searches
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }

    // Simple search logic
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.price.toString().includes(query.replace("$", ""))
    );

    setFilteredProperties(filtered);
  };

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const mockGoogleAuth = () => {
    setUser({
      name: "John Doe",
      email: "john@example.com",
      avatar: "/api/placeholder/40/40",
      type: "tenant",
    });
    setShowAuthModal(false);
  };

  // Search Interface Component
  const SearchInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  hompiq
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Search
              </button>
              <button
                onClick={() => setCurrentView("landlord")}
                className="text-gray-600 hover:text-purple-600 font-medium"
              >
                List
              </button>
              <button
                className="text-gray-600 hover:text-purple-600 font-medium"
                onClick={() => setCurrentView("help")}
              >
                Help
              </button>
              <button
                onClick={() => setCurrentView("tenant")}
                className="text-gray-600 hover:text-purple-600 font-medium"
              >
                Tenant
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentView("tenant")}
                    className="w-8 h-8 rounded-full overflow-hidden"
                  >
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-purple-100"
          >
            <div className="px-4 py-2 space-y-2">
              <button className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                Search
              </button>
              <button
                onClick={() => {
                  setCurrentView("landlord");
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
              >
                List Property
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 rounded-lg"
                onClick={() => {
                  setCurrentView("help");
                }}
              >
                Help
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Search */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            Find Your Perfect
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent block">
              Home in Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Search using natural language. Just tell us what you want - we'll
            find it instantly.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
            ref={searchRef}
          >
            <div
              className={`relative transition-all duration-300 ${
                isSearchExpanded ? "transform scale-105" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Try: '$400 2bed house in Avondale'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                className="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 bg-white/90 backdrop-blur-sm shadow-lg"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400" />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Search
              </button>
            </div>

            {/* Expanded Search Suggestions */}
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-purple-100 p-6 z-50"
                >
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Trending Now
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="text-left px-3 py-2 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                      <Search className="w-4 h-4 mr-2" />
                      Try These
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {searchSuggestions
                        .slice(0, 4)
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>1,200+ Properties</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>500+ Verified Landlords</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>AI-Powered Search</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      {filteredProperties.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              {searchQuery && (
                <p className="text-gray-600 mt-1">
                  Results for "{searchQuery}"
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border border-purple-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${
                    viewMode === "list"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Properties Grid/List */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 ${
                  property.featured ? "ring-2 ring-purple-200" : ""
                }`}
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  {property.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-lg text-xs">
                    +{property.images.length - 1} photos
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                        {property.title}
                      </h3>
                      <p className="text-purple-600 font-bold text-xl mt-1">
                        ${property.price}/month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{property.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Available: {property.available}
                    </div>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Landlord Dashboard Component
  const LandlordDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("search")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  hompiq
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-semibold text-gray-700">
                Provider
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name}
                  </span>
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Properties
                </p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Rentals
                </p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">$4,800</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  New Inquiries
                </p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search properties..."
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:outline-none"
              />
              <button className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {properties.slice(0, 5).map((property) => (
              <div
                key={property.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-purple-600 font-medium">
                        ${property.price}/month
                      </span>
                      <span className="text-sm text-gray-500">
                        {property.bedrooms} bed • {property.bathrooms} bath
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.available === "Available Now"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {property.available}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Tenant Dashboard Component
  const TenantDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("search")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  hompiq
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-semibold text-gray-700">
                My Dashboard
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                <Bell className="w-5 h-5" />
              </button>
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setCurrentView("search")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Find New Home</h3>
            <p className="text-purple-100 text-sm">
              Search thousands of properties
            </p>
          </button>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <Bookmark className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Saved Properties
            </h3>
            <p className="text-gray-600 text-sm">
              {favorites.length} properties saved
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <MessageCircle className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Messages
            </h3>
            <p className="text-gray-600 text-sm">3 new conversations</p>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Favorites</h2>
          </div>

          {favorites.length > 0 ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties
                  .filter((p) => favorites.includes(p.id))
                  .map((property) => (
                    <div
                      key={property.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {property.title}
                        </h3>
                        <p className="text-purple-600 font-bold">
                          ${property.price}/month
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {property.location}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start exploring properties and save your favorites
              </p>
              <button
                onClick={() => setCurrentView("search")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Browse Properties
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  You saved "Modern 2BR Apartment in Avondale"
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  2 hours ago
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  You searched for "$400 2bed house in Avondale"
                </span>
                <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  You contacted landlord for "Cozy 1BR Studio in CBD"
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  3 days ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Auth Modal Component
  const AuthModal = () => (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to hompiq
              </h2>
              <p className="text-gray-600">
                Sign in to save favorites and get personalized recommendations
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={mockGoogleAuth}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                Continue with Email
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Upload Modal Component
  const UploadModal = () => (
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Property
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-6">
              {/* Property Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Images
                </label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-300 transition-colors">
                  <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop images here, or click to select
                  </p>
                  <button
                    type="button"
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Modern 2BR Apartment"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    placeholder="400"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Avondale, Harare"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (m²)
                  </label>
                  <input
                    type="number"
                    placeholder="85"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Apartment", "House", "Studio", "Room"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="p-3 border border-gray-200 rounded-lg text-center hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["WiFi", "Parking", "Security", "Pool", "Gym", "Garden"].map(
                    (amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your property..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Publish Property
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const HelpPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("search")}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  hompiq
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-semibold text-gray-700">
                Help Center
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                    <Bell className="w-5 h-5" />
                  </button>
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            How can we
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent block">
              help you today?
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 pl-14 text-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 bg-white/90 backdrop-blur-sm shadow-lg"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400" />
          </motion.div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Finding Properties
            </h3>
            <p className="text-gray-600 mb-4">
              Learn how to search and filter properties effectively
            </p>
            <button className="text-purple-600 font-medium hover:text-purple-700"
              onClick={() => setCurrentView("search")}
            >
              Learn more →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Listing Properties
            </h3>
            <p className="text-gray-600 mb-4">
              Step-by-step guide for landlords to list properties
            </p>
            <button className="text-purple-600 font-medium hover:text-purple-700"
              onClick={() => setCurrentView("landlord")}
            >
              Learn more →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Safety & Security
            </h3>
            <p className="text-gray-600 mb-4">
              Tips for safe transactions and avoiding scams
            </p>
            <button className="text-purple-600 font-medium hover:text-purple-700"
              onClick={() => setCurrentView("safety")}
            >
              Learn more →
            </button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                question:
                  "How do I search for properties using natural language?",
                answer:
                  "Simply type what you're looking for in plain English, like '$400 2bed house in Avondale' or 'cheap studio near CBD'. Our AI will understand and show you relevant results.",
              },
              {
                question: "Is it free to list my property?",
                answer:
                  "Yes! Basic property listings are completely free. We also offer premium features for enhanced visibility and additional tools for a small fee.",
              },
              {
                question: "How do I verify a landlord or property?",
                answer:
                  "Look for the verified badge on listings. We verify landlords through ID checks and property ownership documents. You can also check reviews from previous tenants.",
              },
              {
                question: "What payment methods are accepted?",
                answer:
                  "We support EcoCash, OneWallet, bank transfers, and cash payments. All transactions are facilitated through our secure platform with dispute resolution.",
              },
              {
                question:
                  "How do I report a problem with a property or landlord?",
                answer:
                  "Use the 'Report' button on any listing or contact our support team. We take all reports seriously and investigate within 24 hours.",
              },
              {
                question:
                  "Can I schedule property viewings through the platform?",
                answer:
                  "Yes! Use the 'Schedule Viewing' button on property listings to book appointments directly with landlords. You'll receive confirmation and reminders.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-purple-100 overflow-hidden"
              >
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you 24/7. Get in touch and we'll
            respond within minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <MessageCircle className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-purple-100 mb-4">
                Chat with our support team
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                Start Chat
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-purple-100 mb-4">help@hompiq.com</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                Send Email
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-purple-100 mb-4">+263 78 238 9002</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                onClick={() => window.open("tel:+263782389002")}
              >
                Call Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Additional Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100 text-center hover:shadow-lg transition-all cursor-pointer">
              <Settings className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Account Settings
              </h3>
              <p className="text-sm text-gray-600">
                Manage your profile and preferences
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100 text-center hover:shadow-lg transition-all cursor-pointer">
              <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Pricing Guide
              </h3>
              <p className="text-sm text-gray-600">
                Understand our pricing structure
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100 text-center hover:shadow-lg transition-all cursor-pointer">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Connect with other users</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100 text-center hover:shadow-lg transition-all cursor-pointer">
              <Bell className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Updates</h3>
              <p className="text-sm text-gray-600">
                Latest features and announcements
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const Safety = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="font-semibold mb-2">Safety Measures</h3>
      <p className="text-sm text-purple-100 mb-4">
        We take safety seriously and have implemented measures to protect your
        privacy and security.
      </p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
        Learn More
      </button>

      <h3 className="font-semibold mt-6 mb-2">Privacy Policy</h3>
      <p className="text-sm text-purple-100 mb-4">
        By using our website, you consent to our privacy policy.
      </p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
        View Policy
      </button>

      <h3 className="font-semibold mt-6 mb-2">Terms of Service</h3>
      <p className="text-sm text-purple-100 mb-4">
        By using our website, you agree to our terms of service.
      </p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
        View Terms
      </button>

      <h3 className="font-semibold mt-6 mb-2">Contact Us</h3>
      <p className="text-sm text-purple-100 mb-4">
        If you have any questions or concerns, please contact our support team.
      </p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
        Contact Support
      </button>
    </div>
  );

  // Property Detail Modal
  const PropertyDetailModal = () => (
    <AnimatePresence>
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedProperty.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </div>

            <div className="p-8">
              {/* Title and Price */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProperty.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-600">
                    ${selectedProperty.price}
                  </p>
                  <p className="text-gray-600">/month</p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProperty.bedrooms}
                  </p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProperty.bathrooms}
                  </p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProperty.area}
                  </p>
                  <p className="text-sm text-gray-600">m²</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProperty.rating}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedProperty.reviews} reviews
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Contact Landlord
                    </h4>
                    <p className="text-gray-600">{selectedProperty.landlord}</p>
                    <p className="text-sm text-gray-500">
                      Available: {selectedProperty.available}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen">
      {currentView === "search" && <SearchInterface />}
      {currentView === "landlord" && <LandlordDashboard />}
      {currentView === "property" && <PropertyInterface />}
      {currentView === "tenant" && <TenantDashboard />}
      {currentView === "admin" && <AdminDashboard />}
      {currentView === "safety" && <Safety />}
      {currentView === "help" && <HelpPage />}  

      {/* Modals */}
      <AuthModal />
      <UploadModal />
      <PropertyDetailModal />
    </div>
  );
};

export default App2;
