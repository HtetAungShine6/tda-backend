import { NotFoundException } from '@nestjs/common';

export function throwIfNotFound<T>(entity: T, id: string, entityName = 'Resource'): T {
  // if (!entity) {
  //   throw new NotFoundException(`${entityName} with ID ${id} cannot be found in the database`);
  // }
  return entity;
}