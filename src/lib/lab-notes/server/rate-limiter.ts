/**
 * In-memory rate limiter for Lab Note submissions.
 *
 * LIMITATION: This implementation uses a module-level Map and is only
 * effective within a single Node.js process. It works correctly for:
 *   - Local development
 *   - Single-instance Vercel serverless functions (per cold-start)
 *
 * For multi-instance / distributed deployments, replace `store` with an
 * Upstash Redis client (e.g. @upstash/ratelimit) and swap the
 * `checkRateLimit` implementation without changing callers.
 *
 * TODO (next milestone): Replace with Upstash Redis rate limiter.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 submissions per window per IP hash

/** ipHash → array of submission timestamps */
const store = new Map<string, number[]>();

/**
 * Periodically prune expired entries to prevent unbounded memory growth.
 * Runs only server-side; safe to call on every request.
 */
function pruneExpired(): void {
  const now = Date.now();
  for (const [key, timestamps] of store.entries()) {
    const fresh = timestamps.filter((ts) => now - ts < WINDOW_MS);
    if (fresh.length === 0) {
      store.delete(key);
    } else {
      store.set(key, fresh);
    }
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Check whether the given IP hash is within the allowed rate limit.
 *
 * @param ipHash  SHA-256 hex digest of the visitor IP (or a static fallback)
 * @returns `{ allowed: true }` or `{ allowed: false, retryAfterSeconds }`
 */
export function checkRateLimit(ipHash: string): RateLimitResult {
  pruneExpired();

  const now = Date.now();
  const timestamps = store.get(ipHash) ?? [];
  const windowStart = now - WINDOW_MS;
  const recent = timestamps.filter((ts) => ts > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    // Find the oldest timestamp in the window to compute retry-after
    const oldest = Math.min(...recent);
    const retryAfterMs = WINDOW_MS - (now - oldest);
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);

    console.warn(
      `[RateLimit] IP hash ${ipHash.slice(0, 8)}… blocked. ` +
      `${recent.length}/${MAX_REQUESTS} requests in window. ` +
      `Retry after ${retryAfterSeconds}s.`
    );

    return { allowed: false, retryAfterSeconds };
  }

  store.set(ipHash, [...recent, now]);
  return { allowed: true };
}
