'use client';

import { useRouter } from 'next/navigation';
import './privacidad.css';

export default function PrivacidadPage() {
  const router = useRouter();

  return (
    <main className="privacidad-container">
      <div className="privacidad-content">
        {/* Botón para volver a la raíz (/) */}
        <button 
          type="button" 
          onClick={() => router.push('/')} 
          className="privacidad-back-btn"
        >
          <span className="privacidad-back-arrow">←</span> Volver
        </button>

        <header className="privacidad-header">
          <h1 className="privacidad-title">Política de privacidad — Altaria</h1>
          <p className="privacidad-subtitle">
            En Altaria respetamos la privacidad de nuestros clientes y protegemos la información que nos proporcionan al visitar nuestro sitio web o realizar una compra.
          </p>
          <p className="privacidad-date">Última actualización: octubre de 2026</p>
        </header>

        <article className="privacidad-body">
          <section className="privacidad-section">
            <h2 className="privacidad-section-title">1. Información que recopilamos</h2>
            <p className="privacidad-paragraph">
              Podemos recopilar los siguientes datos:
            </p>
            <ul className="privacidad-list">
              <li>Nombre y número de teléfono.</li>
              <li>Dirección de entrega.</li>
              <li>Nombre del negocio y enlace a su perfil de Google.</li>
              <li>Información relacionada con pedidos, pagos y entregas.</li>
            </ul>
          </section>

          <section className="privacidad-section">
            <h2 className="privacidad-section-title">2. ¿Para qué utilizamos tus datos?</h2>
            <p className="privacidad-paragraph">
              Utilizamos tu información para procesar y entregar pedidos, coordinar pagos, configurar los displays QR + NFC, responder consultas y mejorar nuestros servicios.
            </p>
          </section>

          <section className="privacidad-section">
            <h2 className="privacidad-section-title">3. Protección de la información</h2>
            <p className="privacidad-paragraph">
              Tomamos medidas razonables para proteger tus datos personales. No vendemos la información de nuestros clientes.
            </p>
            <p className="privacidad-paragraph">
              Cuando sea necesario, compartimos los datos estrictamente necesarios con proveedores de pago, mensajería y servicios tecnológicos para gestionar nuestros pedidos y operar nuestro sitio web.
            </p>
          </section>

          <section className="privacidad-section">
            <h2 className="privacidad-section-title">4. Conservación de los datos</h2>
            <p className="privacidad-paragraph">
              Conservamos la información durante el tiempo necesario para gestionar pedidos, atender solicitudes y cumplir nuestras obligaciones legales.
            </p>
          </section>

          <section className="privacidad-section">
            <h2 className="privacidad-section-title">5. Tus derechos y contacto</h2>
            <p className="privacidad-paragraph">
              Puedes comunicarte con Altaria para consultar sobre tus datos personales o solicitar su corrección o eliminación cuando corresponda conforme a la legislación aplicable.
            </p>
            <p className="privacidad-paragraph">
              Para cualquier consulta relacionada con esta política, contáctanos a través de los canales oficiales disponibles en nuestro sitio web.
            </p>
            <p className="privacidad-paragraph">
              Altaria podrá actualizar esta política cuando sea necesario. La versión vigente estará disponible en esta página.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}