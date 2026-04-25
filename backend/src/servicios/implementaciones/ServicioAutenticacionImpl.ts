import { IServicioAutenticacion } from '../interfaces/IServicioAutenticacion';
import { ServicioSesionUsuario } from '../apoyo/ServicioSesionUsuario';
import { ServicioCifradoClave } from '../apoyo/ServicioCifradoClave';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioAutenticacionImpl implements IServicioAutenticacion {

  private servicioSesion = new ServicioSesionUsuario();
  private servicioCifrado = new ServicioCifradoClave();

  async autenticarUsuario(email: string, clave: string): Promise<any> {
    const sql = `SELECT * FROM USUARIO WHERE email = ? AND estado = 'ACTIVO'`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [email], async (error, resultado: any) => {
        if (error) return reject(error);
        if (!resultado[0]) return reject(new Error('Usuario no encontrado'));

        const usuario = resultado[0];
        const claveValida = await this.servicioCifrado.verificarContrasena(clave, usuario.clave);
        
        if (!claveValida) return reject(new Error('Contraseña incorrecta'));

        const token = this.servicioSesion.generarTokenSesion({
          identificacion: usuario.identificacion,
          email: usuario.email,
          rol: usuario.rol
        });

        resolve({ token, rol: usuario.rol, nombre: usuario.nombre });
      });
    });
  }

  async cerrarSesionUsuario(token: string): Promise<void> {
    this.servicioSesion.revocarTokenActivo(token);
  }

  async registrarNuevoUsuario(datos: any): Promise<any> {
    const claveCifrada = await this.servicioCifrado.cifrarContrasena(datos.clave);
    const sql = `INSERT INTO USUARIO (identificacion, nombreUsuario, clave, nombre, apellido, telefono, email, rol, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVO')`;
    const valores = [datos.identificacion, datos.nombreUsuario, claveCifrada,
                     datos.nombre, datos.apellido, datos.telefono, datos.email, datos.rol];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }
}