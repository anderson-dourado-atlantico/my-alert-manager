import { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { UserRepository } from '@/modules/users/domain/repositories/user.repository'
import { ConflictError } from '@/shared/domain/errors/conflict.error'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory/in-memory.repository'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using email: ${email}`)
    }

    return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError(`Email address already used`)
    }
  }
}
