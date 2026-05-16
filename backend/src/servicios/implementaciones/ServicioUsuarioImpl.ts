import { IServicioUsuario } from '../interfaces/IServicioUsuario';
import { ServicioCifradoClave } from '../apoyo/ServicioCifradoClave';
import conexion from '../../infraestructura/ConexionUsuarios';

const servicioCifrado = new ServicioCifradoClave();

export class ServicioUsuarioImpl implements IServicioUsuario {

  async crearNuevoUsuario(datos: any): Promise<any> {
    const claveCifrada = await servicioCifrado.cifrarContrasena(datos.clave);
    const sql = `INSERT INTO USUARIO (identificacion, nombreUsuario, clave, nombre, apellido, telefono, email, rol, estado, nroTarjetaProfesional) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVO', ?)`;
    const valores = [
      datos.identificacion,
      datos.nombreUsuario,
      claveCifrada,
      datos.nombre,
      datos.apellido,
      datos.telefono,
      datos.email,
      datos.rol,
      datos.nroTarjetaProfesional || null
    ];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async consultarUsuario(identificacion: string): Promise<any> {
    const sql = `SELECT identificacion, nombreUsuario, nombre, apellido, telefono, email, rol, estado FROM USUARIO WHERE identificacion = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [identificacion], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarUsuarios(): Promise<any[]> {
    const sql = `SELECT identificacion, nombreUsuario, nombre, apellido, telefono, email, rol, estado FROM USUARIO`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarDatosUsuario(identificacion: string, datos: any): Promise<any> {
    const sql = `UPDATE USUARIO SET nombre=?, apellido=?, telefono=?, email=?, rol=? 
                 WHERE identificacion=?`;
    const valores = [datos.nombre, datos.apellido, datos.telefono, datos.email,
                     datos.rol, identificacion];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async desactivarCuentaUsuario(identificacion: string): Promise<void> {
    const sql = `UPDATE USUARIO SET estado='INACTIVO' WHERE identificacion=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [identificacion], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
  async activarCuentaUsuario(identificacion: string): Promise<void> {
    const sql = `UPDATE USUARIO SET estado='ACTIVO' WHERE identificacion=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [identificacion], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}