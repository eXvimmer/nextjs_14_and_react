"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav-link.module.css";

interface NavLinkProps {
  children: Readonly<React.ReactNode>;
  href: string;
}

export default function NavLink({ children, href }: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${styles.link} ${path === href ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
}
