import uniq from "lodash.uniq";

export const getUniqValuesForFilter = <T, K extends keyof T>(
  entity: T[],
  field: K
): T[K][] => uniq(entity.map((entity) => entity[field]));

export function getKeyByValue<T extends { [key: string]: any }>(
  obj: T,
  value: any
): keyof T | undefined {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key as keyof T;
    }
  }
  return undefined;
}
