"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/Logo.webp";

const navLinks = [
  { href: "/", label: "الصفحة الرئيسية" },
  { href: "/pages/products", label: "منتجاتنا" },
  { href: "/gallery", label: "معرضنا" },
  { href: "/pages/aboutUs", label: "تعرف علينا" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <nav className="header sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 shadow-xl shadow-slate-950/10 backdrop-blur-xl py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="py-2">
            <Image
              src={Logo}
              alt="شعار الموقع"
              className="h-14 w-[180px] rounded-2xl object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3" dir="ltr">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navLink rounded-full px-4 py-2 text-base font-medium transition duration-300 ${
                  isActive(link.href)
                    ? "bg-orange-400/20 text-amber-200 shadow-sm shadow-orange-400/20"
                    : "text-white hover:bg-orange-400/20 hover:text-orange-200"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white shadow-sm shadow-black/20 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              aria-expanded={isOpen}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              <span className="sr-only">
                {isOpen ? "إغلاق القائمة الرئيسية" : "فتح القائمة الرئيسية"}
              </span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="space-y-1 border-t border-white/10 bg-slate-950/95 px-3 py-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block rounded-2xl px-4 py-3 text-right text-base font-medium transition duration-300 ${
                isActive(link.href)
                  ? "bg-orange-400/20 text-amber-200"
                  : "text-white hover:bg-orange-400/10 hover:text-orange-200"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
