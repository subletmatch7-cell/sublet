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


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingsDetails />} />
        
      </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        


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
    </Routes>
    </BrowserRouter>
  );
}
