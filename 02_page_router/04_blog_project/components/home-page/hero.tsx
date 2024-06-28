import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/mustafa.jpeg"
          alt="Mustafa Hayati's Photo"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Mustafa!</h1>
      <p>I am a full-stack web & indie game developer.</p>
    </section>
  );
}
