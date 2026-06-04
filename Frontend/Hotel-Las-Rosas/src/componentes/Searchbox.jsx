export default function SearchBox({
  checkIn, setCheckIn,
  checkOut, setCheckOut,
  huespedes, setHuespedes,
  onSearch,
}) {
  return (
    <div className="search-box">

      {/* Fecha entrada */}
      <div className="search-field" style={{ flex: 1.2 }}>
        <label>Fecha de entrada</label>
        <div className="input-wrap">
          <i className="bi bi-calendar3" />
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setCheckIn(e.target.value);
              // Si la salida queda antes que la entrada, la limpiamos
              if (checkOut && e.target.value >= checkOut) setCheckOut("");
            }}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, width: "100%", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Fecha salida */}
      <div className="search-field" style={{ flex: 1.2 }}>
        <label>Fecha de salida</label>
        <div className="input-wrap">
          <i className="bi bi-calendar3" />
          <input
            type="date"
            value={checkOut}
            min={
              checkIn
                ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) => setCheckOut(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, width: "100%", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Huéspedes */}
      <div className="search-field">
        <label>Huéspedes</label>
        <div className="input-wrap">
          <i className="bi bi-person" />
          <input
            type="number"
            min={1} max={20}
            value={huespedes}
            onChange={(e) => setHuespedes(Math.max(1, Number(e.target.value)))}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, width: "100%", color: "#1f2937" }}
          />
        </div>
      </div>

      <button className="search-btn" onClick={onSearch}>
        <i className="bi bi-search" /> Buscar
      </button>

    </div>
  );
}