import { IServicioInspeccion } from '../interfaces/IServicioInspeccion';
import conexionInspecciones from '../../infraestructura/ConexionInspecciones';
import conexionProduccion from '../../infraestructura/ConexionProduccion';

export class ServicioInspeccionImpl implements IServicioInspeccion {

  async solicitarInspeccion(datos: any): Promise<any> {
    const sql = `INSERT INTO ORDEN_INSPECCION (tipoInspeccion, estado, fechaSolicitud, nroRegICAlugar) 
                 VALUES (?, 'SOLICITADA', CURDATE(), ?)`;
    const valores = [datos.tipoInspeccion, datos.nroRegICAlugar];
    return new Promise((resolve, reject) => {
      conexionInspecciones.query(sql, valores, (error, resultado: any) => {
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
      conexionInspecciones.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async asignarTecnico(idOrden: number, documentoTecnico: string): Promise<void> {
  const sql = `UPDATE ORDEN_INSPECCION SET documentoTecnico=?, estado='PROGRAMADA' WHERE idOrden=?`;
  return new Promise((resolve, reject) => {
    conexionInspecciones.query(sql, [documentoTecnico, idOrden], (error) => {
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
      conexionInspecciones.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else {
          conexionInspecciones.query(`UPDATE ORDEN_INSPECCION SET estado='REALIZADA' WHERE idOrden=?`,
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
      conexionInspecciones.query(sql, valores, (error, resultado: any) => {
        if (error) reject(error);
        else {
          conexionInspecciones.query(`UPDATE ORDEN_INSPECCION SET estado='REALIZADA' WHERE idOrden=?`,
            [idOrden], (err) => {
              if (err) reject(err);
              else resolve({ idInspeccionTec: resultado.insertId });
            });
        }
      });
    });
  }

  async consultarInspecciones(filtros: any): Promise<any[]> {
    let sql = `SELECT * FROM ORDEN_INSPECCION WHERE 1=1`;
    const valores: any[] = [];

    if (filtros.estado) {
      sql += ` AND estado = ?`;
      valores.push(filtros.estado);
    }
    if (filtros.tipoInspeccion) {
      sql += ` AND tipoInspeccion = ?`;
      valores.push(filtros.tipoInspeccion);
    }
    if (filtros.nroRegICAlugar) {
      sql += ` AND nroRegICAlugar = ?`;
      valores.push(filtros.nroRegICAlugar);
    }

    return new Promise((resolve, reject) => {
      conexionInspecciones.query(sql, valores, async (error, resultado: any) => {
        if (error) { reject(error); return; }
        try {
          const inspecciones = await Promise.all(resultado.map(async (inspeccion: any) => {
            const lugar = await new Promise<any>((res, rej) => {
              conexionProduccion.query(
                `SELECT nombre FROM LUGAR_PRODUCCION WHERE nroRegistroICA = ?`,
                [inspeccion.nroRegICAlugar],
                (err, rows: any) => {
                  if (err) rej(err);
                  else res(rows[0]);
                }
              );
            });
            return { ...inspeccion, lugarProduccion: lugar?.nombre || inspeccion.nroRegICAlugar };
          }));
          resolve(inspecciones);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async consultarInspeccionesAsignadas(documentoTecnico: string): Promise<any[]> {
    const sql = `SELECT * FROM ORDEN_INSPECCION WHERE documentoTecnico = ? ORDER BY fechaProgramada ASC`;
    return new Promise((resolve, reject) => {
      conexionInspecciones.query(sql, [documentoTecnico], async (error, resultado: any) => {
        if (error) { reject(error); return; }
        try {
          const inspecciones = await Promise.all(resultado.map(async (inspeccion: any) => {
            const lugar = await new Promise<any>((res, rej) => {
              conexionProduccion.query(
                `SELECT nombre FROM LUGAR_PRODUCCION WHERE nroRegistroICA = ?`,
                [inspeccion.nroRegICAlugar],
                (err, rows: any) => {
                  if (err) rej(err);
                  else res(rows[0]);
                }
              );
            });
            return { ...inspeccion, lugarProduccion: lugar?.nombre || inspeccion.nroRegICAlugar };
          }));
          resolve(inspecciones);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async cancelarInspeccion(idOrden: number, motivo: string): Promise<void> {
    const sql = `UPDATE ORDEN_INSPECCION SET estado='CANCELADA', comentarios=? WHERE idOrden=?`;
    return new Promise((resolve, reject) => {
      conexionInspecciones.query(sql, [motivo, idOrden], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}