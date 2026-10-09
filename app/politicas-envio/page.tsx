'use client';

import { useRouter } from 'next/navigation';
import './politicas-envio.css';

export default function PoliticasEnvioPage() {
  const router = useRouter();

  return (
    <main className="envio-container">
      <div className="envio-content">
        {/* Botón para volver a la raíz (/) */}
        <button 
          type="button" 
          onClick={() => router.push('/')} 
          className="envio-back-btn"
        >
          <span className="envio-back-arrow">←</span> Volver
        </button>

        <header className="envio-header">
          <h1 className="envio-title">Política de envíos — Altaria</h1>
          <p className="envio-subtitle">
            En Altaria trabajamos para que tu pedido llegue de forma segura y oportuna a tu negocio.
          </p>
          <p className="envio-date">Última actualización: octubre de 2026</p>
        </header>

        <article className="envio-body">
          <section className="envio-section">
            <h2 className="envio-section-title">1. Cobertura</h2>
            <p className="envio-paragraph">
              Realizamos envíos dentro de El Salvador, sujetos a la cobertura y disponibilidad del servicio de entrega en cada zona.
            </p>
          </section>

          <section className="envio-section">
            <h2 className="envio-section-title">2. Tiempo de entrega</h2>
            <p className="envio-paragraph">
              El tiempo estimado de entrega es de 24 a 48 horas hábiles, sujeto a la ubicación del destinatario, la disponibilidad del servicio de transporte y la confirmación del pedido.
            </p>
            <p className="envio-paragraph">
              Los pedidos realizados en fines de semana, días festivos o fuera del horario de procesamiento podrán gestionarse el siguiente día hábil.
            </p>
            <p className="envio-paragraph">
              En zonas de difícil acceso o ante circunstancias extraordinarias, el plazo podría extenderse. En estos casos, se informará al cliente cuando sea posible.
            </p>
          </section>

          <section className="envio-section">
            <h2 className="envio-section-title">3. Costo de envío</h2>
            <p className="envio-paragraph">
              El costo de envío depende de la zona de entrega y se comunicará al cliente antes de confirmar su pedido.
            </p>
            <p className="envio-paragraph">
              Las promociones de envío gratuito, cuando existan, estarán sujetas a las condiciones indicadas en la oferta correspondiente.
            </p>
          </section>

          <section className="envio-section">
            <h2 className="envio-section-title">4. Datos de entrega</h2>
            <p className="envio-paragraph">
              El cliente debe proporcionar correctamente su nombre, número de teléfono, departamento, municipio y dirección de entrega.
            </p>
            <p className="envio-paragraph">
              Si los datos son incorrectos o el destinatario no está disponible, la entrega podría retrasarse o requerir una nueva coordinación, cuyos costos adicionales se comunicarán previamente.
            </p>
          </section>

          <section className="envio-section">
            <h2 className="envio-section-title">5. Recepción del pedido</h2>
            <p className="envio-paragraph">
              Al recibir el producto, recomendamos verificar que el empaque y el display se encuentren en buenas condiciones.
            </p>
            <p className="envio-paragraph">
              Si el pedido presenta daños visibles o un defecto de fabricación, comunícate con Altaria lo antes posible y comparte fotografías o videos que permitan evaluar el caso.
            </p>
            <p className="envio-paragraph">
              La revisión del producto no limita los derechos que correspondan al cliente conforme a la legislación aplicable.
            </p>
          </section>

          <section className="envio-section">
            <h2 className="envio-section-title">6. Seguimiento y consultas</h2>
            <p className="envio-paragraph">
              Para consultar el estado de tu pedido o coordinar una entrega, puedes comunicarte con nuestro equipo mediante los canales oficiales de Altaria.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}