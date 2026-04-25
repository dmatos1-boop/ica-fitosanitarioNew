export interface IServicioUsuario {
  crearNuevoUsuario(datos: any): Promise<any>;
  consultarUsuario(identificacion: string): Promise<any>;
  listarUsuarios(): Promise<any[]>;
  actualizarDatosUsuario(identificacion: string, datos: any): Promise<any>;
  desactivarCuentaUsuario(identificacion: string): Promise<void>;
  activarCuentaUsuario(identificacion: string): Promise<void>;
}