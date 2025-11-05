export const columnsMap = {
  Bills: [
    { header: 'ID', accessor: 'id' },
    { header: 'Periodo', accessor: row => `${row.period_start} a ${row.period_end}` },
    { header: 'Consumo (m³)', accessor: 'consumption_m3' },
    { header: 'Tarifa por m³', accessor: 'rate_per_m3' },
    { header: 'Cargo fijo', accessor: 'fixed_charge' },
    { header: 'Monto ($)', accessor: 'amount_due' },
    { header: 'Emitido', accessor: 'issued_at' },
    { header: 'Vence', accessor: 'due_date' },
    { header: 'Estado', accessor: 'status' },
    { header: 'Entidad ID', accessor: 'entityId' },
    { header: 'Creado', accessor: 'created_at' },
    { header: 'Actualizado', accessor: 'updated_at' }
  ],
  Entities: [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Dirección", accessor: "address" },
    { header: "Tipo", accessor: "entity_type" },
    { header: 'Creado', accessor: 'created_at' },
    { header: 'Actualizado', accessor: 'updated_at' }
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
    { header: 'ID', accessor: 'id' },
    { header: 'Fecha', accessor: 'timestamp' },
    { header: 'Pulsos', accessor: 'pulses' },
    { header: 'Flujo (LPM)', accessor: 'flow_rate_lpm' },
    { header: 'Volumen (L)', accessor: 'volume_liters' },
    { header: 'Sensor ID', accessor: 'sensorId' },
    { header: 'Creado', accessor: 'created_at' }
  ],
  Users: [
    { header: "ID", accessor: "id" },
    { header: "Email", accessor: "email" },
    { header: "Nombre", accessor: (row) => `${row.first_name} ${row.last_name}`},
    { header: "Rol", accessor: "role" },
    { header: "Creado", accessor: "created_at" },
    { header: "Actualizado", accessor: "updated_at" },
  ],
  Alertas: [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "description" },
    { header: "Nivel", accessor: "level" },
    { header: "Detectado", accessor: "detected_at" },
    { header: "Estado", accessor: "resolved" },
    { header: "Resuelto", accessor: "resolved_at" },
    { header: "Observaciones", accessor: "extra_data" },
    { header: "Sensor", accessor: "sensor" },
  ],
};
