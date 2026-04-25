export interface IRepositorioPlaga {
  guardarPlaga(plaga: any): Promise<any>;
  buscarPlagaPorId(idPlaga: number): Promise<any>;
  listarPlagas(): Promise<any[]>;
  listarPlagasPorCultivo(idCultivo: number): Promise<any[]>;
  actualizarPlaga(idPlaga: number, datos: any): Promise<any>;
  cambiarEstadoPlaga(idPlaga: number, estado: string): Promise<void>;
  asociarPlagaCultivo(idPlaga: number, idCultivo: number): Promise<void>;
  actualizarUmbralAlerta(idPlaga: number, umbral: number): Promise<void>;
}