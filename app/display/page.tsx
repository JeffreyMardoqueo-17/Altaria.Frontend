"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  Store,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.altariaa.com";
type Display = {
  serialCode: string;
  status: 0 | 1 | 2;
  business?: { name: string; googleReviewUrl: string } | null;
};

export default function PublicDisplayPage({
  initialSerialCode = "",
}: {
  initialSerialCode?: string;
}) {
  const [display, setDisplay] = useState<Display | null>(null);
  const [serialCode, setSerialCode] = useState(initialSerialCode);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!initialSerialCode)
      setSerialCode(
        new URLSearchParams(window.location.search).get("serialCode") ?? "",
      );
  }, [initialSerialCode]);
  useEffect(() => {
    if (!serialCode) return;
    fetch(`${API_URL}/api/displays/${encodeURIComponent(serialCode)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(setDisplay)
      .catch(() => setError("No encontramos este display."));
  }, [serialCode]);
  if (error)
    return (
      <main className="public-shell">
        <section className="public-card">
          <div className="public-icon error">
            <CircleAlert />
          </div>
          <p className="eyebrow">RUTA NO DISPONIBLE</p>
          <h1>Display no encontrado</h1>
          <p className="muted">
            Comprueba el código del enlace e inténtalo de nuevo.
          </p>
        </section>
      </main>
    );
  if (!display)
    return (
      <main className="public-shell">
        <section className="public-card loading-card">
          <LoaderCircle className="spin" />
          <p>Cargando información...</p>
        </section>
      </main>
    );
  if (display.status === 0)
    return (
      <main className="public-shell">
        <section className="public-card">
          <div className="public-icon">
            <Store />
          </div>
          <p className="eyebrow">DISPLAY {display.serialCode}</p>
          <h1>Este display todavía no está activado</h1>
          <p className="muted">
            Configura el local para que tus clientes puedan encontrarlo y dejar
            una reseña.
          </p>
          <a
            className="primary-button"
            href={`/activacion?serialCode=${encodeURIComponent(serialCode)}`}
          >
            Configurar display <ArrowRight size={17} />
          </a>
        </section>
      </main>
    );
  if (display.status === 2)
    return (
      <main className="public-shell">
        <section className="public-card">
          <div className="public-icon error">
            <CircleAlert />
          </div>
          <p className="eyebrow">DISPLAY {display.serialCode}</p>
          <h1>Este display está desactivado</h1>
          <p className="muted">Contacta con el administrador del sistema.</p>
        </section>
      </main>
    );
  return (
    <main className="public-shell">
      <section className="public-card active-display">
        <div className="public-icon success">
          <CheckCircle2 />
        </div>
        <p className="eyebrow">BIENVENIDO</p>
        <h1>{display.business?.name}</h1>
        <p className="muted">
          Gracias por visitarnos. Tu opinión nos ayuda a seguir mejorando.
        </p>
        <a
          className="primary-button"
          href={display.business?.googleReviewUrl}
          target="_blank"
          rel="noreferrer"
        >
          Dejar una reseña en Google <ArrowRight size={17} />
        </a>
      </section>
    </main>
  );
}
