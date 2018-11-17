
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

const logger = require('logger');

@Injectable()
export class AuthGuardGrapqhl extends AuthGuard('jwt') {

  getRequest<T = any>(context: ExecutionContext): T {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

}
