export function replaceFirst(arr: any[], item: any) {
  const [, ...rest] = arr;
  return [item, ...rest];
}

export function eraseFirstAndAppendOne(arr: any[], item: any) {
  const [, ...rest] = arr;
  return [...rest, item];
}
