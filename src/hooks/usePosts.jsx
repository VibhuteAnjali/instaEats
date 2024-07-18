import { useState } from "react";

export function usePosts() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  async function fetchPosts(postId) {
    setLoading(true);

    try {
      const res = await fetch(`${HOST_URL}/post/${postId}`);
      if (!res.ok) {
        console.log("fetch post failed");
      }
      const data = await res.json();
      setResponse(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error, "Failed");
      setError(error);
      setLoading(false);
      return null;
    }
  }
  async function fetchAllPosts() {
    setLoading(true);

    try {
      const res = await fetch(`${HOST_URL}`);
      if (!res.ok) {
        console.log("fetch post failed");
      }
      const data = await res.json();
      setResponse(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error, "Failed");
      setError(error);
      setLoading(false);
      return null;
    }
  }
  return { response, loading, error, fetchPosts, fetchAllPosts };
}

export function useAddLike() {
  const [response, setResponse] = useState("");
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  const updateLike = async (id, profileId) => {
    try {
      const formData = {
        id: id,
        profileId: profileId,
      };
      const res = fetch(`${HOST_URL}/Addlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await response;
      console.log(data, "response");
      setResponse("Like++");
    } catch (error) {
      console.log(error, "error");
    }
  };
  return { response, updateLike };
}
export function useSearch() {
  const [response, setResponse] = useState([]);
  const HOST_URL = import.meta.env.VITE_HOST_URL;

  const searchDoc = async (input) => {
    try {
      const res = await fetch(
        `${HOST_URL}/search/?input=${encodeURIComponent(input)}`
      );
      const data = await res.json();
      console.log(data, "response");
      setResponse(data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.log(error, "error");
      return [];
    }
  };

  return { response, searchDoc };
}

export function useCreatePost() {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const createPost = async (formData) => {
    try {
      const res = await fetch(`${HOST_URL}/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "response");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  return { createPost };
}

export function useDeletePost() {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const deletePost = async (postId) => {
    const formData = {
      postId: postId,
    };
    try {
      const res = await fetch(`${HOST_URL}/deletePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "response");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  return { deletePost };
}

export function useSavePost() {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const savePost = async (postId, profileId) => {
    const formData = {
      postId: postId,
      profileId: profileId,
    };
    try {
      const res = await fetch(`${HOST_URL}/SavePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "response");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  return { savePost };
}

export function useRemoveSavePost() {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const removeSavePost = async (postId, profileId) => {
    const formData = {
      postId: postId,
      profileId: profileId,
    };
    try {
      const res = await fetch(`${HOST_URL}/RemoveSavedPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "response");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  return { removeSavePost };
}
