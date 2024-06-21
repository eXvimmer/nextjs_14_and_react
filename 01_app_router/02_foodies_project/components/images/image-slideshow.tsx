"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";
import styles from "./image-slideshow.module.css";

const images = [
  {
    id: crypto.randomUUID(),
    image: burgerImg,
    alt: "A delicious, juicy burger",
  },
  { id: crypto.randomUUID(), image: curryImg, alt: "A delicious, spicy curry" },
  { id: crypto.randomUUID(), image: dumplingsImg, alt: "Steamed dumplings" },
  { id: crypto.randomUUID(), image: macncheeseImg, alt: "Mac and cheese" },
  { id: crypto.randomUUID(), image: pizzaImg, alt: "A delicious pizza" },
  {
    id: crypto.randomUUID(),
    image: schnitzelImg,
    alt: "A delicious schnitzel",
  },
  {
    id: crypto.randomUUID(),
    image: tomatoSaladImg,
    alt: "A delicious tomato salad",
  },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.image}
          className={index === currentImageIndex ? styles.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
