const requestIdleCallback =
	typeof window !== 'undefined' && window.requestIdleCallback
		? window.requestIdleCallback
		: (callback: () => void) => setTimeout(callback, 50)

const cancelIdleCallback =
	typeof window !== 'undefined' && window.cancelIdleCallback
		? window.cancelIdleCallback
		: (id: number) => clearTimeout(id)

export function getParsedLocalStorageState<T, TRaw = T>(
	key: string,
	defaultState: T,
	transform?: (raw: TRaw) => T
): T {
	const rawState =
		typeof window !== 'undefined' ? window.localStorage.getItem(key) : null

	if (!rawState) {
		return defaultState
	}

	try {
		const parsed = JSON.parse(rawState)
		return transform ? transform(parsed as TRaw) : (parsed as T)
	} catch {
		return defaultState
	}
}

const requestedCallbackIds: Record<string, number> = {}

export function saveStateToLocalStorage(key: string, state: unknown): void {
	if (typeof window === 'undefined') {
		return
	}

	if (key in requestedCallbackIds) {
		cancelIdleCallback(requestedCallbackIds[key])
	}

	requestedCallbackIds[key] = requestIdleCallback(() => {
		if (state === null || state === undefined) {
			window.localStorage.removeItem(key)
		}

		window.localStorage.setItem(key, JSON.stringify(state))
	}) as number
}
