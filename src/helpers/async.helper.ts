/**
 * Wraps an async handler so rejections propagate to Nest's exception layer.
 * Controllers stay free of try/catch while still using async functions.
 */
export function asAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return (...args: TArgs) => fn(...args);
}
