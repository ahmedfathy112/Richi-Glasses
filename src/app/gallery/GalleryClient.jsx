"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function GalleryClient({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeImage = useMemo(
    () => (activeIndex !== null ? images[activeIndex] : null),
    [activeIndex, images],
  );

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const previousImage = () =>
    setActiveIndex((index) => (index > 0 ? index - 1 : images.length - 1));
  const nextImage = () =>
    setActiveIndex((index) => (index < images.length - 1 ? index + 1 : 0));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 transition-shadow duration-300 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4 text-right">
              <p className="text-sm font-semibold text-white">إطلالة أنيقة</p>
              <p className="mt-2 text-sm text-slate-400">
                اضغط لعرض الصورة بحجم كامل.
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div
            className="absolute inset-0 bg-black/90"
            onClick={closeLightbox}
          />
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/40">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-900/80 p-3 text-white transition hover:bg-slate-800"
              aria-label="Close lightbox"
            >
              <FiX className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-900/80 p-3 text-white transition hover:bg-slate-800"
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-20 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-900/80 p-3 text-white transition hover:bg-slate-800"
              aria-label="Next image"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
            <div className="relative h-[80vh] w-full bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                unoptimized
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="border-t border-white/10 px-8 py-6 text-right text-white/90">
              <p className="text-sm text-slate-400">{activeImage.alt}</p>
              <p className="mt-2 text-sm text-slate-300">
                استخدم الأسهم للتنقل بين الصور، أو اضغط خارج النافذة للإغلاق.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
