import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const links = [
  { label: "Listings", to: "/admin/dashboard" },
  { label: "Metrics", to: "/admin/metrics" }
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
