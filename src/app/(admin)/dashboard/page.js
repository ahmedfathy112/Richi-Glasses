"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import {
  RiDeleteBinLine,
  RiEdit2Line,
  RiShoppingBag3Line,
} from "react-icons/ri";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  // check if user is authenticated
  const user = supabase.auth.getUser().then(({ data: { user } }) => {
    if (!user) {
      alert("يرجى تسجيل الدخول للوصول إلى لوحة التحكم");
      window.location.href = "/pages/login";
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get total count of products
      const { count, error: countError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (countError) throw countError;
      setTotalProducts(count || 0);

      // Get last 2 products
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* KPI Card */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                إجمالي المنتجات
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {loading ? "..." : totalProducts}
              </h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <RiShoppingBag3Line className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            المنتجات الحديثة
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  المنتج
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  الفئة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="shrink-0 w-10 h-10">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
