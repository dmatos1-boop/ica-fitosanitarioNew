export interface IServicioPredio {
  solicitarRegistroPredio(datos: any): Promise<any>;
  consultarPredio(nroRegistroICA: string): Promise<any>;
  listarPrediosPorProductor(nroDocProductor: string): Promise<any[]>;
  actualizarDatosPredio(nroRegistroICA: string, datos: any): Promise<any>;
  gestionarEstadoPredio(nroRegistroICA: string, estado: string): Promise<void>;
  listarTodosPredios(): Promise<any[]>;
}