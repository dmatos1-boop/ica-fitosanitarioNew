import bcrypt from 'bcryptjs';

export class ServicioCifradoClave {

  async cifrarContrasena(clave: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salt);
  }

  async verificarContrasena(clave: string, clavecifrada: string): Promise<boolean> {
    return await bcrypt.compare(clave, clavecifrada);
  }
}