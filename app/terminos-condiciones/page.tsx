'use client';

import { useRouter } from 'next/navigation';
import './terminos.css';

export default function TerminosPage() {
  const router = useRouter();

  return (
    <main className="terminos-container">
      <div className="terminos-content">
        {/* Botón para volver a la raíz (/) */}
        <button 
          type="button" 
          onClick={() => router.push('/')} 
          className="terminos-back-btn"
        >
          <span className="terminos-back-arrow">←</span> Volver
        </button>

        <header className="terminos-header">
          <h1 className="terminos-title">Términos y condiciones — Altaria</h1>
          <p className="terminos-subtitle">
            Bienvenido a Altaria. Al realizar una compra a través de nuestro sitio web, aceptas los siguientes términos y condiciones.
          </p>
          <p className="terminos-date">Última actualización: octubre de 2026</p>
        </header>

        <article className="terminos-body">
          <section className="terminos-section">
            <h2 className="terminos-section-title">1. Información general</h2>
            <p className="terminos-paragraph">
              Altaria es una empresa salvadoreña dedicada a la comercialización de displays con tecnología QR + NFC, diseñados para facilitar el acceso al perfil de reseñas de Google de los negocios.
            </p>
          </section>

          <section className="terminos-section">
            <h2 className="terminos-section-title">2. Pedidos y pagos</h2>
            <p className="terminos-paragraph">
              Los clientes deben proporcionar información correcta y completa para procesar sus pedidos y coordinar las entregas.
            </p>
            <p className="terminos-paragraph">
              Los pedidos estarán sujetos a la verificación de los datos proporcionados y a la confirmación del pago o del método de pago acordado.
            </p>
            <p className="terminos-paragraph">
              Los precios, las cantidades y los costos de envío se comunicarán antes de confirmar la compra. Cualquier condición especial para pedidos por cantidad será informada al cliente previamente.
            </p>
          </section>

          <section className="terminos-section">
            <h2 className="terminos-section-title">3. Cambios, devoluciones y reembolsos</h2>
            <p className="terminos-paragraph">
              Debido a la naturaleza personalizada y a las características de nuestros productos, Altaria no acepta cambios ni devoluciones por motivos como cambio de opinión, error en la selección o preferencia personal, salvo que la legislación aplicable establezca lo contrario.
            </p>
            <p className="terminos-paragraph">
              No se aceptarán reclamaciones por daños ocasionados por un uso inadecuado, golpes, manipulación incorrecta o modificaciones realizadas por el cliente.
            </p>
            <p className="terminos-paragraph">
              <strong>Defectos de fabricación:</strong> si el producto presenta un defecto de fabricación, el cliente deberá comunicarse con Altaria y proporcionar evidencia del inconveniente para su evaluación. Una vez verificado, se ofrecerá la solución que corresponda conforme a la legislación aplicable.
            </p>
            <p className="terminos-paragraph">
              Estas condiciones no limitan los derechos que la ley reconoce al consumidor, incluidos los que correspondan en casos de productos defectuosos, incumplimiento de la compra u otras situaciones legalmente previstas.
            </p>
          </section>

          <section className="terminos-section">
            <h2 className="terminos-section-title">4. Uso del producto</h2>
            <p className="terminos-paragraph">
              El cliente es responsable de proporcionar el enlace correcto del perfil de Google de su negocio cuando corresponda.
            </p>
            <p className="terminos-paragraph">
              Altaria no garantiza una posición específica en los resultados de búsqueda de Google ni un número determinado de reseñas, clientes o ventas. Los resultados dependen de diversos factores ajenos al producto.
            </p>
          </section>

          <section className="terminos-section">
            <h2 className="terminos-section-title">5. Entregas</h2>
            <p className="terminos-paragraph">
              Los pedidos se entregarán conforme a las condiciones y los plazos informados al momento de la compra. El cliente debe proporcionar una dirección correcta y un número de contacto disponible.
            </p>
          </section>

          <section className="terminos-section">
            <h2 className="terminos-section-title">6. Contacto</h2>
            <p className="terminos-paragraph">
              Para consultas, pedidos o reclamaciones, puedes comunicarte con Altaria mediante los canales de contacto publicados en nuestro sitio web.
            </p>
            <p className="terminos-paragraph">
              Altaria podrá actualizar estos términos cuando sea necesario. Las modificaciones se publicarán en esta página.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}