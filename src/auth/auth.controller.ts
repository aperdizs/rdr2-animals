import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Controller, Req, Get, ParseIntPipe, Param, Post, Body, Put, Delete, Query } from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitQuery, ApiOperation, ApiImplicitParam, ApiImplicitBody } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';


const logger = require('logger');

@ApiUseTags('Auth')
@Controller('api/v1/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    title: 'Login', description: `
    Login
  `, operationId: 'Login'
  })
  
  @ApiResponse({ status: 200, description: 'Login successfully', isArray: false, type: TokenDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async login(@Body() loginDto: LoginDto) {

    logger.info('Login');
    const data = await this.authService.login(loginDto)
    
    return data;
  }


}
