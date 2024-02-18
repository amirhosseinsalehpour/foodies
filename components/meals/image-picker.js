"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();
  function handlePicker() {
    imageInputRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet</p>}
          {pickedImage && <Image src={pickedImage} alt={pickedImage} fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handlePicker}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
