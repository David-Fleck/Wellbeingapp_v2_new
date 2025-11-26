/**
 * 🔒 SECURITY & RELIABILITY: Fetch Utilities
 * - Timeout protection
 * - Automatic retry with exponential backoff
 * - Network error handling
 */

/**
 * Fetch with timeout protection
 * Prevents hanging requests
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 30000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Fetch with automatic retry logic
 * Uses exponential backoff: 1s, 2s, 4s
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  timeout = 30000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);

      // Don't retry 4xx errors (client errors - won't succeed on retry)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Return successful responses or last attempt
      if (response.ok || attempt === maxRetries - 1) {
        return response;
      }

      // Server error (5xx) - will retry
      throw new Error(`Server error: ${response.status}`);
    } catch (error: any) {
      lastError = error;

      // Don't retry on last attempt
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`🔄 Retry ${attempt + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Request failed after retries');
}

/**
 * Safe Promise.allSettled alternative
 * Isolates errors - one failure doesn't break all
 */
export async function fetchAllWithIsolation<T>(
  promises: Promise<T>[]
): Promise<T[]> {
  const results = await Promise.allSettled(promises);

  return results
    .filter((r): r is PromiseFulfilledResult<T> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((v): v is T => v !== null && v !== undefined);
}
