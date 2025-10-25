import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-gray-800 w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-sm mx-auto border border-gray-700"
      data-aos={product?.dataos}
    >
      {/* Product Image Container */}
      <div className="relative h-64 w-full bg-gray-900 flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 text-right">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{product.description}</p>

        {/* Price and Action */}
        <div className="flex flex-col space-y-4">
          {/* Order Button */}
          <button className="w-full cursor-pointer bg-amber-500 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">
            اطلب الآن
          </button>
        </div>

        {/* Additional Features */}
        <div className="mt-4 flex flex-wrap gap-2 justify-end">
          {product.features?.map((feature, index) => (
            <span
              key={index}
              className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// Example usage:
/*
<ProductCard
  product={{
    imageUrl: "/images/glasses/classic-aviator.jpg",
    title: "نظارات طبية كلاسيكية",
    description: "إطار خفيف الوزن مع حماية من الأشعة فوق البنفسجية",
    price: "199",
    features: ["حماية UV400", "إطار خفيف", "مقاومة للخدوش"]
  }}
/>
*/
