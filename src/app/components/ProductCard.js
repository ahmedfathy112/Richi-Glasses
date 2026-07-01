"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiEye, FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isBase64 = product.imageUrl?.startsWith("data:image/");
  const shouldBeUnoptimized = isBase64;
  const title = product.title || product.name || "منتج";

  const productCode = (() => {
    const desc = (product.description || "").trim();
    const m = desc.match(/كود\s*[:\-–]?\s*([\w-]+)\s*$/u);
    return m ? m[1] : null;
  })();

  const priceLabel =
    product.price && product.price !== "0"
      ? `${product.price} د.ك`
      : "اتصل للطلب";

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
      <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/85 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/10 sm:mx-auto">
        <div
          className="relative h-80 w-full cursor-pointer bg-slate-950"
          onClick={() => setIsOpen(true)}
          role="button"
          aria-label={`عرض صورة ${title}`}
        >
          <Image
            src={product.imageUrl}
            alt={title}
            fill
            loading="lazy"
            unoptimized={shouldBeUnoptimized}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRsdHSIeHx8hIiMnJSUjJycmJiYnJyYmKDAwMDAmJicpKSkpKSkpKSkpKSkpKSn/2wBDAR4eHh4eHiEeHiEpIiIpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSn/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
            {product.category || "منتج"}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/70 p-2 text-sm text-white backdrop-blur transition hover:border-amber-400/50 hover:text-amber-200"
            aria-label={`عرض صورة ${title}`}
          >
            <FiEye />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5 text-right">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-200">
              {priceLabel}
            </span>
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
            {product.description}
          </p>

          {productCode ? (
            <div className="mt-4 inline-flex w-fit items-center rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              كود المنتج: {productCode}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {product.features?.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <a
              href={`https://wa.me/96596639714?text=Richi - كود المنتج = ${productCode}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              <FiShoppingCart />
              اطلب الآن
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-3 text-slate-200 transition hover:border-amber-400/40 hover:text-amber-200"
              aria-label={`عرض صورة ${title}`}
            >
              <FiEye />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`تكبير صورة ${title}`}
        >
          <div
            className="relative mx-auto w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 z-50 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
              aria-label="إغلاق"
            >
              ✕
            </button>
            <div className="relative aspect-4/3 w-full bg-black sm:aspect-3/2">
              <Image
                src={product.imageUrl}
                alt={title}
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
