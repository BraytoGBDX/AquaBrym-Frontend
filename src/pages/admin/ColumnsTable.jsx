export const columnsMap = {
  Bills: [
    { header: "ID", accessor: "id" },
    { header: "Periodo", accessor: (row) => `${row.period_start} a ${row.period_end}`},
    { header: "Consumo (m³)", accessor: "consumption_m3" },
    { header: "Monto ($)", accessor: "amount_due" },
    { header: "Estado", accessor: "status" },
  ],
  Entities: [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Dirección", accessor: "address" },
    { header: "Tipo", accessor: "entity_type" },
  ],
  Sensors: [
    { header: "ID", accessor: "id" },
    { header: "Tipo", accessor: "sensor_type" },
    { header: "Modelo", accessor: "model" },
    { header: "Estado", accessor: "status" },
    { header: "Entidad", accessor: "entityId" },
    { header: "Creado", accessor: "created_at" },
    { header: "Actualizado", accessor: "updated_at" },
    { header: "Acciones", accessor: (row, { onEdit, onDelete }) => (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onEdit(row)}
            style={{
              background: "none",
              border: "none",
              color: "#2d5bff",
              cursor: "pointer",
            }}
          >Editar
          </button>
          <button
            onClick={() => onDelete(row)}
            style={{
              background: "none",
              border: "none",
              color: "#e74c3c",
              cursor: "pointer",
            }}
          >Eliminar
          </button>
        </div>
      ),
    },
  ],
  "Sensor Readings": [
    { header: "ID", accessor: "id" },
    { header: "Fecha", accessor: "timestamp" },
    { header: "Volumen (L)", accessor: "volume_liters" },
    { header: "Flujo (LPM)", accessor: "flow_rate_lpm" },
  ],
  Users: [
    { header: "ID", accessor: "id" },
    { header: "Email", accessor: "email" },
    { header: "Nombre", accessor: (row) => `${row.first_name} ${row.last_name}`},
    { header: "Rol", accessor: "role" },
  ],
  Alertas: [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "description" },
    { header: "Fecha", accessor: "timestamp" },
  ],
};
