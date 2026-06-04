import { AUTH_TOKEN_KEY, BASE_URL, NAV_ITEMS } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeNav, onNavClick, collapsed, onToggleCollapse }) {
  const navigate = useNavigate();
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem(AUTH_TOKEN_KEY);

  const visibleItems = NAV_ITEMS.filter((item) => !item.authOnly || isLoggedIn);

  const handleItemClick = (item, index) => {
    onNavClick?.(index, item.label);
    if (item.label === "Inicio") {
      navigate("/");
      return;
    }
    if (item.label === "Habitaciones") {
      navigate("/", { state: { scrollTo: "rooms" } });
      return;
    }
    if (item.label === "Mis reservas") {
      navigate("/", { state: { scrollTo: "misReservas" } });
      return;
    }
    if (item.label === "Nosotros") {
      navigate("/nosotros");
      return;
    }
    if (item.label === "Contacto") {
      navigate("/contacto");
      return;
    }
    navigate("/");
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-brand">
        <img
          src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
          alt="Logo Hotel Las Rosas"
          className="logo"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="brand-text ">
          <p className="brand-title">Hotel Las Rosas</p>
          <small className="brand-sub">Descansa, disfruta, vive.</small>
        </div>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        {visibleItems.map((item, i) => (
          <button
            key={i}
            className={`nav-item-sb${activeNav === i ? " active" : ""}`}
            data-label={item.label}
            onClick={() => handleItemClick(item, i)}
          >
            <i className={`bi ${item.icon} nav-icon`} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-auth">
        <button className="login-btn" onClick={() => navigate("/login")}>
          <i className="bi bi-box-arrow-in-right" />
          <span className="auth-label">Iniciar sesión</span>
        </button>
        <button className="login-btn" onClick={() => navigate("/register")}>
          <i className="bi bi-person-plus" />
          <span className="auth-label">Registrarse</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <button
          className="collapse-btn"
          onClick={onToggleCollapse}
        >
          <i className="bi bi-chevron-left collapse-icon" />
          <span className="nav-label">Ocultar menú</span>
        </button>
      </div>
    </aside>
  );
}