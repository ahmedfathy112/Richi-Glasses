"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isBase64 = product.imageUrl?.startsWith("data:image/");

  const shouldBeUnoptimized = isBase64;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <div
        className="bg-gray-800 w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden sm:max-w-sm sm:mx-auto border border-gray-700" // data-aos={product?.dataos}
      >
        <div
          className="relative h-78 w-full bg-gray-900 max-md:h-[550px] cursor-pointer"
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label={`عرض صورة ${product.name}`}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            loading="lazy"
            unoptimized={shouldBeUnoptimized}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRsdHSIeHx8hIiMnJSUjJycmJiYnJyYmKDAwMDAmJicpKSkpKSkpKSkpKSkpKSn/2wBDAR4eHh4eHiEeHiEpIiIpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 text-right">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{product.description}</p>
          <div className="flex flex-col space-y-4">
            <a
              href={`https://wa.me/96596639714?text= اسم المنتج=${product.name} - وصف المنتج = ${product.description}`}
              target="_blank"
              className="w-full cursor-pointer text-center outline-0 bg-amber-500 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 "
            >
              اطلب الآن
            </a>
          </div>
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

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`تكبير صورة ${product.name}`}
        >
          <div
            className="relative w-full max-w-4xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-50 text-white bg-black/40 rounded-full p-2 hover:bg-black/60"
              aria-label="إغلاق"
            >
              ✕
            </button>
            <div className="relative w-full aspect-4/3 sm:aspect-3/2 bg-black">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                unoptimized={shouldBeUnoptimized}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
