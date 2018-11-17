import { LoginDto } from './dto/login.dto';
import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { join } from 'path';
import { sign } from 'jsonwebtoken';

const { readFile } = require('fs').promises;

@Injectable()
export class AuthService implements OnModuleInit {

  cert: any;

  async onModuleInit() {
    this.cert = await readFile(join(__dirname, '../../keys/privkey.pem'));
  }
  
  async login(loginDto: LoginDto): Promise<TokenDto> {
    
    if (loginDto.email !== loginDto.password) {
      throw new UnauthorizedException('User or password invalid');
    }

    const token = sign(
      {
        data: {
          name: 'fake',
          email: loginDto.email,
          role: 'ADMIN',
        },
      },
      { key: this.cert, passphrase: 'mysecret' },
      {
        expiresIn: '24h',
        algorithm: 'RS256',
        audience: 'rdr2',
        issuer: 'rdr2',
        header: { kid: 'rdr2' },
      },
    );
    return { token };
  }

}
