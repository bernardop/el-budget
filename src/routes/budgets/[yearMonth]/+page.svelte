<script lang="ts">
	import BudgetEntreesList from '$lib/components/BudgetEntreesList.svelte'
	import { Card, Heading } from 'flowbite-svelte'
	import type { PageServerData } from './$types'

	export let data: PageServerData

	$: incomeEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'income'
	)

	$: fixedEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'fixed_expense'
	)

	$: variableEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'variable_expense'
	)
</script>

<div>
	<Heading tag="h1">{data.budget?.year_month_text}</Heading>
	<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
		<div class="flex flex-col gap-4">
			<Card size="xl">
				<Heading tag="h2">Summary</Heading>
			</Card>
			<BudgetEntreesList entrees={fixedEntrees}>
				<Heading tag="h2" slot="title">Fixed Expenses</Heading>
			</BudgetEntreesList>
		</div>
		<div class="flex flex-col gap-4">
			<BudgetEntreesList entrees={incomeEntrees}>
				<Heading tag="h2" slot="title">Income</Heading>
			</BudgetEntreesList>
			<BudgetEntreesList entrees={variableEntrees}>
				<Heading tag="h2" slot="title">Variable Expenses</Heading>
			</BudgetEntreesList>
		</div>
	</div>
</div>
