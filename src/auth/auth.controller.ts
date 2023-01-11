import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return req.user
  }

  @Get('me')
  me() {}
}
