import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Home.css";
import { BASE_URL, NAV_ITEMS, HERO_SLIDES } from "../Utils/Constants";
import Sidebar       from "../componentes/Sidebar";
import Hero          from "../componentes/Hero";
import SearchBox     from "../componentes/Searchbox";
import FeaturesStrip from "../componentes/Featuresstrip";
import RoomsSection  from "../componentes/Roomssection";
import PageFooter    from "../componentes/Pagefooter";
import HotelModal    from "../componentes/HotelModal";

export default function Home() {

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer); 
  }, []);

  const [activeNav, setActiveNav] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: null, roomName: null });
  const closeModal = () => setModal({ isOpen: false, type: null, roomName: null });

  // ── Estado de habitaciones 
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  // Carga las habitaciones
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        setLoading(true);
        setError(null);

        const [resHab, resTipos] = await Promise.all([
          fetch(`${BASE_URL}/api/habitaciones`),
          fetch(`${BASE_URL}/api/tipos-habitacion`),
        ]);

        if (!resHab.ok)   throw new Error(`Error habitaciones: ${resHab.status}`);
        if (!resTipos.ok) throw new Error(`Error tipos: ${resTipos.status}`);

        const dataHab = await resHab.json();
        const lista   = Array.isArray(dataHab) ? dataHab : dataHab.data ?? [];
        const ordenadas = lista.sort((a, b) => Number(a.numero) - Number(b.numero));
        setHabitaciones(ordenadas);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  const [checkIn,    setCheckIn]    = useState("");
  const [checkOut,   setCheckOut]   = useState("");
  const [huespedes,  setHuespedes]  = useState(1);
  const [searched,   setSearched]   = useState(false);
  const [resultados, setResultados] = useState([]);

  const roomsSectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "rooms") {
      roomsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (location.state?.scrollTo === "misReservas") {
      setModal({ isOpen: true, type: "misReservas", roomName: null });
    }
  }, [location.state]);

  const [favorites, setFavorites] = useState({});


  const handleNavClick = (index, label) => {
    setActiveNav(index);
    if (label === "Habitaciones") {
      roomsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (label === "Mis reservas") {
      setModal({ isOpen: true, type: "misReservas", roomName: null });
    }
  };

  // Búsqueda de habitaciones disponibles
  const handleSearch = () => {
    const n = Number(huespedes) || 1;

    const disponibles = habitaciones.filter((hab) => {
      const estado = (hab.estado ?? "").toLowerCase();
      if (estado.includes("ocup") || estado.includes("mant")) return false;

      const cap = Number(hab.tipoHabitacion?.maxHuespedes);
      if (!isNaN(cap) && cap > 0 && cap < n) return false;

      return true;
    });

    setResultados(disponibles);
    setSearched(true);
    roomsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearched(false);
    setCheckIn("");
    setCheckOut("");
    setHuespedes(1);
  };

  // Abrir modal de reserva
  const handleReservar = (roomName) => {
    setModal({ isOpen: true, type: "reservar", roomName });
  };

  // Marcar/desmarcar favorito
  const handleToggleFav = (numero) => {
    setFavorites((prev) => ({ ...prev, [numero]: !prev[numero] }));
  };

  const habitacionesMostradas = searched ? resultados : habitaciones;

  return (
    <>
      <HotelModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={closeModal}
        onCancel={closeModal}
        confirmText="Iniciar sesión"
        cancelText="Registrarse"
      >
        {modal.type === "misReservas" && (
          <>
            <img
              src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
              onError={(e) => { e.target.style.display = "none"; }}
              alt="Logo"
              style={{ width: 90, height: 90, objectFit: "cover", borderRadius: "50%", boxShadow: "0 4px 18px rgba(14,165,233,.25)", marginBottom: 14 }}
            />
            <h3 style={{ fontSize: 19, fontWeight: 700, color: "#1f2937", margin: "0 0 6px" }}>Hotel Las Rosas</h3>
            <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 14px" }}>¡Acceso requerido!</p>
            <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 10, padding: "14px 18px" }}>
              <i className="bi bi-bookmark-check-fill" style={{ color: "#0ea5e9", fontSize: 20 }} />
              <p style={{ margin: "8px 0 0", color: "#0c4a6e", fontSize: 14, fontWeight: 500 }}>
                Para ver tus reservas necesitás <strong>registrarte</strong> e <strong>iniciar sesión</strong> primero.
              </p>
            </div>
          </>
        )}

        {modal.type === "reservar" && (
          <>
            <img
              src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
              onError={(e) => { e.target.style.display = "none"; }}
              alt="Logo"
              style={{ width: 100, height: 100, objectFit: "fill", borderRadius: "70%", boxShadow: "0 4px 18px rgba(14,165,233,.25)", marginBottom: 14 }}
            />
            <h3 style={{ fontSize: 19, fontWeight: 700, color: "#1f2937", margin: "0 0 6px" }}>Hotel Las Rosas</h3>
            <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 14px" }}>
              Habitación: <strong style={{ color: "#0ea5e9" }}>{modal.roomName}</strong>
            </p>
            <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 10, padding: "14px 18px" }}>
              <i className="bi bi-lock-fill" style={{ color: "#0ea5e9", fontSize: 20 }} />
              <p style={{ margin: "8px 0 0", color: "#0c4a6e", fontSize: 14, fontWeight: 500 }}>
                Debés <strong>iniciar sesión</strong> o <strong>registrarte</strong> para poder realizar una reserva.
              </p>
            </div>
          </>
        )}
      </HotelModal>

      <div className="layout">

        <Sidebar 
          activeNav={activeNav} 
          onNavClick={handleNavClick}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        <div className={`main-content${collapsed ? " expanded" : ""}`}>

          <Hero heroIndex={heroIndex} onDotClick={setHeroIndex} />

          <SearchBox
            checkIn={checkIn}     setCheckIn={setCheckIn}
            checkOut={checkOut}   setCheckOut={setCheckOut}
            huespedes={huespedes} setHuespedes={setHuespedes}
            onSearch={handleSearch}
          />

          <FeaturesStrip />

          <RoomsSection
            habitaciones={habitacionesMostradas}
            loading={loading}
            error={error}
            searched={searched}
            checkIn={checkIn}
            checkOut={checkOut}
            huespedes={huespedes}
            favorites={favorites}
            onToggleFav={handleToggleFav}
            onReservar={handleReservar}
            onClearSearch={handleClearSearch}
            sectionRef={roomsSectionRef}
          />

          <PageFooter />

        </div>
      </div>
    </>
  );
}