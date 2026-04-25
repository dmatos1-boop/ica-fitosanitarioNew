export interface IServicioInspeccion {
  solicitarInspeccion(datos: any): Promise<any>;
  programarInspeccion(idOrden: number, datos: any): Promise<any>;
  asignarTecnico(idOrden: number, documentoTecnico: string): Promise<void>;
  registrarResultadoFitosanitario(idOrden: number, datos: any): Promise<any>;
  registrarResultadoTecnico(idOrden: number, datos: any): Promise<any>;
  consultarInspecciones(filtros: any): Promise<any[]>;
  consultarInspeccionesAsignadas(documentoTecnico: string): Promise<any[]>;
  cancelarInspeccion(idOrden: number, motivo: string): Promise<void>;
}