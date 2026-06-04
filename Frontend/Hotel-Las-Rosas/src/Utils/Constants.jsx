export const BASE_URL = "http://localhost:5000";
export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "usuario";

export const NAV_ITEMS = [
  { icon: "bi-house-door",      label: "Inicio" },
  { icon: "bi-door-open",       label: "Habitaciones" },
  { icon: "bi-bookmark-check",  label: "Mis reservas", authOnly: true },
  { icon: "bi-buildings",       label: "Nosotros" },
  { icon: "bi-envelope",        label: "Contacto" },
];

export const FEATURES = [
  { icon: "bi-shield-check",    title: "Mejor precio garantizado", desc: "Encuentra las mejores tarifas" },
  { icon: "bi-calendar2-check", title: "Reserva segura",           desc: "Proceso 100% seguro" },
  { icon: "bi-headset",         title: "Atención 24/7",            desc: "Estamos para ayudarte" },
  { icon: "bi-tag",             title: "Ofertas exclusivas",        desc: "Descuentos solo para ti" },
];

export const HERO_SLIDES = [
  `${BASE_URL}/uploads/Hotel Las Rosas.png`,
  `${BASE_URL}/uploads/Logo-Las-Rosas.png`,
];

export const IMAGENES_HABITACION = {
  "Habitación Estándar":     `${BASE_URL}/uploads/Habitacion-Estandar.png`,
  "Habitación Clásica":      `${BASE_URL}/uploads/Habitacion-Clasica.png`,
  "Habitación Familiar":     `${BASE_URL}/uploads/Habitacion-Familiar.png`,
  "Suite Ejecutiva":         `${BASE_URL}/uploads/Habitacion-Suit-Ejecutiva.png`,
  "Suite Presidencial":      `${BASE_URL}/uploads/Habitacion-Suit-Presidencial.png`,
  "Habitación Superior VIP": `${BASE_URL}/uploads/Habitacion-superior-vip.png`,
};