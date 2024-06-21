"use client";
import { useRef, useState } from "react";
import styles from "./iamge-picker.module.css";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  function handleImagePick() {
    imageInput?.current?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file) {
      setPickedImage("");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage ? (
            <p>No image picked yet!</p>
          ) : (
            <Image src={pickedImage} alt="picked image" fill />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handleImagePick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
