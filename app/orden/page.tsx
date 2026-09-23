"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, X, Check } from "lucide-react";
import "./OrdenSection.css";

const productGallery = [
  { id: 1, url: "/imgs/blanca-1.jpeg", alt: "Display Altaria" },
  { id: 2, url: "/imgs/blanca-2.jpeg", alt: "Detalle Acabado" },
  { id: 3, url: "/imgs/blanca-3.jpeg", alt: "Uso NFC" },
  { id: 4, url: "/imgs/blanco-4.jpeg", alt: "Vista Perspectiva" },
  { id: 5, url: "/imgs/blanca-5.jpeg", alt: "Vista Perspectiva" },
  { id: 6, url: "/imgs/blanca-7.jpeg", alt: "Vista Perspectiva" },
{id: 7, url: "/imgs/especificaciones-blanca.jpeg", alt: "Especificaciones del display"}

];

interface Option {
  id: string;
  title: string;
  units: string;
  price: string;
  detail: string;
  tag?: string;
  rawPrice: number;
}

const options: Option[] = [
  {
    id: "opt-1",
    title: "Pieza Individual",
    units: "1 Unidad",
    price: "$24.99",
    detail: "+ Envío a cotizar",
    rawPrice: 24.99,
  },
  {
    id: "opt-2",
    title: "Set Comercial",
    units: "3 Unidades",
    price: "$62.97",
    detail: "$20.99 c/u",
    tag: "Recomendado",
    rawPrice: 62.97,
  },
  {
    id: "opt-3",
    title: "Colección Completa",
    units: "5 Unidades",
    price: "$94.95",
    detail: "$18.99 c/u",
    tag: "Exclusivo",
    rawPrice: 94.95,
  },
];

export const OrdenSection: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState(productGallery[0].url);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option>(options[1]);

  const whatsappNumber = "50369842090";

  const handleWhatsApp = () => {
    const text = 
      `Hola Altaria, deseo realizar un pedido:%0A%0A` +
      `• *Opción:* ${selectedOption.title} (${selectedOption.units})%0A` +
      `• *Total:* ${selectedOption.price} USD%0A%0A` +
      `Quedo a la espera para coordinar la entrega.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="alt-luxury-section">
      <div className="alt-luxury-container">
        
        {/* NAVEGACIÓN MINIMALISTA */}
        <nav className="alt-luxury-nav">
          <Link href="/" className="alt-luxury-back">
            <ArrowLeft size={15} />
            <span>Inicio</span>
          </Link>
          {/* <span className="alt-brand-subtle">ALTARIA</span> */}
        </nav>

        {/* ESTRUCTURA PRINCIPAL */}
        <div className="alt-luxury-grid">
          
          {/* GALERÍA EDITORIAL */}
          <div className="alt-gallery-wrapper">
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
          </div>

          {/* DETALLES Y SELECCIÓN DE ADQUISICIÓN */}
          <div className="alt-details-wrapper">
            
            <header className="alt-product-header">
              <span className="alt-luxury-tag">TECNOLOGÍA & DISEÑO</span>
              <h1 className="alt-product-title">Display Inteligente</h1>
              <p className="alt-product-desc">
                Acrílico fundido de alta densidad con chip NFC integrado y grabado QR permanente.
                Diseñado para elevar la presencia de tu marca.
              </p>
            </header>

            <div className="alt-section-divider" />

            {/* SELECCIÓN DE OFERTAS */}
            <div className="alt-selector-group">
              <span className="alt-group-label">SELECCIONA TU CONFIGURACIÓN</span>
              
              <div className="alt-options-stack">
                {options.map((opt) => {
                  const isSelected = selectedOption.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`alt-option-card ${isSelected ? "is-active" : ""}`}
                      onClick={() => setSelectedOption(opt)}
                    >
                      <div className="alt-option-left">
                        <div className="alt-radio-check">
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="alt-option-title-row">
                            <span className="alt-option-title">{opt.title}</span>
                            {opt.tag && <span className="alt-mini-tag">{opt.tag}</span>}
                          </div>
                          <span className="alt-option-units">{opt.units} — {opt.detail}</span>
                        </div>
                      </div>

                      <div className="alt-option-price">
                        {opt.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RESUMEN Y ACCIÓN */}
            <div className="alt-action-block">
              <div className="alt-total-row">
                <span>Inversión estimada</span>
                <span className="alt-total-amount">{selectedOption.price} <small>USD</small></span>
              </div>

              <button 
                type="button" 
                className="alt-luxury-cta" 
                onClick={handleWhatsApp}
              >
                Solicitar por WhatsApp
              </button>

              <p className="alt-foot-note">
                Incluye pre-configuración de tu enlace de destino e instalación guiada.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="alt-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="alt-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="alt-lightbox-close" onClick={() => setLightbox(null)}>
              <X size={18} />
            </button>
            <img src={lightbox} alt="Display Altaria Ampliado" />
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdenSection;