import styles from "./logistics-item.module.css";

function LogisticsItem({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ComponentType;
}) {
  const Icon = icon;
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
