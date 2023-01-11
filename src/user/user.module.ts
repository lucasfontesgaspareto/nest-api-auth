import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AbilityModule } from 'src/ability/ability.module'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  imports: [AbilityModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
