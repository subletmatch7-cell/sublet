import { Link } from "react-router-dom";

export default function HowItWorksSection() {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-[#3BC0E9]/20 mb-4">
              
              <span className="text-xs font-medium text-[#3BC0E9] uppercase tracking-wider">
                Simple Process
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in{' '}
              <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
                Four Easy Steps
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From listing to leasing, we make subletting simple, secure, and stress-free.
            </p>
          </div>
  
          {/* Steps */}
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#3BC0E9]/20 via-[#3BC0E9] to-[#95BDCB]/20 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            
              <Step
                number="01"
                title="Submit Listing"
                desc="Create your listing in minutes with our smart form. Add photos, set your price, and describe your space."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              />
              <Step
                number="02"
                title="Admin Review"
                desc="Our team manually verifies your listing for quality, accuracy, and compliance within 24 hours."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <Step
                number="03"
                title="Receive Inquiries"
                desc="Get direct messages from verified renters. Schedule viewings and secure your tenant."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
              />
            </div>
          </div>
  
          {/* Bottom CTA */}
          <div className="text-center mt-5 pt-8">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#3BC0E9]/20 transition-all duration-300 hover:scale-105 group"
            >
              Start Your Listing Today
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No upfront fees • Pay only when you get a booking
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  function Step({ number, title, desc, icon }) {
    return (
      <div className="relative group">
        {/* Card */}
        <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#3BC0E9]/30 transition-all duration-300 h-full flex flex-col">
          {/* Number Badge */}
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
            {number}
          </div>
  
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3BC0E9]/10 to-[#95BDCB]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:from-[#3BC0E9]/20 group-hover:to-[#95BDCB]/20">
            <div className="text-[#3BC0E9] group-hover:text-[#3BC0E9] transition-colors">
              {icon}
            </div>
          </div>
  
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#3BC0E9] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow">
            {desc}
          </p>
  
          {/* Decorative Element */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] transition-all duration-300 group-hover:w-1/2"></div>
        </div>
  
        {/* Connector Arrow (Desktop) */}
        {number !== "03" && (
          <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }