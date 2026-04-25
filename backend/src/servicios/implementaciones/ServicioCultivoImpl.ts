import { IServicioCultivo } from '../interfaces/IServicioCultivo';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioCultivoImpl implements IServicioCultivo {

  async crearCultivo(datos: any): Promise<any> {
    const sql = `INSERT INTO CULTIVO (nombreCientifico, nombreComun, ciclo, nombreVariedad, descripcion, estado) 
                 VALUES (?, ?, ?, ?, ?, 'ACTIVO')`;
    const valores = [datos.nombreCientifico, datos.nombreComun, datos.ciclo,
                     datos.nombreVariedad, datos.descripcion];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve({ idCultivo: resultado.insertId, ...datos });
      });
    });
  }

  async consultarCultivo(idCultivo: number): Promise<any> {
    const sql = `SELECT * FROM CULTIVO WHERE idCultivo = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [idCultivo], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarCultivos(): Promise<any[]> {
    const sql = `SELECT * FROM CULTIVO`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarCultivo(idCultivo: number, datos: any): Promise<any> {
    const sql = `UPDATE CULTIVO SET nombreCientifico=?, nombreComun=?, ciclo=?, 
                 nombreVariedad=?, descripcion=? WHERE idCultivo=?`;
    const valores = [datos.nombreCientifico, datos.nombreComun, datos.ciclo,
                     datos.nombreVariedad, datos.descripcion, idCultivo];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async cambiarEstadoCultivo(idCultivo: number, estado: string): Promise<void> {
    const sql = `UPDATE CULTIVO SET estado=? WHERE idCultivo=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estado, idCultivo], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}