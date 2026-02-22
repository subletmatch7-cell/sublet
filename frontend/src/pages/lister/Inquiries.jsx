import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, read, unread
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/lister/inquiries");
      setInquiries(res.data);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/lister/inquiries/${id}`, { status: 'read' });
      setInquiries(inquiries.map(inq => 
        inq._id === id ? { ...inq, status: 'read', readAt: new Date().toISOString() } : inq
      ));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAsReplied = async (id) => {
    try {
      await api.patch(`/lister/inquiries/${id}`, { status: 'replied', repliedAt: new Date().toISOString() });
      setInquiries(inquiries.map(inq => 
        inq._id === id ? { ...inq, status: 'replied', repliedAt: new Date().toISOString() } : inq
      ));
      setReplying(false);
      setReplyText("");
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Failed to mark as replied:", error);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) {
      alert("Please enter a reply message");
      return;
    }

    // Here you would typically send an email to the inquirer
    // For now, we'll just mark it as replied
    await markAsReplied(selectedInquiry._id);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'unread': { color: 'bg-blue-100 text-blue-800', label: 'New', icon: '🔵' },
      'read': { color: 'bg-gray-100 text-gray-800', label: 'Read', icon: '⚪' },
      'replied': { color: 'bg-green-100 text-green-800', label: 'Replied', icon: '✅' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon && <span className="mr-1">{config.icon}</span>}
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === "all") return true;
    return inquiry.status === filter;
  });

  const stats = {
    total: inquiries.length,
    unread: inquiries.filter(i => i.status === 'unread').length,
    replied: inquiries.filter(i => i.status === 'replied').length
  };

  if (selectedInquiry) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedInquiry(null)}
            className="flex items-center text-[#3BC0E9] hover:text-blue-700 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Inquiries
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Inquiry Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Inquiry: {selectedInquiry.listing?.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(selectedInquiry.status)}
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedInquiry.createdAt)}
                    </span>
                  </div>
                </div>
                {selectedInquiry.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(selectedInquiry._id)}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>

            {/* Sender Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                From
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">
                      {selectedInquiry.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedInquiry.name}</p>
                    <p className="text-sm text-gray-600">{selectedInquiry.phone || "No phone provided"}</p>
                    <p className="text-sm text-gray-600">{selectedInquiry.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Message
              </h3>
              <div className="bg-blue-50 rounded-lg p-5">
                <p className="text-gray-700 whitespace-pre-line">{selectedInquiry.message}</p>
              </div>
            </div>

            {/* Listing Info */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Property Details
              </h3>
              <Link
                to={`/listings/${selectedInquiry.listing?._id}`}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                    {selectedInquiry.listing?.images?.[0] ? (
                      <img 
                        src={selectedInquiry.listing.images[0]} 
                        alt={selectedInquiry.listing.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedInquiry.listing?.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedInquiry.listing?.city}
                    </p>
                    <p className="text-lg font-bold text-[#3BC0E9]">
                      ${selectedInquiry.listing?.price}<span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Reply Section */}
            {replying ? (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Reply</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows="4"
                      placeholder="Type your reply here..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BC0E9] focus:border-transparent resize-none transition-all"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleReply}
                      className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all"
                    >
                      Send Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplying(false);
                        setReplyText("");
                      }}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedInquiry.status !== 'replied' ? (
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => setReplying(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white rounded-lg hover:shadow-md transition-all flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Reply to Inquiry
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-green-800">Replied on {formatDate(selectedInquiry.repliedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries</h1>
          <p className="text-gray-600">Manage and respond to property inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Inquiries</p>
                <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === "all" 
                      ? "bg-[#3BC0E9] text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === "unread" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setFilter("replied")}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    filter === "replied" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Replied
                </button>
              </div>
            </div>
            <button
              onClick={fetchInquiries}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Inquiries List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#3BC0E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">
              {filter === "all" 
                ? "You haven't received any inquiries yet." 
                : `No ${filter} inquiries at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                onClick={() => setSelectedInquiry(inquiry)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-[#3BC0E9] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-medium">
                          {inquiry.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{inquiry.name}</h3>
                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {inquiry.message}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(inquiry.createdAt)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(inquiry.status)}
                    <span className="text-sm text-gray-600">
                      {inquiry.listing?.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}