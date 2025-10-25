"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        data-aos="fade-up"
      >
        <h2
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          data-aos="fade-down"
        >
          تسجيل الدخول
        </h2>
        <form
          className="space-y-6"
          dir="rtl"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setIsLoading(true);

            try {
              const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
              });

              if (error) throw error;

              if (data?.user) {
                router.push("/dashboard");
                router.refresh();
              }
            } catch (error) {
              setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
              role="alert"
              data-aos="fade-down"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="أدخل بريدك الإلكتروني"
              required
              data-aos="fade-right"
              data-aos-delay="200"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="أدخل كلمة المرور"
              required
              data-aos="fade-right"
              data-aos-delay="400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
