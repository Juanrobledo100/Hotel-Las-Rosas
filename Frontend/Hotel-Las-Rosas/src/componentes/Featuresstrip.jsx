import { FEATURES } from "../Utils/Constants";

export default function FeaturesStrip() {
  return (
    <div className="features-strip">
      {FEATURES.map((f, i) => (
        <div className="feature-item" key={i}>
          <div className="feature-icon">
            <i className={`bi ${f.icon}`} />
          </div>
          <div>
            <h6>{f.title}</h6>
            <p>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}