export default function ProblemSection() {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-5 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content - Problem */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#95BDCB]/10 border border-[#95BDCB]/30 mb-6">
                
                <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
                  The Challenge
                </span>
              </div>
  
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#242B38] mb-6 leading-tight">
                Short-Term Housing Is{' '}
                <span className="text-red-500 relative">
                  Broken
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5" stroke="#3BC0E9" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                  </svg>
                </span>
              </h2>
  
              {/* Main Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Interns and young professionals are forced to navigate a fragmented 
                housing market, relying on unmoderated social media groups and 
                scattered listings with no guarantees.
              </p>
  
              {/* Problem List */}
              <div className="space-y-5">
                <ProblemItem
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                  title="Scattered Listings"
                  description="No central platform, listings spread across Facebook, Craigslist, and WhatsApp"
                />
                <ProblemItem
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  }
                  title="Zero Verification"
                  description="No identity checks, no quality control, anyone can post anything"
                />
                <ProblemItem
                  icon={
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  title="High Scam Risk"
                  description="Fake listings, deposit scams, and unclear terms are common"
                />
              </div>
  
              {/* Stat Warning */}
              <div className="mt-8 p-4 bg-[#95BDCB]/10 rounded-xl border border-[#95BDCB]/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-bold text-[#3BC0E9]">78%</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-[#242B38]">
                      of young renters have encountered a scam or misleading listing 
                      during their housing search
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Source: Rental Protection Report 2024</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Content - Visual Representation */}
            <div className="flex-1 relative">
              {/* Chaos Visualization */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-6 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    
                    <span className="ml-2 text-sm font-medium text-gray-500">Housing Groups • 5 platforms</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#95BDCB]/10 text-[#242B38] rounded-full">unmoderated</span>
                </div>
  
                {/* Scattered Posts */}
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                    <div className="w-8 h-8 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-[#3BC0E9]">FB</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#242B38]">🏠 2BR in Brooklyn</p>
                        <span className="text-xs px-2 py-1 bg-[#95BDCB]/20 text-[#242B38] rounded-full">unverified</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Posted by • Unknown user</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">📅 flexible</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">💰 cash only</span>
                      </div>
                    </div>
                  </div>
  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-85">
                    <div className="w-8 h-8 rounded-full bg-[#95BDCB]/20 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-[#95BDCB]">CL</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#242B38]">✨ Studio - Downtown</p>
                        <span className="text-xs px-2 py-1 bg-[#3BC0E9]/10 text-[#3BC0E9] rounded-full">⚠️ suspicious</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Posted 2h ago • No replies</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">"Wire deposit to hold..."</p>
                    </div>
                  </div>
  
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-[#242B38]/10 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-[#242B38]">WA</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#242B38]">🔵 3BR available NOW</p>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">no photos</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Group chat • 47 messages</p>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-1">
                          
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+5 interested</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Scam Alert */}
                <div className="mt-6 p-3 bg-[#3BC0E9]/5 rounded-lg border border-[#3BC0E9]/20">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-[#3BC0E9] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-xs font-medium text-[#242B38]">Common scam alert</span>
                    <span className="text-xs text-[#3BC0E9] ml-auto">reported 12x</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">"Need deposit today to secure, landlord out of country"</p>
                </div>
  
                {/* Decorative Chaos Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#3BC0E9]/10 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-[#95BDCB]/20 rounded-full opacity-20 blur-2xl"></div>
              </div>
  
              {/* Quote */}
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-[#95BDCB] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700 italic">
                      "I almost lost $2,000 to a fake listing. There's no way to know what's real."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">— Nandi Ndoro | Founder, Sublet Match</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function ProblemItem({ icon, title, description }) {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3BC0E9]/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-[#242B38]">{title}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
    );
  }