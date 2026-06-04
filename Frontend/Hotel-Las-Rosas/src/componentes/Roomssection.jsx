import RoomCard from "./Roomcard";

export default function RoomsSection({
  habitaciones,
  loading,
  error,
  searched,
  checkIn,
  checkOut,
  huespedes,
  favorites,
  onToggleFav,
  onReservar,
  onClearSearch,
  sectionRef,
}) {
  return (
    <div className="rooms-section" ref={sectionRef}>

      <div className="section-header">
        <h2>
          {searched
            ? `Resultados de búsqueda (${habitaciones.length})`
            : "Habitaciones populares"}
        </h2>
        {searched ? (
          <button
            className="see-all"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onClick={onClearSearch}
          >
            <i className="bi bi-x-circle" /> Limpiar filtros
          </button>
        ) : (
          <a href="#" className="see-all">
            Ver todas <i className="bi bi-arrow-right" />
          </a>
        )}
      </div>

      {searched && (checkIn || checkOut) && (
        <div style={{
          background: "#fef9f0", border: "1px solid #fde68a", borderRadius: 10,
          padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#92400e",
          display: "flex", gap: 16, flexWrap: "wrap",
        }}>
          {checkIn && (
            <span>
              <i className="bi bi-calendar3" /> <strong>Entrada:</strong>{" "}
              {new Date(checkIn + "T00:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          )}
          {checkOut && (
            <span>
              <i className="bi bi-calendar3" /> <strong>Salida:</strong>{" "}
              {new Date(checkOut + "T00:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          )}
          <span><i className="bi bi-people" /> <strong>Huéspedes:</strong> {huespedes}</span>
        </div>
      )}

      {/* Cargando */}
      {loading && (
        <div className="rooms-loading">
          <span className="spinner"><i className="bi bi-arrow-repeat" /></span>
          <p style={{ marginTop: 12 }}>Cargando habitaciones...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rooms-error">
          <i className="bi bi-exclamation-triangle" style={{ fontSize: 24 }} />
          <p style={{ marginTop: 8 }}>{error}</p>
          <button className="detail-btn" style={{ marginTop: 12 }} onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      )}

      {/* Sin resultados */}
      {!loading && !error && habitaciones.length === 0 && (
        <div className="rooms-loading">
          <i className="bi bi-inbox" style={{ fontSize: 32, color: "#d1d5db" }} />
          <p style={{ marginTop: 8 }}>
            {searched
              ? "No se encontraron habitaciones disponibles con esos criterios."
              : "No hay habitaciones disponibles."}
          </p>
        </div>
      )}

      {/* Grilla de habitaciones */}
      {!loading && !error && habitaciones.length > 0 && (
        <div className="row g-4">
          {habitaciones.map((hab) => (
            <RoomCard
              key={hab.id ?? hab.numero}
              hab={hab}
              isFavorite={!!favorites[hab.numero]}
              onToggleFav={onToggleFav}
              onReservar={onReservar}
            />
          ))}
        </div>
      )}

    </div>
  );
}