import { useState } from "react";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, BASE_URL } from "../Utils/Constants";
import "../styles/login.css";
import "../styles/Home.css";
import Sidebar    from "../componentes/Sidebar";
import PageFooter from "../componentes/Pagefooter";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);
  const [serverError, setServerError]   = useState("");
  const [activeNav, setActiveNav]       = useState(null);
  const [collapsed, setCollapsed]       = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email inválido.";
    }
    if (!form.password) newErrors.password = "La contraseña es obligatoria.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, contrasena: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Email o contraseña incorrectos.");
        return;
      }
      if (!data.token) {
        setServerError("No se recibió token de autenticación.");
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.usuario || {}));
      window.location.href = "/";
    } catch (err) {
      setServerError("Error de red, intentá nuevamente.");
      console.error("login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">

      <Sidebar
        activeNav={activeNav}
        onNavClick={(i) => setActiveNav(i)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className={`main-content${collapsed ? " expanded" : ""}`}>

        <div className="login-page">

          {/* ── Panel izquierdo ── */}
          <div className="login-left d-none d-md-flex flex-column align-items-center justify-content-center px-4 text-center">
            <img
              src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
              alt="Logo Hotel Las Rosas"
              className="logo object-fit-cover w-50 h-auto rounded-circle mt-3"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <h2 className="text-white fw-bold mb-1">Hotel Las Rosas</h2>
            <p className="text-white-50 text-center mb-4" style={{ lineHeight: 1.7 }}>
              Bienvenido de vuelta.<br />Tu estadía perfecta te espera.
            </p>
            <div className="d-flex flex-column align-items-center gap-3 w-100 px-2">
              <div className="d-flex align-items-center gap-3 text-white">
                <span className="login-icon-wrap"><i className="bi bi-calendar-check" /></span>
                Gestioná tus reservas fácilmente
              </div>
              <div className="d-flex align-items-center gap-3 text-white">
                <span className="login-icon-wrap"><i className="bi bi-star" /></span>
                Accedé a ofertas exclusivas
              </div>
              <div className="d-flex align-items-center gap-3 text-white">
                <span className="login-icon-wrap"><i className="bi bi-headset" /></span>
                Atención personalizada 24/7
              </div>
            </div>
          </div>

          {/* ── Panel derecho ── */}
          <div className="login-right d-flex align-items-center justify-content-center p-4">
            <div className="card border-0 shadow-sm rounded-4 login-card">
              <div className="card-body p-4 p-md-5">

               
                <div className="text-center mb-4">
                  <img
                    src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
                    alt="Logo"
                    className="login-logo-mobile rounded-circle border border-info shadow-sm d-md-none mb-3"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <h3 className="fw-bold mb-1">Iniciá sesión</h3>
                  <p className="text-muted small mb-0">Ingresá tu email y contraseña para continuar</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope text-secondary" />
                      </span>
                      <input
                        type="email" name="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="juan@email.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock text-secondary" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"} name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Tu contraseña"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                      <button type="button" className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                      </button>
                    </div>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <div className="text-end mb-4">
                    <a href="/recuperar-password" className="login-forgot small">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <button type="submit" className="btn w-100 py-2 fw-semibold login-btn" disabled={loading}>
                    {loading
                      ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Ingresando...</>
                      : <><i className="bi bi-box-arrow-in-right me-2" />Iniciar sesión</>
                    }
                  </button>

                  {/* Error servidor */}
                  {serverError && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mt-3 mb-0 py-2" role="alert">
                      <i className="bi bi-exclamation-triangle-fill" />
                      <span>{serverError}</span>
                    </div>
                  )}

                </form>

                <hr className="my-4" />

                <p className="text-center text-muted small mb-0">
                  ¿No tenés cuenta?{" "}
                  <a href="/register" className="text-decoration-none fw-semibold login-link">
                    Registrate gratis
                  </a>
                </p>

              </div>
            </div>
          </div>

        </div>

        <PageFooter />
      </div>
    </div>
  );
}