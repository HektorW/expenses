<script lang="ts">
	import { locale } from '$lib/constants/locale'

	export let amount: number
	export let currency = 'SEK'

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	})
</script>

<span>{formatter.format(amount)}</span>
