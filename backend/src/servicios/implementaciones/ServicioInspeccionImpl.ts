import { IServicioInspeccion } from '../interfaces/IServicioInspeccion';
import conexion from '../../infraestructura/ConexionBaseDatos';

export class ServicioInspeccionImpl implements IServicioInspeccion {

  async solicitarInspeccion(datos: any): Promise<any> {
    const sql = `INSERT INTO ORDEN_INSPECCION (tipoInspeccion, estado, fechaSolicitud, nroRegICAlugar) 
                 VALUES (?, 'SOLICITADA', CURDATE(), ?)`;
    const valores = [datos.tipoInspeccion, datos.nroRegICAlugar];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve({ idOrden: resultado.insertId, ...resultado });
      });
    });
  }

  async programarInspeccion(idOrden: number, datos: any): Promise<any> {
    const sql = `UPDATE ORDEN_INSPECCION SET estado='PROGRAMADA', fechaProgramada=?, 
                 nroDocFuncionario=? WHERE idOrden=?`;
    const valores = [datos.fechaProgramada, datos.nroDocFuncionario, idOrden];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async asignarTecnico(idOrden: number, documentoTecnico: string): Promise<void> {
    const sql = `UPDATE ORDEN_INSPECCION SET documentoTecnico=? WHERE idOrden=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [documentoTecnico, idOrden], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  async registrarResultadoFitosanitario(idOrden: number, datos: any): Promise<any> {
    const incidencia = (datos.plantasAfectadas / datos.cantidadPlantas) * 100;
    let nivelAlerta = 'BAJO';
    if (incidencia > 30) nivelAlerta = 'ALTO';
    else if (incidencia > 10) nivelAlerta = 'MEDIO';

    const sql = `INSERT INTO INSPECCION_FITOSANITARIA 
                 (idOrden, fecha, estadoFenologico, porcentajeInfestacion, nivelAlerta, 
                  areaInspeccionada, cantidadPlantas, cantidadProyectada, cantidadReal, comentarios) 
                 VALUES (?, CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?)`;
    const valores = [idOrden, datos.estadoFenologico, incidencia, nivelAlerta,
                     datos.areaInspeccionada, datos.cantidadPlantas, datos.cantidadProyectada,
                     datos.cantidadReal, datos.comentarios];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else {
          conexion.query(`UPDATE ORDEN_INSPECCION SET estado='REALIZADA' WHERE idOrden=?`, 
            [idOrden], (err) => {
              if (err) reject(err);
              else resolve({ idInspeccion: resultado.insertId, nivelAlerta, porcentajeInfestacion: incidencia });
            });
        }
      });
    });
  }

  async registrarResultadoTecnico(idOrden: number, datos: any): Promise<any> {
    const sql = `INSERT INTO INSPECCION_TECNICA 
                 (idOrden, areaAcopio, areaResiduosVegetales, areaAlmacenamientoInsumos,
                  areaDosificacion, areaResiduosMezclas, areaHerramientas, areaSanitaria, comentarios) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const valores = [idOrden, datos.areaAcopio, datos.areaResiduosVegetales,
                     datos.areaAlmacenamientoInsumos, datos.areaDosificacion,
                     datos.areaResiduosMezclas, datos.areaHerramientas,
                     datos.areaSanitaria, datos.comentarios];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else {
          conexion.query(`UPDATE ORDEN_INSPECCION SET estado='REALIZADA' WHERE idOrden=?`,
            [idOrden], (err) => {
              if (err) reject(err);
              else resolve({ idInspeccionTec: resultado.insertId });
            });
        }
      });
    });
  }

  async consultarInspecciones(filtros: any): Promise<any[]> {
    let sql = `SELECT o.*, l.nombre as lugarProduccion 
               FROM ORDEN_INSPECCION o
               INNER JOIN LUGAR_PRODUCCION l ON o.nroRegICAlugar = l.nroRegistroICA
               WHERE 1=1`;
    const valores: any[] = [];

    if (filtros.estado) {
      sql += ` AND o.estado = ?`;
      valores.push(filtros.estado);
    }
    if (filtros.tipoInspeccion) {
      sql += ` AND o.tipoInspeccion = ?`;
      valores.push(filtros.tipoInspeccion);
    }
    if (filtros.nroRegICAlugar) {
      sql += ` AND o.nroRegICAlugar = ?`;
      valores.push(filtros.nroRegICAlugar);
    }

    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async consultarInspeccionesAsignadas(documentoTecnico: string): Promise<any[]> {
    const sql = `SELECT o.*, l.nombre as lugarProduccion 
                 FROM ORDEN_INSPECCION o
                 INNER JOIN LUGAR_PRODUCCION l ON o.nroRegICAlugar = l.nroRegistroICA
                 WHERE o.documentoTecnico = ?
                 ORDER BY o.fechaProgramada ASC`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [documentoTecnico], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });  
  }

  async cancelarInspeccion(idOrden: number, motivo: string): Promise<void> {
    const sql = `UPDATE ORDEN_INSPECCION SET estado='CANCELADA', comentarios=? WHERE idOrden=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [motivo, idOrden], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
  }