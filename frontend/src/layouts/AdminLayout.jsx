import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const links = [
  { label: "Manage Listings", to: "/admin/manage-listings" },
  { label: "Inquiries", to: "/admin/inquiries" },
  { label: "Leads", to: "/admin/leads" },
  { label: "Users", to: "/admin/users" },
  
  { label: "Settings", to: "/admin/settings" }
];

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar links={links} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
