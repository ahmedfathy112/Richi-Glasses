"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useLoading } from "@/app/components/LoadingOverlay";
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiFileListLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiMenu3Fill,
  RiCloseLine,
  RiSearchLine,
} from "react-icons/ri";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { icon: RiDashboardLine, label: "لوحة التحكم", href: "/dashboard" },
    {
      icon: RiShoppingBag3Line,
      label: "المنتجات",
      href: "/dashboard/productsAdmin",
    },
  ];

  // Logout function (uses global loading overlay)
  const router = useRouter();
  const { loading, showLoading, hideLoading } = useLoading() || {};

  const handleLogout = async () => {
    try {
      // show full-screen loading overlay while signing out
      showLoading?.({
        accentColor: "#f59e0b",
        logoColor: "#0f172a",
        size: 240,
      });

      // Use Supabase signOut if available, otherwise fall back to clearing token
      if (typeof window !== "undefined") {
        try {
          const { supabase } = await import("@/app/lib/supabase");
          const { error } = await supabase.auth.signOut();
          if (error) console.error("Supabase signOut error:", error);
        } catch (e) {
          console.warn("Could not sign out via Supabase:", e);
        }
      }

      try {
        localStorage.removeItem("sb-ljrpktnnfrkcevcsxpmr-auth-token");
      } catch (e) {
        /* ignore */
      }

      // navigate to home
      router.push("/");

      // hide overlay shortly after navigation (give time for route change)
      setTimeout(() => {
        hideLoading?.();
      }, 900);
    } catch (err) {
      console.error("Logout failed:", err);
      hideLoading?.();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-auto left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-30 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image
              src="/Logo.webp"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              Richi Admin
            </span>
          </Link>
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors
                ${
                  pathname === item.href
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-auto left-0 right-0 mt-5 p-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="/Logo.webp"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@richi.com
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors
              ${
                loading
                  ? "opacity-70 cursor-wait bg-red-100 dark:bg-red-900/40"
                  : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              }`}
          >
            <RiLogoutBoxRLine className="w-5 h-5" />
            <span>{loading ? "جاري الخروج..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <RiMenu3Fill className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              لوحة التحكم
            </h1>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
