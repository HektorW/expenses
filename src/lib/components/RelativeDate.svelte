<script lang="ts">
	import {
		getFullDateFormatted,
		getRelativeDateFormatted
	} from '$lib/utils/dateUtils'

	export let date: Date
</script>

<span title={getFullDateFormatted(date)}>{getRelativeDateFormatted(date)}</span>
