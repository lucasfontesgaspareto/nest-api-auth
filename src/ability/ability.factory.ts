import {
  Ability,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  createMongoAbility,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    )

    if (user.isAdmin) {
      can(Action.Manage, 'all')
      cannot(Action.Manage, User, {
        corporationId: { $ne: user.corporationId },
      }).because('You can only manage users in your own corporation')
    } else {
      can(Action.Read, 'all')
      cannot(Action.Create, User).because('Just admins can create')
      cannot(Action.Delete, User).because('You can not delete a user')
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
