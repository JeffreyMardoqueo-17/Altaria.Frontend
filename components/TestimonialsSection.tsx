"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "./TestimonialsSection.css";

export interface ReviewItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface TestimonialsProps {
  reviews?: ReviewItem[];
  autoPlayInterval?: number;
}
const defaultReviews: ReviewItem[] = [
  {
    id: 1,
    name: "Cliente de Pastelería",
    role: "Pastelería",
    avatar: "/imgs/testimonios/pasteleria.jpeg",
    comment:
      "Honestamente me ha funcionado bastante. A los clientes se les hace fácil dejar la reseña porque solo acercan el teléfono y ya les aparece. Antes tenía que explicarles cómo buscarnos en Google.",
    rating: 5,
  },
  {
    id: 2,
    name: "Cliente de Abogado",
    role: "Despacho Jurídico",
    avatar: "/imgs/testimonios/abogado.jpeg",
    comment:
      "Se la compré a mi papá porque tiene su despacho y la verdad le ha ayudado bastante. Ahora sus clientes pueden dejar la reseña más fácil y poco a poco ha ido teniendo más reseñas en Google.",
    rating: 5,
  },
  {
    id: 3,
    name: "Cliente de Alquiler de Vehículos",
    role: "Alquiler de Vehículos",
    avatar: "/imgs/testimonios/alquilerdevehiculos.jpeg",
    comment:
      "Me ha gustado bastante la placa, sobre todo porque es fácil de usar. En el alquiler de vehículos hay bastante competencia y las reseñas ayudan mucho cuando alguien está buscando dónde alquilar e incluso con personas de otro país.",
    rating: 5,
  },
  {
    id: 4,
    name: "Cliente de Salón de Belleza",
    role: "Salón de Belleza",
    avatar: "/imgs/testimonios/salondebellesa.jpeg",
    comment:
      "La verdad me ha servido bastante. A mis clientas les digo que si me pueden dejar una reseñita, como solo acercan el teléfono, no se les hace complicado.",
    rating: 5,
  },
  {
    id: 5,
    name: "Cliente de Pupusería",
    role: "Pupusería",
    avatar: "/imgs/testimonios/pupuseria.jpeg",
    comment:
      "Al principio pensé que iba a ser complicado para algunos clientes, pero para nada. La acercan al teléfono y listo. Ya varias personas me han dejado su reseña después de comer.",
    rating: 5,
  },
  {
    id: 6,
    name: "Cliente de Tienda de Ropa",
    role: "Tienda de Ropa",
    avatar: "/imgs/testimonios/tiendaderopa.jpeg",
    comment:
      "Me ha servido bastante. Cuando una clienta queda contenta con su compra, le digo que puede dejarme su reseña ahí mismo y la verdad varias sí lo hacen.",
    rating: 5,
  },
  {
    id: 7,
    name: "Cliente de Taquería",
    role: "Taquería",
    avatar: "/imgs/testimonios/taqueria.jpeg",
    comment:
      "Está bien práctica porque no tengo que estar explicándole a la gente cómo buscarnos en Google. Solo acercan el teléfono y dejan su reseña ahí mismo. Sí ayuda bastante.",
    rating: 5,
  },
  {
    id: 8,
    name: "Cliente de Zapatería",
    role: "Tienda de Zapatos",
    avatar: "/imgs/testimonios/zapateria.jpeg",
    comment:
      "Me ha gustado bastante tenerla en el negocio. Hay clientes que después de comprar me dicen que les gustaron los zapatos y ahí aprovecho para pedirles la reseña. La verdad sí me ha ayudado.",
    rating: 5,
  },
];

export const TestimonialsSection: React.FC<TestimonialsProps> = ({
  reviews = defaultReviews,
  autoPlayInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isHovered = useRef(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (reviews.length === 0) return;

    const timer = setInterval(() => {
      if (!isHovered.current) {
        nextSlide();
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, reviews.length, autoPlayInterval]);

  return (
    <section className="alt-testimonials-section">
      {/* Encabezado */}
      <div className="alt-testimonials-header">
        {/* <span className="alt-testimonials-bg-text">Testimonials</span> */}
        <p className="alt-eyebrow">EXPERIENCIAS REALES</p>
        <h2>Lo que dicen nuestros clientes</h2>
      </div>

      {/* Slider Carousel */}
      <div
        className="alt-slider-container"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <button
          className="alt-slider-arrow alt-arrow-left"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="alt-slider-track-wrapper">
          <div
            className="alt-slider-track"
            style={{
              transform: `translateX(calc(50% - ${currentIndex * 360 + 170}px))`,
            }}
          >
            {reviews.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={item.id}
                  className={`alt-testimonial-card ${isActive ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="alt-card-user">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="alt-user-avatar"
                    />
                    <div className="alt-user-info">
                      <h4>{item.name}</h4>
                      <p>{item.role}</p>
                    </div>
                  </div>

                  <div className="alt-card-stars">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        size={16}
                        className={
                          starIdx < item.rating ? "star-filled" : "star-empty"
                        }
                      />
                    ))}
                  </div>

                  <p className="alt-card-comment">"{item.comment}"</p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="alt-slider-arrow alt-arrow-right"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Puntos de navegación */}
      <div className="alt-slider-dots">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`alt-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a testimonio ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;