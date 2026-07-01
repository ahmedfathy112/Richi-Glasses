"use client";
import Image from "next/image";

import img27_1 from "./gallaryImages/image1.jpeg";
import img27_2 from "./gallaryImages/image2.jpeg";
import img27_3 from "./gallaryImages/image3.jpeg";
import img27_4 from "./gallaryImages/image4.jpeg";
import img28_1 from "./gallaryImages/image5.jpeg";
import img28_2 from "./gallaryImages/image6.jpeg";
import img28_3 from "./gallaryImages/image7.jpeg";
import img28_4 from "./gallaryImages/image8.jpeg";
import img28_5 from "./gallaryImages/image9.jpeg";
import img28_6 from "./gallaryImages/image10.jpeg";
import img28_7 from "./gallaryImages/image11.jpeg";
import img29_1 from "./gallaryImages/image12.jpeg";
import img29_2 from "./gallaryImages/image13.jpeg";
import img29_3 from "./gallaryImages/image14.jpeg";
import img29_4 from "./gallaryImages/image15.jpeg";
import img29_5 from "./gallaryImages/image16.jpeg";
import img29_6 from "./gallaryImages/image17.jpeg";
import img29_7 from "./gallaryImages/image18.jpeg";
import img29_8 from "./gallaryImages/image19.jpeg";
import img30_1 from "./gallaryImages/image20.jpeg";
import img30_2 from "./gallaryImages/image21.jpeg";
import img30_3 from "./gallaryImages/image22.jpeg";
import img30_4 from "./gallaryImages/image23.jpeg";
import img30_5 from "./gallaryImages/image24.jpeg";
import img31_1 from "./gallaryImages/image25.jpeg";
import img31_2 from "./gallaryImages/image26.jpeg";
import img31_3 from "./gallaryImages/image27.jpeg";
import img31_4 from "./gallaryImages/image28.jpeg";
import img31_5 from "./gallaryImages/image29.jpeg";
import img31_6 from "./gallaryImages/image30.jpeg";
import img31_7 from "./gallaryImages/image31.jpeg";
import img31_8 from "./gallaryImages/image32.jpeg";
import img32_1 from "./gallaryImages/image33.jpeg";
import img32_2 from "./gallaryImages/image34.jpeg";
import img32_3 from "./gallaryImages/image35.jpeg";
import img32_4 from "./gallaryImages/image36.jpeg";
import img32_5 from "./gallaryImages/WhatsApp Image 2026-07-01 at 11.12.32 AM.jpeg";

const galleryImages = [
  {
    id: 0,
    src: img27_1,
    title: "إطلالة كلاسيكية - المجموعة الأولى",
    alt: "نظارة أنيقة على طاولة سوداء",
  },
  {
    id: 1,
    src: img27_2,
    title: "نظرة شبه رسمية - تصميم متألق",
    alt: "نظارة فاخرة بلون دافئ",
  },
  {
    id: 2,
    src: img27_3,
    title: "ستايل عصري - أناقة يومية",
    alt: "نظارة مودرن بإضاءة ناعمة",
  },
  {
    id: 3,
    src: img27_4,
    title: "رونق المساء - لمسة أنيقة",
    alt: "نظارة بستايل متوازن",
  },
  {
    id: 4,
    src: img28_1,
    title: "طلّة شمسية - رحلة نهارية",
    alt: "نظارة شمسية كلاسيكية",
  },
  {
    id: 5,
    src: img28_2,
    title: "تفاصيل مصقولة - لون متباين",
    alt: "نظارة أنيقة بلمسات فاخرة",
  },
  {
    id: 6,
    src: img28_3,
    title: "جرأة لونية - سحر البحر",
    alt: "نظارة مزينة بتفاصيل مميزة",
  },
  {
    id: 7,
    src: img28_4,
    title: "أناقة جامدة - تصميم قوي",
    alt: "نظارة عصرية بحواف واضحة",
  },
  {
    id: 8,
    src: img28_5,
    title: "إطلالة حيوية - أسلوب تجريبي",
    alt: "نظارة بتصميم مفعم بالحياة",
  },
  {
    id: 9,
    src: img28_6,
    title: "لمسة ناعمة - انسيابية العيون",
    alt: "نظارة ألوان هادئة",
  },
  {
    id: 10,
    src: img28_7,
    title: "صفاء الصباح - صورة منعشة",
    alt: "نظارة أنيقة في ضوء الصباح",
  },
  {
    id: 11,
    src: img29_1,
    title: "تصميم رياضي - حركة ديناميكية",
    alt: "نظارة بأداء رياضي",
  },
  {
    id: 12,
    src: img29_2,
    title: "خطوط متناسقة - مظهر متكامل",
    alt: "نظارة مع تركيبة ألوان متناسقة",
  },
  {
    id: 13,
    src: img29_3,
    title: "سحر المساء - لمسة لامعة",
    alt: "نظارة فاخرة بدرجة غامقة",
  },
  {
    id: 14,
    src: img29_4,
    title: "تصميم هادئ - جمال بسيط",
    alt: "نظارة ذات أسلوب خفيف",
  },
  {
    id: 15,
    src: img29_5,
    title: "تفاصيل أنثوية - خطوط صافية",
    alt: "نظارة بلمسات دقيقة",
  },
  {
    id: 16,
    src: img29_6,
    title: "قوة التوازن - إطلالة متسقة",
    alt: "نظارة تجمع بين الكلاسيكية والحداثة",
  },
  {
    id: 17,
    src: img29_7,
    title: "إطلالة مسائية - ألوان دافئة",
    alt: "نظارة في إضاءة خافتة",
  },
  {
    id: 18,
    src: img29_8,
    title: "نظرة نهارية - وضوح مذهل",
    alt: "نظارة شفافة وأنيقة",
  },
  {
    id: 19,
    src: img30_1,
    title: "تباين جرئ - تفاصيل متحركة",
    alt: "نظارة بلمسة مبتكرة",
  },
  {
    id: 20,
    src: img30_2,
    title: "عرض مميز - تأثير ضوء",
    alt: "نظارة بإضاءة تكميلية",
  },
  {
    id: 21,
    src: img30_3,
    title: "تصميم متميز - خطوط حادة",
    alt: "نظارة ذات هوية قوية",
  },
  {
    id: 22,
    src: img30_4,
    title: "لمسة فنية - شكل مبتكر",
    alt: "نظارة بعناصر تصميم فريدة",
  },
  {
    id: 23,
    src: img30_5,
    title: "نظارة مسائية - أسلوب مطمئن",
    alt: "نظارة خلاقة في لقطات ناعمة",
  },
  {
    id: 24,
    src: img31_1,
    title: "ستايل عصري - تناسق ألوان",
    alt: "نظارة بلمسات ألوان محايدة",
  },
  {
    id: 25,
    src: img31_2,
    title: "تصميم فخم - طابع رسمي",
    alt: "نظارة بمظهر قوي",
  },
  {
    id: 26,
    src: img31_3,
    title: "مظهر رومانسي - ضوء ناعم",
    alt: "نظارة بدرجة ظلية هادئة",
  },
  {
    id: 27,
    src: img31_4,
    title: "تألق عتيق - سحر كلاسيكي",
    alt: "نظارة على خلفية داكنة",
  },
  {
    id: 28,
    src: img31_5,
    title: "رقي مبسط - خطوط خفيفة",
    alt: "نظارة بأجواء هادئة",
  },
  {
    id: 29,
    src: img31_6,
    title: "لمسة فنية - تناسق دقيق",
    alt: "نظارة بتكوين بصري متناغم",
  },
  {
    id: 30,
    src: img31_7,
    title: "خطوط بارزة - مظهر قوي",
    alt: "نظارة بتصميم واضح",
  },
  {
    id: 31,
    src: img31_8,
    title: "عرض نهاري - تفاصيل مشرقة",
    alt: "نظارة بخلفية خفيفة",
  },
  {
    id: 32,
    src: img32_1,
    title: "إطلالة نهارية - بعد جديد",
    alt: "نظارة بإضاءة طبيعية",
  },
  {
    id: 33,
    src: img32_2,
    title: "تصميم ناعم - شكل مريح",
    alt: "نظارة بتفاصيل ناعمة",
  },
  {
    id: 34,
    src: img32_3,
    title: "لمسة مميزة - تصميم متوازن",
    alt: "نظارة بلون هادئ",
  },
  {
    id: 35,
    src: img32_4,
    title: "أسلوب ممتع - طابع حيوي",
    alt: "نظارة لافتة للنظر",
  },
  {
    id: 36,
    src: img32_5,
    title: "نهاية العرض - حيوية خفيفة",
    alt: "نظارة بلمسة نهائية أنيقة",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="text-right">
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                معرضنا الفاخر
              </p>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                استعرض جميع الصور
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                جميع الصور تظهر هنا في صفحة واحدة بتخطيط شبكي نظيف وحجم متناسق
                لكل صورة.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                معرض كامل
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                معرضنا هنا في خدمتكم
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                نعرض لكم مجموعة متنوعة من الصور التي تعكس جمال منتجاتنا
                وتصاميمنا. استمتعوا بتصفحها واختيار ما يناسب ذوقكم.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-[340px] overflow-hidden bg-slate-950 sm:h-[380px] lg:h-[420px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain transition duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-5 text-right">
                  <p className="text-base font-semibold text-white">
                    {image.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
