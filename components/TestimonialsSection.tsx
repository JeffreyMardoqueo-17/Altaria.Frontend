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
    name: "Beatriz \"Taty\" Menjívar",
    role: "Propietaria de Café Las Margaritas",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    comment:
      "Al principio tenía dudas de si los clientes se animarían a dejar su opinión, pero es super sencillo. Nuestra calificación ha subido muchísimo y se ve excelente en la barra.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alejandro Interiano",
    role: "Encargado en Pupusería La Bendición",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    comment:
      "Es una gran herramienta para el local. Los clientes ven el display en la caja, acercan su celular y en segundos nos dejan su reseña. Nos ha ayudado a destacar un montón en Google.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mauricio \"Chele\" Palacios",
    role: "Dueño de Car Wash Rápido y Limpio",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    comment:
      "Mientras los clientes esperan la entrega de su vehículo, aprovechan para calificar el servicio con el NFC. La cantidad de reseñas positivas aumentó desde la primera semana.",
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