export interface IServicioLote {
  registrarLote(datos: any): Promise<any>;
  consultarLote(idLote: number): Promise<any>;
  listarLotesPorLugar(nroRegICAlugar: string): Promise<any[]>;
  actualizarDatosLote(idLote: number, datos: any): Promise<any>;
  cambiarEstadoLote(idLote: number, estado: string): Promise<void>;
  listarTodosLotes(): Promise<any[]>;
}