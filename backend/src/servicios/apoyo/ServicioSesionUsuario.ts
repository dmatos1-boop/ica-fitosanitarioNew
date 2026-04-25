import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRES = process.env.JWT_EXPIRES_IN || '24h';

export class ServicioSesionUsuario {

  generarTokenSesion(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as jwt.SignOptions);
  }

  validarFirmaToken(token: string): any {
    try {
      return jwt.verify(token, SECRET);
    } catch (error) {
      return null;
    }
  }

  revocarTokenActivo(token: string): void {
    // En una implementación completa se agregaría a una lista negra
    console.log('Token revocado:', token);
  }
}