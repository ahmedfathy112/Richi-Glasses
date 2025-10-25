"use client";
import { useMemo, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "../../components/ProductCard";
import { supabase } from "@/app/lib/supabase";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120 });
    AOS.refresh();
  }, []);

  useEffect(() => {
    // fetch all products from Supabase on mount
    const fetchProducts = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const normalized = useMemo(() => {
    // normalize product shape to what ProductCard expects
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
      const matchesFilter = filter === "all" ? true : p.category === filter;
      const matchesQuery = [p.title, p.description]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });

    if (sortBy === "newest") {
      list = list.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    return list;
  }, [query, filter, sortBy, normalized]);

  const visibleProducts = filtered.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((v) => v + 8);

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Header */}
        <header className="mb-6 text-right">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            تشكيلاتنا
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
                onClick={() => setFilter("نظارات شمسية")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "sunglasses"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                نظارات شمسية
              </button>
              <button
                onClick={() => setFilter("نظارات طبية")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "optical"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                نظارات طبية
              </button>
              <button
                onClick={() => setFilter("إكسسوارات")}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filter === "Accessories"
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                نظارات طبية
              </button>
            </div>

            {/* Sort by */}
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
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="overflow-x-hidden ProductSection">
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
