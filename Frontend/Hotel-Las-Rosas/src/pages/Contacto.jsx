import { useState } from "react";
import { BASE_URL } from "../Utils/Constants";
import "../styles/Contacto.css";
import "../styles/Home.css";
import Sidebar    from "../componentes/Sidebar";
import PageFooter from "../componentes/Pagefooter";

export default function Contacto() {
  const [activeNav, setActiveNav] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState("");
  const [enviado, setEnviado]     = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.nombre.trim())              e.nombre  = "El nombre es obligatorio.";
    if (!form.email.trim())               e.email   = "El email es obligatorio.";
    else if (!emailRegex.test(form.email))e.email   = "Email inválido.";
    if (!form.asunto.trim())              e.asunto  = "El asunto es obligatorio.";
    if (!form.mensaje.trim())             e.mensaje = "El mensaje es obligatorio.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || 'Error al enviar el mensaje');
        setLoading(false);
        return;
      }

      setEnviado(true);
      setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
    } catch (err) {
      console.error('contact submit error', err);
      setServerError('Error de red, intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icono: "bi-geo-alt-fill",    titulo: "Dirección",     lineas: ["Av. Las Rosas 1250", "San Miguel de Tucumán, Argentina"] },
    { icono: "bi-telephone-fill",  titulo: "Teléfono",      lineas: ["+54 381 422-0000", "Lunes a domingo · 8 a 22 hs"] },
    { icono: "bi-envelope-fill",   titulo: "Email",         lineas: ["reservas@hotellasrosas.com.ar", "info@hotellasrosas.com.ar"] },
    { icono: "bi-clock-fill",      titulo: "Horario",       lineas: ["Check-in: 14:00 hs", "Check-out: 11:00 hs"] },
  ];

  const faqs = [
    { pregunta: "¿Puedo cancelar mi reserva?",            respuesta: "Sí. Las cancelaciones sin cargo se aceptan hasta 48 hs antes del check-in. Consultanos por casos especiales." },
    { pregunta: "¿El hotel tiene estacionamiento?",        respuesta: "Sí, contamos con estacionamiento privado gratuito para todos los huéspedes." },
    { pregunta: "¿Aceptan mascotas?",                      respuesta: "Algunas de nuestras habitaciones son pet-friendly. Consultá disponibilidad al reservar." },
    { pregunta: "¿El desayuno está incluido?",             respuesta: "Depende del tipo de reserva. Ofrecemos tarifas con y sin desayuno. El buffet se sirve de 7 a 10:30 hs." },
    { pregunta: "¿Hay WiFi en todo el hotel?",             respuesta: "Sí, WiFi gratuito y de alta velocidad en todas las habitaciones y áreas comunes." },
    { pregunta: "¿Tienen servicio de traslado al aeropuerto?", respuesta: "Sí, coordinamos traslados con previo aviso. Consultá tarifas y disponibilidad en recepción." },
  ];

  return (
    <div className="layout">
      <Sidebar
        activeNav={activeNav}
        onNavClick={(i) => setActiveNav(i)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className={`main-content${collapsed ? " expanded" : ""}`}>

        {/* ══ HERO ══════════════════════════════════════ */}
        <section className="con-hero d-flex align-items-center justify-content-center text-center">
          <div className="con-hero-overlay" />
          <div className="con-hero-content position-relative px-3">
            <span className="con-badge mb-3 d-inline-block">Estamos para ayudarte</span>
            <h1 className="con-hero-title fw-bold mb-3">¿Cómo podemos<br />ayudarte hoy?</h1>
            <p className="con-hero-subtitle mx-auto">
              Nuestro equipo responde consultas de lunes a domingo.
              Escribinos, llamanos o visitanos directamente en el hotel.
            </p>
          </div>
        </section>

        {/* ══ INFO CARDS ════════════════════════════════ */}
        <section className="con-info-section py-5">
          <div className="container-fluid px-4">
            <div className="row g-4 justify-content-center">
              {info.map((item, i) => (
                <div key={i} className="col-sm-6 col-xl-3">
                  <div className="con-info-card h-100 p-4 text-center">
                    <div className="con-info-icon mx-auto mb-3">
                      <i className={`bi ${item.icono}`} />
                    </div>
                    <h6 className="fw-bold mb-2" style={{ color: "#1e3a5f" }}>{item.titulo}</h6>
                    {item.lineas.map((l, j) => (
                      <p key={j} className="text-muted small mb-0" style={{ lineHeight: 1.8 }}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FORMULARIO + MAPA ═════════════════════════ */}
        <section className="py-5 bg-white">
          <div className="container-fluid px-4">
            <div className="row g-5 align-items-start">

              {/* Formulario */}
              <div className="col-lg-6">
                <span className="con-section-tag mb-2 d-inline-block">Escribinos</span>
                <h2 className="con-section-title fw-bold mb-4">Envianos un mensaje</h2>

                {enviado ? (
                  <div className="con-success-box p-4 text-center">
                    <div className="con-success-icon mx-auto mb-3">
                      <i className="bi bi-check-lg" />
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: "#1e3a5f" }}>¡Mensaje enviado!</h5>
                    <p className="text-muted small mb-3">
                      Gracias por contactarnos. Te respondemos en menos de 24 horas.
                    </p>
                    <button
                      className="btn con-nuevo-btn px-4"
                      onClick={() => setEnviado(false)}
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold">Nombre</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-person text-secondary" />
                          </span>
                          <input
                            type="text" name="nombre"
                            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                            placeholder="Juan Pérez"
                            value={form.nombre} onChange={handleChange}
                          />
                        </div>
                        {errors.nombre && <div className="invalid-feedback d-block">{errors.nombre}</div>}
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold">Email</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-envelope text-secondary" />
                          </span>
                          <input
                            type="email" name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="juan@email.com"
                            value={form.email} onChange={handleChange}
                          />
                        </div>
                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold">
                          Teléfono <span className="text-muted fw-normal">(opcional)</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-telephone text-secondary" />
                          </span>
                          <input
                            type="tel" name="telefono"
                            className="form-control"
                            placeholder="+54 381 000-0000"
                            value={form.telefono} onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-semibold">Asunto</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="bi bi-chat-text text-secondary" />
                          </span>
                          <select
                            name="asunto"
                            className={`form-select ${errors.asunto ? "is-invalid" : ""}`}
                            value={form.asunto} onChange={handleChange}
                          >
                            <option value="">Seleccioná...</option>
                            <option>Consulta de reserva</option>
                            <option>Cancelación</option>
                            <option>Información de servicios</option>
                            <option>Eventos y reuniones</option>
                            <option>Otro</option>
                          </select>
                        </div>
                        {errors.asunto && <div className="invalid-feedback d-block">{errors.asunto}</div>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Mensaje</label>
                      <div className="input-group align-items-start">
                        <span className="input-group-text bg-light" style={{ paddingTop: "10px" }}>
                          <i className="bi bi-pencil text-secondary" />
                        </span>
                        <textarea
                          name="mensaje"
                          className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
                          placeholder="Contanos en qué podemos ayudarte..."
                          rows={5}
                          value={form.mensaje} onChange={handleChange}
                        />
                      </div>
                      {errors.mensaje && <div className="invalid-feedback d-block">{errors.mensaje}</div>}
                    </div>

                    <button type="submit" className="btn w-100 py-2 fw-semibold con-submit-btn" disabled={loading}>
                      {loading
                        ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Enviando...</>
                        : <><i className="bi bi-send-fill me-2" />Enviar mensaje</>
                      }
                    </button>
                    {serverError && (
                      <div className="alert alert-danger d-flex align-items-center gap-2 mt-3 mb-0 py-2" role="alert">
                        <i className="bi bi-exclamation-triangle-fill" />
                        <span>{serverError}</span>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* Mapa / Ubicación */}
              <div className="col-lg-6">
                <span className="con-section-tag mb-2 d-inline-block">Dónde estamos</span>
                <h2 className="con-section-title fw-bold mb-4">Encontranos en Tucumán</h2>

                {/* Mapa visual decorativo */}
                <div className="con-mapa-box mb-4 d-flex align-items-center justify-content-center flex-column">
                  <div className="con-mapa-pin mb-2">
                    <i className="bi bi-geo-alt-fill" />
                  </div>
                  <p className="fw-bold mb-1" style={{ color: "#1e3a5f" }}>Hotel Las Rosas</p>
                  <p className="text-muted small mb-3">Av. Las Rosas 1250 · San Miguel de Tucumán</p>
                  <a
                    href="https://maps.google.com/?q=San+Miguel+de+Tucuman+Argentina"
                    target="_blank"
                    rel="noreferrer"
                    className="btn con-maps-btn px-4 py-2"
                  >
                    <i className="bi bi-map me-2" />
                    Abrir en Google Maps
                  </a>
                </div>

                {/* Redes sociales */}
                <div className="con-redes p-4">
                  <h6 className="fw-bold mb-3" style={{ color: "#1e3a5f" }}>Seguinos en redes</h6>
                  <div className="d-flex gap-3 flex-wrap">
                    {[
                      { red: "Instagram",  icono: "bi-instagram",  url: "#" },
                      { red: "Facebook",   icono: "bi-facebook",   url: "#" },
                      { red: "WhatsApp",   icono: "bi-whatsapp",   url: "#" },
                      { red: "TripAdvisor",icono: "bi-star-fill",  url: "#" },
                    ].map((r, i) => (
                      <a key={i} href={r.url} className="con-red-btn d-flex align-items-center gap-2">
                        <i className={`bi ${r.icono}`} />
                        <span>{r.red}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════ */}
        <section className="con-faq-section py-5">
          <div className="container-fluid px-4">
            <div className="text-center mb-5">
              <span className="con-section-tag mb-2 d-inline-block">Preguntas frecuentes</span>
              <h2 className="con-section-title fw-bold">Respuestas rápidas</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                Estas son las consultas que más nos hacen. Si no encontrás tu respuesta,
                escribinos directamente.
              </p>
            </div>
            <div className="row g-4 justify-content-center">
              {faqs.map((f, i) => (
                <div key={i} className="col-md-6 col-xl-4">
                  <div className="con-faq-card h-100 p-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="con-faq-q-badge flex-shrink-0">Q</div>
                      <div>
                        <h6 className="fw-bold mb-2" style={{ color: "#1e3a5f" }}>{f.pregunta}</h6>
                        <p className="text-muted small mb-0" style={{ lineHeight: 1.75 }}>{f.respuesta}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════ */}
        <section className="con-cta-section py-5">
          <div className="container-fluid px-4">
            <div className="con-cta-inner mx-auto py-5 px-4 text-center position-relative overflow-hidden">
              <div className="con-cta-deco-1" />
              <div className="con-cta-deco-2" />
              <div className="position-relative">
                <i className="bi bi-telephone-fill con-cta-icon mb-3 d-block" />
                <h2 className="fw-bold mb-2 text-white">¿Preferís hablar con nosotros?</h2>
                <p className="mb-4" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 440, margin: "0 auto 1.5rem" }}>
                  Llamanos al <strong style={{ color: "#fff" }}>+54 381 422-0000</strong> de lunes
                  a domingo de 8 a 22 hs. Con gusto te ayudamos.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="tel:+5438142220000" className="btn con-cta-btn-primary px-4 py-2 fw-semibold">
                    <i className="bi bi-telephone me-2" />
                    Llamar ahora
                  </a>
                  <a
                    href="https://wa.me/5438142220000"
                    target="_blank" rel="noreferrer"
                    className="btn con-cta-btn-secondary px-4 py-2 fw-semibold"
                  >
                    <i className="bi bi-whatsapp me-2" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}