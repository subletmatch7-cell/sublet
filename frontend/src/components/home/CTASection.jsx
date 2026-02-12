import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#242B38] to-[#1a1f28] py-5 lg:py-10">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#3BC0E9] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#95BDCB] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#3BC0E9] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          
          <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
            Limited Availability
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Ready to{' '}
          <span className="bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] bg-clip-text text-transparent">
            Secure Your Stay
          </span>
          ?
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of verified renters and listers finding their perfect match every day.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            to="/listings"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#3BC0E9]/25 transition-all duration-300 hover:scale-105"
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
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center justify-center">
              Become a Lister
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/20">
          <div className="flex items-center">
            
            <span className="ml-3 text-sm text-white/80">
              <span className="font-semibold text-white">100+</span> happy renters
            </span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">4.9</span> rating
            </span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-white/80">
              <span className="font-semibold text-white">100%</span> verified
            </span>
          </div>
        </div>
      </div>

      
    </section>
  );
}

