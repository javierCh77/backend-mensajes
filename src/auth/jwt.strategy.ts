// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecreto',
    });
  }

  async validate(payload: any) {
    // ✅ Devolvés los campos que vas a necesitar en @User()
    return {
      userId: payload.sub,
      email: payload.email,
      nombre: payload.nombre,
      apellido: payload.apellido,
      rol: payload.rol,
      fotoPerfil: payload.fotoPerfil,
    };
  }
}
