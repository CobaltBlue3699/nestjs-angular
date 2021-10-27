export function assign<T = any>(source: T, extend: T): T {
  return Object.assign(source, extend);
}
