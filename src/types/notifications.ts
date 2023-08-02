export type NotificationState = {
  notifications: any[];
  notifications_default: any[];
  unread_notifications: NotificationsItem[];
  count: number;
  notifications_opened: boolean;
  filter: { name: string; active: boolean }[];
};

export interface NotificationsItem {
  created_at: string;
  head: string;
  id: string;
  message: string;
  read_at: null | string | Date;
}
