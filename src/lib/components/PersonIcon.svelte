<script lang="ts">
	import type { Person } from '$lib/types/app.types'
	import { getPersonInitials } from '$lib/utils/personUtils'

	export let person: Person
</script>

<span style:background-color={person.color}>
	{getPersonInitials(person)}
</span>

<style lang="scss">
	span {
		--size: 1.5em;

		align-items: center;
		border-radius: 50%;
		display: inline-flex;
		height: var(--size);
		justify-content: center;
		width: var(--size);
	}
</style>
