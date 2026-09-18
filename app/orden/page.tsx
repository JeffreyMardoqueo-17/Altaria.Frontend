"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  QrCode, 
  Wifi, 
  Ruler, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle,
  Plus,
  Minus,
  ArrowLeft,
  Store,
  X,
  Maximize2
} from "lucide-react";
import "./OrdenSection.css";

const productGallery = [
  {
    id: 1,
    url: "/imgs/ejemplo.jpeg",
    alt: "Display Altaria en mostrador",
  },
  {
    id: 2,
    url: "/imgs/masespecificaciones.jpeg",
    alt: "Detalle del material y acabado Premium",
  },
  {
    id: 3,
    url: "/imgs/especidficiaciones.jpeg",
    alt: "Cliente escaneando con NFC en mesa",
  },
  {
    id: 4,
    url: "/imgs/sola.jpeg",
    alt: "Vista en perspectiva del QR único",
  },
];

interface PricingTier {
  id: string;
  minQty: number;
  maxQty: number;
  pricePerUnit: number;
  label: string;
  subtext: string;
  badge?: string;
  isCustomShipping?: boolean;
}

const pricingTiers: PricingTier[] = [
  { 
    id: "tier-1",
    minQty: 1, 
    maxQty: 1, 
    pricePerUnit: 24.99, 
    label: "1 Unidad", 
    subtext: "+ envío",
    isCustomShipping: true 
  },
  { 
    id: "tier-2",
    minQty: 2, 
    maxQty: 4, 
    pricePerUnit: 20.99, 
    label: "2–4 Unidades", 
    subtext: "$20.99 c/u", 
    badge: "Más popular" 
  },
  { 
    id: "tier-3",
    minQty: 5, 
    maxQty: 10, 
    pricePerUnit: 18.99, 
    label: "5–10 Unidades", 
    subtext: "$18.99 c/u", 
    badge: "Mejor precio" 
  },
];

export const OrdenSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(productGallery[0].url);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[1]);
  const [quantity, setQuantity] = useState<number>(2);

  const whatsappNumber = "50369842090";

  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
    setQuantity(tier.minQty);
  };

  const calculateSubtotal = () => {
    return (quantity * selectedTier.pricePerUnit).toFixed(2);
  };

  const handleWhatsAppOrder = () => {
    const subtotal = calculateSubtotal();
    const shippingDetail = selectedTier.isCustomShipping ? " (+ envío a cotizar)" : "";
    
    const message = 
      `Hola Altaria, quisiera realizar un pedido:%0A%0A` +
      `*Producto:* Display Altaria Inteligente%0A` +
      `*Rango Seleccionado:* ${selectedTier.label}%0A` +
      `*Cantidad exacta:* ${quantity} unidad(es)%0A` +
      `*Precio unitario:* $${selectedTier.pricePerUnit} USD%0A` +
      `*Subtotal estimado:* $${subtotal} USD${shippingDetail}%0A%0A` +
      `Quedo a la espera para definir los detalles de envío y configuración.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="alt-orden-section">
      <div className="alt-orden-container">
        
        {/* BOTÓN REGRESAR A PÁGINA PRINCIPAL */}
        <div className="alt-back-navigation">
          <Link href="/" className="alt-btn-back">
            <ArrowLeft size={18} />
            <span>Volver a la página principal</span>
          </Link>
        </div>

        {/* ENCABEZADO PRINCIPAL */}
        <div className="alt-orden-header">
          {/* <span className="alt-orden-bg-text">Altaria</span> */}
          <p className="alt-eyebrow">HAZ TU PEDIDO</p>
          <h2 className="alt-title-serif">Personaliza tu orden y conecta con tus clientes</h2>
        </div>

        <div className="alt-orden-grid">
          {/* COLUMNA IZQUIERDA: GALERÍA COLLAGE */}
          <div className="alt-orden-gallery">
            <div 
              className="alt-gallery-main" 
              onClick={() => setLightboxImage(selectedImage)}
            >
              <img src={selectedImage} alt="Display Altaria Seleccionado" />
              <div className="alt-gallery-overlay">
                <Maximize2 size={24} />
                <span>Haz clic para ampliar</span>
              </div>
            </div>
            
            <div className="alt-gallery-thumbs">
              {productGallery.map((img) => (
                <button
                  key={img.id}
                  className={`alt-thumb-btn ${selectedImage === img.url ? "active" : ""}`}
                  onClick={() => setSelectedImage(img.url)}
                  type="button"
                >
                  <img src={img.url} alt={img.alt} />
                </button>
              ))}
            </div>

            <div className="alt-product-info-card">
              <h3 className="alt-title-serif">¿Qué es Altaria y cómo funciona?</h3>
              <p>
                Altaria es un acrílico inteligente de alta gama diseñado para mesas, barras o recepciones. 
                Permite a tus clientes dejar reseñas en Google o acceder a tus redes en segundos con solo 
                acercar su smartphone o escanear el código.
              </p>

              <div className="alt-features-list">
                <div className="alt-feature-item">
                  <Wifi className="alt-feature-icon" size={20} />
                  <div>
                    <strong>Tecnología NFC Instantánea</strong>
                    <p>Funciona sin necesidad de descargar aplicaciones.</p>
                  </div>
                </div>

                <div className="alt-feature-item">
                  <QrCode className="alt-feature-icon" size={20} />
                  <div>
                    <strong>Código QR Único Grabado</strong>
                    <p>Impresión de alta precisión resistente al desgaste diario.</p>
                  </div>
                </div>

                <div className="alt-feature-item">
                  <Ruler className="alt-feature-icon" size={20} />
                  <div>
                    <strong>Medidas & Material</strong>
                    <p>12cm x 15cm | Acrílico fundido Premium ultra resistente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: SELECCIÓN DE PRECIOS */}
          <div className="alt-orden-checkout">
            <div className="alt-checkout-card">
              <h3 className="alt-title-serif">Precios y Cantidades</h3>
              <p className="alt-checkout-subtitle">Selecciona el rango de unidades que necesitas para tu negocio.</p>

              {/* LISTA DE PRECIOS Y BADGES */}
              <div className="alt-tiers-list">
                {pricingTiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`alt-tier-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleTierSelect(tier)}
                    >
                      {tier.badge && <span className="alt-badge-popular">{tier.badge}</span>}
                      <div className="alt-tier-info">
                        <strong>{tier.label}</strong>
                        <span>{tier.subtext}</span>
                      </div>
                      <div className="alt-tier-radio">
                        <div className="alt-radio-inner" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONTADOR LIMITADO SEGÚN EL RANGO */}
              <div className="alt-quantity-selector">
                <span>Unidades elegidas ({selectedTier.label}):</span>
                <div className="alt-quantity-controls">
                  <button 
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(selectedTier.minQty, prev - 1))}
                    disabled={quantity <= selectedTier.minQty}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="alt-quantity-val">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => setQuantity((prev) => Math.min(selectedTier.maxQty, prev + 1))}
                    disabled={quantity >= selectedTier.maxQty}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="alt-divider" />

              <div className="alt-shipping-info">
                <div className="alt-info-row">
                  <Store size={18} className="alt-info-icon" />
                  <div>
                    <strong>Servicio Completo en el Lugar</strong>
                    <p>Configuración previa e instalación personalizada listas en tu establecimiento.</p>
                  </div>
                </div>
                <div className="alt-info-row">
                  <CreditCard size={18} className="alt-info-icon" />
                  <div>
                    <strong>Métodos de Pago</strong>
                    <p>Transferencia bancaria, depósito o efectivo en el lugar al terminar la entrega.</p>
                  </div>
                </div>
              </div>

              <div className="alt-divider" />

              <div className="alt-price-summary">
                <div className="alt-summary-row">
                  <span>Subtotal ({quantity} {quantity === 1 ? 'unidad' : 'unidades'}):</span>
                  <strong>${calculateSubtotal()} USD</strong>
                </div>
                {selectedTier.isCustomShipping && (
                  <div className="alt-summary-row shipping-note">
                    <span>Envío:</span>
                    <small>Se cotiza por WhatsApp</small>
                  </div>
                )}
                <div className="alt-summary-row total">
                  <span>Total Estimado:</span>
                  <strong>${calculateSubtotal()} USD</strong>
                </div>
              </div>

              <button 
                type="button" 
                className="alt-btn-whatsapp" 
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle size={22} />
                <span>Completar Pedido por WhatsApp</span>
              </button>

              <div className="alt-guarantee">
                <ShieldCheck size={16} />
                <span>Garantía de calidad Altaria | Configuración previa incluida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX */}
      {lightboxImage && (
        <div className="alt-lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="alt-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="alt-lightbox-close" 
              onClick={() => setLightboxImage(null)}
              type="button"
            >
              <X size={24} />
            </button>
            <img src={lightboxImage} alt="Vista ampliada Altaria" />
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdenSection;