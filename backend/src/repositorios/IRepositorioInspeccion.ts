export interface IRepositorioInspeccion {
  guardarOrden(orden: any): Promise<any>;
  buscarOrdenPorId(idOrden: number): Promise<any>;
  listarOrdenesPorLugar(nroRegICAlugar: string): Promise<any[]>;
  listarOrdenesPorTecnico(documentoTecnico: string): Promise<any[]>;
  actualizarEstadoOrden(idOrden: number, estado: string): Promise<void>;
  guardarInspeccionFitosanitaria(inspeccion: any): Promise<any>;
  guardarInspeccionTecnica(inspeccion: any): Promise<any>;
  buscarInspeccionFitosanitariaPorOrden(idOrden: number): Promise<any>;
  buscarInspeccionTecnicaPorOrden(idOrden: number): Promise<any>;
}