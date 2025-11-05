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
],
Entities: [
  { header: 'ID', accessor: 'id' },
  { header: 'Nombre', accessor: 'name' },
  { header: 'Dirección', accessor: 'address' },
  { header: 'Tipo', accessor: 'entity_type' },
],
Sensors: [
  { header: 'ID', accessor: 'id' },
  { header: 'Tipo', accessor: 'sensor_type' },
  { header: 'Modelo', accessor: 'model' },
  { header: 'Instalación', accessor: 'installation_at' },
  { header: 'Estado', accessor: 'status' },
  { header: 'Entidad', accessor: 'entityId' },
],
'Sensor Readings': [
  { header: 'ID', accessor: 'id' },
  { header: 'Fecha', accessor: 'timestamp' },
  { header: 'Pulsos', accessor: 'pulses' },
  { header: 'Flujo (LPM)', accessor: 'flow_rate_lpm' },
  { header: 'Volumen (L)', accessor: 'volume_liters' },
  { header: 'Sensor ID', accessor: 'sensorId' },
  { header: 'Creado', accessor: 'created_at' }
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
  ]
};