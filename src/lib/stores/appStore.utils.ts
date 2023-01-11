export function getParsedLocalStorageState<T>(key: string, defaultState: T): T {
	const rawState =
		typeof window !== 'undefined' ? window.localStorage.getItem(key) : null

	try {
		return rawState ? (JSON.parse(rawState) as T) : defaultState
	} catch {
		return defaultState
	}
}

export function saveStateToLocalStorage(key: string, state: unknown): void {
	if (typeof window === 'undefined') {
		return
	}

	if (state === null || state === undefined) {
		window.localStorage.removeItem(key)
	}

	window.localStorage.setItem(key, JSON.stringify(state))
}
