import { useEffect } from "react";

export default function HotelModal({ isOpen, onClose, onConfirm, onCancel, confirmText, cancelText, children }) {


  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, padding: "28px 28px 22px",
          width: "100%", maxWidth: 400,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 14,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: "#9ca3af",
          }}
        >×</button>

        <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
          {children}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              background: "#0ea5e9", color: "#fff",
              border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <i className="bi bi-box-arrow-in-right" /> {confirmText}
          </button>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8,
              background: "#0ea5e9", color: "#fff",
              border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <i className="bi bi-person-plus" /> {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}