import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    city: "",
    neighborhood: "",
    price: "",
    availableFrom: "",
    availableTo: "",
    description: "",
    phone: "" // Added phone number field
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Valid price is required";
    if (!form.availableFrom) newErrors.availableFrom = "Available from date is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    
    // Phone validation (optional but must be valid if provided)
    if (form.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Date validation
    if (form.availableFrom && form.availableTo) {
      const fromDate = new Date(form.availableFrom);
      const toDate = new Date(form.availableTo);
      if (toDate < fromDate) {
        newErrors.availableTo = "End date must be after start date";
      }
    }
    
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
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      images.forEach((img) => data.append("images", img));

      await api.post("/lister/listings", data);
      
      // Show success message and redirect
      alert("Listing submitted for review! It will be visible after admin approval.");
      navigate("/lister/dashboard");
    } catch (error) {
      console.error("Failed to create listing:", error);
      alert("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#242B38] mb-2">Create New Listing</h1>
          <p className="text-gray-600">
            Fill out the form below to list your property. All listings require admin approval.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={submit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-[#242B38] mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    placeholder="e.g., Cozy Downtown Apartment with Great View"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                    }`}
                    onChange={handleInputChange}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    placeholder="e.g., New York"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.city ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                    }`}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neighborhood (Optional)
                  </label>
                  <input
                    name="neighborhood"
                    value={form.neighborhood}
                    placeholder="e.g., Manhattan, Williamsburg"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent transition-all"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="50"
                      value={form.price}
                      placeholder="0"
                      className={`w-full px-4 py-3 pl-8 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                      }`}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-[#242B38] mb-4">Contact Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800 flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Your phone number will be hidden on the listing. Renters will see a "Call Lister" button that initiates a call without revealing your number until they're ready to connect.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional - for "Call Lister" feature)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      📞
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                      }`}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Format: +1 (555) 123-4567 or 555-123-4567
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-lg font-semibold text-[#242B38] mb-4">Availability</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available From *
                  </label>
                  <input
                    name="availableFrom"
                    type="date"
                    value={form.availableFrom}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.availableFrom ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                    }`}
                    onChange={handleInputChange}
                  />
                  {errors.availableFrom && (
                    <p className="mt-1 text-sm text-red-600">{errors.availableFrom}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available To (Optional)
                  </label>
                  <input
                    name="availableTo"
                    type="date"
                    value={form.availableTo}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.availableTo ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                    }`}
                    onChange={handleInputChange}
                  />
                  {errors.availableTo && (
                    <p className="mt-1 text-sm text-red-600">{errors.availableTo}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty for ongoing availability
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                rows="6"
                placeholder="Describe your property in detail. Include features, amenities, nearby attractions, and any house rules..."
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none transition-all ${
                  errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3BC0E9] focus:border-transparent'
                }`}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {form.description.length}/2000 characters
              </p>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Images *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#3BC0E9] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 mb-1">Click to upload images</p>
                  <p className="text-sm text-gray-500">Upload high-quality photos of your property</p>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB each</p>
                </label>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images}</p>
              )}

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Selected Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit for Review'}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                * Required fields. Your listing will be reviewed by our team before being published.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}