export function replaceFirst(arr: any[], item: any) {
  const [, ...rest] = arr;
  return [item, ...rest];
}

export function deleteFirstAndAppendOne(arr: any[], item: any) {
  const [, ...rest] = arr;
  return [...rest, item];
}
