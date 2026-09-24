"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, X, Plus, Minus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import "./OrdenSection.css";

const productGallery = [
  { id: 1, url: "/imgs/especificaciones-blanca.jpeg", alt: "Display Altaria" },
  { id: 2, url: "/imgs/blanca-2.jpeg", alt: "Detalle Acabado" },
  { id: 3, url: "/imgs/blanca-3.jpeg", alt: "Uso NFC" },
  { id: 4, url: "/imgs/blanco-4.jpeg", alt: "Vista Perspectiva" },
  { id: 5, url: "/imgs/blanca-5.jpeg", alt: "Vista Perspectiva" },
  { id: 6, url: "/imgs/blanca-7.jpeg", alt: "Vista Perspectiva" },
  { id: 7, url: "/imgs/blanca-1.jpeg", alt: "Especificaciones del display" },
];

export const OrdenSection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState(productGallery[0].url);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Estado central: cantidad de displays (1 a 10)
  const [quantity, setQuantity] = useState<number>(1);

  const whatsappNumber = "50369842090";

  // Lógica de precios escalonados (tiers)
  const getUnitPrice = (qty: number) => {
    if (qty >= 5) return 19.99; // Pack Empresarial (5 a 10 pzas)
    if (qty >= 2) return 22.99; // Set Comercial (2 a 4 pzas)
    return 24.99;             // Pieza Individual (1 pza)
  };

  const unitPrice = getUnitPrice(quantity);
  const totalPrice = unitPrice * quantity;

  // Manejadores independientes o generales según el paquete seleccionado
  const handleCardClick = (targetQty: number) => {
    setQuantity(targetQty);
  };

  const handleStep = (
    e: React.MouseEvent,
    delta: number,
    min: number,
    max: number,
  ) => {
    e.stopPropagation();
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < min) return min;
      if (next > max) return max;
      return next;
    });
  };

  const handleWhatsApp = () => {
    const text = 
      `Hola Altaria, deseo realizar mi pedido. ✨%0A%0A` +
      `• *Cantidad:* ${quantity} ${quantity === 1 ? 'display' : 'displays'}%0A` +
      `• *Negocio:* %0A` +
      `• *Google:* %0A%0A` +
      `• *Teléfono:* %0A` +
      `• *Nombre:* %0A` +
      `• *Dirección de entrega (departamento/municipio):* %0A%0A` +
      `*Total:* $${totalPrice.toFixed(2)} + costo de envío según zona de entrega.%0A%0A` +
      `📍 Quedo pendiente para continuar con el pedido y coordinar la entrega.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  // Variantes de animación para Framer Motion
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section className="alt-luxury-section">
      <div className="alt-luxury-container">
        {/* NAVEGACIÓN CON ANIMACIÓN */}
        <motion.nav 
          className="alt-luxury-nav"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link href="/" className="alt-luxury-back">
            <ArrowLeft size={15} />
            <span>Inicio</span>
          </Link>
        </motion.nav>

        {/* GRID PRINCIPAL */}
        <div className="alt-luxury-grid">
          {/* GALERÍA */}
          <motion.div 
            className="alt-gallery-wrapper"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div
              className="alt-main-frame"
              onClick={() => setLightbox(selectedImg)}
            >
              <img src={selectedImg} alt="Display Altaria" />
              <button type="button" className="alt-expand-btn">
                <Maximize2 size={16} />
              </button>
            </div>

            <div className="alt-thumb-row">
              {productGallery.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`alt-thumb-frame ${selectedImg === item.url ? "is-selected" : ""}`}
                  onClick={() => setSelectedImg(item.url)}
                >
                  <img src={item.url} alt={item.alt} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* DETALLES Y SELECCIÓN */}
          <motion.div 
            className="alt-details-wrapper"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.header variants={fadeInUp} className="alt-product-header">
              <span className="alt-luxury-tag">Tecnología & Diseño</span>
              <h1 className="alt-product-title">Display Inteligente</h1>
              <p className="alt-product-desc">
                Una pieza premium creada para integrarse naturalmente en tu
                negocio. Fabricada en PVC de alta calidad, con un diseño limpio
                y elegante que combina tecnología NFC y un QR único para
                facilitar el acceso de tus clientes a tus reseñas.
              </p>

              <ul className="alt-features-bullet-list">
                <li>NFC de última generación</li>
                <li>+10 años de vida útil</li>
                <li>QR único y permanente</li>
                <li>Acrílico de alta calidad</li>
                <li>Sin mensualidades</li>
                <li>Sin membresías</li>
              </ul>
            </motion.header>

            <motion.div variants={fadeInUp} className="alt-section-divider" />

            {/* SELECTOR DE CANTIDAD Y BLOQUES */}
            <motion.div variants={fadeInUp} className="alt-selector-group">
              <span className="alt-group-label">
                Selecciona la cantidad de displays
              </span>

              <div className="alt-packages-stack">
                {/* OPCIÓN 1: 1 UNIDAD */}
                <div
                  className={`alt-interactive-qty-box mb-4 ${quantity === 1 ? "is-active-card" : ""}`}
                  onClick={() => handleCardClick(1)}
                >
                  <div className="alt-qty-info-left">
                    <div className="alt-option-title-row">
                      <span className="alt-option-title">1 unidad</span>
                    </div>
                    <span className="alt-option-units">Pieza individual</span>
                  </div>

                  <div className="alt-option-right-content">
                    {quantity === 1 && (
                      <div
                        className="alt-qty-stepper-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button type="button" className="alt-step-btn" disabled>
                          <Minus size={14} />
                        </button>
                        <span className="alt-qty-static-num">1</span>
                        <button type="button" className="alt-step-btn" disabled>
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                    <div className="alt-option-price-box">
                      <span className="alt-option-price">
                        $24.99 <small>c/u</small>
                      </span>
                      <span className="alt-shipping-note">+ envío</span>
                    </div>
                  </div>
                </div>

                {/* OPCIÓN 2: SET COMERCIAL (2 - 4 UNIDADES) */}
                <div
                  className={`alt-interactive-qty-box mb-4 ${quantity >= 2 && quantity <= 4 ? "is-active-card" : ""}`}
                  onClick={() =>
                    handleCardClick(
                      quantity >= 2 && quantity <= 4 ? quantity : 2,
                    )
                  }
                >
                  <div className="alt-qty-info-left">
                    <div className="alt-option-title-row">
                      <span className="alt-option-title">Set Comercial</span>
                      <span className="alt-mini-tag">Más vendido</span>
                    </div>
                    <span className="alt-option-units">2 a 4 unidades</span>
                  </div>

                  <div className="alt-option-right-content">
                    {quantity >= 2 && quantity <= 4 && (
                      <div
                        className="alt-qty-stepper-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="alt-step-btn"
                          onClick={(e) => handleStep(e, -1, 2, 4)}
                          disabled={quantity <= 2}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="alt-qty-static-num">{quantity}</span>
                        <button
                          type="button"
                          className="alt-step-btn"
                          onClick={(e) => handleStep(e, 1, 2, 4)}
                          disabled={quantity >= 4}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                    <div className="alt-option-price-box">
                      <span className="alt-option-price">
                        $22.99 <small>c/u</small>
                      </span>
                      <span className="alt-shipping-note">+ envío</span>
                    </div>
                  </div>
                </div>

                {/* OPCIÓN 3: PACK EMPRESARIAL (5 - 10 UNIDADES) */}
                <div
                  className={`alt-interactive-qty-box ${quantity >= 5 && quantity <= 10 ? "is-active-card" : ""}`}
                  onClick={() =>
                    handleCardClick(
                      quantity >= 5 && quantity <= 10 ? quantity : 5,
                    )
                  }
                >
                  <div className="alt-qty-info-left">
                    <div className="alt-option-title-row">
                      <span className="alt-option-title">Pack Empresarial</span>
                      <span className="alt-mini-tag alt-tag-value">
                        Mejor valor
                      </span>
                    </div>
                    <span className="alt-option-units">5 a 10 unidades</span>
                  </div>

                  <div className="alt-option-right-content">
                    {quantity >= 5 && quantity <= 10 && (
                      <div
                        className="alt-qty-stepper-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="alt-step-btn"
                          onClick={(e) => handleStep(e, -1, 5, 10)}
                          disabled={quantity <= 5}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="alt-qty-static-num">{quantity}</span>
                        <button
                          type="button"
                          className="alt-step-btn"
                          onClick={(e) => handleStep(e, 1, 5, 10)}
                          disabled={quantity >= 10}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                    <div className="alt-option-price-box">
                      <span className="alt-option-price">
                        $19.99 <small>c/u</small>
                      </span>
                      <span className="alt-shipping-note">+ envío</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="alt-bulk-notice">
                ¿Necesitas más de 10 unidades?{" "}
                <span onClick={handleWhatsApp} className="alt-bulk-link">
                  Contáctanos
                </span>{" "}
                para conocer nuestro precio especial por cantidad.
              </p>
            </motion.div>

            {/* RESUMEN Y BOTÓN PRINCIPAL */}
            <motion.div variants={fadeInUp} className="alt-action-block">
              <div className="alt-total-row">
                <div className="alt-total-left-group">
                  <span className="alt-total-label-main">TOTAL</span>
                  <span className="alt-total-subtext">
                    ({quantity} {quantity === 1 ? "unidad" : "unidades"})
                  </span>
                </div>
                <div className="alt-total-right">
                  <span className="alt-total-amount">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <div className="alt-price-meta">
                    <span className="alt-currency">USD</span>
                    <span className="alt-shipping-tag">+ envío</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="alt-luxury-cta"
                onClick={handleWhatsApp}
              >
                Solicitar por WhatsApp
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* LIGHTBOX CON ANIMACIÓN DE APARICIÓN */}
      {lightbox && (
        <motion.div 
          className="alt-lightbox-overlay" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
        >
          <motion.div
            className="alt-lightbox-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="alt-lightbox-close"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <img src={lightbox} alt="Display Altaria Ampliado" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default OrdenSection;