export interface IServicioAutenticacion {
  autenticarUsuario(email: string, clave: string): Promise<any>;
  cerrarSesionUsuario(token: string): Promise<void>;
  registrarNuevoUsuario(datos: any): Promise<any>;
}