/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useUploadImage } from "../hooks/useUploadImage";

function Uploader({ setImageUrl }) {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("No selected file");
  const { uploadImage } = useUploadImage();
  const uploadPostImage = async (file) => {
    const response = await uploadImage(file);
    setImageUrl(response);
  };

  return (
    <main>
      <form onClick={() => document.querySelector(".input-field").click()}>
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            if (files[0]) {
              setFileName(files[0].name);
              setImage(URL.createObjectURL(files[0]));
              uploadPostImage(files[0]);
            }
          }}
        />
        {image ? (
          <img src={image} width={150} height={150} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#ffffff" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
      <section className="uploaded-row">
        <AiFillFileImage color="#ffffff" />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected File");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;
