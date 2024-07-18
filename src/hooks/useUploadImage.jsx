import { useState } from "react";

export function useUploadImage() {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);
      const res = await fetch(`${HOST_URL}/uploadImage`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      setUploading(false);
      return data.url;
    } catch (err) {
      setUploading(false);
      setError(err.message);
      console.error("Image upload error:", err);
    }
  };

  return { uploadImage, uploading, error };
}
