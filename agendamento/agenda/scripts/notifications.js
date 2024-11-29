import { initToaster } from "./toaster.js";

export function initNotifications() {
  const toaster = initToaster(document.body);

  document.addEventListener("event-create", () => {
    toaster.success("Consulta agendada!");
  });

  document.addEventListener("event-delete", () => {
    toaster.success("Consulta desmarcada!");
  });

  document.addEventListener("event-edit", () => {
    toaster.success("Consulta alterada!");
  });
}