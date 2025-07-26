// src/hooks/useAppointmentNotifier.js
import { useEffect } from "react";
import moment from "moment-timezone";

const useAppointmentNotifier = (appointments, user, services, staff) => {
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") Notification.requestPermission();

    const notified = new Set();

    const check = () => {
      const now = moment().format("YYYY-MM-DDTHH:mm");

      appointments.forEach((a) => {
        if (
          a.customerEmail === user?.email &&
          moment(a.dateTime).format("YYYY-MM-DDTHH:mm") === now &&
          !notified.has(a.id)
        ) {
          const stylist =
            staff.find((s) => s.id === a.stylistId)?.name || "your stylist";
          const service =
            services.find((s) => s.id === a.serviceId)?.name || "your service";

          new Notification("📅 It's time!", {
            body: `Your ${service} appointment with ${stylist} is now.`,
            icon: "/icon.png",
          });

          notified.add(a.id);
        }
      });
    };

    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [appointments, user, services, staff]);
};

export default useAppointmentNotifier;
