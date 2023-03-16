<script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte'
	import { fade } from 'svelte/transition'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { formatMoney } from '$lib/utils/currency'
	import type { Database } from '$lib/supabase/types'
	import type { Action } from 'svelte/action'
	import type { FocusEventHandler, MouseEventHandler } from 'svelte/elements'

	export let entree: Database['public']['Tables']['budget_entrees']['Row']

	let isEditing = false
	// let optimisticUI: { isUpdating: boolean; name: string; amount: string } = {
	// 	isUpdating: false,
	// 	name: '',
	// 	amount: ''
	// }

	const toggleEditingDblClick = () => {
		isEditing = !isEditing
	}

	// const toggleEditingBlur: FocusEventHandler<HTMLInputElement> = (event) => {
	// 	if (event.currentTarget?.dataset?.field) {
	// 		isEditing[event.currentTarget.dataset.field] = !isEditing[event.currentTarget.dataset.field]
	// 	}
	// }

	// const setFocus: Action<HTMLInputElement> = (node) => {
	// 	node.focus()
	// }

	// const setOptimisticUI: SubmitFunction = ({ data, form }) => {
	// 	const theElem = form.elements.namedItem('name') as HTMLInputElement
	// 	theElem.blur()
	// 	optimisticUI.isUpdating = true
	// 	if (data.get('name')) optimisticUI.name = String(data.get('name'))
	// 	if (data.get('value')) optimisticUI.amount = String(data.get('amount'))

	// 	return async ({ update }) => {
	// 		await update()
	// 		optimisticUI.isUpdating = false
	// 		optimisticUI.name = ''
	// 		optimisticUI.amount = ''
	// 	}
	// }
</script>

<tr
	class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
	on:dblclick={toggleEditingDblClick}
>
	{#if isEditing}
		<td class="px-6 py-4" colspan="2" in:fade>
			<form method="POST" action="?/updateEntreeName">
				<input name="id" type="hidden" value={entree.id} />
				<div class="mb-6">
					<FloatingLabelInput
						id="entree-name"
						name="entree-name"
						type="text"
						label="Name"
						value={entree.name}
					/>
				</div>
				<div class="mb-6">
					<FloatingLabelInput
						id="entree-amount"
						name="entree-amount"
						type="text"
						label="Amount"
						value={(entree.amount / 100).toFixed(2)}
					/>
				</div>
				<div class="mb-6">
					<FloatingLabelInput
						id="entree-date"
						name="entree-date"
						type="date"
						label="Date"
						value={entree.date || void 0}
					/>
				</div>
				<input type="submit" class="hidden" />
			</form>
		</td>
	{:else}
		<th
			scope="row"
			class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
			in:fade
		>
			<span data-field="name">{entree.name}</span>
		</th>
		<td class="px-6 py-4" in:fade>
			<span data-field="amount">{formatMoney(entree.amount)}</span>
		</td>
	{/if}
</tr>
