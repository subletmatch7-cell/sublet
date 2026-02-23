import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Home from "./pages/public/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import Listings from "./pages/public/Listings";
import ListingsDetails from "./pages/public/ListingsDetails";
import ListerLayout from "./layouts/ListerLayout";
import ListerDashboard from "./pages/lister/ListerDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Settings from "./pages/lister/Settings";
import Inquiries from "./pages/lister/Inquiries";
import CreateListing from "./pages/lister/CreateListings";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import TermsOfService from "./pages/public/Terms";
import FAQ from "./pages/public/FAQs";
import AdminLeads from "./pages/admin/Leads";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";
import How from "./pages/public/How";
import AdminListings from "./pages/admin/ManageListing";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingsDetails />} />
        <Route path="/contact" element={<Contact/> } />
        <Route path="/terms-of-service" element={<TermsOfService/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/how-it-works" element={<How />} />
        
      </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        


        <Route
        path="/lister/dashboard"
        element={
          <ProtectedRoute role="lister">
            <ListerLayout>
              <ListerDashboard />
            </ListerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />


      

        <Route
        path="/lister/dashboard/create"
        element={
            <ProtectedRoute role="lister">
            <ListerLayout>
                <CreateListing />
            </ListerLayout>
            </ProtectedRoute>
        }
        />

        <Route
        path="/lister/dashboard/inquiries"
        element={
            <ProtectedRoute role="lister">
            <ListerLayout>
                <Inquiries />
            </ListerLayout>
            </ProtectedRoute>
        }
        />

        <Route
        path="/lister/dashboard/settings"
        element={
            <ProtectedRoute role="lister">
            <ListerLayout>
                <Settings />
            </ListerLayout>
            </ProtectedRoute>
        }
        />

        

      <Route
        path="/admin/leads"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminLeads />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminInquiries />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/settings"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-listings"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminListings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="*"
        element={
          <PublicLayout>
            <h1 className="text-2xl font-bold text-center mt-20">404 - Page Not Found</h1>
            <p className="text-center mt-4 text-gray-600">The page you are looking for does not exist.</p>
          </PublicLayout>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}
