// export a function that takes an object as input, and for each key on object if its value is null, make it undefined
export const relax = <T extends Record<string, unknown>>(obj: T): Record<string, unknown> => {
  return obj;
};
