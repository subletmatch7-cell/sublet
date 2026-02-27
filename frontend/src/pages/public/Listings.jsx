import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Listings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [availability, setAvailability] = useState("all");
  const [cities, setCities] = useState([]);
  
  // Advanced filters toggle
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, searchQuery, selectedCity, priceRange, availability, sortBy]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/listings");
      setListings(res.data);
      
      // Extract unique cities for filter
      const uniqueCities = [...new Set(res.data.map(l => l.city))];
      setCities(uniqueCities);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // City filter
    if (selectedCity !== "all") {
      filtered = filtered.filter(listing => listing.city === selectedCity);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(listing => listing.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(listing => listing.price <= Number(priceRange.max));
    }

    // Availability filter
    if (availability === "available-now") {
      const today = new Date();
      filtered = filtered.filter(listing => 
        listing.availableFrom && new Date(listing.availableFrom) <= today
      );
    } else if (availability === "available-next-month") {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      filtered = filtered.filter(listing => 
        listing.availableFrom && new Date(listing.availableFrom) <= nextMonth
      );
    }

    // Apply sorting
    filtered = sortListings(filtered);
    setFilteredListings(filtered);
  };

  const sortListings = (listingsToSort) => {
    const sorted = [...listingsToSort];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return sorted;
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setPriceRange({ min: "", max: "" });
    setAvailability("all");
    setSortBy("newest");
  };

  const activeFilterCount = [
    searchQuery,
    selectedCity !== "all" && selectedCity,
    priceRange.min,
    priceRange.max,
    availability !== "all" && availability
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Light Blue */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-[#95BDCB]/20 py-12 lg:py-16 border-b border-[#95BDCB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#242B38] mb-4">
              Sublet Match 
              <br/> 
              Your Perfect{' '}
              <span className="bg-gradient-to-r font-bold from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
                Short-Term Home
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover verified sublets in top cities. Every listing reviewed by our team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, neighborhood, or property name..."
                className="w-full px-6 py-4 pl-14 bg-white border border-[#95BDCB]/50 rounded-xl text-[#242B38] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent shadow-sm"
              />
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#95BDCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Chips & Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setAvailability("available-now")}
                className="px-4 py-2 bg-white hover:bg-[#3BC0E9]/10 text-[#242B38] text-sm rounded-full border border-[#95BDCB]/50 shadow-sm transition-all hover:border-[#3BC0E9]"
              >
                Available Now
              </button>
              <button 
                onClick={() => setPriceRange({ min: "0", max: "1500" })}
                className="px-4 py-2 bg-white hover:bg-[#3BC0E9]/10 text-[#242B38] text-sm rounded-full border border-[#95BDCB]/50 shadow-sm transition-all hover:border-[#3BC0E9]"
              >
                Under $1500
              </button>
            </div>
            
            {/* Advanced Filters Toggle Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center px-4 py-2 bg-white border border-[#95BDCB]/50 rounded-lg text-[#242B38] hover:bg-[#3BC0E9]/5 transition-all shadow-sm"
            >
              <svg 
                className={`w-5 h-5 mr-2 transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Advanced Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-[#3BC0E9] text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters Panel - Collapsible */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showAdvancedFilters ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-white rounded-xl border border-[#95BDCB]/30 p-6 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* City Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[#242B38] focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="Min"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[#242B38] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="Max"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[#242B38] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[#242B38] focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                  >
                    <option value="all">Any Time</option>
                    <option value="available-now">Available Now</option>
                    <option value="available-next-month">Next 30 Days</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[#242B38] focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Active Filters & Clear Button */}
              <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {searchQuery && (
                    <span className="px-3 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] text-xs rounded-full border border-[#3BC0E9]/30">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedCity !== "all" && (
                    <span className="px-3 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] text-xs rounded-full border border-[#3BC0E9]/30">
                      {selectedCity}
                    </span>
                  )}
                  {priceRange.min && (
                    <span className="px-3 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] text-xs rounded-full border border-[#3BC0E9]/30">
                      Min: ${priceRange.min}
                    </span>
                  )}
                  {priceRange.max && (
                    <span className="px-3 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] text-xs rounded-full border border-[#3BC0E9]/30">
                      Max: ${priceRange.max}
                    </span>
                  )}
                  {availability !== "all" && (
                    <span className="px-3 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] text-xs rounded-full border border-[#3BC0E9]/30">
                      {availability === "available-now" ? "Available Now" : "Next 30 Days"}
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-[#3BC0E9] transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <span className="font-semibold text-[#3BC0E9]">{filteredListings.length}</span> properties found
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#242B38] mb-2">No listings match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[#3BC0E9]">{filteredListings.length}</span> properties
              </p>
              <button
                onClick={fetchListings}
                className="px-4 py-2 text-sm text-gray-500 hover:text-[#3BC0E9] transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Link
                  to={`/listings/${listing._id}`}
                  key={listing._id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3BC0E9] transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {listing.images?.[0] ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      {listing.availableFrom && (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full border border-gray-200">
                          {new Date(listing.availableFrom) <= new Date() 
                            ? "Available Now" 
                            : `Available ${new Date(listing.availableFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                          }
                        </span>
                      )}
                    </div>
                    {listing.status === 'approved' && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-[#3BC0E9] text-white text-xs font-medium rounded-full shadow-sm">
                          ✓ Verified
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#242B38] group-hover:text-[#3BC0E9] transition-colors line-clamp-1">
                        {listing.title}
                      </h3>
                      <span className="text-lg font-bold text-[#3BC0E9]">
                        ${listing.price}<span className="text-sm font-normal text-gray-500">/mo</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <svg className="w-4 h-4 mr-1 text-[#95BDCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{listing.city}{listing.neighborhood ? ` • ${listing.neighborhood}` : ''}</span>
                    </div>

                    {listing.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {listing.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1 text-[#95BDCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{listing.owner?.name?.split(' ')[0] || "Lister"}</span>
                      </div>
                      <span className="text-sm text-[#3BC0E9] font-medium group-hover:translate-x-1 transition-transform">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}