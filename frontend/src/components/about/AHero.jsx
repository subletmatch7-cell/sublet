import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#3BC0E9]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#95BDCB]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#3BC0E9]/5 to-[#95BDCB]/5 rounded-full blur-3xl"></div>
      </div>

      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-5 lg:py-10">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            

            {/* Heading */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-start text-gray-900 mb-6 leading-tight">
              Rethinking{' '}
              <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
                Short-Term Housing
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-start text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              SubletMatch exists to make short-term housing safer, simpler, 
              and more structured for interns and young professionals navigating 
              competitive urban markets.
            </p>

            

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/listings"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#3BC0E9]/20 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Find Your Stay
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-[#3BC0E9] hover:text-[#3BC0E9] transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  Learn More
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="flex-1 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                  alt="Young professionals collaborating"
                  className="w-full h-auto object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3BC0E9]/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Verified by</p>
                    <p className="text-sm font-semibold text-gray-900">SubletMatch</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">100% manual review process</p>
              </div>

              
              
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}