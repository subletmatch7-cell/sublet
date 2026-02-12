export default function ApproachSection() {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-5 lg:py-10">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3BC0E9]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#95BDCB]/10 rounded-full blur-3xl"></div>
        </div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-6">
               
                <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
                  Our Solution
                </span>
              </div>
  
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#242B38] mb-6 leading-tight">
                A Structured{' '}
                <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
                  Marketplace
                </span>
              </h2>
  
              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We built SubletMatch as a structured marketplace, 
                focused exclusively on short-term sublets. No chaos, no scams, 
                just verified listings and direct connections.
              </p>
  
              {/* Approach Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ApproachCard
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Clear Availability"
                  description="Exact move-in and move-out dates"
                />
                <ApproachCard
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Transparent Pricing"
                  description="All-in monthly rates, no hidden fees"
                />
                <ApproachCard
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  title="Direct Communication"
                  description="Message lister-to-renter directly"
                />
                <ApproachCard
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Admin Moderation"
                  description="Every listing reviewed before live"
                />
              </div>
  
              {/* Trust Badge */}
              <div className="mt-8 p-4 bg-gradient-to-r from-[#3BC0E9]/5 to-[#95BDCB]/5 rounded-xl border border-[#3BC0E9]/20">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[#242B38]">Zero listings go live without verification</p>
                    <p className="text-xs text-gray-500 mt-0.5">Our promise to renters and listers alike</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Content - Image Gallery */}
            <div className="flex-1">
              <div className="relative">
                {/* Main Feature Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                    alt="Modern apartment with clear booking dates"
                    className="w-full h-[400px] object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242B38]/80 via-transparent to-transparent"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Available: May 1 - Aug 31</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/90 text-sm">Fully furnished • Downtown</p>
                        <p className="text-white text-2xl font-bold mt-1">$1,950<span className="text-sm font-normal ml-1">/month</span></p>
                      </div>
                      <span className="px-3 py-1 bg-[#3BC0E9] text-white text-xs font-medium rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </div>
  
                {/* Image Grid - Secondary Images */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                      alt="Living room with clear pricing"
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242B38]/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white text-xs">$1,850/mo</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img
                      src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                      alt="Minimalist bedroom with direct booking"
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242B38]/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-white text-xs">2 inquiries today</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Trust Badge Overlay */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-2 max-w-[200px] border border-gray-100">
                  <div className="flex items-center space-x-2">
                    
                    <div>
                      <p className="text-xs font-semibold text-[#242B38]">Direct booking</p>
                      <p className="text-[10px] text-gray-500">No middlemen</p>
                    </div>
                  </div>
                </div>
  
                {/* Verification Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#242B38]">Admin reviewed</p>
                      <p className="text-[10px] text-gray-500">Posted 2h ago • Live now</p>
                    </div>
                  </div>
                </div>
  
                {/* Decorative Elements */}
                <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-[#3BC0E9]/20 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-[#95BDCB]/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function ApproachCard({ icon, title, description }) {
    return (
      <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#3BC0E9]/30 transition-all duration-300 group">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3BC0E9]/10 group-hover:bg-[#3BC0E9]/20 transition-colors flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-[#242B38] group-hover:text-[#3BC0E9] transition-colors">{title}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
    );
  }