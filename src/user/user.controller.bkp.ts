// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ForbiddenException,
//   UseGuards,
// } from '@nestjs/common'
// import { UserService } from './user.service'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
// import { AbilityFactory, Action } from 'src/ability/ability.factory'
// import { User } from './entities/user.entity'
// import { ForbiddenError } from '@casl/ability'
// import {
//   CheckAbilities,
//   ReadUserAbility,
// } from 'src/ability/abilities.decorator'
// import { AbilitiesGuard } from 'src/ability/abilities.guard'

// @Controller('user')
// export class UserController {
//   constructor(
//     private readonly userService: UserService,
//     private abilityFactory: AbilityFactory,
//   ) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     const user: User = {
//       id: 1,
//       isAdmin: false,
//       corporationId: 1,
//     }

//     const ability = this.abilityFactory.defineAbility(user)

//     try {
//       ForbiddenError.from(ability).throwUnlessCan(Action.Create, User)
//       return this.userService.create(createUserDto)
//     } catch (error) {
//       if (error instanceof ForbiddenError) {
//         throw new ForbiddenException(error.message)
//       }
//     }
//   }

//   @Get()
//   @UseGuards(AbilitiesGuard)
//   @CheckAbilities(new ReadUserAbility())
//   findAll() {
//     return this.userService.findAll()
//   }

//   @Get(':id')
//   @UseGuards(AbilitiesGuard)
//   @CheckAbilities(new ReadUserAbility())
//   findOne(@Param('id') id: string) {
//     return this.userService.findOne(+id)
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     const user: User = {
//       id: 1,
//       isAdmin: true,
//       corporationId: 1,
//     }

//     const ability = this.abilityFactory.defineAbility(user)

//     try {
//       const userToUpdate = this.userService.findOne(+id)
//       ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate)
//       return this.userService.update(+id, updateUserDto)
//     } catch (error) {
//       if (error instanceof ForbiddenError) {
//         throw new ForbiddenException(error.message)
//       }
//     }
//   }

//   @Delete(':id')
//   @UseGuards(AbilitiesGuard)
//   @CheckAbilities({
//     action: Action.Delete,
//     subject: User,
//   })
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id)
//   }
// }
