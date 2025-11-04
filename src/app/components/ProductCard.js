import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-gray-800 w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-sm mx-auto border border-gray-700"
      // data-aos={product?.dataos}
    >
      {/* Product Image Container */}
      <div className="relative h-78 w-full bg-gray-900 max-md:h-96">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRsdHSIeHx8hIiMnJSUjJycmJiYnJyYmKDAwMDAmJicpKSkpKSkpKSkpKSkpKSn/2wBDAR4eHh4eHiEeHiEpIiIpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          className="w-full h-full object-cover"
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
          <a
            href={`https://wa.me/96596639714?text= اسم المنتج=${product.title} - وصف المنتج = ${product.description}`}
            target="_blank"
            className="w-full cursor-pointer text-center outline-0 bg-amber-500 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 "
          >
            اطلب الآن
          </a>
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
