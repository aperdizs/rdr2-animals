import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwksRsa from 'jwks-rsa';
import { AuthService } from 'auth/auth.service';


const logger = require('logger');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
      secretOrKey: JwtStrategy.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'http://localhost:8080/jwks.json',
      }),
      audience: 'rdr2',
      issuer: 'rdr2',
      algorithms: ['RS256'],
    });
  }

  static handleSigningKeyError(err, cb) {
    logger.error(err);
    if (err && err.name === 'SigningKeyNotFoundError') {
      return cb(null);
    }
    if (err) {
      return cb(err);
    }
  }

  static passportJwtSecret(options) {
    const client = jwksRsa(options);
    const onError = options.handleSigningKeyError || JwtStrategy.handleSigningKeyError;

    return function secretProvider(header, cb) {
      // Only RS256 is supported.
      if (!header || header.alg !== 'RS256') {
        return cb(null, null);
      }

      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          return onError(err, (newError) => {
            return cb(newError, null);
          });
        }

        // Provide the key.
        return cb(null, key.publicKey || key.rsaPublicKey);
      });
    };
  }

  async validate(payload, done) {
    logger.debug('Payload', payload);
    done(null, payload.data);
  }
}
