import { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { UserRepository } from '@/modules/users/domain/repositories/user.repository'
import { ConflictError } from '@/shared/domain/errors/conflict.error'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory/in-memory.repository'
import { InMemorySearchRepository } from '@/shared/domain/repositories/in-memory/in-memory.search.repository'
import { SortDirection } from '@/shared/domain/repositories/search-repository-contract'

export class UserInMemoryRepository
  extends InMemorySearchRepository<UserEntity>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt']

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

  protected async applyFilter(
    items: UserEntity[],
    filter: string | null,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}
