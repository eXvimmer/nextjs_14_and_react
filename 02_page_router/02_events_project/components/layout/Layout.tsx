import { useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "@/components/ui/notification";
import NotificationContext from "@/store/notification-context";

function Layout({ children }: { children: React.ReactNode }) {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

export default Layout;
