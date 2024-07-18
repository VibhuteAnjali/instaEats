/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export function useGetProfile(emailId) {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${HOST_URL}/profile/${emailId}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        // console.log(data, "response");
        setProfileData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [emailId, HOST_URL]);

  return { profileData, loading, error };
}

export function useUpdateProfile() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  const updateProfile = async (email, bio, userName) => {
    setLoading(true);
    const formData = {
      email: email,
      bio: bio,
      userName: userName,
    };

    try {
      const response = await fetch(`${HOST_URL}/edit-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating data: ${errorData.message}`);
      }
      const data = await response.json();
      // console.log(data, "response");
      setMessage("Profile Updated");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, error, updateProfile };
}
export function useCreateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  const createProfile = async (Name, email, bio, userName, imageUrl) => {
    setLoading(true);
    const formData = {
      Name: Name,
      email: email,
      userName: userName,
      bio: bio,
      profilePic: imageUrl,
    };

    try {
      const response = await fetch(`${HOST_URL}/createProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error updating data: ${errorData.message}`);
      }
      const data = await response.json();
      // console.log(data, "response");
      setMessage("Profile Updated");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, error, createProfile };
}

export function useDeleteProfile() {
  const [message, setMessage] = useState("");
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  const deleteProfile = async (profileId) => {
    const formData = {
      profileId: profileId,
    };
    try {
      const response = await fetch(`${HOST_URL}/DeleteProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error deleting profile: ${errorData.message}`);
      }
      const data = await response.json();
      setMessage("Profile deleted");
    } catch (error) {
      setMessage(error);
    }
  };
  return { message, deleteProfile };
}
