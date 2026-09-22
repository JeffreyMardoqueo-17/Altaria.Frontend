"use client";

import "./admin.css";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  Archive,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Link2,
  LogOut,
  Menu,
  PackagePlus,
  Pencil,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Store,
  Tag,
  Wifi,
  X,
  XCircle,
} from "lucide-react";

type DisplayStatus = 0 | 1 | 2;
type Business = {
  id: number;
  name: string;
  googleReviewUrl: string;
  activatedAt: string;
  updatedAt?: string;
  displayCount: number;
};
type Display = {
  id: number;
  serialCode: string;
  batchNumber?: string;
  status: DisplayStatus;
  createdAt: string;
  business?: Business | null;
};
type Batch = {
  batchNumber: string;
  displayCount: number;
  availableCount: number;
  activeCount: number;
  disabledCount: number;
  firstSerial: string;
  lastSerial: string;
};
type Page<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
type DisplaySummary = {
  total: number;
  available: number;
  active: number;
  disabled: number;
};
type AdminSection =
  | "overview"
  | "displays"
  | "businesses"
  | "batches"
  | "stock";

const statusLabels = ["Disponible", "Activo", "Desactivado"];
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; debo de descomentar  esto despues :v

const API_URL = "http://localhost:8080"
async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new Error(
      errorData.message || `Error en la petición: ${response.status}`,
    );
  }

  // Respuestas sin contenido (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json")
    ? (response.json() as Promise<T>)
    : (response as unknown as T);
}

export default function AdminClient({
  initialSession,
  initialSection,
}: {
  initialSession: boolean;
  initialSection: AdminSection;
}) {
  const [authenticated, setAuthenticated] = useState(initialSession);
  const [email, setEmail] = useState("admin@altariaa.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    try {
      // solo pasa la ruta relativa, sin el ${API_URL}
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAuthenticated(true);
    } catch {
      setLoginError("No se pudo iniciar sesión. Revisa tus credenciales.");
    }
  }

  if (!authenticated) {
    return (
      <Login
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={login}
        error={loginError}
      />
    );
  }

  return (
    <Dashboard
      initialSection={initialSection}
      onLogout={async () => {
        await api("/api/auth/logout", { method: "POST" });
        setAuthenticated(false);
      }}
    />
  );
}

function Login({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  error,
}: {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  error: string;
}) {
  return (
    <main className="login-shell">
      <section className="login-art">
        <div className="brand-mark">A</div>
        <p className="eyebrow">ALTARIA / CONTROL DE STOCK</p>
        <h1>
          Una ruta estable.
          <br />
          <em>Un local visible.</em>
        </h1>
        <p className="art-copy">
          Configura, asigna y protege cada display desde un único espacio de
          trabajo.
        </p>
        <div className="orbit">
          <Wifi size={26} />
          <span>001</span>
          <span>002</span>
          <span>003</span>
        </div>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-brand">ALTARIA</div>
          <p className="eyebrow">PORTAL ADMINISTRATIVO</p>
          <h2>Bienvenido de nuevo</h2>
          <p className="muted">Accede para gestionar tus locales y displays.</p>
          <form onSubmit={onSubmit}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-button" type="submit">
              Entrar al panel <ArrowRight size={17} />
            </button>
          </form>
          <div className="secure-note">
            <ShieldCheck size={17} /> Acceso privado para administradores
          </div>
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  onLogout,
  initialSection,
}: {
  onLogout: () => Promise<void>;
  initialSection: AdminSection;
}) {
  const [section, setSectionState] = useState<AdminSection>(initialSection);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displays, setDisplays] = useState<Page<Display>>({
    items: [],
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
  });
  const [businesses, setBusinesses] = useState<Page<Business>>({
    items: [],
    page: 1,
    pageSize: 12,
    totalItems: 0,
    totalPages: 0,
  });
  const [batches, setBatches] = useState<Page<Batch>>({
    items: [],
    page: 1,
    pageSize: 12,
    totalItems: 0,
    totalPages: 0,
  });
  const [summary, setSummary] = useState<DisplaySummary>({
    total: 0,
    available: 0,
    active: 0,
    disabled: 0,
  });
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  function setSection(nextSection: AdminSection) {
    setSectionState(nextSection);
    setIsSidebarOpen(false);
    window.history.replaceState(
      null,
      "",
      nextSection === "overview"
        ? "/administracion"
        : `/administracion?section=${nextSection}`,
    );
  }

  async function loadDisplays(page = displays.page) {
    setLoading(true);
    try {
      setDisplays(
        await api<Page<Display>>(`/api/displays?page=${page}&pageSize=20`),
      );
    } catch {
      setNotice("No se pudieron cargar los displays.");
    } finally {
      setLoading(false);
    }
  }

  async function loadBusinesses(page = businesses.page) {
    setLoading(true);
    try {
      setBusinesses(
        await api<Page<Business>>(`/api/businesses?page=${page}&pageSize=12`),
      );
    } catch {
      setNotice("No se pudieron cargar los locales.");
    } finally {
      setLoading(false);
    }
  }

  async function loadBatches(page = batches.page) {
    setLoading(true);
    try {
      setBatches(
        await api<Page<Batch>>(
          `/api/displays/batches?page=${page}&pageSize=12`,
        ),
      );
    } catch {
      setNotice("No se pudieron cargar los lotes.");
    } finally {
      setLoading(false);
    }
  }

  async function loadSummary() {
    try {
      setSummary(await api<DisplaySummary>("/api/displays/summary"));
    } catch {
      setNotice("No se pudo cargar el resumen del inventario.");
    }
  }

  // The timeout defers loading until after the initial paint and avoids blocking the responsive shell.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void Promise.all([
        loadDisplays(1),
        loadBusinesses(1),
        loadBatches(1),
        loadSummary(),
      ]);
    }, 0);
    return () => window.clearTimeout(timeoutId);
    // Data is intentionally loaded once for this dashboard session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSidebarOpen(false);
    }
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  async function reload() {
    await Promise.all([
      loadDisplays(),
      loadBusinesses(),
      loadBatches(),
      loadSummary(),
    ]);
  }

  const titles: Record<AdminSection, string> = {
    overview: "Resumen.",
    displays: "Todos tus displays.",
    businesses: "Locales y sus displays.",
    batches: "Lotes de producción.",
    stock: "Nuevo Lote",
  };
  const labels: Record<AdminSection, string> = {
    overview: "RESUMEN",
    displays: "DISPLAYS",
    businesses: "LOCALES",
    batches: "LOTES",
    stock: "FABRICAR STOCK",
  };

  return (
    <main className="app-shell admin-shell">
      <button
        className={`admin-sidebar-backdrop ${isSidebarOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Cerrar menú lateral"
        tabIndex={isSidebarOpen ? 0 : -1}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`sidebar ${isSidebarOpen ? "is-open" : ""}`}
        aria-label="Menú administrativo"
      >
        <div className="admin-sidebar-head">
          <div className="side-brand">
            <span>A</span>
            <strong>ALTARIA</strong>
          </div>
          <button
            className="admin-sidebar-close"
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>
        <div className="workspace-label">ESPACIO DE TRABAJO</div>
        <nav className="admin-navigation">
          <button
            className={section === "overview" ? "nav-item active" : "nav-item"}
            onClick={() => setSection("overview")}
          >
            <Archive size={18} /> Resumen
          </button>
          <button
            className={section === "displays" ? "nav-item active" : "nav-item"}
            onClick={() => setSection("displays")}
          >
            <Tag size={18} /> Displays
          </button>
          <button
            className={
              section === "businesses" ? "nav-item active" : "nav-item"
            }
            onClick={() => setSection("businesses")}
          >
            <Store size={18} /> Locales
          </button>
          <button
            className={section === "batches" ? "nav-item active" : "nav-item"}
            onClick={() => setSection("batches")}
          >
            <Archive size={18} /> Lotes
          </button>
          <button
            className={section === "stock" ? "nav-item active" : "nav-item"}
            onClick={() => setSection("stock")}
          >
            <PackagePlus size={18} /> Fabricar stock
          </button>
        </nav>
        <div className="side-bottom">
          <div className="admin-chip">
            <span>AD</span>
            <div>
              <strong>Administrador</strong>
              <small>admin@altariaa.com</small>
            </div>
          </div>
          <button className="logout" onClick={onLogout}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div className="admin-title-block">
            <button
              className="admin-menu-trigger"
              type="button"
              aria-label="Abrir menú"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="eyebrow">Administración/ {labels[section]}</p>
              <h1>{titles[section]}</h1>
            </div>
          </div>
          <div className="top-actions">
            <span className="live">
              <i /> Sistema operativo
            </span>
            <button
              className="icon-button"
              onClick={() => void reload()}
              title="Actualizar"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </header>
        {notice && <div className="notice">{notice}</div>}
        {loading && <div className="loading-line">Actualizando datos...</div>}
        {section === "overview" && (
          <Overview
            counts={{
              available: summary.available,
              active: summary.active,
              disabled: summary.disabled,
            }}
            totalDisplays={summary.total}
            totalBusinesses={businesses.totalItems}
            onNavigate={setSection}
          />
        )}
        {section === "displays" && (
          <DisplaysView data={displays} onPage={loadDisplays} />
        )}
        {section === "businesses" && (
          <BusinessesView
            data={businesses}
            onPage={loadBusinesses}
            onNotice={setNotice}
            onRefresh={reload}
          />
        )}
        {section === "batches" && (
          <BatchesView data={batches} onPage={loadBatches} />
        )}
        {section === "stock" && (
          <Stock
            onDone={async (message) => {
              setNotice(message);
              await reload();
            }}
          />
        )}
      </section>
    </main>
  );
}

function Overview({
  counts,
  totalDisplays,
  totalBusinesses,
  onNavigate,
}: {
  counts: { available: number; active: number; disabled: number };
  totalDisplays: number;
  totalBusinesses: number;
  onNavigate: (section: "displays" | "businesses" | "stock") => void;
}) {
  return (
    <div className="content">
      <div className="hero-line">
        <div>
          <p className="hero-stat">
            {counts.available} <span>displays disponibles en esta página</span>
          </p>
        </div>
        <button
          className="primary-button compact"
          onClick={() => onNavigate("stock")}
        >
          <PackagePlus size={17} /> Crear lote
        </button>
      </div>
      <div className="metric-grid">
        <Metric
          icon={<Tag />}
          label="Displays totales"
          value={totalDisplays}
          tone="amber"
          hint="Inventario completo"
        />
        <Metric
          icon={<Link2 />}
          label="Activos"
          value={counts.active}
          tone="green"
          hint="En funcionamiento"
        />
        <Metric
          icon={<XCircle />}
          label="Desactivados"
          value={counts.disabled}
          tone="red"
          hint="Bloqueados"
        />
        <Metric
          icon={<Store />}
          label="Locales"
          value={totalBusinesses}
          tone="blue"
          hint="Destinos registrados"
        />
      </div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">ACCESOS RÁPIDOS</p>
          <h2>Gestiona por entidad</h2>
        </div>
      </div>
      <div className="quick-grid">
        <button
          className="form-card quick-action"
          onClick={() => onNavigate("businesses")}
        >
          <Store size={22} />
          <strong>Locales y displays</strong>
          <span>
            Editar locales, revisar sus displays y cambiar estados en bloque.
          </span>
        </button>
        <button
          className="form-card quick-action"
          onClick={() => onNavigate("displays")}
        >
          <Tag size={22} />
          <strong>Inventario completo</strong>
          <span>
            Consultar todos los displays con paginación y estado actual.
          </span>
        </button>
      </div>
    </div>
  );
}

function DisplaysView({
  data,
  onPage,
}: {
  data: Page<Display>;
  onPage: (page: number) => Promise<void>;
}) {
  return (
    <div className="content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">INVENTARIO COMPLETO</p>
          <h2>{data.totalItems} displays</h2>
        </div>
        <span className="muted">{data.pageSize} por página</span>
      </div>
      <div className="table-wrap admin-responsive-table">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Lote</th>
              <th>Local</th>
              <th>Estado</th>
              <th>Ruta fija</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((display) => (
              <tr key={display.id}>
                <td data-label="Serial">
                  <strong className="serial">{display.serialCode}</strong>
                </td>
                <td data-label="Lote">{display.batchNumber ?? "—"}</td>
                <td data-label="Local">
                  {display.business?.name ?? (
                    <span className="muted">Sin asignar</span>
                  )}
                </td>
                <td data-label="Estado">
                  <Status status={display.status} />
                </td>
                <td data-label="Ruta fija">
                  <span className="route">/r/{display.serialCode}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.items.length && (
          <div className="empty">No hay displays registrados.</div>
        )}
      </div>
      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        onPage={onPage}
      />
    </div>
  );
}

function BatchesView({
  data,
  onPage,
}: {
  data: Page<Batch>;
  onPage: (page: number) => Promise<void>;
}) {
  return (
    <div className="content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PRODUCCIÓN</p>
          <h2>{data.totalItems} lotes</h2>
        </div>
        <span className="muted">Cada lote conserva sus QR permanentes</span>
      </div>
      <div className="table-wrap admin-responsive-table">
        <table>
          <thead>
            <tr>
              <th>Lote</th>
              <th>Displays</th>
              <th>Disponibles</th>
              <th>Activos</th>
              <th>Desactivados</th>
              <th>Rango</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((batch) => (
              <tr key={batch.batchNumber}>
                <td data-label="Lote">
                  <strong>{batch.batchNumber}</strong>
                </td>
                <td data-label="Displays">{batch.displayCount}</td>
                <td data-label="Disponibles">
                  <Status status={0} /> {batch.availableCount}
                </td>
                <td data-label="Activos">
                  <Status status={1} /> {batch.activeCount}
                </td>
                <td data-label="Desactivados">
                  <Status status={2} /> {batch.disabledCount}
                </td>
                <td data-label="Rango">
                  <span className="route">
                    {batch.firstSerial} - {batch.lastSerial}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.items.length && (
          <div className="empty">No hay lotes registrados.</div>
        )}
      </div>
      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        onPage={onPage}
      />
    </div>
  );
}

function BusinessesView({
  data,
  onPage,
  onNotice,
  onRefresh,
}: {
  data: Page<Business>;
  onPage: (page: number) => Promise<void>;
  onNotice: (message: string) => void;
  onRefresh: () => Promise<void>;
}) {
  const [selected, setSelected] = useState<Business | null>(null);
  return (
    <div className="content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">DESTINOS REGISTRADOS</p>
          <h2>{data.totalItems} locales</h2>
        </div>
        <span className="muted">Selecciona un local para ver sus displays</span>
      </div>
      <div className="business-grid">
        {data.items.map((business) => (
          <button
            className={
              selected?.id === business.id
                ? "business-tile selected"
                : "business-tile"
            }
            key={business.id}
            onClick={() => setSelected(business)}
          >
            <span className="business-avatar">{business.name.slice(0, 1)}</span>
            <span>
              <strong>{business.name}</strong>
              <small>{business.displayCount} displays vinculados</small>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
      {!data.items.length && (
        <div className="empty">No hay locales registrados.</div>
      )}
      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        onPage={onPage}
      />
      {selected && (
        <BusinessDetail
          business={selected}
          onClose={() => setSelected(null)}
          onNotice={onNotice}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}

function BusinessDetail({
  business,
  onClose,
  onNotice,
  onRefresh,
}: {
  business: Business;
  onClose: () => void;
  onNotice: (message: string) => void;
  onRefresh: () => Promise<void>;
}) {
  const [displays, setDisplays] = useState<Page<Display> | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [name, setName] = useState(business.name);
  const [url, setUrl] = useState(business.googleReviewUrl);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  async function load(page = 1) {
    setDisplays(
      await api<Page<Display>>(
        `/api/businesses/${business.id}/displays?page=${page}&pageSize=20`,
      ),
    );
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
      void api<Page<Batch>>("/api/displays/batches?page=1&pageSize=100").then(
        (result) => setBatches(result.items),
      );
    }, 0);
    return () => window.clearTimeout(timeoutId);
    // The selected business defines this panel instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business.id]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await api(`/api/businesses/${business.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, googleReviewUrl: url }),
      });
      setEditing(false);
      onNotice("Local actualizado correctamente.");
      await onRefresh();
    } catch {
      onNotice("No se pudo actualizar el local.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(status: DisplayStatus) {
    setBusy(true);
    try {
      const result = await api<{ updated: number }>(
        `/api/businesses/${business.id}/displays/status`,
        { method: "PATCH", body: JSON.stringify({ status }) },
      );
      onNotice(`${result.updated} displays actualizados.`);
      await load(displays?.page ?? 1);
      await onRefresh();
    } catch {
      onNotice("No se pudo actualizar el estado de los displays.");
    } finally {
      setBusy(false);
    }
  }

  async function assignBatch() {
    if (!selectedBatch) return;
    setBusy(true);
    try {
      const result = await api<{ assigned: number }>(
        `/api/admin/displays/businesses/${business.id}/assign-batch/${encodeURIComponent(selectedBatch)}`,
        { method: "POST" },
      );
      onNotice(
        `${result.assigned} displays del lote asignados a ${business.name}.`,
      );
      setSelectedBatch("");
      await load();
      await onRefresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo asignar el lote.";
      try {
        const details = JSON.parse(message);
        const blocked = Array.isArray(details.blocked)
          ? ` Bloqueados: ${details.blocked.map((item: { serialCode: string; reason: string }) => `${item.serialCode} (${item.reason})`).join(", ")}.`
          : "";
        onNotice(
          `${details.message ?? "No se pudo asignar el lote."}${blocked}`,
        );
      } catch {
        onNotice("No se pudo asignar el lote.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="detail-panel">
      <div className="detail-heading">
        <div>
          <p className="eyebrow">DETALLE DEL LOCAL</p>
          <h2>{business.name}</h2>
        </div>
        <button className="icon-button" onClick={onClose} title="Cerrar">
          <XCircle size={18} />
        </button>
      </div>
      {editing ? (
        <form className="edit-grid" onSubmit={save}>
          <label>
            Nombre
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Google Reviews
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />
          </label>
          <div className="form-foot">
            <button
              className="outline-button"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </button>
            <button className="primary-button" disabled={busy}>
              Guardar cambios
            </button>
          </div>
        </form>
      ) : (
        <div className="detail-actions">
          <span className="muted">{business.googleReviewUrl}</span>
          <button className="outline-button" onClick={() => setEditing(true)}>
            <Pencil size={16} /> Editar local
          </button>
          <button
            className="outline-button activar"
            onClick={() => void setStatus(1)}
            disabled={busy}
          >
            Activar todos
          </button>
          <button
            className="outline-button danger-button"
            onClick={() => void setStatus(2)}
            disabled={busy}
          >
            Desactivar todos
          </button>
        </div>
      )}
      <div className="batch-assign">
        <div>
          <strong>Asignar un lote completo</strong>
          <small>
            Opcional: vincula todos los displays disponibles de un lote a este
            local.
          </small>
        </div>
        <select
          value={selectedBatch}
          onChange={(event) => setSelectedBatch(event.target.value)}
        >
          <option value="">Selecciona un lote</option>
          {batches.map((batch) => (
            <option key={batch.batchNumber} value={batch.batchNumber}>
              {batch.batchNumber} · {batch.displayCount} displays ·{" "}
              {batch.availableCount} disponibles
            </option>
          ))}
        </select>
        <button
          className="primary-button"
          onClick={() => void assignBatch()}
          disabled={!selectedBatch || busy}
        >
          <Tag size={16} /> Asignar lote
        </button>
      </div>
      <div className="detail-list">
        <div className="section-heading">
          <h3>Displays vinculados</h3>
          <span className="muted">{displays?.totalItems ?? "..."}</span>
        </div>
        {displays?.items.map((display) => (
          <div className="detail-row" key={display.id}>
            <strong>{display.serialCode}</strong>
            <span>/r/{display.serialCode}</span>
            <Status status={display.status} />
          </div>
        ))}
        {displays && !displays.items.length && (
          <p className="muted">Este local no tiene displays vinculados.</p>
        )}
        <Pagination
          page={displays?.page ?? 1}
          totalPages={displays?.totalPages ?? 0}
          onPage={load}
        />
      </div>
    </section>
  );
}

function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (page: number) => Promise<void>;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button
        className="icon-button"
        disabled={page <= 1}
        onClick={() => void onPage(page - 1)}
        title="Anterior"
      >
        <ChevronLeft size={17} />
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button
        className="icon-button"
        disabled={page >= totalPages}
        onClick={() => void onPage(page + 1)}
        title="Siguiente"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  tone,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  tone: string;
  hint: string;
}) {
  return (
    <div className="metric">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
    </div>
  );
}

function Status({ status }: { status: DisplayStatus }) {
  return (
    <span className={`status status-${status}`}>
      <i />
      {statusLabels[status]}
    </span>
  );
}

function Stock({ onDone }: { onDone: (message: string) => Promise<void> }) {
  const [count, setCount] = useState("50");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api<Response>("/api/admin/displays/generate", {
        method: "POST",
        body: JSON.stringify({
          count: Number(count),
          batchNumber: batch || undefined,
        }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `altaria-qrs-lote-${batch || "nuevo"}.zip`;
      anchor.click();
      URL.revokeObjectURL(url);
      await onDone(`Lote de ${count} displays creado.`);
    } catch {
      await onDone("No se pudo generar el lote.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="content narrow">
      <div className="form-card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">NUEVO LOTE</p>
            <h2>Generar displays</h2>
          </div>
        </div>
        <form onSubmit={generate}>
          <label>
            ¿Cuántos displays necesitas?
            <input
              type="number"
              value={count}
              onChange={(event) => setCount(event.target.value)}
              min="1"
              max="5000"
              required
            />
          </label>
          <label>
            Identificador del lote
            <input
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
              placeholder="Ej. LOTE-2026-09"
              maxLength={50}
              required
            />
          </label>
          <div className="form-foot">
            <p>
              <QrCode size={16} /> El ZIP incluirá un PNG por display.
            </p>
            <button className="primary-button" disabled={loading}>
              {loading ? "Generando..." : "Generar y descargar ZIP"}{" "}
              <Download size={17} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
