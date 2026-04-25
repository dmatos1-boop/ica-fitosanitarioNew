export interface IRepositorioPredio {
  guardarPredio(predio: any): Promise<any>;
  buscarPredioPorId(nroRegistroICA: string): Promise<any>;
  listarPrediosPorProductor(nroDocProductor: string): Promise<any[]>;
  actualizarDatosPredio(nroRegistroICA: string, datos: any): Promise<any>;
  gestionarEstadoPredio(nroRegistroICA: string, estado: string): Promise<void>;
}