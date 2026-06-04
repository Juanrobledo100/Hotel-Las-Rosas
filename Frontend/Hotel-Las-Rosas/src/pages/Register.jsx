import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/Constants";
import "../styles/register.css";
import "../styles/Home.css";
import Sidebar    from "../componentes/Sidebar";
import PageFooter from "../componentes/Pagefooter";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [errors, setErrors]             = useState({});
  const [activeNav, setActiveNav]       = useState(null);
  const [collapsed, setCollapsed]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim())   newErrors.nombre    = "El nombre es obligatorio.";
    if (!form.apellido.trim()) newErrors.apellido  = "El apellido es obligatorio.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email inválido.";
    }
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (!passRegex.test(form.password)) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número.";
    }
    if (form.password !== form.confirmar)
      newErrors.confirmar = "Las contraseñas no coinciden.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        contrasena: form.password
      };

      const res = await fetch(`${BASE_URL}/api/usuarios/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || 'Error en el registro');
        setLoading(false);
        return;
      }

      window.location.href = '/login';
    } catch (err) {
      setServerError('Error de red, intenta nuevamente');
      console.error('register error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (index, label) => {
    setActiveNav(index);
  };

  return (
    <div className="layout">

      <Sidebar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className={`main-content${collapsed ? " expanded" : ""}`}>

        <div className="register-page">

          {/* ── Panel izquierdo ── */}
          <div className="register-left">
            <div className="register-left-content text-center px-4">
              <img
                src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
                alt="Logo Hotel Las Rosas"
                className="register-left-logo mb-4"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <h2 className="register-left-title mb-3">Hotel Las Rosas</h2>
              <p className="register-left-subtitle mb-4">
                Descansa, disfruta, vive.<br />Tu estadía perfecta te espera.
              </p>
              <div className="register-left-features">
                <div className="register-left-feature">
                  <span className="icon-wrap"><i className="bi bi-shield-check" /></span>
                  Reservas 100% seguras
                </div>
                <div className="register-left-feature">
                  <span className="icon-wrap"><i className="bi bi-tag" /></span>
                  Ofertas exclusivas para miembros
                </div>
                <div className="register-left-feature">
                  <span className="icon-wrap"><i className="bi bi-headset" /></span>
                  Atención 24/7
                </div>
              </div>
            </div>
          </div>

          {/* ── Panel derecho (formulario) ── */}
          <div className="register-right">
            <div className="register-card">

              <div className="text-center mb-4">
                <img
                  src={`${BASE_URL}/uploads/Logo-Las-Rosas.png`}
                  alt="Logo"
                  className="register-logo-mobile"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <h3 className="register-form-title">Crear cuenta</h3>
                <p className="register-form-subtitle">Completá tus datos para registrarte</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label">Nombre</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person" /></span>
                      <input
                        type="text" name="nombre"
                        className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                        placeholder="Juan"
                        value={form.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && <div className="invalid-feedback d-block">{errors.nombre}</div>}
                  </div>
                  <div className="col-6">
                    <label className="form-label">Apellido</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person" /></span>
                      <input
                        type="text" name="apellido"
                        className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
                        placeholder="Pérez"
                        value={form.apellido}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.apellido && <div className="invalid-feedback d-block">{errors.apellido}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope" /></span>
                    <input
                      type="email" name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="juan@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Teléfono <span className="text-muted">(opcional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-telephone" /></span>
                    <input
                      type="tel" name="telefono"
                      className="form-control"
                      placeholder="+54 11 1234-5678"
                      value={form.telefono}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock" /></span>
                    <input
                      type={showPassword ? "text" : "password"} name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Mínimo 8 caracteres"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button type="button" className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}>
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirmar contraseña</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill" /></span>
                    <input
                      type={showConfirmar ? "text" : "password"} name="confirmar"
                      className={`form-control ${errors.confirmar ? "is-invalid" : ""}`}
                      placeholder="Repetí tu contraseña"
                      value={form.confirmar}
                      onChange={handleChange}
                    />
                    <button type="button" className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmar(!showConfirmar)}>
                      <i className={`bi ${showConfirmar ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  {errors.confirmar && <div className="invalid-feedback d-block">{errors.confirmar}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 register-btn" disabled={loading}>
                  {loading ? 'Registrando...' : 'Crear cuenta'}
                </button>

                {serverError && (
                  <div className="alert alert-danger mt-3" role="alert">{serverError}</div>
                )}
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                ¿Ya tenés cuenta?{" "}
                <a href="/login" className="text-decoration-none register-link">
                  Iniciá sesión
                </a>
              </p>

            </div>
          </div>

        </div>

        <PageFooter />

      </div>
    </div>
  );
}