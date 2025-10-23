"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120 });
    const onLoad = () => AOS.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-right">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/about-hero.png"
          alt="تشكيلة نظارات عصرية"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              data-aos="fade-down"
            >
              نحن نهتم بعينيك
            </h1>
            <p
              className="text-lg md:text-xl opacity-90"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              نقدم أفضل النظارات الطبية والشمسية بجودة عالية وتصاميم عصرية
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]" data-aos="fade-right">
            <Image
              src="/about-shop.png"
              alt="متجرنا"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div data-aos="fade-left" data-aos-delay="100">
            <h2 className="text-3xl font-bold text-white mb-6">قصتنا</h2>
            <p className="text-gray-300 mb-4">
              منذ عام 2010، ونحن نقدم خدماتنا في مجال النظارات الطبية والشمسية.
              نفخر بتقديم منتجات عالية الجودة وخدمة متميزة لعملائنا.
            </p>
            <p className="text-gray-300 mb-6">
              نحرص على مواكبة أحدث صيحات الموضة وتوفير تشكيلة واسعة تناسب جميع
              الأذواق والاحتياجات.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-800 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            لماذا تختارنا؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg" data-aos="fade-up">
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                جودة عالية
              </h3>
              <p className="text-gray-300">
                نقدم أفضل العلامات التجارية العالمية وأجود أنواع العدسات
              </p>
            </div>
            <div
              className="bg-gray-700 p-6 rounded-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                خبرة واسعة
              </h3>
              <p className="text-gray-300">
                فريق متخصص من الخبراء لمساعدتك في اختيار النظارات المناسبة
              </p>
            </div>
            <div
              className="bg-gray-700 p-6 rounded-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                أسعار تنافسية
              </h3>
              <p className="text-gray-300">
                نقدم أفضل الأسعار مع ضمان الجودة والخدمة المتميزة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Media Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold text-white mb-12 text-center"
          data-aos="fade-down"
        >
          تواصل معنا
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="100">
            <div className="flex items-center gap-4 text-gray-300">
              <FaPhone className="text-amber-400 text-xl" />
              <div>
                <h3 className="font-bold text-white mb-1">اتصل بنا</h3>
                <p>+20 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <FaEnvelope className="text-amber-400 text-xl" />
              <div>
                <h3 className="font-bold text-white mb-1">البريد الإلكتروني</h3>
                <p>info@richiglasses.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <FaMapMarkerAlt className="text-amber-400 text-xl" />
              <div>
                <h3 className="font-bold text-white mb-1">العنوان</h3>
                <p>السالميه شارع سالم المبارك</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-xl font-bold text-white mb-6">
              تابعنا على مواقع التواصل
            </h3>
            <div className="flex gap-4">
              <Link
                href="https://wa.me/+201234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={24} />
              </Link>
              <Link
                href="https://facebook.com/richiglasses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              >
                <FaFacebookF size={24} />
              </Link>
              <Link
                href="https://instagram.com/richiglasses"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
              >
                <FaInstagram size={24} />
              </Link>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">ساعات العمل</h3>
              <div className="text-gray-300">
                <p>السبت - الخميس: 10:00 صباحاً - 10:00 مساءً</p>
                <p>الجمعة: 2:00 مساءً - 10:00 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
