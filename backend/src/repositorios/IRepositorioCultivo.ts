export interface IRepositorioCultivo {
  guardarCultivo(cultivo: any): Promise<any>;
  buscarCultivoPorId(idCultivo: number): Promise<any>;
  listarCultivos(): Promise<any[]>;
  actualizarCultivo(idCultivo: number, datos: any): Promise<any>;
  cambiarEstadoCultivo(idCultivo: number, estado: string): Promise<void>;
}