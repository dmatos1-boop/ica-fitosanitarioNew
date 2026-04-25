export interface IRepositorioLugarProduccion {
  guardarLugar(lugar: any): Promise<any>;
  buscarLugarPorId(nroRegistroICA: string): Promise<any>;
  listarLugaresPorProductor(nroDocProductor: string): Promise<any[]>;
  actualizarDatosLugar(nroRegistroICA: string, datos: any): Promise<any>;
  gestionarEstadoLugar(nroRegistroICA: string, estado: string): Promise<void>;
}