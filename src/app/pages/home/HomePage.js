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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950" dir="rtl">
        <div className="relative h-[88vh] min-h-[620px] w-full">
          <Image
            src="/heroSec.png"
            alt="Stylish couple trying on modern eyewear in a luxurious setting"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/95" />
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-end px-4 py-12 sm:px-6 lg:px-8">
            <div
              className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
              data-aos="fade-left"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-amber-300/80 mb-5">
                أحدث صيحات النظارات
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                إطلالة فاخرة تبدأ من النظارة الصحيحة
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">
                اكتشف تشكيلاتنا المميزة من النظارات الشمسية والطبية والإكسسوارات
                المصممة لتكمل شخصيتك بكل أناقة.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/pages/products?category=all"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-base font-semibold text-slate-950 transition duration-300 hover:bg-amber-300"
                >
                  تسوق الآن
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-base font-semibold text-white transition duration-300 hover:border-amber-400/50 hover:bg-white/10"
                >
                  شاهد المعرض
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8">
          <div className="rounded-full bg-slate-900/80 px-4 py-3 text-sm text-slate-200 shadow-xl shadow-black/30">
            تصفح مجموعتنا الأحدث واختر النظارة المناسبة لك
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-right">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
              لماذا نحن
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              خدمات أكثر من مجرد نظارات
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              تجربة متكاملة تبدأ من اختيار الإطار وحتى وصوله إليك مع دعم شخصي
              وموثوقية كاملة.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.05fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
                      الجودة أولاً
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      منتجات أصلية مع ضمان
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300 shadow-xl shadow-amber-400/10">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  كل منتج يأتي من علامات تجارية موثوقة، مع تفاصيل تصميم فاخرة
                  وخامات مستدامة.
                </p>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-amber-400/5 p-6 shadow-[0_25px_50px_-25px_rgba(251,191,36,0.6)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
                      تجربة مميزة
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">
                      متابعة شخصية للطلب
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-black/20">
                    <span className="text-2xl">☆</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  نحجز وقتًا معك لنفهم احتياجاتك ونرشح الإطلالة الأنسب لأسلوبك
                  اليومي.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-amber-400/20 hover:bg-slate-900/90">
                <div className="inline-flex items-center rounded-3xl bg-slate-900/90 px-4 py-3 text-amber-300 shadow-md shadow-black/20">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  شحن أسرع
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  التوصيل خلال 24 ساعة داخل المدينة مع تحديثات حية لحالة الطلب.
                </p>
              </div>

              <div className="group rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-amber-400/20 hover:bg-slate-900/90">
                <div className="inline-flex items-center rounded-3xl bg-slate-900/90 px-4 py-3 text-amber-300 shadow-md shadow-black/20">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  دعم فوري
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  دردشة مباشرة واستشارات سريعة لكل سؤال قبل وبعد الشراء.
                </p>
              </div>

              <div className="group rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-amber-400/20 hover:bg-slate-900/90">
                <div className="inline-flex items-center rounded-3xl bg-slate-900/90 px-4 py-3 text-amber-300 shadow-md shadow-black/20">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  حماية كاملة
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  سياسة إرجاع مرنة وضمان جودة لجميع المنتجات دون تعقيد.
                </p>
              </div>

              <div className="group rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-amber-400/20 hover:bg-slate-900/90">
                <div className="inline-flex items-center rounded-3xl bg-slate-900/90 px-4 py-3 text-amber-300 shadow-md shadow-black/20">
                  <span className="text-2xl">🕶️</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  تصميمات حصرية
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  مجموعة منتقاة بعناية لتمنحك إطلالة متجددة وفريدة كل موسم.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 sm:py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
                تشكيلاتنا
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                استعرض الفئات المفضلة
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-400">
              اختر بين النظارات الشمسية والطبية والإكسسوارات المميزة مع تصميمات
              تجمع بين الراحة والأناقة.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/pages/products?category=نظارات شمسية"
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-400/20"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <Image
                  src="/heroSec.png"
                  alt="النظارات الشمسية"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-2xl font-semibold text-white">
                  النظارات الشمسية
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  حماية أنيقة بأحدث الإطلالات لكل موسم.
                </p>
              </div>
            </Link>

            <Link
              href="/pages/products?category=نظارات طبية"
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-400/20"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <Image
                  src="/medical.png"
                  alt="النظارات الطبية"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-2xl font-semibold text-white">
                  النظارات الطبية
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  موديلات عصرية مع راحة بصرية فائقة ودقة في التصميم.
                </p>
              </div>
            </Link>

            <Link
              href="/pages/products?category=إكسسوارات"
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-400/20"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="relative h-72 overflow-hidden bg-slate-950">
                <Image
                  src="/accesorise.png"
                  alt="الإكسسوارات"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-2xl font-semibold text-white">
                  الإكسسوارات
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  كل ما تحتاجه للعناية بنظارتك وإكمال إطلالتك بأناقة.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
