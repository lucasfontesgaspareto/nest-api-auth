import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { AbilityModule } from 'src/ability/ability.module'
import { PrismaService } from 'src/database/prisma.service'
@Module({
  imports: [AbilityModule],
  providers: [UserService, PrismaService],
})
export class UserModule {}
