import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        username: createUserDto.username,
      },
    })

    if (userExists) {
      throw new Error('User already exists')
    }

    return await this.prisma.user.create({
      data: createUserDto,
    })
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('User does not exist')
    }

    return user
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new Error('User does not exist')
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: updateUserDto.isAdmin,
        corporationId: updateUserDto.corporationId,
      },
    })

    return userUpdated
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
