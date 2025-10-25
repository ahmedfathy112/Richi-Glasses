"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120 });
    const onLoad = () => AOS.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return (
    <div className="relative h-screen ">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full " dir="rtl">
        {/* Hero Image */}
        <Image
          src="/heroSec.png"
          alt="Stylish couple trying on modern eyewear in a luxurious setting"
          fill
          priority
          className="object-cover w-full h-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-right">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              data-aos="fade-down"
            >
              نظارات عصرية لإطلالة متميزة
            </h1>
            <p
              className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              اكتشف مجموعتنا الحصرية من النظارات الطبية والشمسية
            </p>
            <Link
              href="/pages/products?category=all"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 cursor-pointer transition duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              إستكشف منتجاتنا
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold text-gray-900 text-right mb-8"
            data-aos="fade-down"
          >
            استكشف تشكيلاتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category Cards */}
            <Link
              href="/pages/products?category=نظارات شمسية"
              className="categoryCard bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="relative h-64">
                <Image
                  src="/heroSec.png"
                  alt="النظارات الشمسية"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  النظارات الشمسية
                </h3>
                <p className="text-gray-600">
                  تشكيلة متنوعة من أرقى الماركات العالمية
                </p>
              </div>
            </Link>

            <Link
              href="/pages/products?category=نظارات طبية"
              className="categoryCard bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="relative h-64">
                <Image
                  src="/medical.png"
                  alt="النظارات الطبية"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  النظارات الطبية
                </h3>
                <p className="text-gray-600">أحدث الموديلات بأعلى جودة</p>
              </div>
            </Link>

            <Link
              href="/pages/products?category=إكسسوارات"
              className="categoryCard bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="relative h-64">
                <Image
                  src="/accesorise.png"
                  alt="الإكسسوارات"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  الإكسسوارات
                </h3>
                <p className="text-gray-600">مستلزمات العناية بالنظارات</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
