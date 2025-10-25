"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/Logo.webp";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="header shadow-lg w-full z-10 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="py-5">
            <Image
              src={Logo}
              alt="شعار الموقع"
              className="w-[100px] h-[70px] my-2.5 rounded-2xl"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-4" dir="ltr">
            <Link
              href="/pages/aboutUs"
              className="text-white hover:bg-orange-400 navLink px-3 py-2 rounded-md text-base font-medium"
            >
              تعرف علينا
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:bg-orange-400 navLink px-3 py-2 rounded-md text-base font-medium"
            >
              لوحة التحكم
            </Link>
            <Link
              href="/pages/products"
              className="text-white hover:bg-orange-400 navLink px-3 py-2 rounded-md text-base font-medium"
            >
              منتجاتنا
            </Link>
            <Link
              href="/"
              className="text-white hover:bg-orange-400 navLink px-3 py-2 rounded-md text-base font-medium"
            >
              الصفحة الرئيسية
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {/* Hamburger Icon */}
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
                  className="text-white"
                />
              </svg>
              {/* Close Icon */}
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
                  className="text-white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
          <Link
            href="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/pages/products"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            منتجاتنا
          </Link>
          <Link
            href="/dashboard"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            لوحة التحكم
          </Link>
          <Link
            href="/pages/aboutUs"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            تعرف علينا
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
