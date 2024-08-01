import { isNamedExportBindings } from 'typescript'
import { Entity } from '../entities/entity'

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>
  findById(id: string): Promise<E>
  findAll(): Promise<E[]>
  update(entity: E): Promise<E>
  delete(id: string): Promise<void>
}
