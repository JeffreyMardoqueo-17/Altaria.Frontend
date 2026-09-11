"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Search, Store, Wifi } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
type Business = { id: number; name: string; googleReviewUrl: string };

type Mode = "existing" | "new";

export default function ActivationPage() {
  const [serialCode, setSerialCode] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [mode, setMode] = useState<Mode>("existing");
  const [name, setName] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSerialCode(new URLSearchParams(window.location.search).get("serialCode") ?? "");
    fetch(`${API_URL}/api/public/businesses`)
      .then(async response => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<Business[]>;
      })
      .then(setBusinesses)
      .catch(() => setMessage("No se pudieron cargar los locales disponibles."));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!serialCode) {
      setMessage("El QR no contiene un código de display válido.");
      return;
    }

    const body = mode === "existing"
      ? { businessId: Number(selectedBusiness) }
      : { name, googleReviewUrl };
    const response = await fetch(`${API_URL}/api/public/displays/${encodeURIComponent(serialCode)}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      setMessage(error?.message ?? "No se pudo activar el display.");
      return;
    }

    setSuccess(true);
  }

  if (success) return <main className="public-shell"><section className="public-card success-card"><div className="public-icon success"><CheckCircle2 /></div><p className="eyebrow">DISPLAY ACTIVADO</p><h1>Todo listo para {serialCode}</h1><p className="muted">Este display ya está vinculado. El QR seguirá siendo el mismo y en los próximos escaneos mostrará el local.</p><a className="primary-button" href={`/display?serialCode=${encodeURIComponent(serialCode)}`}>Ver pantalla pública <ArrowRight size={17} /></a></section></main>;

  return <main className="public-shell"><section className="public-card"><div className="public-logo">A</div><p className="eyebrow">CONFIGURACIÓN DE DISPLAY</p><h1>Activa tu display</h1><p className="muted">Código <strong className="public-serial">{serialCode || "—"}</strong>. El QR identifica automáticamente el display; no tienes que escribir ningún ID.</p><div className="public-tabs"><button type="button" className={mode === "existing" ? "public-tab active" : "public-tab"} onClick={() => setMode("existing")}><Search size={16} /> Usar local existente</button><button type="button" className={mode === "new" ? "public-tab active" : "public-tab"} onClick={() => setMode("new")}><Store size={16} /> Registrar local</button></div><form onSubmit={submit}>{mode === "existing" ? <label>Busca y selecciona el local<select value={selectedBusiness} onChange={event => setSelectedBusiness(event.target.value)} required><option value="">Selecciona un local</option>{businesses.map(business => <option key={business.id} value={business.id}>{business.name}</option>)}</select></label> : <><label>Nombre del local<input value={name} onChange={event => setName(event.target.value)} placeholder="Pizza Hat Centro" required /></label><label>URL de Google Reviews<input type="url" value={googleReviewUrl} onChange={event => setGoogleReviewUrl(event.target.value)} placeholder="https://g.page/r/..." required /></label></>}{message && <p className="form-error">{message}</p>}<button className="primary-button" type="submit">Activar este display <ArrowRight size={17} /></button></form><div className="public-note"><Wifi size={16} /> La ruta del QR no cambia: después de activar mostrará directamente el local.</div></section></main>;
}
