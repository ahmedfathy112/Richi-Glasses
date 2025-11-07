/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ضع هنا كل النطاقات الخارجية التي سيأتي منها صورك
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ljrpktnnfrkcevcsxpmr.supabase.co", // ⬅️ ضع نطاقك هنا
        pathname: "/storage/v1/object/public/**", // هذا يغطي كل المسارات في Storage
      },
      // إذا كان لديك نطاقات أخرى (مثل نطاق مشروعك الأساسي، أو Cloudflare، الخ)، ضعها هنا
    ],
    // إذا كنت تستخدم إصدارات Next.js أقدم من 13.4، استخدم هذا التنسيق بدلاً من remotePatterns:
    // domains: ['ljrpktnnfrkcevcsxpmr.supabase.co'],
  },
};

export default nextConfig;
