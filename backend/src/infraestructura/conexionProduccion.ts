import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conexionProduccion = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'ica_produccion'
});

conexionProduccion.connect((error) => {
  if (error) {
    console.error('Error de conexión a ica_produccion:', error);
  } else {
    console.log('Conexión exitosa a ica_produccion');
  }
});

export default conexionProduccion;