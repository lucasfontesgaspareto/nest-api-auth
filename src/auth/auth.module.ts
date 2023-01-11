import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport/dist'
import { PrismaService } from 'src/database/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [UserModule, PassportModule],
  providers: [UserService, AuthService, LocalStrategy, PrismaService],
})
export class AuthModule {}
