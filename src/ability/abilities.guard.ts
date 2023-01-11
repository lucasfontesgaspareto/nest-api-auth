import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator'
import { AbilityFactory } from './ability.factory'
import { ForbiddenError } from '@casl/ability'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []

    const currentUser: User = {
      id: 1,
      corporationId: 2,
      isAdmin: false,
    }

    const user = currentUser
    const ability = this.caslAbilityFactory.defineAbility(user)

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
      })

      return true
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
