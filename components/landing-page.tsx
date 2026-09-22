"use client";

import "./landing-page.css";
import { TestimonialsSection } from "./TestimonialsSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
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
const whatsappUrl = "https://wa.me/50369842090?text=" + encodeURIComponent("Hola Altaria, me gustaría realizar un pedido y conocer las opciones disponibles.");
import { AltariaLogo } from "./ui/AltariaLogo";
import React from "react";

interface AltariaLogoProps {
  className?: string;
  height?: number;
}

export function AltariaMark({ className = "", height = 28 }: AltariaLogoProps) {
  return (
    <svg
      className={`altaria-logo ${className}`}
      height={height}
      width="auto"
      viewBox="0 0 344 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ALTARIA"
      style={{ display: "block" }}
    >
      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 0 44 L 20 4 H 28 L 48 44 H 36 L 24 18 L 12 44 H 0 Z"
        fill="#4a2e21"
      />

      {/* L */}
      <path d="M 60 4 H 72 V 34 H 96 V 44 H 60 V 4 Z" fill="#4a2e21" />

      {/* T */}
      <path
        d="M 104 4 H 148 V 14 H 132 V 44 H 120 V 14 H 104 V 4 Z"
        fill="#4a2e21"
      />

      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 156 44 L 176 4 H 184 L 204 44 H 192 L 180 18 L 168 44 H 156 Z"
        fill="#4a2e21"
      />

      {/* R */}
      <path
        d="M 216 4 H 244 C 254 4 260 9 260 17 C 260 23 255 27 247 28 L 261 44 H 247 L 235 29 H 228 V 44 H 216 V 4 Z M 228 13 V 20 H 242 C 246 20 248 18 248 16.5 C 248 15 246 13 242 13 H 228 Z"
        fill="#4a2e21"
      />

      {/* I */}
      <path d="M 272 4 H 284 V 44 H 272 V 4 Z" fill="#4a2e21" />

      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 296 44 L 316 4 H 324 L 344 44 H 332 L 320 18 L 308 44 H 296 Z"
        fill="#4a2e21"
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

  // Función de scroll suave para enlaces con hash (#)
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
 <main className="landing-page alt-landing">
      <div className={`alt-nav-shell ${isScrolled ? "is-scrolled" : ""}`}>
        <header className="alt-nav">
          <Link href="/" className="alt-brand" aria-label="Altaria, inicio">
            <AltariaLogo className="alt-brand-mark" color="#4a2e21" />
            <span></span>
          </Link>

          <nav
            className={`alt-nav-links ${isMenuOpen ? "is-open" : ""}`}
            aria-label="Navegación principal"
          >
            <a
              href="#como-funciona"
              onClick={(e) => handleSmoothScroll(e, "como-funciona")}
            >
              Cómo funciona
            </a>
            <a
              href="#soluciones"
              onClick={(e) => handleSmoothScroll(e, "soluciones")}
            >
              El producto
            </a>
            <a
              href="#testimonios"
              onClick={(e) => handleSmoothScroll(e, "testimonios")}
            >
              Reseñas
            </a>
            <a
              href="/orden"
            >
              Ordenar
            </a>
          </nav>

          <div className="alt-nav-actions">
            <a
              className="alt-nav-cta"
              href="/orden"
              target="_blank"
              rel="noreferrer"
            >
              Ordenar por WhatsApp <ArrowRight size={15} />
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
        <motion.div
          className="alt-hero-copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.p variants={fadeInUp} className="alt-eyebrow">
            MÁS RESEÑAS, MÁS CLIENTES
          </motion.p>
          <motion.h1 id="hero-title" variants={fadeInUp}>
            Haz tu negocio <em>imposible</em> de olvidar.
          </motion.h1>
          <motion.p variants={fadeInUp} className="alt-hero-description">
            Convierte la satisfacción de tus clientes en valor real con exhibidores inteligentes que impulsan tu reputación digital.
          </motion.p>
          <motion.div variants={fadeInUp} className="alt-hero-actions">
            <a
              className="alt-button alt-button-dark"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ordenar por WhatsApp <ArrowRight size={17} />
            </a>
            <a
              className="alt-text-link"
              href="/orden"
              // onClick={(e) => handleSmoothScroll(e, "contacto")}
            >
              Realizar pedido <span>↓</span>
            </a>
          </motion.div>
          <motion.div variants={fadeInUp} className="alt-hero-trust">
            <span>
              <ShieldCheck size={16} /> QR único y permanente
            </span>
            <span>
              <Nfc size={16} /> Tecnología NFC integrada
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="alt-hero-art"
          aria-label="Display Altaria con QR y NFC"
          role="img"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="alt-sun" />
          <span className="alt-orbit alt-orbit-one" />
          <span className="alt-orbit alt-orbit-two" />
          <div className="alt-display-shadow" />

          {/* Display Altaria */}
          <div className="alt-display">
            <div className="alt-display-header">
              <p className="alt-display-subtitle">
                ¿Te encantó nuestro servicio?
              </p>
              <h3 className="alt-display-title">Déjanos tu reseña en</h3>

              {/* Brand Google */}
              <div className="alt-google-brand-row">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google</span>
              </div>

              <div className="alt-display-stars">★★★★★</div>
            </div>

            {/* QR Code */}
            <QrCode />

            {/* Logo Altaria Centrado */}
            <div className="alt-brand-container">
              <AltariaLogo className="logo-qr" color="#d7c5ae" />
            </div>

            {/* NFC section */}
            <div className="alt-display-footer">
              <div className="alt-nfc-icon">
                <Wifi size={14} />
                <span>NFC</span>
              </div>
              <div className="alt-nfc-text">
                <strong>ACERCA TU TELÉFONO</strong>
                <small>o escanea el código</small>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="soluciones" className="alt-section alt-solutions">
        <div className="alt-section-heading alt-reveal">
          <p className="alt-eyebrow">EL PRODUCTO</p>
          <h2>
            Una pequeña pieza.
            <br />
            <em>Una gran impresión.</em>
          </h2>
          {/* <p>
            Altaria reúne diseño premium, tecnología de aproximación y una ruta simple para que pedir una reseña sea inmediato.
          </p> */}
        </div>
        <div className="alt-solution-grid">
          <article className="alt-solution-card alt-reveal">
            <div className="alt-icon-wrap">
              <Sparkles size={22} />
            </div>
            <span className="alt-card-number">01</span>
            <h3>Diseño que habla de ti</h3>
            <p>
              Una pieza sobria y memorable que eleva la estética de cada mesa, recepción o mostrador.
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
              Integración de QR y NFC para que cada cliente elija la forma más veloz de opinar.
            </p>
            <span className="alt-card-line" />
          </article>
          <article className="alt-solution-card alt-reveal alt-reveal-delay-2">
            <div className="alt-icon-wrap">
              <Store size={22} />
            </div>
            <span className="alt-card-number">03</span>
            <h3>Conecta y crece</h3>
            <p>
              Transforma tu punto de atención en un canal activo para captar comentarios de 5 estrellas de forma constante.
            </p>
            <span className="alt-card-line" />
          </article>
        </div>
      </section>

      <section id="como-funciona" className="alt-process">
        {/* LADO IZQUIERDO: Contenido y Pasos */}
        <div className="alt-process-content">
          <div className="alt-process-intro alt-reveal">
            <p className="alt-eyebrow">ASÍ DE FÁCIL</p>
            <h2>
              De una visita a una <em>conexión.</em>
            </h2>
            <p>
              Una interacción intuitiva para tus clientes y de alto impacto para tu negocio.
            </p>
            <a
              className="alt-text-link alt-text-link-light"
              href="/orden"
              // onClick={(e) => handleSmoothScroll(e, "contacto")}
            >
              Realizar pedido <ArrowRight size={16} />
            </a>
          </div>

          <div className="alt-process-flow alt-reveal alt-reveal-delay-1">
            <div className="alt-flow-line" />
            <article>
              <span className="alt-step">01</span>
              <MousePointer2 size={21} />
              <h3>Acerca o escanea</h3>
              <p>El cliente aproxima su smartphone o apunta al código.</p>
            </article>
            <article>
              <span className="alt-step">02</span>
              <Store size={21} />
              <h3>Apertura directa</h3>
              <p>Abre de inmediato tu perfil configurado de reseñas.</p>
            </article>
            <article>
              <span className="alt-step">03</span>
              <Sparkles size={21} />
              <h3>Deja huella</h3>
              <p>Calificación completada en cuestión de segundos.</p>
            </article>
          </div>
        </div>

        {/* LADO DERECHO: Collage de Productos Elegante */}
        <div className="alt-process-media alt-reveal alt-reveal-delay-2">
          <div className="alt-collage-container">
            {/* Tarjeta / Foto Principal */}
            <div className="alt-collage-card alt-card-main">
              <img
                src="/imgs/blanca-1.jpeg"
                alt="Display Altaria Principal"
                className="alt-collage-img"
              />
            </div>

            {/* Tarjeta / Foto Secundaria (Superpuesta) */}
            <div className="alt-collage-card alt-card-secondary">
              <img
                src="/imgs/blanca-2.jpeg"
                alt="Display en entorno real"
                className="alt-collage-img"
              />
            </div>

            {/* Tarjeta Detalle / Accent */}
            <div className="alt-collage-card alt-card-tertiary">
              <img
                src="/imgs/blanca-3.jpeg"
                alt="Detalle de acabado y NFC"
                className="alt-collage-img"
              />
            </div>

            {/* Sombra de ambiente sutil para dar profundidad */}
            <div className="alt-collage-glow" />
          </div>
        </div>
      </section>

      <div id="testimonios">
        <TestimonialsSection autoPlayInterval={4000} />
      </div>

      <section id="contacto" className="alt-contact alt-reveal">
        {/* <div className="alt-contact-decor">A</div> */}
        <div>
          <p className="alt-eyebrow">ORDENAR</p>
          <h2>
            Las grandes experiencias <em>empiezan cerca.</em>
          </h2>
          <p>
            Elige la cantidad de piezas para tu local, revisa los detalles comerciales y completa tu pedido directamente.
          </p>
        </div>
        <a
          className="alt-button alt-button-cream"
          // href={whatsappUrl}
          href="/orden"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={20} /> Ordenar por WhatsApp{" "}
          <ArrowRight size={17} />
        </a>
      </section>

      <footer className="alt-footer">
        <Link href="/" className="alt-brand alt-footer-brand">
          <AltariaLogo className="alt-brand-mark" color="#4a2e21" />

          <span>
            {/* <strong>ALTARIA</strong> */}
            {/* <small>Conecta · Exhibe · Crece</small> */}
          </span>
        </Link>
        <p>© {new Date().getFullYear()} | Altaria</p>
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
