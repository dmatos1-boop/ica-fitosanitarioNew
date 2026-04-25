import { IServicioLote } from '../interfaces/IServicioLote';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioLoteImpl implements IServicioLote {

  async registrarLote(datos: any): Promise<any> {
    const sql = `INSERT INTO LOTE (nroLote, area, fechaSiembra, estado, cantPlantas, 
                 cantProyectadaRecoleccion, idCultivo, nroRegICAlugar) 
                 VALUES (?, ?, ?, 'ACTIVO', ?, ?, ?, ?)`;
    const valores = [datos.nroLote, datos.area, datos.fechaSiembra,
                     datos.cantPlantas, datos.cantProyectadaRecoleccion,
                     datos.idCultivo, datos.nroRegICAlugar];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve({ idLote: resultado.insertId, ...datos });
      });
    });
  }

  async consultarLote(idLote: number): Promise<any> {
    const sql = `SELECT l.*, c.nombreComun as cultivo FROM LOTE l 
                 INNER JOIN CULTIVO c ON l.idCultivo = c.idCultivo
                 WHERE l.idLote = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [idLote], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarLotesPorLugar(nroRegICAlugar: string): Promise<any[]> {
    const sql = `SELECT l.*, c.nombreComun as cultivo FROM LOTE l 
                 INNER JOIN CULTIVO c ON l.idCultivo = c.idCultivo
                 WHERE l.nroRegICAlugar = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroRegICAlugar], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarDatosLote(idLote: number, datos: any): Promise<any> {
    const sql = `UPDATE LOTE SET nroLote=?, area=?, cantPlantas=?, 
                 cantProyectadaRecoleccion=?, idCultivo=? WHERE idLote=?`;
    const valores = [datos.nroLote, datos.area, datos.cantPlantas,
                     datos.cantProyectadaRecoleccion, datos.idCultivo, idLote];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async listarTodosLotes(): Promise<any[]> {
    const sql = `SELECT l.*, c.nombreComun as cultivo FROM LOTE l 
                 INNER JOIN CULTIVO c ON l.idCultivo = c.idCultivo`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async cambiarEstadoLote(idLote: number, estado: string): Promise<void> {
    const sql = `UPDATE LOTE SET estado=? WHERE idLote=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estado, idLote], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}