import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conexionInspecciones = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'ica_inspecciones'
});

conexionInspecciones.connect((error) => {
  if (error) {
    console.error('Error de conexión a ica_inspecciones:', error);
  } else {
    console.log('Conexión exitosa a ica_inspecciones');
  }
});

export default conexionInspecciones;