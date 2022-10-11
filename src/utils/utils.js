import { Notification } from "@vaadin/notification";

export function _showNotification(text, theme) {
  const notification = Notification.show(text, {
    position: "bottom-center",
    duration: 2000,
  });
  notification.setAttribute("theme", theme);
  const handleOpenChanged = (e) => {
    if (!e.detail.value) {
      notification.removeEventListener("opened-changed", handleOpenChanged);
    }
  };
  notification.addEventListener("opened-changed", handleOpenChanged);
}
