import { Entity } from '../../entities/entity'
import {
  SearchParams,
  SearchRepositoryInterface,
  SearchResult,
} from '../search-repository-contract'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySearchRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchRepositoryInterface<E, SearchParams, SearchResult<E>>
{
  sortableFields: string[] = []

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir,
    )
    const itemPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )

    return new SearchResult({
      items: itemPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDir,
      filter: props.filter,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: string | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === 'asc' ? -1 : 1
      }

      if (a.props[sort] > b.props[sort]) {
        return sortDir === 'asc' ? 1 : -1
      }

      return 0
    })
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {
    const start = (page - 1) * perPage
    const end = start + perPage

    return items.slice(start, end)
  }
}
