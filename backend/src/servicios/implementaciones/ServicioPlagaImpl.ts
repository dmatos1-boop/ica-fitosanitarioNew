import { IServicioPlaga } from '../interfaces/IServicioPlaga';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioPlagaImpl implements IServicioPlaga {

  async crearPlaga(datos: any): Promise<any> {
    const sql = `INSERT INTO PLAGA (nombreCientifico, nombreComun, tipoPlaga, descripcion, umbralAlerta, estado) 
                 VALUES (?, ?, ?, ?, ?, 'ACTIVO')`;
    const valores = [datos.nombreCientifico, datos.nombreComun, datos.tipoPlaga,
                     datos.descripcion, datos.umbralAlerta || 10.00];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve({ idPlaga: resultado.insertId, ...datos });
      });
    });
  }

  async consultarPlaga(idPlaga: number): Promise<any> {
    const sql = `SELECT * FROM PLAGA WHERE idPlaga = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [idPlaga], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarPlagas(): Promise<any[]> {
    const sql = `SELECT * FROM PLAGA`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async listarPlagasPorCultivo(idCultivo: number): Promise<any[]> {
    const sql = `SELECT p.* FROM PLAGA p 
                 INNER JOIN CULTIVO_PLAGA cp ON p.idPlaga = cp.idPlaga 
                 WHERE cp.idCultivo = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [idCultivo], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarPlaga(idPlaga: number, datos: any): Promise<any> {
    const sql = `UPDATE PLAGA SET nombreCientifico=?, nombreComun=?, tipoPlaga=?, 
                 descripcion=? WHERE idPlaga=?`;
    const valores = [datos.nombreCientifico, datos.nombreComun, datos.tipoPlaga,
                     datos.descripcion, idPlaga];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async cambiarEstadoPlaga(idPlaga: number, estado: string): Promise<void> {
    const sql = `UPDATE PLAGA SET estado=? WHERE idPlaga=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estado, idPlaga], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  async asociarPlagaCultivo(idPlaga: number, idCultivo: number): Promise<void> {
    const sql = `INSERT IGNORE INTO CULTIVO_PLAGA (idCultivo, idPlaga) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [idCultivo, idPlaga], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  async actualizarUmbralAlerta(idPlaga: number, umbral: number): Promise<void> {
    const sql = `UPDATE PLAGA SET umbralAlerta=? WHERE idPlaga=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [umbral, idPlaga], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}
