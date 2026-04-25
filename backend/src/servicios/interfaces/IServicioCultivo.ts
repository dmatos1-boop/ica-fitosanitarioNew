export interface IServicioCultivo {
  crearCultivo(datos: any): Promise<any>;
  consultarCultivo(idCultivo: number): Promise<any>;
  listarCultivos(): Promise<any[]>;
  actualizarCultivo(idCultivo: number, datos: any): Promise<any>;
  cambiarEstadoCultivo(idCultivo: number, estado: string): Promise<void>;
}