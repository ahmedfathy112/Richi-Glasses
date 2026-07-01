import fs from "fs";
import path from "path";

const galleryDir = path.join(process.cwd(), "src/app/gallery/gallaryImages");

function getMimeType(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

export async function GET(request, { params }) {
  const filename = params?.filename ? decodeURIComponent(params.filename) : "";
  const safeName = filename.replace(/^\/+/, "");
  const filePath = path.resolve(galleryDir, safeName);
  const isInsideGalleryDir = filePath.startsWith(galleryDir);
  const exists = isInsideGalleryDir && fs.existsSync(filePath);

  if (!exists) {
    return new Response(JSON.stringify({ error: "Image not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const imageBuffer = fs.readFileSync(filePath);

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": getMimeType(safeName),
      "Content-Length": imageBuffer.length.toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
