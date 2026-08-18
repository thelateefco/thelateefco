// lib/utils/images.ts

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://nyc.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
const APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "6a55a0560031c70c6f0e";

export function getImageUrl(fileId: string): string {
  if (!fileId) return "";
  const trimmed = String(fileId).trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }
  return `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${trimmed}/view?project=${APPWRITE_PROJECT_ID}`;
}

export function parseTags(tags: unknown): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map((t) => String(t).trim()).filter(Boolean);
      } catch {}
    }
    if (trimmed.includes("|")) {
      return trimmed.split("|").map((t) => t.trim()).filter(Boolean);
    }
    if (trimmed.includes(",")) {
      return trimmed.split(",").map((t) => t.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
}

export function getAllProjectImages(project: {
  featuredImage?: string;
  images?: string | string[];
}): string[] {
  const imageList: string[] = [];

  const addImage = (img: unknown) => {
    if (!img) return;
    const str = String(img).trim();
    if (!str || str.toUpperCase() === "NULL") return;

    // Check if JSON array string
    if (str.startsWith("[") && str.endsWith("]")) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => addImage(item));
          return;
        }
      } catch {
        // Ignore parse error
      }
    }

    // Check if comma separated
    if (str.includes(",")) {
      str.split(",").forEach((item) => addImage(item));
      return;
    }

    // Ignore short integer strings (like "9", "8", "4") that are column indexes, not Appwrite file IDs
    if (!str.startsWith("http") && !str.startsWith("/") && !str.startsWith("data:") && str.length < 15) {
      return;
    }

    const url = getImageUrl(str);
    if (url && !imageList.includes(url)) {
      imageList.push(url);
    }
  };

  // Check images column first (which holds Appwrite file IDs like 6a5a286e00233ff40417)
  if (Array.isArray(project.images)) {
    project.images.forEach((img) => addImage(img));
  } else if (project.images) {
    addImage(project.images);
  }

  // Check featuredImage column
  if (project.featuredImage) {
    addImage(project.featuredImage);
  }

  // Fallback image if project record in DB has NULL image
  if (imageList.length === 0) {
    imageList.push("/images/projects/homepage1.jpg");
  }

  return imageList;
}