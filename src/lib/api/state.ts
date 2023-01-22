import axios from 'axios'
import type { StateResponse } from '$lib/types/api.types'

export async function fetchState(): Promise<StateResponse> {
	const response = await axios.get<StateResponse>('/state')
	return response.data
}
