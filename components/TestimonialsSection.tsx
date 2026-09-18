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
    name: "Carlos Mendoza",
    role: "Dueño de Café Don Pedro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    comment:
      "Aumentamos más del 40% de reseñas en Google en el primer mes. Es increíble lo fluido que es para los clientes.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dra. Elena Ramos",
    role: "Directora en Clínica Sonrisas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    comment:
      "El diseño es elegante para nuestra recepción y la velocidad del NFC hace que los clientes lo usen sin dudar.",
    rating: 5,
  },
  {
    id: 3,
    name: "John Doe",
    role: "Fundador & Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    comment:
      "Una solución rápida y estética que elevó la credibilidad de nuestro local en un par de días.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sofía Martínez",
    role: "Gerente en Boutique Le Style",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    comment:
      "La mejor inversión en punto de venta. Pasamos de pedir reseñas a recibirlas de forma natural.",
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