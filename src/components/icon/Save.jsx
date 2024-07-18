import { useEffect, useState } from "react";
import { useSavePost } from "../../hooks/usePosts";
import { useRemoveSavePost } from "../../hooks/usePosts";

/* eslint-disable react/prop-types */
export default function Save({ postId, profileId, saved, onSaveChange }) {
  const { savePost } = useSavePost();
  const { removeSavePost } = useRemoveSavePost();
  const [isSaved, setIsSaved] = useState(saved);

  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  async function handleSave(e) {
    e.preventDefault();
    if (isSaved) {
      // Remove from saved posts
      await removeSavePost(postId, profileId);
    } else {
      // Add to saved posts
      await savePost(postId, profileId);
    }
    setIsSaved(!isSaved);
    onSaveChange(postId, !isSaved);
  }

  return (
    <div className="saveSvg" onClick={handleSave}>
      {isSaved ? (
        <img
          width="35"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/FFFFFF/bookmark-ribbon.png"
          alt="bookmark-ribbon"
        />
      ) : (
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/windows/32/FFFFFF/bookmark-ribbon--v1.png"
          alt="bookmark-ribbon--v1"
        />
      )}
    </div>
  );
}
