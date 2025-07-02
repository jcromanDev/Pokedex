export function PaginateList<T>(list: T[], offset: number, limit: number): T[] {
  return list.slice(offset, offset + limit);
}

export function getLimitReach<T>(
  list: T[],
  offset: number,
  limit: number
): boolean {
  return offset >= list.length || list.length <= limit;
}
