"use client";
import { useMemo, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowRight, FiPackage, FiSearch, FiSliders } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import ProductCard from "../../components/ProductCard";
import { supabase } from "@/app/lib/supabase";
import { useLoading } from "../../components/LoadingOverlay";

const categoryOptions = [
  { value: "all", label: "الكل", accent: "from-amber-400 to-orange-500" },
  {
    value: "sunglasses",
    label: "نظارات شمسية",
    accent: "from-sky-400 to-cyan-500",
  },
  {
    value: "optical",
    label: "نظارات طبية",
    accent: "from-emerald-400 to-green-500",
  },
  {
    value: "accessories",
    label: "إكسسوارات",
    accent: "from-fuchsia-400 to-pink-500",
  },
];

const normalizeCategory = (value = "") =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06ff]/g, "");

const matchesCategory = (itemCategory, selectedFilter) => {
  if (selectedFilter === "all") return true;

  const item = normalizeCategory(itemCategory);
  const filter = normalizeCategory(selectedFilter);

  if (filter === "sunglasses") {
    return (
      item.includes("sunglasses") ||
      item.includes("شمسية") ||
      item.includes("sun")
    );
  }

  if (filter === "optical") {
    return (
      item.includes("optical") ||
      item.includes("طبية") ||
      item.includes("medical")
    );
  }

  if (filter === "accessories") {
    return (
      item.includes("accessories") ||
      item.includes("اكسسوارات") ||
      item.includes("إكسسوارات")
    );
  }

  return item === filter;
};

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);
  const [products, setProducts] = useState([]);
  const loadingHook = useLoading?.() || {};
  const { showLoading = () => {}, hideLoading = () => {} } = loadingHook;

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120 });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setFilter(categoryParam);
    }
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [filter, query, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      showLoading({
        size: 150,
        accentColor: "#f59e0b",
        logoColor: "#1f2937",
      });
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        hideLoading();
      }
    };

    fetchProducts();
  }, [filter, sortBy, showLoading, hideLoading]);

  const normalized = useMemo(() => {
    return products.map((p) => ({
      id: p.id,
      imageUrl: p.imageUrl || p.image_url || p.image || "/glasses1.jpg",
      title: p.name || p.title || "بدون اسم",
      description: p.description || "",
      price: p.price?.toString() || "0",
      category: p.category || "",
      dataos: "fade-up",
      features: p.features || [],
      created_at: p.created_at,
    }));
  }, [products]);

  const filtered = useMemo(() => {
    let list = normalized.filter((p) => {
      const matchesFilter = matchesCategory(p.category, filter);
      const haystack =
        `${p.title} ${p.description} ${p.category}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });

    if (sortBy === "newest") {
      list = list.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (sortBy === "oldest") {
      list = list.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    }

    return list;
  }, [query, filter, sortBy, normalized]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const loadMore = () => setVisibleCount((v) => v + 8);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.15),_transparent_25%),linear-gradient(135deg,_#0f172a_0%,_#030712_100%)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="mb-8 overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm text-amber-200">
                <HiSparkles className="text-base" />
                اختيار مريح ومميز
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                تشكيلاتنا
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                اكتشف تشكيلة من النظارات العصرية والعملية بكل سهولة، مع تصفية
                سريعة ومريحة تناسب ذوقك اليوم.
              </p>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <div className="min-w-[110px] rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-white">
                    {filtered.length}
                  </p>
                  <p className="text-xs text-slate-400">منتج متاح</p>
                </div>
                <div className="min-w-[110px] rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-white">
                    {categoryOptions.length - 1}
                  </p>
                  <p className="text-xs text-slate-400">أقسام</p>
                </div>
                <div className="min-w-[140px] rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-white">24/7</p>
                  <p className="text-xs text-slate-400">طلب سريع</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-right shadow-lg shadow-black/20 lg:w-[280px]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  مريحة
                </span>
                <FiPackage className="text-lg text-amber-300" />
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white">
                ابحث، فلتر، ثم اطلب
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                واجهة بسيطة تساعدك على العثور على ما يناسبك في ثوانٍ قليلة.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-black/20 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search"
                type="search"
                dir="rtl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن منتج أو وصف..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-11 text-right text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap justify-end gap-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      filter === option.value
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "bg-slate-800/90 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <FiSliders className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 pr-11 text-sm text-slate-100 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                >
                  <option value="default">الافتراضي</option>
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="ProductSection">
          {visibleProducts.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-900/60 px-6 py-16 text-center text-slate-300">
              <p className="text-lg font-semibold text-white">
                لا توجد نتائج مطابقة
              </p>
              <p className="mt-2 text-sm text-slate-400">
                جرّب تغيير الكلمات أو اختيار قسم آخر.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              عرض المزيد
              <FiArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
