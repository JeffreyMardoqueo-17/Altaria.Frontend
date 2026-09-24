"use client";

import "./landing-page.css";
import { TestimonialsSection } from "./TestimonialsSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  CreditCard,
  Menu,
  MessageCircle,
  MousePointer2,
  Nfc,
  QrCodeIcon,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Wifi,
  X,
} from "lucide-react";
const whatsappUrl =
  "https://wa.me/50369842090?text=" +
  encodeURIComponent(
    "Hola Altaria, me gustaría realizar un pedido y conocer las opciones disponibles.",
  );
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
    {/* Logo visible tanto en escritorio como en celular */}
    <a
      href="#hero-title"
      onClick={(e) => handleSmoothScroll(e, "hero-title")}
      className="alt-brand"
      aria-label="Altaria, inicio"
    >
      <AltariaLogo className="alt-brand-mark" color="#4a2e21" />
      <span></span>
    </a>

    {/* Menú de Enlaces */}
    <nav
      className={`alt-nav-links ${isMenuOpen ? "is-open" : ""}`}
      aria-label="Navegación principal"
    >
      <a
        href="#soluciones"
        onClick={(e) => {
          handleSmoothScroll(e, "soluciones");
          setIsMenuOpen(false);
        }}
      >
        Conoce Altaria
      </a>
      <a
        href="#como-funciona"
        onClick={(e) => {
          handleSmoothScroll(e, "como-funciona");
          setIsMenuOpen(false);
        }}
      >
        Cómo funciona
      </a>
      <a
        href="#testimonios"
        onClick={(e) => {
          handleSmoothScroll(e, "testimonios");
          setIsMenuOpen(false);
        }}
      >
        Reseñas
      </a>
      <a href="/orden" onClick={() => setIsMenuOpen(false)}>
        Realizar pedido
      </a>
    </nav>

    {/* Acciones (Botón Hamburguesa y CTA opcional) */}
    <div className="alt-nav-actions">
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
          <motion.p variants={fadeInUp} className="alt-eyebrow uppercase">
            La mejor publicidad tambien vende
          </motion.p>
          <motion.h1 id="hero-title" variants={fadeInUp}>
            Haz tu negocio <em>imposible</em> de olvidar.
          </motion.h1>
          <motion.p variants={fadeInUp} className="alt-hero-description">
            Tus clientes buscan opiniones antes de decidir dónde comprar, comer
            o pasar un buen momento.
            <br></br>
            Haz que tu negocio destaque con las opiniones de quienes ya te
            eligieron.
          </motion.p>
          <motion.div variants={fadeInUp} className="alt-hero-actions">
            <a
              className="alt-button alt-button-dark uppercase"
              href="/orden"
              target="_blank"
              rel="noreferrer"
            >
              Realizar pedido <ArrowRight size={17} />
            </a>
          </motion.div>
          <motion.div variants={fadeInUp} className="alt-features-grid">
            <div className="alt-feature-card">
              <div className="alt-feature-icon">
                <QrCodeIcon size={20} />
              </div>
              <div className="alt-feature-content">
                <h3>QR único</h3>
                <p>Exclusivo como tu negocio.</p>
              </div>
            </div>

            <div className="alt-feature-card">
              <div className="alt-feature-icon">
                <Nfc size={20} />
              </div>
              <div className="alt-feature-content">
                <h3>NFC de última generación</h3>
                <p>Acerca tu teléfono y listo.</p>
              </div>
            </div>

            <div className="alt-feature-card">
              <div className="alt-feature-icon">
                <Sparkles size={20} />
              </div>
              <div className="alt-feature-content">
                <h3>+10 años de vida útil</h3>
                <p>Tecnología diseñada para durar.</p>
              </div>
            </div>

            <div className="alt-feature-card">
              <div className="alt-feature-icon">
                <CreditCard size={20} />
              </div>
              <div className="alt-feature-content">
                <h3>Sin mensualidades</h3>
                <p>Un solo pago. Sin suscripciones.</p>
              </div>
            </div>

            <div className="alt-feature-card">
              <div className="alt-feature-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="alt-feature-content">
                <h3>Sin membresías</h3>
                <p>Tu Altaria es tuya para siempre.</p>
              </div>
            </div>
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

          {/* Imagen real de la tarjeta de Altaria */}
          <div className="alt-display-container">
            <img
              src="/imgs/display.png"
              alt="Tarjeta Altaria QR y NFC"
              className="alt-card-image"
            />
          </div>
        </motion.div>
      </section>

      <section id="soluciones" className="alt-section alt-solutions">
        <div className="alt-section-heading alt-reveal">
          {/* <p className="alt-eyebrow">ALTARIA</p> */}
          <h2>
            Una pequeña pieza.
            <br />
            <em>Una gran diferencia.</em>
          </h2>
          {/* <p>
            Altaria reúne diseño premium, tecnología de aproximación y una ruta simple para que pedir una reseña sea inmediato.
          </p> */}
        </div>
        <div className="alt-solution-grid">
          {/* Tarjeta 01 */}
          <article className="alt-solution-card alt-reveal">
            <div className="alt-icon-wrap">
              <Sparkles size={22} />
            </div>
            <span className="alt-card-number">01</span>
            <h3>Diseño que representa tu negocio</h3>
            <p>
              Una pieza elegante y discreta que puedes colocar en mesas,
              recepciones, mostradores o cualquier punto de atención.
            </p>
            <p className="alt-card-subtext">
              Altaria está pensada para integrarse con el estilo de tu negocio y
              formar parte de la experiencia de tus clientes.
            </p>
            <span className="alt-card-line" />
          </article>

          {/* Tarjeta 02 */}
          <article className="alt-solution-card alt-reveal alt-reveal-delay-1">
            <div className="alt-icon-wrap">
              <Nfc size={22} />
            </div>
            <span className="alt-card-number">02</span>
            <h3>Un toque y listo</h3>
            <p>Tu cliente puede acercar su teléfono al NFC o escanear el QR.</p>
            <p className="alt-card-subtext">
              En segundos llegará al enlace de tu negocio para recibir sus
              opiniones. Sin aplicaciones y sin procesos complicados.
            </p>
            <span className="alt-card-line" />
          </article>

          {/* Tarjeta 03 */}
          <article className="alt-solution-card alt-reveal alt-reveal-delay-2">
            <div className="alt-icon-wrap">
              <Store size={22} />
            </div>
            <span className="alt-card-number">03</span>
            <h3>Conecta y crece</h3>
            <p>Haz que pedir una opinión sea parte natural de la atención.</p>
            <p className="alt-card-subtext">
              Facilita que tus clientes satisfechos compartan su experiencia y
              ayuda a que tu negocio reciba más reseñas de forma sencilla y
              constante.
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
              Una interacción intuitiva para tus clientes y de alto impacto para
              tu negocio.
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
              <p>
                Tu cliente acerca su teléfono a Altaria o escanea el código QR.
              </p>
            </article>

            <article>
              <span className="alt-step">02</span>
              <Store size={21} />
              <h3>Acceso directo</h3>
              <p>
                Se abre automáticamente el enlace que configuramos de reseñas
                para tu negocio.
              </p>
            </article>

            <article>
              <span className="alt-step">03</span>
              <Sparkles size={21} />
              <h3>Deja tu reseña</h3>
              <p>
                En segundos, tu cliente puede calificar y compartir su
                experiencia. Más reseñas, más confianza y mayor visibilidad para
                tu negocio en Google.
              </p>
            </article>
          </div>
        </div>

        {/* LADO DERECHO: Collage de Productos Elegante */}
        <div className="alt-process-media alt-reveal alt-reveal-delay-2">
          <div className="alt-collage-container">
            {/* Tarjeta / Foto Principal */}
            <div className="alt-collage-card alt-card-main">
              <img
                src="/imgs/blanco-4.jpeg"
                alt="Display Altaria Principal"
                className="alt-collage-img"
              />
            </div>

            {/* Tarjeta / Foto Secundaria (Superpuesta) */}
            <div className="alt-collage-card alt-card-secondary">
              <img
                src="/imgs/blanca-3.jpeg"
                alt="Display en entorno real"
                className="alt-collage-img"
              />
            </div>

            {/* Tarjeta Detalle / Accent */}
            <div className="alt-collage-card alt-card-tertiary">
              <img
                src="/imgs/blanca-2.jpeg"
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
        {/* Columna Izquierda: Imagen grande de especificaciones */}
        <div className="alt-contact-image-wrapper">
          <img
            src="/imgs/especificaciones-blanca.jpeg"
            alt="Especificaciones del producto"
            className="alt-contact-img"
          />
        </div>

        {/* Columna Derecha: Contenido de texto y botón con cambios solicitados */}
        <div className="alt-contact-content">
          <div>
            <p className="alt-eyebrow">ORDENAR</p>
            <h2>
              Las buenas experiencias <em>merecen ser compartidas.</em>
            </h2>
            <p>
              Selecciona la cantidad de displays que necesita tu negocio y descubre cómo llevar más experiencias de tus clientes a Google.
            </p>
          </div>
          <a
            className="alt-button alt-button-cream"
            // href={whatsappUrl}
            href="/orden"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} /> Realizar pedido{" "}
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <footer className="alt-footer">
        {/* También puedes aplicar el scroll suave en el footer si gustas */}
        <a
          href="#hero-title"
          onClick={(e) => handleSmoothScroll(e, "hero-title")}
          className="alt-brand alt-footer-brand"
        >
          <AltariaLogo className="alt-brand-mark" color="#4a2e21" />

          <span>
            {/* <strong>ALTARIA</strong> */}
            {/* <small>Conecta · Exhibe · Crece</small> */}
          </span>
        </a>
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