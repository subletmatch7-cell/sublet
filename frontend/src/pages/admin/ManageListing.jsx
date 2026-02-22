import { useEffect, useState } from "react";
import api from "../../services/api";


export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    boosted: 0
  });

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/listings", {
        params: { status: statusFilter, search }
      });
      setListings(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [statusFilter]);

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(l => l.status === 'pending').length,
      approved: data.filter(l => l.status === 'approved').length,
      rejected: data.filter(l => l.status === 'rejected').length,
      boosted: data.filter(l => l.isBoosted).length
    });
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this listing?")) return;
    try {
      await api.put(`/admin/listings/${id}/approve`);
      fetchListings();
      setSelectedListing(null);
    } catch (error) {
      console.error("Failed to approve listing:", error);
      alert("Failed to approve listing");
    }
  };

  const handleRequestInfo = async (id) => {
    if (!note.trim()) {
      alert("Please add an admin note first");
      return;
    }
    try {
      await api.put(`/admin/listings/${id}/request-info`, {
        adminNote: note
      });
      setNote("");
      setShowNoteModal(false);
      setSelectedListing(null);
      fetchListings();
    } catch (error) {
      console.error("Failed to request info:", error);
      alert("Failed to request information");
    }
  };

  const handleReject = async (id, reason) => {
    if (!window.confirm("Are you sure you want to reject this listing?")) return;
    try {
      await api.put(`/admin/listings/${id}/reject`, {
        adminNote: reason || "Listing rejected by admin"
      });
      fetchListings();
      setSelectedListing(null);
    } catch (error) {
      console.error("Failed to reject listing:", error);
      alert("Failed to reject listing");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this listing? This action cannot be undone.")) return;
    try {
      await api.delete(`/admin/listings/${id}`);
      fetchListings();
      setSelectedListing(null);
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete listing");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'approved': { color: 'bg-green-100 text-green-800', label: 'Approved' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Detailed Listing View
  if (selectedListing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedListing(null)}
            className="flex items-center text-[#3BC0E9] hover:text-blue-700 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Listings
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header with Actions */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-[#242B38]">{selectedListing.title}</h2>
                    {getStatusBadge(selectedListing.status)}
                    {selectedListing.isBoosted && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        ⚡ Boosted
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Listed by {selectedListing.owner?.name} • {new Date(selectedListing.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedListing.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(selectedListing._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Request Info
                  </button>
                  <button
                    onClick={() => handleDelete(selectedListing._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#242B38] mb-4">Property Images</h3>
              {selectedListing.images?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {selectedListing.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`${selectedListing.title} - ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <a
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center rounded-lg"
                      >
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-gray-50 rounded-lg text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No images provided</p>
                </div>
              )}
            </div>

            {/* Property Details Grid */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#242B38] mb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-2xl font-bold text-[#3BC0E9]">${selectedListing.price}<span className="text-sm font-normal text-gray-500 ml-1">/month</span></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-[#242B38]">{selectedListing.city}</p>
                  {selectedListing.neighborhood && (
                    <p className="text-sm text-gray-500">{selectedListing.neighborhood}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Availability</p>
                  <p className="font-medium text-[#242B38]">
                    From: {new Date(selectedListing.availableFrom).toLocaleDateString()}
                  </p>
                  {selectedListing.availableTo && (
                    <p className="text-sm text-gray-500">
                      To: {new Date(selectedListing.availableTo).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#242B38] mb-4">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedListing.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Lister Information */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#242B38] mb-4">Lister Information</h3>
              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center mr-4">
                    <span className="text-white text-lg font-bold">
                      {selectedListing.owner?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#242B38]">{selectedListing.owner?.name || "Unknown"}</p>
                    <p className="text-sm text-gray-600">{selectedListing.owner?.email}</p>
                    {selectedListing.phone && (
                      <p className="text-sm text-gray-600 mt-1">📞 {selectedListing.phone}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Member since: {new Date(selectedListing.owner?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Notes Section */}
            {selectedListing.adminNote && (
              <div className="p-6 border-t border-gray-200 bg-yellow-50">
                <h3 className="text-sm font-medium text-[#242B38] mb-2 flex items-center">
                  <svg className="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Admin Note
                </h3>
                <p className="text-sm text-gray-700">{selectedListing.adminNote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Listings Table View
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#3BC0E9]/10 border border-[#3BC0E9]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3BC0E9] mr-2 animate-pulse"></span>
            <span className="text-xs font-medium text-[#242B38] uppercase tracking-wider">
              Admin
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#242B38] mb-2">Manage Listings</h1>
          <p className="text-gray-600">Review, approve, and manage all property listings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-[#242B38]">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Boosted</p>
                <p className="text-2xl font-bold text-purple-600">{stats.boosted}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by title, owner, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={fetchListings}
                className="px-6 py-2 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Admin Note Input */}
        <div className="mb-6">
          <textarea
            placeholder="Admin note for request info or rejection reasons..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="3"
          />
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3BC0E9]"></div>
              <p className="mt-2 text-gray-600">Loading listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#242B38] mb-2">No listings found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listing
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Boosted
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listings.map((listing) => (
                    <tr 
                      key={listing._id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedListing(listing)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {listing.images?.[0] && (
                            <img 
                              src={listing.images[0]} 
                              alt={listing.title}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                          )}
                          <div>
                            <div className="font-medium text-[#242B38]">{listing.title}</div>
                            <div className="text-xs text-gray-500">{listing.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#242B38]">{listing.owner?.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{listing.owner?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(listing.status)}
                      </td>
                      <td className="px-6 py-4">
                        {listing.isBoosted ? (
                          <span className="text-purple-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(listing.expiresAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                          {listing.status !== "approved" && (
                            <button
                              onClick={() => handleApprove(listing._id)}
                              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedListing(listing);
                              setShowNoteModal(true);
                            }}
                            className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            Request Info
                          </button>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setSelectedListing(listing)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && listings.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            Showing {listings.length} listings
          </p>
        )}
      </div>

      {/* Request Info Modal */}
      {showNoteModal && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#242B38] mb-2">Request Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add a note for "{selectedListing.title}" to request additional information from the lister.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What information do you need?"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setNote("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestInfo(selectedListing._id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}