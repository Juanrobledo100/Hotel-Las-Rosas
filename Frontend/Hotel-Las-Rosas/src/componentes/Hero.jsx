import { HERO_SLIDES } from "../Utils/Constants";

export default function Hero({ heroIndex, onDotClick }) {
  return (
    <div className="hero">

      {/* Slides*/}
      {HERO_SLIDES.map((src, i) => (
        <div
          key={i}
          className="hero-slide"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === heroIndex ? 1 : 0,
          }}
        />
      ))}

      <div className="hero-overlay-grad" />
      <div className="hero-content">
        <h1>Encuentra tu lugar ideal</h1>
        <p>Reserva en los mejores hoteles al mejor precio</p>
      </div>

      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === heroIndex ? "active" : ""}`}
            onClick={() => onDotClick(i)}
          />
        ))}
      </div>

    </div>
  );
}