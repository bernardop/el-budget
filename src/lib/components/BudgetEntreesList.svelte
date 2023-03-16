<script lang="ts">
	import BudgetEntree from './BudgetEntree.svelte'
	import { Card } from 'flowbite-svelte'
	import { formatMoney } from '$lib/utils/currency'
	import type { Database } from '$lib/supabase/types'

	export let entrees: Database['public']['Tables']['budget_entrees']['Row'][]

	$: total = formatMoney(entrees.reduce((total, { amount }) => total + amount, 0))
</script>

<Card size="xl">
	<slot name="title" />
	<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
		<tbody>
			{#each entrees as entree (entree.id)}
				<BudgetEntree {entree} />
			{/each}
		</tbody>
		<tfoot>
			<tr class="font-semibold text-gray-900 dark:text-white">
				<th scope="row" class="py-3 px-6 text-base">Total</th>
				<td class="py-3 px-6">{total}</td>
			</tr>
		</tfoot>
	</table>
</Card>
