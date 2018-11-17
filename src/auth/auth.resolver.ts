import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { PaginationDto } from '../common/dto/pagination.dto';
import {ParseIntPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

const logger = require('logger');

@Resolver('Auth')
export class AuthResolver {

  constructor(private readonly authService: AuthService){}

 
  @Mutation()
  async login(@Args('body') body: LoginDto): Promise<TokenDto> {

    logger.info('Login');

    return await this.authService.login(body);

  }

}
