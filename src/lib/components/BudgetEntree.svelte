<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Input,
		InputAddon,
		Label,
		Secondary,
		Spinner
	} from 'flowbite-svelte'
	import { fade, type FadeParams } from 'svelte/transition'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { formatMoney } from '$lib/utils/currency'
	import { plainDateToMMDDYYY } from '$lib/utils/dates'
	import { quartIn } from 'svelte/easing'
	import type { Database } from '$lib/supabase/types'
	import type { Action } from 'svelte/action'

	export let entree: Database['public']['Tables']['budget_entrees']['Row']

	const fadeParams: FadeParams = { duration: 300, easing: quartIn }
	let isEditing = false
	let isUpdating = false

	const toggleEditing = () => {
		isEditing = !isEditing
	}

	const setFocus: Action<HTMLInputElement> = (node) => {
		node.focus()
	}

	const updateEntree: SubmitFunction = () => {
		isUpdating = true

		return async ({ update }) => {
			await update()
			isUpdating = false
			isEditing = false
		}
	}
</script>

<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800" on:dblclick={toggleEditing}>
	{#if isEditing}
		<td class="px-6 py-4" colspan="2" in:fade={fadeParams}>
			<form method="POST" action="?/updateEntreeName" use:enhance={updateEntree}>
				<input name="entree_id" type="hidden" value={entree.id} />
				<div class="mb-4">
					<Label for="entree_name" class="mb-2">Name</Label>
					<Input let:props>
						<input
							id="entree_name"
							name="entree_name"
							type="text"
							value={entree.name}
							{...props}
							use:setFocus
						/>
					</Input>
				</div>

				<div class="mb-4">
					<Label for="entree_amount" class="mb-2">Amount</Label>
					<ButtonGroup class="w-full" size="md">
						<InputAddon>$</InputAddon>
						<Input
							id="entree_amount"
							name="entree_amount"
							type="text"
							value={(entree.amount / 100).toFixed(2)}
						/>
					</ButtonGroup>
				</div>
				<div class="mb-4">
					<Label for="entree_date" class="mb-2">Date</Label>
					<Input id="entree_date" name="entree_date" type="date" value={entree.date || void 0} />
				</div>
				{#if isUpdating}
					<Button disabled>
						<Spinner class="mr-2" size="4" color="white" />
						Updating...
					</Button>
				{:else}
					<Button type="submit">Update</Button>
				{/if}
				<Button color="light" class="ml-2" on:click={toggleEditing}>Cancel</Button>
			</form>
		</td>
	{:else}
		<th
			scope="row"
			class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
			in:fade={fadeParams}
		>
			<span data-field="name">
				{entree.name}
				{#if entree.date}
					<Secondary class="ml-2">{plainDateToMMDDYYY(entree.date)}</Secondary>
				{/if}
			</span>
		</th>
		<td class="px-6 py-4" in:fade={fadeParams}>
			<span data-field="amount">{formatMoney(entree.amount)}</span>
		</td>
	{/if}
</tr>
