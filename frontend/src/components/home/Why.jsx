export default function TrustSection() {
    return (
      <section className="bg-white py-5 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-[#3BC0E9]/20 mb-6">
                
                <span className="text-xs font-medium text-[#3BC0E9] uppercase tracking-wider">
                  Why SubletMatch?
                </span>
              </div>
  
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Every Listing Is{' '}
                <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
                  Reviewed Before
                </span>{' '}
                It Goes Live
              </h2>
  
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                We manually review submissions to reduce scams, fake listings, 
                and unreliable posts. You get structured, moderated housing, 
                not random social media chaos.
              </p>
  
              {/* Trust Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3BC0E9] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">100% manual review</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3BC0E9] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Verified lister identity</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3BC0E9] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">Anti-scam protection</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3BC0E9] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">24h review turnaround</p>
                </div>

                
              </div>
            </div>
  
            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                  alt="Professional reviewing property listing"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3BC0E9]/20 via-transparent to-transparent"></div>
                
                {/* Verification Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Manual Review</p>
                    <p className="text-xs text-gray-500">In progress</p>
                  </div>
                </div>
  
                {/* Stats Card */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-xs text-gray-500">Approval rate</p>
                      <p className="text-lg font-bold text-gray-900">94%</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div>
                      <p className="text-xs text-gray-500">Avg. time</p>
                      <p className="text-lg font-bold text-gray-900">&lt;24h</p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-[#3BC0E9]/10 to-[#95BDCB]/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-[#3BC0E9]/10 to-[#95BDCB]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }