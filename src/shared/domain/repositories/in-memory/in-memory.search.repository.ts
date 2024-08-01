import { Entity } from '../../entities/entity'
import { SearchRepositoryInterface } from '../search-repository-contract'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySearchRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
