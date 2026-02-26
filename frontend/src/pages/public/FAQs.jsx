import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: "all", name: "All Questions", icon: "📋" },
    { id: "general", name: "General", icon: "🏠" },
    { id: "renters", name: "For Renters", icon: "🔍" },
    { id: "listers", name: "For Listers", icon: "📝" },
    { id: "payments", name: "Payments & Fees", icon: "💰" },
    { id: "account", name: "Account & Security", icon: "🔒" }
  ];

  const faqItems = [
    // General
    {
      id: 1,
      category: "general",
      question: "What is SubletMatch?",
      answer: "SubletMatch is a curated marketplace platform designed specifically for short-term sublets and rentals. We connect verified renters with trusted listers, focusing on interns, young professionals, and anyone needing flexible housing. Every listing is manually reviewed by our team before going live to ensure quality and reduce scams."
    },
    {
      id: 2,
      category: "general",
      question: "How is SubletMatch different from other listing sites?",
      answer: "Unlike general classified sites like Craigslist or Facebook Marketplace, SubletMatch offers: 1) Manual verification of every listing before it goes live, 2) Structured listing formats with clear availability windows, 3) Verified lister identities, 4) Direct communication between renters and listers, and 5) A focus exclusively on short-term housing. We prioritize quality and trust over volume."
    },
    {
      id: 3,
      category: "general",
      question: "Is SubletMatch available in my city?",
      answer: "We currently operate in major cities across the US, including New York, San Francisco, Los Angeles, Chicago, Boston, Seattle, Austin, and Washington D.C. We're expanding rapidly! If you don't see your city, sign up for our newsletter to be notified when we launch in your area."
    },

    // For Renters
    {
      id: 4,
      category: "renters",
      question: "How do I search for a sublet?",
      answer: "You can browse listings on our Listings page without creating an account. Use filters to narrow down by city, price range, availability, and more. When you find a property you're interested in, you'll need to create a free account to contact the lister through our inquiry system."
    },
    {
      id: 5,
      category: "renters",
      question: "Are the listings verified?",
      answer: "Yes! Every listing on SubletMatch goes through a manual review process by our team before it's published. We verify that the lister has the right to sublet the property and that the listing information is accurate. However, we always recommend doing your own due diligence, scheduling a viewing, and reviewing any contracts carefully."
    },
    {
      id: 6,
      category: "renters",
      question: "How do I contact a lister?",
      answer: "Once you find a listing you're interested in, click on it to view the details. On the listing page, you'll find an inquiry form where you can send a message directly to the lister. If the lister has provided a phone number, you'll also see a 'Call Lister' button that reveals their number when clicked."
    },
    {
      id: 7,
      category: "renters",
      question: "Do I need to pay to use SubletMatch as a renter?",
      answer: "No! Creating an account, searching listings, and contacting listers is completely free for renters. We only charge listers for optional premium features like listing boosts."
    },

    // For Listers
    {
      id: 8,
      category: "listers",
      question: "How do I list my property?",
      answer: "To list a property, you'll need to create a lister account. Once logged in, navigate to your dashboard and click 'Create New Listing.' Fill out the form with your property details, upload photos, and submit for review. Our team will review your listing within 24 hours and notify you once it's approved."
    },
    {
      id: 9,
      category: "listers",
      question: "What are the requirements for listing a property?",
      answer: "You must have the legal right to sublet the property. This means you either own the property, have a lease that permits subletting, have a lawful lease assignment, or have written authorization from the property owner or manager. We may ask for documentation to verify your authority to list."
    },
    {
      id: 10,
      category: "listers",
      question: "How long does the review process take?",
      answer: "Our team reviews most listings within 24 hours. You'll receive an email notification once your listing has been approved, rejected with feedback, or if we need additional information. During peak periods, review times may extend to 48 hours."
    },
    {
      id: 11,
      category: "listers",
      question: "What happens if my listing is rejected?",
      answer: "If your listing is rejected, you'll receive an email with specific feedback from our review team explaining why. Common reasons include incomplete information, unclear photos, or missing documentation. You can edit your listing based on the feedback and resubmit it for review at no additional cost."
    },

    // Payments & Fees
    {
      id: 12,
      category: "payments",
      question: "What does it cost to list a property?",
      answer: "Creating a basic listing is free! We offer optional paid features like 'Listing Boost' ($15 for 7 days) to increase visibility, and a 'Be First to Know' subscription ($15/month) for renters to get early access to new listings. All fees are clearly displayed before purchase."
    },
    {
      id: 13,
      category: "payments",
      question: "How do payments work?",
      answer: "All payments on SubletMatch are processed securely through Stripe, our third-party payment processor. We never store your full payment information on our servers. You can manage your subscriptions and payment methods in your account settings."
    },
    {
      id: 14,
      category: "payments",
      question: "Can I get a refund?",
      answer: "Listing boosts and subscription fees are non-refundable once processed. If you cancel a subscription, you'll still have access until the end of your current billing period, and you won't be charged for the next cycle. If you believe you were charged in error, please contact our support team."
    },

    // Account & Security
    {
      id: 15,
      category: "account",
      question: "How do I create an account?",
      answer: "Click the 'Become a Lister' or 'Login' button in the top navigation. You can sign up using your email address or continue with Google. Once you've verified your email, you'll have full access to the platform based on your account type."
    },
    {
      id: 16,
      category: "account",
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot password?' Enter the email address associated with your account, and we'll send you a link to reset your password. If you don't receive the email within a few minutes, check your spam folder."
    },
    {
      id: 17,
      category: "account",
      question: "How do you protect my personal information?",
      answer: "We take your privacy seriously. Your personal information is encrypted and never shared with third parties without your consent. We monitor platform activity for suspicious behavior and offer features like phone number privacy to protect your contact information. See our Privacy Policy for more details."
    },
    {
      id: 18,
      category: "account",
      question: "What should I do if I encounter a suspicious listing or user?",
      answer: "If you come across anything suspicious, please report it to us immediately at support@subletmatch.com. Include the listing URL or username and a brief description of your concerns. Our team will investigate and take appropriate action. Never send money or personal information to unverified users."
    }
  ];

  const filteredFaqs = faqItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-[#95BDCB]/20 py-16 border-b border-[#95BDCB]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-4">
           
            <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
              Got Questions?
            </span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using SubletMatch
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for questions..."
            className="w-full px-6 py-4 pl-14 bg-white border border-[#95BDCB]/50 rounded-xl text-[#242B38] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent shadow-lg"
          />
          <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#95BDCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#3BC0E9] hover:text-[#3BC0E9]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#242B38] mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or category filter</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#242B38] pr-8">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#3BC0E9] transition-transform duration-300 ${
                      openItems[item.id] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {filteredFaqs.length > 0 && (
          <p className="text-sm text-gray-500 mt-6 text-center">
            Showing {filteredFaqs.length} of {faqItems.length} questions
          </p>
        )}
      </div>

      {/* Still Have Questions */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#3BC0E9]/5 to-[#95BDCB]/5 rounded-2xl border border-[#95BDCB]/30 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#242B38] mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Can't find the answer you're looking for? Please reach out to our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </Link>
            <a
              href="mailto:support@subletmatch.com"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-[#3BC0E9] hover:text-[#3BC0E9] transition-all inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@subletmatch.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}