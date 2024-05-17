import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  function handleModalClose() {
    navigate("..");
  }

  return (
    <>
      <div className={styles.backdrop} onClick={handleModalClose} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </>
  );
}
