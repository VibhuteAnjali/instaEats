import { useEffect, useState } from "react";

export function useUpdateProfileImage(email, image) {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  // console.log(HOST_URL, "url");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email || !image) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${HOST_URL}/updateProfilePic`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error updating profile");
        }

        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        setMessage("Image Updated");
        // console.log(data, "response");
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchProfile();
  }, [email, image, HOST_URL]);

  return { message, error };
}
