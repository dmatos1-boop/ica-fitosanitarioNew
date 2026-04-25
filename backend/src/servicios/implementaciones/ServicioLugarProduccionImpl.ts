import { IServicioLugarProduccion } from '../interfaces/IServicioLugarProduccion';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioLugarProduccionImpl implements IServicioLugarProduccion {

  private generarNroRegistroICA(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ICA-LP-${año}-${random}`;
  }

  async solicitarRegistroLugar(datos: any): Promise<any> {
    const nroRegistroICA = this.generarNroRegistroICA();
    const sql = `INSERT INTO LUGAR_PRODUCCION (nroRegistroICA, nombre, nroPredial, nombreEmpresa, telefonoEmpresa, ubicacion, departamento, municipio, vereda, nroDocProductor, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDIENTE')`;
    const valores = [nroRegistroICA, datos.nombre, datos.nroPredial, datos.nombreEmpresa,
                     datos.telefonoEmpresa, datos.ubicacion, datos.departamento,
                     datos.municipio, datos.vereda, datos.nroDocProductor];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve({ nroRegistroICA, ...resultado });
      });
    });
  }

  async consultarLugar(nroRegistroICA: string): Promise<any> {
    const sql = `SELECT * FROM LUGAR_PRODUCCION WHERE nroRegistroICA = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroRegistroICA], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarLugaresPorProductor(nroDocProductor: string): Promise<any[]> {
    const sql = `SELECT * FROM LUGAR_PRODUCCION WHERE nroDocProductor = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroDocProductor], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarDatosLugar(nroRegistroICA: string, datos: any): Promise<any> {
    const sql = `UPDATE LUGAR_PRODUCCION SET nombre=?, nroPredial=?, nombreEmpresa=?, 
                 telefonoEmpresa=?, ubicacion=?, departamento=?, municipio=?, vereda=? 
                 WHERE nroRegistroICA=?`;
    const valores = [datos.nombre, datos.nroPredial, datos.nombreEmpresa,
                     datos.telefonoEmpresa, datos.ubicacion, datos.departamento,
                     datos.municipio, datos.vereda, nroRegistroICA];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async listarTodosLugares(): Promise<any[]> {
    const sql = `SELECT * FROM LUGAR_PRODUCCION`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async gestionarEstadoLugar(nroRegistroICA: string, estado: string): Promise<void> {
    const sql = `UPDATE LUGAR_PRODUCCION SET estado=? WHERE nroRegistroICA=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estado, nroRegistroICA], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}