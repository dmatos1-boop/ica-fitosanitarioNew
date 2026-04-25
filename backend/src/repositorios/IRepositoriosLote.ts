export interface IRepositorioLote {
  guardarLote(lote: any): Promise<any>;
  buscarLotePorId(idLote: number): Promise<any>;
  listarLotesPorLugar(nroRegICAlugar: string): Promise<any[]>;
  actualizarDatosLote(idLote: number, datos: any): Promise<any>;
  cambiarEstadoLote(idLote: number, estado: string): Promise<void>;
}