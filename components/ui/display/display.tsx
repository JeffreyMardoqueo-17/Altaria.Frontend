
function DisplaysView({
  data,
  onPage,
}: {
  data: Page<Display>;
  onPage: (page: number) => Promise<void>;
}) {
  return (
    <div className="content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">INVENTARIO COMPLETO</p>
          <h2>{data.totalItems} displays</h2>
        </div>
        <span className="muted">{data.pageSize} por página</span>
      </div>
      <div className="table-wrap admin-responsive-table">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Lote</th>
              <th>Local</th>
              <th>Estado</th>
              <th>Ruta fija</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((display) => (
              <tr key={display.id}>
                <td data-label="Serial">
                  <strong className="serial">{display.serialCode}</strong>
                </td>
                <td data-label="Lote">{display.batchNumber ?? "—"}</td>
                <td data-label="Local">
                  {display.business?.name ?? (
                    <span className="muted">Sin asignar</span>
                  )}
                </td>
                <td data-label="Estado">
                  <Status status={display.status} />
                </td>
                <td data-label="Ruta fija">
                  <span className="route">/r/{display.serialCode}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.items.length && (
          <div className="empty">No hay displays registrados.</div>
        )}
      </div>
      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        onPage={onPage}
      />
    </div>
  );
}