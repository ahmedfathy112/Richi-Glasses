"use client";
import { useMemo, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "../../components/ProductCard";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    imageUrl: "/glasses1.jpg",
    title: "نظارات aviator الكلاسيكية",
    description: "إطار خفيف الوزن، حماية UV400.",
    price: "199",
    category: "sunglasses",
    dataos: "fade-up",
    features: ["حماية UV400", "إطار خفيف"],
  },
  {
    id: 2,
    imageUrl: "/glasses2.jpg",
    title: "نظارات دائرية عتيقة",
    description: "تصميم كلاسيكي مريح للارتداء اليومي.",
    price: "249",
    category: "optical",
    dataos: "fade-down",
    features: ["إطار مميز", "مناسب للقراءة"],
  },
  {
    id: 3,
    imageUrl: "/glasses3.jpg",
    title: "نظارات بإطار شفاف",
    description: "مظهر أنيق وخفيف الوزن.",
    price: "179",
    dataos: "fade-right",
    category: "optical",
    features: ["إطار شفاف", "مريح"],
  },
  {
    id: 4,
    imageUrl: "/glasses4.jpg",
    title: "نظارات شمسية aviator",
    description: "عدسات معتمة وأداء ممتاز في الشمس.",
    price: "299",
    dataos: "fade-left",
    category: "sunglasses",
    features: ["عدسات متدرجة", "حماية UV400"],
  },
  {
    id: 5,
    imageUrl: "/glasses5.jpg",
    title: "إطارات مربعة عصرية",
    description: "تصميم هندسي أنيق يناسب الوجوه المختلفة.",
    price: "219",
    dataos: "fade-up",
    category: "optical",
    features: ["مريح", "خامات عالية"],
  },
  {
    id: 6,
    imageUrl: "/glasses6.jpg",
    title: "نظارات عين القطة الرجعية",
    description: "لمسة أنثوية أنيقة ومعاصرة.",
    price: "239",
    dataos: "fade-down",
    category: "sunglasses",
    features: ["ستايل رجعي", "خفيف"],
  },
  {
    id: 7,
    imageUrl: "/glasses9.jpg",
    title: "نظارات معدن رفيع",
    description: "مظهر متقن ومهني.",
    price: "189",
    dataos: "fade-right",
    category: "optical",
    features: ["معدن مقاوم", "خفيف الوزن"],
  },
  {
    id: 8,
    imageUrl: "/glasses8.jpg",
    title: "نظارات قطبية فاخرة",
    description: "جودة عالية وراحة عند التعرض للشمس.",
    price: "349",
    dataos: "fade-left",
    category: "sunglasses",
    features: ["قطبية", "حماية كاملة"],
  },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120 });
    AOS.refresh();
  }, []);

  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS.filter((p) => {
      const matchesFilter = filter === "all" ? true : p.category === filter;
      const matchesQuery = [p.title, p.description]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });

    if (sortBy === "price-asc") {
      list = list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      list = list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "newest") {
      list = list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [query, filter, sortBy]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((v) => v + 8);

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Header */}
        <header className="mb-6 text-right">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Our Collection
          </h1>
          <p className="mt-2 text-gray-300">
            تصفح تشكيلتنا من النظارات العصرية
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Left: Search */}
          <div className="w-full md:w-1/3 order-2 md:order-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Right: Filters & Sort */}
          <div className="flex items-center gap-3 order-1 md:order-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "all"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilter("sunglasses")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "sunglasses"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                نظارات شمسية
              </button>
              <button
                onClick={() => setFilter("optical")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "optical"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                نظارات طبية
              </button>
            </div>

            <div>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100"
              >
                <option value="default">الافتراضي</option>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: منخفض إلى مرتفع</option>
                <option value="price-desc">السعر: مرتفع إلى منخفض</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="overflow-x-hidden">
          {visibleProducts.length === 0 ? (
            <div className="py-16 text-center text-gray-300">
              لا توجد نتائج مطابقة
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg shadow hover:bg-amber-600 transition"
            >
              تحميل المزيد
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
