import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import InquiryForm from "../../components/listings/InquiryForm";
import { Link } from "react-router-dom";

export default function ListingDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/listings/${id}`);
      setListing(res.data);
    } catch (error) {
      console.error("Failed to fetch listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInquirySuccess = () => {
    setInquirySent(true);
  };

  const handleCallClick = () => {
    setShowPhone(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#242B38] mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-6">The property listing you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/listings"
            className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Browse Other Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-600 hover:text-[#3BC0E9] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/listings" className="text-gray-600 hover:text-[#3BC0E9] transition-colors">
                Listings
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-[#242B38] font-medium truncate max-w-xs">
              {listing.title}
            </li>
          </ol>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="relative">
                {listing.images?.length > 0 ? (
                  <>
                    <div className="h-80 md:h-96 overflow-hidden">
                      <img
                        src={listing.images[activeImageIndex]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {listing.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {listing.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              activeImageIndex === index
                                ? "bg-[#3BC0E9]"
                                : "bg-white/70 hover:bg-white"
                            }`}
                            aria-label={`View image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500">No images available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {listing.images?.length > 1 && (
                <div className="p-4 border-t border-gray-100">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {listing.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === index
                            ? "border-[#3BC0E9]"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${listing.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-[#242B38] mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Price</label>
                    <p className="text-2xl font-bold text-[#3BC0E9]">${listing.price}<span className="text-sm font-normal text-gray-500 ml-1">/month</span></p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Location</label>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[#242B38]">{listing.city}{listing.neighborhood ? `, ${listing.neighborhood}` : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {listing.availableFrom && (
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">Available From</label>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[#242B38]">
                          {new Date(listing.availableFrom).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Listed by</label>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-[#242B38]">{listing.owner?.name || "Private Lister"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-[#242B38] mb-4">Description</h2>
              {listing.description ? (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No description provided.</p>
              )}
            </div>
          </div>

          {/* Right Column - Contact & Inquiry */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Call Lister Button - New Section */}
              {listing.phone && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <h4 className="font-medium text-[#242B38] mb-3 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Quick Contact
                  </h4>
                  
                  {!showPhone ? (
                    <div>
                      <button
                        onClick={handleCallClick}
                        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Lister
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Click to reveal phone number
                      </p>
                    </div>
                  ) : (
                    <div>
                      <a
                        href={`tel:${listing.phone}`}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {listing.phone}
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Tap number to call
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Your number is only shared when you call
                    </p>
                  </div>
                </div>
              )}

              {/* Inquiry Form */}
              {inquirySent ? (
                <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#242B38] mb-2">Inquiry Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your interest. {listing.owner?.name?.split(' ')[0] || "The lister"} will contact you shortly.
                  </p>
                  <Link
                    to="/listings"
                    className="px-4 py-2 text-sm text-[#3BC0E9] hover:bg-blue-50 rounded-lg transition-colors inline-block"
                  >
                    Browse More Properties
                  </Link>
                </div>
              ) : (
                <InquiryForm 
                  listingId={listing._id} 
                  onSuccess={handleInquirySuccess}
                />
              )}
              
              {/* Safety Tips */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h4 className="font-medium text-[#242B38] mb-3 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Safety Tips
                </h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-[#3BC0E9] mr-2">•</span>
                    Always verify the lister's identity
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-[#3BC0E9] mr-2">•</span>
                    Schedule in-person or virtual tours
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-[#3BC0E9] mr-2">•</span>
                    Never send money without a contract
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-[#3BC0E9] mr-2">•</span>
                    Use secure payment methods
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}