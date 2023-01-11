import { Module } from '@nestjs/common'
import { AbilityModule } from './ability/ability.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { UserService } from './user/user.service'
import { PrismaService } from './database/prisma.service'

@Module({
  imports: [UserModule, AbilityModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
