import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import data from "../data/notifications.json";

type Notification = {
  id: number;
  title: string;
  message: string;
  unread: boolean;
};

interface NotificationContextInterface {
  notifications: Notification[];
  notificationsCount: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> | undefined;
  handleSelect: ((id: number) => void) | undefined;
  selectedNotification: Notification | undefined;
}

const DefaultNotificationData: NotificationContextInterface = {
  notifications: [],
  notificationsCount: 0,
  isOpen: false,
  setIsOpen: undefined,
  handleSelect: undefined,
  selectedNotification: undefined,
};

const NotificationContext = createContext<NotificationContextInterface>(
  DefaultNotificationData
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    ...data.notifications.map((notification) => ({
      ...notification,
      unread: true,
    })),
  ]);
  const [notificationsCount, setNotificationsCount] = useState<number>(
    notifications.filter((notification) => notification.unread).length
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification>();

  const handleSelect = (id: number) => {
    const notification = notifications.find(
      (notification) => notification.id === id
    );
    setSelectedNotification(notification);

    if (notification?.unread) {
      setNotifications(
        notifications.map((notification) =>
          id === notification.id
            ? { ...notification, unread: false }
            : notification
        )
      );
      setNotificationsCount(notificationsCount - 1);
    }
    console.log(notifications);
  };

  const NotificationData: NotificationContextInterface = {
    notifications,
    notificationsCount,
    isOpen,
    setIsOpen,
    handleSelect,
    selectedNotification,
  };

  return (
    <NotificationContext.Provider value={NotificationData}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const {
    notifications,
    notificationsCount,
    isOpen,
    setIsOpen,
    handleSelect,
    selectedNotification,
  } = useContext(NotificationContext);
  return {
    notifications,
    notificationsCount,
    isOpen,
    setIsOpen,
    handleSelect,
    selectedNotification,
  };
};

export default NotificationContext;
