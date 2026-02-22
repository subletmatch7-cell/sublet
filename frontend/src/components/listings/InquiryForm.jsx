import { useState } from "react";
import api from "../../services/api";

export default function InquiryForm({ listingId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.post("/inquiries", { ...form, listingId });
      setIsSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="p-6 rounded-2xl"
      style={{ 
        backgroundColor: '#FFFF',
        border: '1px solid #95BDCB',
        boxShadow: '0 4px 20px rgba(59, 192, 233, 0.08)'
      }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#242B38' }}>
          Interested in this property?
        </h3>
        <p className="text-sm" style={{ color: '#95BDCB' }}>
          Send a message to the lister
        </p>
      </div>

      {isSubmitted ? (
        <div 
          className="p-4 rounded-lg text-center"
          style={{ 
            backgroundColor: 'rgba(59, 192, 233, 0.1)',
            border: '1px solid #3BC0E9'
          }}
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3BC0E9' }}>
            <svg className="w-6 h-6" fill="none" stroke="#FFFF" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-medium mb-1" style={{ color: '#242B38' }}>Inquiry Sent Successfully!</p>
          <p className="text-sm" style={{ color: '#95BDCB' }}>The lister will contact you soon.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#242B38' }}>
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: '#95BDCB',
                color: '#242B38',
                backgroundColor: '#FFFF'
              }}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#242B38' }}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: '#95BDCB',
                color: '#242B38',
                backgroundColor: '#FFFF'
              }}
              onChange={handleChange}
              required
            />
          </div>

          <div>                 
              <label className="block text-sm font-medium mb-2" style={{ color: '#242B38' }}>
                Phone 
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                placeholder="(Optional) Your phone number"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#95BDCB',
                  color: '#242B38',
                  backgroundColor: '#FFFF'
                }}
                onChange={handleChange}
              />
            </div> 


          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#242B38' }}>
              Your Message
            </label>
            <textarea
              name="message"
              value={form.message}
              placeholder="I'm interested in this property. Could you tell me more about...?"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none transition-all"
              style={{ 
                borderColor: '#95BDCB',
                color: '#242B38',
                backgroundColor: '#FFFF'
              }}
              onChange={handleChange}
              required
            />
            <p className="text-xs mt-1" style={{ color: '#95BDCB' }}>
              Include questions about availability, pricing, or viewing
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#3BC0E9',
              color: '#FFFF'
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : 'Send Inquiry'}
          </button>

          <div className="text-xs text-center pt-2" style={{ color: '#95BDCB' }}>
            <p>Your information will only be shared with the property lister</p>
          </div>
        </form>
      )}
    </div>
  );
}