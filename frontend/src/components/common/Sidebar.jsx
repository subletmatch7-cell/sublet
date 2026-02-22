import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ links = [] }) {
  const location = useLocation();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeListings: 0,
    pendingInquiries: 0,
    monthlyViews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    setIsLoading(true);
    try {
      // Fetch listings to get active count
      const listingsRes = await api.get("/lister/listings");
      const activeListings = listingsRes.data.filter(l => l.status === 'approved').length;
      
      // Fetch inquiries to get pending count
      const inquiriesRes = await api.get("/lister/inquiries");
      const pendingInquiries = inquiriesRes.data.filter(i => i.status === 'pending').length;
      
      let monthlyViews = 0;
      listingsRes.data.forEach(listing => {
        monthlyViews += listing.views || 0;
      });

      setStats({
        activeListings,
        pendingInquiries,
        monthlyViews
      });

      // Create activity from listings and inquiries
      const activity = [];
      
      // Add recent listing status changes
      listingsRes.data
        .filter(l => l.status === 'pending' || l.status === 'rejected')
        .slice(0, 2)
        .forEach(listing => {
          activity.push({
            type: 'listing',
            message: listing.status === 'pending' 
              ? 'New listing pending review' 
              : 'Listing requires revision',
            timestamp: listing.updatedAt || listing.createdAt,
            listing
          });
        });

      // Add recent inquiries
      inquiriesRes.data
        .slice(0, 2)
        .forEach(inquiry => {
          activity.push({
            type: 'inquiry',
            message: 'New inquiry received',
            timestamp: inquiry.createdAt,
            inquiry
          });
        });

      // Sort by timestamp and take latest 3
      activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecentActivity(activity.slice(0, 3));

    } catch (error) {
      console.error("Failed to fetch sidebar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isActive = (path) => {
    if (path === "/lister/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now";
    
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 2592000)}mo ago`;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'L'}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{user?.name || 'Lister Portal'}</h2>
            <p className="text-xs text-gray-500">
              {user?.role === 'lister' ? 'Verified Lister' : 'User Portal'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Links */}
        <nav className="p-4">
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive: navActive }) => `
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${navActive || isActive(link.to)
                    ? 'bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {link.icon && (
                  <span className="mr-3 opacity-80">
                    {link.icon}
                  </span>
                )}
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

       </div>

        
      {/* Fixed Footer (Help Section) */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start mb-2">
            <div className="w-8 h-8 rounded-full bg-[#3BC0E9] flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
              <p className="text-xs text-gray-600 mt-1">Check our guide or contact support</p>
            </div>
          </div>
          <div className="flex space-x-2 mt-3">
            <a 
              href="/help/guide" 
              className="flex-1 px-3 py-2 text-xs bg-white text-[#3BC0E9] border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              Guide
            </a>
            <a 
              href="/help/support" 
              className="flex-1 px-3 py-2 text-xs bg-[#3BC0E9] text-white rounded-lg hover:opacity-90 transition-colors text-center"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}