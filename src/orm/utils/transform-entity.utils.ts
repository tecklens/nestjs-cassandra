import { Type } from '@nestjs/common';

export function transformEntity<T>(target: Type<T>, entityLike: any[]): T[];
export function transformEntity<T>(target: Type<T>, entityLike: any): T;

export function transformEntity<T>(target: Type<T>, entityLike: any): T | T[] {
  if (!target || !(target && typeof target === 'function') || !entityLike) {
    return entityLike;
  }
  if (entityLike instanceof Array) {
    // @ts-ignore
    return entityLike.map((entity) => Object.assign(new target(), entity));
  }
  // @ts-ignore
  return Object.assign(new target(), entityLike);
}
