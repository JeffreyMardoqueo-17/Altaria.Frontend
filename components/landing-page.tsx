"use client";

import "./landing-page.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Menu,
  MessageCircle,
  MousePointer2,
  Nfc,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Wifi,
  X,
} from "lucide-react";

const whatsappUrl = "https://wa.me/50369842090";

function AltariaMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 56 31.8 4 59 56 40.7 40.7 31.8 22.9 20.8 44.2 5 56Z"
        fill="currentColor"
      />
      <path
        d="m14 48 18-16 17 6.5L32 45.2 14 48Z"
        fill="currentColor"
        opacity=".46"
      />
    </svg>
  );
}

function QrCode() {
  return (
    <div
      className="alt-qr-container"
      aria-label="Código QR de Altaria"
      role="img"
    >
      <img
        src="/imgs/codigo.jpeg"
        alt="Código QR Altaria"
        className="alt-qr-image"
      />
    </div>
  );
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("alt-motion-ready");
    const updateNavigation = () => setIsScrolled(window.scrollY > 18);
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });

    const elements = document.querySelectorAll<HTMLElement>(".alt-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      document.documentElement.classList.remove("alt-motion-ready");
      window.removeEventListener("scroll", updateNavigation);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="landing-page alt-landing">
      <div className={`alt-nav-shell ${isScrolled ? "is-scrolled" : ""}`}>
        <header className="alt-nav">
          <Link href="/" className="alt-brand" aria-label="Altaria, inicio">
            <AltariaMark className="alt-brand-mark" />
            <span>
              <strong>ALTARIA</strong>
            </span>
          </Link>

          <nav
            className={`alt-nav-links ${isMenuOpen ? "is-open" : ""}`}
            aria-label="Navegación principal"
          >
            <a href="#soluciones" onClick={closeMenu}>
              Soluciones
            </a>
            <a href="#como-funciona" onClick={closeMenu}>
              Cómo funciona
            </a>
            <a href="#altaria-start" onClick={closeMenu}>
              Altaria Start
            </a>
            <a href="#contacto" onClick={closeMenu}>
              Contacto
            </a>
          </nav>

          <div className="alt-nav-actions">
            <a
              className="alt-nav-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Hablemos <ArrowRight size={15} />
            </a>
            <button
              className="alt-menu-button"
              type="button"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </header>
      </div>

      <section className="alt-hero" aria-labelledby="hero-title">
        <div className="alt-hero-copy">
          <p className="alt-eyebrow alt-enter">
            PRESENCIA QUE SE QUEDA EN LA MEMORIA
          </p>
          <h1 id="hero-title" className="alt-enter alt-delay-1">
            Tu negocio, <em>imposible</em> de ignorar.
          </h1>
          <p className="alt-hero-description alt-enter alt-delay-2">
            Una presencia moderna y sofisticada que eleva la imagen de tu
            negocio y lo diferencia en cada espacio.
          </p>
          <div className="alt-hero-actions alt-enter alt-delay-3">
            <a className="alt-button alt-button-dark" href="#contacto">
              Quiero mi display <ArrowRight size={17} />
            </a>
            <a className="alt-text-link" href="#como-funciona">
              Descubre cómo funciona <span>↓</span>
            </a>
          </div>
          <div className="alt-hero-trust alt-enter alt-delay-4">
            <span>
              <ShieldCheck size={16} /> QR único y permanente
            </span>
            <span>
              <Nfc size={16} /> Tecnología NFC
            </span>
          </div>
        </div>

        <div
          className="alt-hero-art alt-enter alt-delay-2"
          aria-label="Display Altaria con QR y NFC"
          role="img"
        >
          <span className="alt-sun" />
          <span className="alt-orbit alt-orbit-one" />
          <span className="alt-orbit alt-orbit-two" />
          <div className="alt-display-shadow" />
          <div className="alt-display">
            <div className="alt-display-top">
              <AltariaMark />
              <span>ALTARIA</span>
            </div>
            <div className="alt-display-message">
              Tu experiencia
              <br />
              <em>cuenta.</em>
            </div>
            <QrCode />
            <div className="alt-display-bottom">
              <Wifi size={13} /> Acerca tu teléfono o escanea
            </div>
          </div>
          <div className="alt-float-card alt-float-card-bottom">
            <ScanLine size={16} />
            <span>
              <strong>Un solo gesto.</strong>
              <small>Una conexión real.</small>
            </span>
          </div>
        </div>
      </section>
      {/* Sección 01 - Oscura */}
      <section className="alt-brand-banner alt-brand-banner-dark alt-reveal">
        <span className="alt-banner-number">01</span>
        <div className="alt-banner-content">
          <div className="alt-banner-brand">
            <AltariaMark className="alt-banner-mark-svg" />
            <span className="alt-banner-brand-text">ALTARIA</span>
          </div>
          <div className="alt-banner-divider" />
          <div className="alt-banner-text">
            <h2>
              Donde las marcas <em>toman presencia.</em>
            </h2>
            <span className="alt-mini-line" />
          </div>
        </div>
      </section>

      {/* Sección 02 - Clara */}
      <section className="alt-brand-banner alt-brand-banner-light alt-reveal">
        <span className="alt-banner-number">02</span>
        <div className="alt-banner-content">
          <div className="alt-banner-text">
            <h2>
              Haz que tu marca sea <em>imposible de ignorar.</em>
            </h2>
            <span className="alt-mini-line" />
          </div>

          <div className="alt-banner-divider" />
          <div className="alt-banner-brand">
            <AltariaMark className="alt-banner-mark-svg" />
            <span className="alt-banner-brand-text">ALTARIA</span>
          </div>
        </div>
      </section>

      <section id="soluciones" className="alt-section alt-solutions">
        <div className="alt-section-heading alt-reveal">
          <p className="alt-eyebrow">HECHO PARA CONECTAR</p>
          <h2>
            Una pequeña pieza.
            <br />
            <em>Una gran impresión.</em>
          </h2>
          <p>
            Altaria reúne diseño, tecnología y una ruta simple para que pedir
            una reseña se sienta natural.
          </p>
        </div>
        <div className="alt-solution-grid">
          <article className="alt-solution-card alt-reveal">
            <div className="alt-icon-wrap">
              <Sparkles size={22} />
            </div>
            <span className="alt-card-number">01</span>
            <h3>Diseño que habla de ti</h3>
            <p>
              Una pieza sobria y memorable que eleva cada mesa, recepción o
              mostrador.
            </p>
            <span className="alt-card-line" />
          </article>
          <article className="alt-solution-card alt-reveal alt-reveal-delay-1">
            <div className="alt-icon-wrap">
              <Nfc size={22} />
            </div>
            <span className="alt-card-number">02</span>
            <h3>Un toque y listo</h3>
            <p>
              QR y NFC para que cada persona elija la forma más cómoda de
              conectarse.
            </p>
            <span className="alt-card-line" />
          </article>
          <article className="alt-solution-card alt-reveal alt-reveal-delay-2">
            <div className="alt-icon-wrap">
              <Store size={22} />
            </div>
            <span className="alt-card-number">03</span>
            <h3>Haz que tus clientes te encuentren y te recomienden</h3>
            <p>
              Convierte cada mesa, mostrador o punto de atención en una
              oportunidad para recibir más reseñas y conectar con tus clientes.
            </p>
            <span className="alt-card-line" />
          </article>
        </div>
      </section>

      <section id="como-funciona" className="alt-process">
        <div className="alt-process-intro alt-reveal">
          <p className="alt-eyebrow">ASÍ DE FÁCIL</p>
          <h2>
            De una visita a una <em>conexión.</em>
          </h2>
          <p>
            Una experiencia intuitiva para tus clientes y valiosa para tu
            negocio.
          </p>
          <a className="alt-text-link alt-text-link-light" href="#contacto">
            Conocer Altaria <ArrowRight size={16} />
          </a>
        </div>
        <div className="alt-process-flow alt-reveal alt-reveal-delay-1">
          <div className="alt-flow-line" />
          <article>
            <span className="alt-step">01</span>
            <MousePointer2 size={21} />
            <h3>Acerca o escanea</h3>
            <p>Tu cliente usa el QR o NFC del display.</p>
          </article>
          <article>
            <span className="alt-step">02</span>
            <Store size={21} />
            <h3>Llega a tu espacio</h3>
            <p>Una ruta única, configurada para tu local.</p>
          </article>
          <article>
            <span className="alt-step">03</span>
            <Sparkles size={21} />
            <h3>Deja huella</h3>
            <p>Una interacción sencilla que sí se recuerda.</p>
          </article>
        </div>
      </section>

      <section id="altaria-start" className="alt-section alt-start">
        <div className="alt-start-visual alt-reveal" aria-hidden="true">
          <div className="alt-start-back" />
          <div className="alt-start-card">
            <AltariaMark />
            <span>ALTARIA</span>
            <small>CONECTA · EXHIBE · CRECE</small>
            <div className="alt-start-wave" />
          </div>
          <div className="alt-start-label">
            ALTARIA
            <br />
            <em>START</em>
          </div>
        </div>
        <div className="alt-start-copy alt-reveal alt-reveal-delay-1">
          <p className="alt-eyebrow">ALTARIA START</p>
          <h2>El punto de partida de una mejor experiencia.</h2>
          <p>
            Todo lo necesario para transformar un momento cotidiano en una
            oportunidad de volver a verte.
          </p>
          <ul>
            <li>
              <Check size={17} /> Display premium listo para exhibir
            </li>
            <li>
              <Check size={17} /> QR único de acceso permanente
            </li>
            <li>
              <Check size={17} /> Tecnología NFC integrada
            </li>
            <li>
              <Check size={17} /> Configuración guiada para tu negocio
            </li>
          </ul>
          <a
            className="alt-button alt-button-dark"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Solicitar información <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section id="contacto" className="alt-contact alt-reveal">
        <div className="alt-contact-decor">A</div>
        <div>
          <p className="alt-eyebrow">HABLEMOS DE TU NEGOCIO</p>
          <h2>
            Las grandes experiencias <em>empiezan cerca.</em>
          </h2>
          <p>
            Cuéntanos qué quieres lograr y encontramos la mejor forma de
            conectar con tus clientes.
          </p>
        </div>
        <a
          className="alt-button alt-button-cream"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={20} /> Escribir por WhatsApp{" "}
          <ArrowRight size={17} />
        </a>
      </section>

      <footer className="alt-footer">
        <Link href="/" className="alt-brand alt-footer-brand">
          <AltariaMark className="alt-brand-mark" />
          <span>
            <strong>ALTARIA</strong>
            <small>Conecta · Exhibe · Crece</small>
          </span>
        </Link>
        <p>© {new Date().getFullYear()} Altaria. Diseñado para conectar.</p>
        <Link href="/administracion">
          Acceso administrativo <ArrowRight size={14} />
        </Link>
      </footer>

      <a
        className="alt-whatsapp-fab"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir a Altaria por WhatsApp"
      >
        <span className="alt-fab-tooltip">¿Hablamos?</span>
        <MessageCircle size={27} fill="currentColor" />
      </a>
    </main>
  );
}
