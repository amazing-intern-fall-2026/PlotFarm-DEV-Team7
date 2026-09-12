import { useCallback, useEffect, useRef } from "react";

/**
 * Hàm debounce thuần túy (pure utility) — không phụ thuộc React DOM.
 * Hỗ trợ phương thức `cancel()` để huỷ timeout bất kỳ lúc nào.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number = 400,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}

/**
 * Hook trả về một hàm được debounce với delayMs (mặc định 400ms).
 * Tự động đồng bộ callback mới nhất qua `useRef` và dọn dẹp timeout khi component unmount.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delayMs: number = 400,
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const debouncedRef = useRef(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delayMs),
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    debouncedRef.current = debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delayMs);
  }, [delayMs]);

  useEffect(() => {
    return () => {
      debouncedRef.current.cancel();
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    debouncedRef.current(...args);
  }, []);
}
