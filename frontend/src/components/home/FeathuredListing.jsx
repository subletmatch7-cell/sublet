import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function FeaturedListingsSection() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/listings");
      // Get 3 random approved listings
      const approved = res.data.filter(l => l.status === 'approved');
      const shuffled = approved.sort(() => 0.5 - Math.random());
      setListings(shuffled.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-[#3BC0E9]/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#3BC0E9] mr-2 animate-pulse"></span>
              <span className="text-xs font-medium text-[#3BC0E9] uppercase tracking-wider">
                Featured Properties
              </span>
            </div>
            
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-5 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-[#3BC0E9]/20 mb-4">
          
            <span className="text-xs font-medium text-[#3BC0E9] uppercase tracking-wider">
              Featured Properties
            </span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after verified listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {listings.map((listing, index) => (
            <Link
              key={listing._id}
              to={`/listings/${listing._id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#3BC0E9]/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {index === 0 && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium rounded-full shadow-lg">
                      ⭐ Featured
                    </span>
                  )}
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                    {listing.city}
                  </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute bottom-3 right-3">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white text-sm font-bold rounded-lg shadow-lg">
                    {formatPrice(listing.price)}
                    <span className="text-xs font-normal ml-1">/mo</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#3BC0E9] transition-colors line-clamp-1">
                  {listing.title}
                </h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{listing.neighborhood || listing.city}</span>
                </div>

                {listing.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {listing.description}
                  </p>
                )}

                {/* Features */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs">{listing.owner?.name?.split(' ')[0] || 'Lister'}</span>
                  </div>
                  <div className="flex items-center text-sm text-[#3BC0E9] font-medium group-hover:translate-x-1 transition-transform">
                    <span className="text-xs">View Details</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/listings"
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#3BC0E9] text-[#3BC0E9] rounded-lg font-medium hover:bg-[#3BC0E9] hover:text-white transition-all duration-300 group"
          >
            <span>View All Listings</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}