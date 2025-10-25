"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import {
  RiAddLine,
  RiEdit2Line,
  RiDeleteBinLine,
  RiCloseLine,
  RiUpload2Line,
} from "react-icons/ri";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("حدث خطأ أثناء تحميل المنتجات");
    } finally {
      setIsLoading(false);
    }
  }

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  async function handleImageUpload(file) {
    if (!file) return null;

    try {
      // Convert image to base64
      const base64String = await convertToBase64(file);

      // Check if the base64 string is too large (limit to ~5MB)
      if (base64String.length > 5000000) {
        throw new Error("حجم الصورة كبير جداً. برجاء اختيار صورة أصغر");
      }

      return base64String;
    } catch (error) {
      console.error("Error processing image:", error);
      alert(error.message || "حدث خطأ أثناء معالجة الصورة");
      return null;
    }
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
        if (!imageUrl) return;
      }

      const productData = {
        ...formData,
        imageUrl,
        price: parseFloat(formData.price),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
      }

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("حدث خطأ أثناء حفظ المنتج");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle product deletion
  async function handleDelete(id) {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      setIsLoading(true);
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("حدث خطأ أثناء حذف المنتج");
    } finally {
      setIsLoading(false);
    }
  }

  // Reset form
  function resetForm() {
    setFormData({
      name: "",
      description: "",
      category: "",
      imageUrl: "",
    });
    setImageFile(null);
    setEditingProduct(null);
    setIsModalOpen(false);
  }

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    const productName = product.name.toLowerCase();
    const productDesc = product.description?.toLowerCase() || "";
    const productCategory = product.category.toLowerCase();

    // Return true if the search query matches any of the product fields
    return (
      productName.includes(query) ||
      productDesc.includes(query) ||
      productCategory.includes(query)
    );
  });

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          إدارة المنتجات
        </h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="search"
              placeholder="ابحث عن منتج بالاسم..."
              className="w-full px-4 py-2 pr-10 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <RiAddLine className="w-5 h-5" />
            <span>إضافة منتج</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
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

                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
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
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-reverse space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData(product);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                        title="تعديل"
                      >
                        <RiEdit2Line className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                        title="حذف"
                      >
                        <RiDeleteBinLine className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <RiCloseLine className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الوصف
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      الفئة
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">اختر الفئة</option>
                      <option value="نظارات شمسية">نظارات شمسية</option>
                      <option value="نظارات طبية">نظارات طبية</option>
                      <option value="إكسسوارات">إكسسوارات</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    صورة المنتج
                  </label>
                  <div className="flex items-center space-x-reverse space-x-4">
                    {(formData.imageUrl || imageFile) && (
                      <div className="shrink-0 w-20 h-20">
                        <Image
                          src={
                            imageFile
                              ? URL.createObjectURL(imageFile)
                              : formData.imageUrl
                          }
                          alt="Product preview"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <label className="flex-1">
                      <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                        <RiUpload2Line className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="mr-2 text-gray-600 dark:text-gray-300">
                          اختر صورة
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-reverse space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading
                      ? "جاري الحفظ..."
                      : editingProduct
                      ? "حفظ التغييرات"
                      : "إضافة المنتج"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
