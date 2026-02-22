import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";


export default function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await api.post("/leads", form);
      setIsSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-[#95BDCB]/20 py-10 border-b border-[#95BDCB]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-4">
           
            <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about SubletMatch? Our team is here to help.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-[#242B38] mb-4">Contact Information</h2>
              
              {/* Email */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#242B38]">Email</h3>
                  <a href="mailto:support@subletmatch.com" className="text-sm text-gray-600 hover:text-[#3BC0E9] transition-colors">
                    support@subletmatch.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">24/7 support</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#242B38]">Response Time</h3>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                  <p className="text-xs text-gray-500 mt-1">Monday - Friday</p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#242B38]">Office</h3>
                  <p className="text-sm text-gray-600">123 Startup Street</p>
                  <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
                </div>

              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M3 14h11m-7-4h4m1 0h.01M12 20a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-medium text-[#242B38]">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available on our website</p>
                    <p className="text-xs text-gray-500 mt-1">Monday - Friday, 9am - 5pm</p>
                </div>
                </div>



              {/* Social Links */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-[#242B38] mb-3">Follow Us</h3>
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center hover:bg-[#3BC0E9]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#3BC0E9]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center hover:bg-[#3BC0E9]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#3BC0E9]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#3BC0E9]/10 flex items-center justify-center hover:bg-[#3BC0E9]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#3BC0E9]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#242B38] mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <h2 className="text-xl font-semibold text-[#242B38] mb-4">Send us a Message</h2>
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                      }`}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                      }`}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      placeholder="Tell us how we can help..."
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none transition-all ${
                        errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                      }`}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll never share your information with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Looking for quick answers? Check our{' '}
            <Link to="/faq" className="text-[#3BC0E9] hover:underline font-medium">
              Frequently Asked Questions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}