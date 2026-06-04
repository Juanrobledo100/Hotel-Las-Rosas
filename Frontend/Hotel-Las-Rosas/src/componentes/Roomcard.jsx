import { IMAGENES_HABITACION } from "../Utils/Constants";

function getEstadoClass(estado) {
  if (!estado) return "estado-disponible";
  const e = estado.toLowerCase();
  if (e.includes("ocup")) return "estado-ocupada";
  if (e.includes("mant")) return "estado-mantenimiento";
  return "estado-disponible";
}

function getEstadoLabel(estado) {
  if (!estado) return "Disponible";
  const e = estado.toLowerCase();
  if (e.includes("ocup")) return "Ocupada";
  if (e.includes("mant")) return "Mantenimiento";
  return "Disponible";
}

export default function RoomCard({ hab, isFavorite, onToggleFav, onReservar }) {
  const tipo   = hab.tipoHabitacion ?? {};
  const nombre = tipo.nombre ?? "Habitación";
  const imagen = IMAGENES_HABITACION[nombre] ?? null;
  const precio = tipo.precioBase ?? "—";
  const maxHuespedes = tipo.maxHuespedes ?? "—";
  const descripcion  = tipo.descripcion ?? "";

  return (
    <div className="col-md-4">
      <div className="room-card">

        {/* Imagen */}
        <div className="room-img-wrap">
          {imagen ? (
            <img
              src={imagen}
              alt={nombre}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.querySelector(".room-img-placeholder").style.display = "flex";
              }}
            />
          ) : null}
          <div className="room-img-placeholder" style={{ display: imagen ? "none" : "flex" }}>
            <i className="bi bi-image" />
          </div>

          <span className="room-badge">N° {hab.numero}</span>
          <span className={`estado-badge ${getEstadoClass(hab.estado)}`}>
            {getEstadoLabel(hab.estado)}
          </span>
          <button
            className="heart-btn"
            style={{ color: isFavorite ? "#ef4444" : "#9ca3af" }}
            onClick={() => onToggleFav(hab.numero)}
          >
            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`} />
          </button>
        </div>

        {/* Info */}
        <div className="room-body">
          <h5>{nombre}</h5>
          <p className="room-numero">
            <i className="bi bi-building" /> Piso {hab.piso ?? "—"} &nbsp;·&nbsp; Hab. {hab.numero}
          </p>
          {maxHuespedes !== "—" && (
            <div className="room-meta">
              <span><i className="bi bi-people" /> Máx. {maxHuespedes} huéspedes</span>
            </div>
          )}
          {descripcion && <p className="room-desc">{descripcion}</p>}

          <div className="room-footer-row">
            <div>
              <span className="price">
                {precio !== "—" ? `$${Number(precio).toLocaleString("es-AR")}` : "—"}
              </span>
              {precio !== "—" && <span className="per-night"> / noche</span>}
            </div>
            <button className="detail-btn" onClick={() => onReservar(nombre)}>
              <i className="bi bi-calendar-plus me-1" />
              Reservar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}