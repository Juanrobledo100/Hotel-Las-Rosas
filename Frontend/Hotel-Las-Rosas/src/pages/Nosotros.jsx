import { useState } from "react";
import "../styles/Nosotros.css";
import "../styles/Home.css";
import Sidebar    from "../componentes/Sidebar";
import PageFooter from "../componentes/Pagefooter";

export default function Nosotros() {
  const [activeNav, setActiveNav] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const valores = [
    { icono: "bi-heart-fill",      titulo: "Calidez",         texto: "Cada huésped es tratado como parte de nuestra familia desde el primer saludo." },
    { icono: "bi-star-fill",       titulo: "Excelencia",      texto: "Buscamos superar expectativas en cada detalle, grande o pequeño." },
    { icono: "bi-shield-check",    titulo: "Confianza",       texto: "Más de 30 años construyendo relaciones basadas en la honestidad y el respeto." },
    { icono: "bi-tree-fill",       titulo: "Sustentabilidad", texto: "Comprometidos con prácticas responsables que cuidan el entorno tucumano." },
    { icono: "bi-people-fill",     titulo: "Comunidad",       texto: "Apoyamos el turismo local y el desarrollo de la región con cada decisión." },
    { icono: "bi-award-fill",      titulo: "Tradición",       texto: "Nuestra historia es nuestro orgullo. Cada año sumamos experiencia y amor por lo que hacemos." },
  ];

  const stats = [
    { numero: "30+", label: "Años de experiencia",      icono: "bi-clock-history" },
    { numero: "50+", label: "Habitaciones disponibles", icono: "bi-door-open" },
    { numero: "10k+",label: "Huéspedes satisfechos",    icono: "bi-people" },
    { numero: "5.0", label: "Calificación promedio",    icono: "bi-star" },
  ];

  const habitaciones = [
    { tipo: "Habitación Simple",   descripcion: "Ideal para viajeros solos. Cama individual, baño privado, WiFi y vista al jardín.",          icono: "bi-person",        amenities: ["WiFi", "TV", "A/C", "Baño privado"] },
    { tipo: "Habitación Vip",      descripcion: "Perfecta para parejas o amigos. Cama matrimonial o dos individuales con todo el confort.",    icono: "bi-people",        amenities: ["WiFi", "TV", "A/C", "Minibar"] },
    { tipo: "Suite Ejecutiva",     descripcion: "Espaciosa y equipada para el viajero exigente. Sala de estar, escritorio y vista panorámica.", icono: "bi-building",      amenities: ["WiFi", "TV 55\"", "A/C", "Jacuzzi"] },
    { tipo: "Habitación Familiar", descripcion: "Pensada para familias. Amplia, con camas adicionales y todo lo necesario para una estadía cómoda.", icono: "bi-house-heart", amenities: ["WiFi", "TV", "A/C", "Cuna disponible"] },
  ];

  const timeline = [
    { año: "1993", hito: "Apertura del hotel con 10 habitaciones y el sueño de la familia González." },
    { año: "2001", hito: "Primera gran renovación. Ampliamos a 30 habitaciones y sumamos restaurante propio." },
    { año: "2010", hito: "Certificación de calidad turística provincial. Reconocidos como referente de la región." },
    { año: "2018", hito: "Inauguramos la Suite Ejecutiva y el salón de eventos para hasta 100 personas." },
    { año: "2022", hito: "Premio al Mejor Hotel Boutique de Tucumán. Más de 10.000 huéspedes satisfechos." },
    { año: "2024", hito: "Renovación integral de instalaciones y lanzamiento de nuestro sistema de reservas online." },
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
        <section className="nos-hero d-flex align-items-center justify-content-center text-center">
          <div className="nos-hero-overlay" />
          <div className="nos-hero-content position-relative px-3">
            <span className="nos-badge mb-3 d-inline-block">Desde 1993 · Tucumán, Argentina</span>
            <h1 className="nos-hero-title fw-bold mb-3">
              Más de 30 años creando<br />momentos inolvidables
            </h1>
            <p className="nos-hero-subtitle mx-auto mb-4">
              Somos Hotel Las Rosas, un refugio de confort, calidez y tradición
              en el corazón de Tucumán. Cada habitación tiene una historia,
              cada huésped se convierte en parte de la nuestra.
            </p>
            <a href="/" className="btn nos-hero-btn px-4 py-2">
              <i className="bi bi-calendar-check me-2" />
              Reservá tu estadía
            </a>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════ */}
        <section className="nos-stats-section py-5">
          <div className="container-fluid px-4">
            <div className="row g-4 justify-content-center">
              {stats.map((s, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className="nos-stat-card text-center p-4 h-100">
                    <i className={`bi ${s.icono} nos-stat-icon mb-2`} />
                    <div className="nos-stat-number">{s.numero}</div>
                    <div className="nos-stat-label text-muted">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HISTORIA ══════════════════════════════════ */}
        <section className="py-5 bg-white">
          <div className="container-fluid px-4">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <span className="nos-section-tag mb-2 d-inline-block">Quiénes somos</span>
                <h2 className="nos-section-title fw-bold mb-4">
                  Una familia, una pasión,<br />un hotel
                </h2>
                <p className="text-muted mb-3" style={{ lineHeight: 1.9 }}>
                  Hotel Las Rosas nació en 1993 de la mano de la familia González con un sueño
                  simple pero poderoso: que cada persona que cruzara nuestra puerta se sintiera
                  como en casa. Lo que empezó como un pequeño establecimiento de 10 habitaciones
                  en el centro de Tucumán, hoy es uno de los hoteles boutique más queridos de
                  la provincia.
                </p>
                <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                  A lo largo de tres décadas renovamos instalaciones, sumamos servicios y, sobre
                  todo, mantuvimos el espíritu familiar y el trato personalizado que nos
                  identifica. Cada rincón del hotel tiene historia, cada detalle fue pensado
                  con amor para que tu estadía sea perfecta.
                </p>
                <div className="d-flex flex-column gap-2">
                  {[
                    "Fundado en 1993 por la familia González",
                    "Más de 50 habitaciones completamente equipadas",
                    "Premio al Mejor Hotel Boutique de Tucumán 2022",
                    "Certificación de turismo sustentable",
                  ].map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill nos-check-icon" />
                      <span className="text-muted small">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6 d-flex justify-content-center">
                <div className="nos-logo-showcase d-flex flex-column align-items-center justify-content-center">
                  <div className="nos-logo-ring d-flex align-items-center justify-content-center mb-4">
                    <i className="bi bi-building nos-logo-icon" />
                  </div>
                  <h4 className="fw-bold mb-1" style={{ color: "#1e3a5f" }}>Hotel Las Rosas</h4>
                  <p className="text-muted small mb-3">Tucumán, Argentina · Desde 1993</p>
                  <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {["Restaurante", "Eventos", "WiFi", "Estacionamiento", "Room Service"].map((s, i) => (
                      <span key={i} className="nos-service-pill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══════════════════════════════════ */}
        <section className="nos-timeline-section py-5">
          <div className="container-fluid px-4">
            <div className="text-center mb-5">
              <span className="nos-section-tag mb-2 d-inline-block">Nuestra trayectoria</span>
              <h2 className="nos-section-title fw-bold">Una historia que sigue creciendo</h2>
            </div>
            <div className="nos-timeline mx-auto">
              {timeline.map((t, i) => (
                <div key={i} className={`nos-timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
                  <div className="nos-timeline-card p-3 p-md-4">
                    <span className="nos-timeline-year">{t.año}</span>
                    <p className="text-muted small mb-0 mt-1" style={{ lineHeight: 1.7 }}>{t.hito}</p>
                  </div>
                  <div className="nos-timeline-dot" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HABITACIONES ══════════════════════════════ */}
        <section className="py-5 bg-white">
          <div className="container-fluid px-4">
            <div className="text-center mb-5">
              <span className="nos-section-tag mb-2 d-inline-block">Dónde descansás</span>
              <h2 className="nos-section-title fw-bold">Nuestras habitaciones</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: 520 }}>
                Más de 50 habitaciones diseñadas para que te sientas cómodo,
                ya sea que viajés solo, en pareja o en familia.
              </p>
            </div>
            <div className="row g-4">
              {habitaciones.map((h, i) => (
                <div key={i} className="col-sm-6 col-xl-3">
                  <div className="nos-hab-card h-100 p-4">
                    <div className="nos-hab-icon mb-3">
                      <i className={`bi ${h.icono}`} />
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: "#1e3a5f" }}>{h.tipo}</h5>
                    <p className="text-muted small mb-3" style={{ lineHeight: 1.7 }}>{h.descripcion}</p>
                    <div className="d-flex flex-wrap gap-2 mt-auto">
                      {h.amenities.map((a, j) => (
                        <span key={j} className="nos-amenity-pill">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ VALORES ═══════════════════════════════════ */}
        <section className="nos-valores-section py-5">
          <div className="container-fluid px-4">
            <div className="text-center mb-5">
              <span className="nos-section-tag mb-2 d-inline-block">Lo que nos mueve</span>
              <h2 className="nos-section-title fw-bold">Nuestros valores</h2>
            </div>
            <div className="row g-4">
              {valores.map((v, i) => (
                <div key={i} className="col-sm-6 col-lg-4">
                  <div className="nos-valor-card h-100 p-4">
                    <div className="nos-valor-icon mb-3">
                      <i className={`bi ${v.icono}`} />
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: "#1e3a5f" }}>{v.titulo}</h5>
                    <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>{v.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══ CTA ═══════════════════════════════════════ */}
        <section className="nos-cta-section py-5">
          <div className="container-fluid px-4">
            <div className="nos-cta-inner mx-auto py-5 px-4 text-center position-relative overflow-hidden">
              <div className="nos-cta-deco-1" />
              <div className="nos-cta-deco-2" />
              <div className="position-relative">
                <i className="bi bi-building nos-cta-icon mb-3 d-block" />
                <h2 className="fw-bold mb-3 text-white">¿Listo para vivir la experiencia?</h2>
                <p className="mb-4" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 480, margin: "0 auto 1.5rem" }}>
                  Reservá tu habitación y descubrí por qué miles de viajeros
                  eligen Hotel Las Rosas cada año.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="/" className="btn nos-cta-btn-primary px-4 py-2 fw-semibold">
                    <i className="bi bi-calendar-check me-2" />
                    Ver habitaciones
                  </a>
                  <a href="/contacto" className="btn nos-cta-btn-secondary px-4 py-2 fw-semibold">
                    <i className="bi bi-telephone me-2" />
                    Contactanos
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