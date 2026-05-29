import { IServicioPredio } from '../interfaces/IServicioPredio';
import conexion from '../../infraestructura/ConexionProduccion';

export class ServicioPredioImpl implements IServicioPredio {

  private generarNroRegistroICA(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ICA-${año}-${random}`;
  }

  async listarTodosPredios(): Promise<any[]> {
    const sql = `SELECT * FROM PREDIO`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async solicitarRegistroPredio(datos: any): Promise<any> {
  const nroRegistroICA = this.generarNroRegistroICA();
  const nroPredial = `${Date.now()}`;
  const sql = `INSERT INTO PREDIO (nroRegistroICA, nroPredial, nombre, area, departamento, municipio, nroDocProductor, estado) 
               VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDIENTE')`;
  const valores = [
    nroRegistroICA,
    nroPredial,
    datos.nombre,
    datos.extension || 0,
    datos.departamento || '',
    datos.municipio || '',
    datos.nroDocProductor
  ];
  return new Promise((resolve, reject) => {
    conexion.query(sql, valores, (error, resultado) => {
      if (error) reject(error);
      else resolve({ nroRegistroICA, ...resultado });
    });
  });
}

  async consultarPredio(nroRegistroICA: string): Promise<any> {
    const sql = `SELECT * FROM PREDIO WHERE nroRegistroICA = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroRegistroICA], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado[0]);
      });
    });
  }

  async listarPrediosPorProductor(nroDocProductor: string): Promise<any[]> {
    const sql = `SELECT * FROM PREDIO WHERE nroDocProductor = ?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroDocProductor], (error, resultado: any) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async actualizarDatosPredio(nroRegistroICA: string, datos: any): Promise<any> {
    const sql = `UPDATE PREDIO SET nroPredial=?, nombre=?, area=?, correo=?, codigoDaneVereda=? 
                 WHERE nroRegistroICA=?`;
    const valores = [datos.nroPredial, datos.nombre, datos.area,
                     datos.correo, datos.codigoDaneVereda, nroRegistroICA];
    return new Promise((resolve, reject) => {
      conexion.query(sql, valores, (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      });
    });
  }

  async gestionarEstadoPredio(nroRegistroICA: string, estado: string): Promise<void> {
  if (estado === 'APROBADO') {
    const sql = `CALL aprobarPredio(?)`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [nroRegistroICA], (error) => {
        if (error) {
          console.error('Error al aprobar predio:', error);
          reject(error);
        }
        else resolve();
      });
    });
  } else {
    const sql = `UPDATE PREDIO SET estado=? WHERE nroRegistroICA=?`;
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estado, nroRegistroICA], (error) => {
        if (error) {
          console.error('Error al cambiar estado predio:', error);
          reject(error);
        }
        else resolve();
      });
    });
  }
}
}