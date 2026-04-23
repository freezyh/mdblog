import { ref } from "vue"

interface UsePollingOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

export function usePolling<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  interval = 5000,
  options: UsePollingOptions<T> = {},
) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)
  let abortController: AbortController | null = null
  let isVisible = true
  let pollTimer: ReturnType<typeof setTimeout> | null = null

  const poll = async () => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      abortController?.abort()
      abortController = new AbortController()

      const result = await fetchFn(abortController.signal)
      data.value = result
      options.onSuccess?.(result)
    }
    catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        error.value = err
        options.onError?.(err)
        console.warn("Polling error:", err)
      }
    }
    finally {
      loading.value = false
      if (isVisible) {
        pollTimer = setTimeout(poll, interval)
      }
    }
  }

  const handleVisibility = () => {
    isVisible = !document.hidden
    if (isVisible) {
      pollTimer = setTimeout(poll, 1000)
    }
  }

  const start = () => {
    document.removeEventListener("visibilitychange", handleVisibility)
    document.addEventListener("visibilitychange", handleVisibility)
    poll()
  }

  const stop = () => {
    abortController?.abort()
    if (pollTimer) {
      clearTimeout(pollTimer)
      pollTimer = null
    }
    document.removeEventListener("visibilitychange", handleVisibility)
  }

  return { data, loading, error, start, stop }
}
