export interface IRepositorioUsuario {
  guardarUsuario(usuario: any): Promise<any>;
  buscarPorIdentificacion(identificacion: string): Promise<any>;
  buscarPorEmail(email: string): Promise<any>;
  listarUsuarios(): Promise<any[]>;
  actualizarUsuario(identificacion: string, datos: any): Promise<any>;
  eliminarUsuario(identificacion: string): Promise<void>;
}