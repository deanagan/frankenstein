import { useEffect, useRef } from "react";

function deepEqual(obj1: unknown, obj2: unknown): boolean {
  // Check if both arguments are objects and perform shallow comparison if not
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Check if both objects have the same number of keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys and their corresponding values are equal
  for (const key of keys1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keyedObject1 = (obj1 as any)[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keyedObject2 = (obj2 as any)[key];

    if (
      !(obj2 as object).hasOwnProperty(key) ||
      !deepEqual(keyedObject1, keyedObject2)
    ) {
      return false;
    }
  }

  return true; // If all checks pass, objects are deeply equal
}

export function useMemoObjCompare<K>(value: K) {
  const prevRef = useRef<K>();
  const previous = prevRef.current;

  const isObjEqual = deepEqual(previous, value);

  useEffect(() => {
    if (!isObjEqual) {
      prevRef.current = value;
    }
  });

  return isObjEqual ? previous : value;
}
