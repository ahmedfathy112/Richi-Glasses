import Image from "next/image";

export default function HomePage() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              نظارات عصرية لإطلالة متميزة
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8">
              اكتشف مجموعتنا الحصرية من النظارات الطبية والشمسية
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 cursor-pointer transition duration-300">
              تسوق الآن
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-right mb-8">
            استكشف تشكيلاتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category Cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/heroSec.png"
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
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/heroSec.png"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
