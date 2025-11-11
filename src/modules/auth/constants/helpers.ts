export function createSelectOptions<
  const T extends readonly { value: string; label: string }[],
>(options: T) {
  return {
    options,
    values: options.map((opt) => opt.value) as unknown as {
      [K in keyof T]: T[K] extends { value: infer V } ? V : never;
    },
  };
}
