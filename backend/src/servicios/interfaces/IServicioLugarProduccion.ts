export interface IServicioLugarProduccion {
  solicitarRegistroLugar(datos: any): Promise<any>;
  consultarLugar(nroRegistroICA: string): Promise<any>;
  listarLugaresPorProductor(nroDocProductor: string): Promise<any[]>;
  actualizarDatosLugar(nroRegistroICA: string, datos: any): Promise<any>;
  gestionarEstadoLugar(nroRegistroICA: string, estado: string): Promise<void>;
  listarTodosLugares(): Promise<any[]>;
}