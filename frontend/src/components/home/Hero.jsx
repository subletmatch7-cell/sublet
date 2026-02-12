import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    {
      url: "/assets/1.jpg",
      alt: "Modern apartment with city view"
    },
    {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Cozy living room with natural light"
    },
    {
      url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Minimalist bedroom design"
    },
    {
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Modern kitchen with stainless steel appliances"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#242B38]">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#242B38]/90 via-[#242B38]/70 to-[#242B38]/90"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            
            <span className="text-sm text-white/90">Your Trusted Match</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Find Verified Short-Term Sublets{' '}
            <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
              Without the Chaos
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Built for interns and young professionals who need trusted,
            short-term housing in competitive cities. Zero scams, fully verified.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/listings"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#3BC0E9]/20 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center">
                Browse Listings
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              to="/register"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              List Your Space
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-16 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-semibold text-white">100+</p>
              <p className="text-sm text-white/70 mt-1">Verified Properties</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">500+</p>
              <p className="text-sm text-white/70 mt-1">Happy Students</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 ${
              index === currentImageIndex 
                ? 'w-8 h-2 bg-[#3BC0E9]' 
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:block">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-xs mb-2">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#3BC0E9] to-transparent"></div>
        </div>
      </div>
    </section>
  );
}