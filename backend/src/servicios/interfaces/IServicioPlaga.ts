export interface IServicioPlaga {
  crearPlaga(datos: any): Promise<any>;
  consultarPlaga(idPlaga: number): Promise<any>;
  listarPlagas(): Promise<any[]>;
  listarPlagasPorCultivo(idCultivo: number): Promise<any[]>;
  actualizarPlaga(idPlaga: number, datos: any): Promise<any>;
  cambiarEstadoPlaga(idPlaga: number, estado: string): Promise<void>;
  asociarPlagaCultivo(idPlaga: number, idCultivo: number): Promise<void>;
  actualizarUmbralAlerta(idPlaga: number, umbral: number): Promise<void>;
}