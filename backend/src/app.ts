import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './infraestructura/ConexionBaseDatos';
import rutasUsuario from './controladores/rutas/rutasUsuario';
import rutasAutenticacion from './controladores/rutas/rutasAutenticacion';
import rutasPredio from './controladores/rutas/rutasPredio';
import rutasLugarProduccion from './controladores/rutas/rutasLugarProduccion';
import rutasInspeccion from './controladores/rutas/rutasInspeccion';
import rutasCultivo from './controladores/rutas/rutasCultivo';
import rutasPlagas from './controladores/rutas/rutasPlagas';
import rutasLote from './controladores/rutas/rutasLote';

dotenv.config();

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'Sistema de Gestión Fitosanitaria ICA - Backend funcionando' });
});

app.use('/auth', rutasAutenticacion);
app.use('/usuarios', rutasUsuario);
app.use('/predios', rutasPredio);
app.use('/lugares', rutasLugarProduccion);
app.use('/inspecciones', rutasInspeccion);
app.use('/cultivos', rutasCultivo);
app.use('/plagas', rutasPlagas);
app.use('/lotes', rutasLote);

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});

export default app;