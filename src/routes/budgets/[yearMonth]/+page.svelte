<script lang="ts">
	import { formatMoney } from '$lib/utils/currency'
	import type { PageServerData } from './$types'

	export let data: PageServerData

	let incomeEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'income'
	)

	let fixedEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'fixed_expense'
	)

	let variableEntrees = (data.budget?.budget_entrees || []).filter(
		({ entree_type }) => entree_type === 'variable_expense'
	)

	$: incomeTotal = formatMoney(incomeEntrees.reduce((total, { amount }) => total + amount, 0))
	$: fixedTotal = formatMoney(fixedEntrees.reduce((total, { amount }) => total + amount, 0))
	$: variableTotal = formatMoney(variableEntrees.reduce((total, { amount }) => total + amount, 0))
</script>

<div>
	<h1 class="text-3xl font-bold">{data.budget?.year_month_text}</h1>
	<section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
		<article class="card shadow-xl bg-base-300">
			<div class="card-body">
				<h2 class="card-title">Summary</h2>
			</div>
		</article>
		<article class="card shadow-xl bg-base-300">
			<div class="card-body">
				<h2 class="card-title">Income</h2>
				<table class="table w-full">
					<tbody>
						{#each incomeEntrees as entree (entree.id)}
							<tr>
								<td>{entree.name}</td>
								<td>{formatMoney(entree.amount)}</td>
							</tr>
						{/each}
						<tr>
							<td class="bg-accent text-base-100 font-bold">Total</td>
							<td class="bg-accent text-base-100 font-bold">{incomeTotal}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
		<article class="card shadow-xl bg-base-300">
			<div class="card-body">
				<h2 class="card-title">Fixed Expenses</h2>
				<table class="table w-full">
					<tbody>
						{#each fixedEntrees as entree (entree.id)}
							<tr>
								<td>{entree.name}</td>
								<td>{formatMoney(entree.amount)}</td>
							</tr>
						{/each}
						<tr>
							<td class="bg-accent text-base-100 font-bold">Total</td>
							<td class="bg-accent text-base-100 font-bold">{fixedTotal}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
		<article class="card shadow-xl bg-base-300">
			<div class="card-body">
				<h2 class="card-title">Variable Expenses</h2>
				<table class="table w-full">
					<tbody>
						{#each variableEntrees as entree (entree.id)}
							<tr>
								<td>{entree.name}</td>
								<td>{formatMoney(entree.amount)}</td>
							</tr>
						{/each}
						<tr>
							<td class="bg-accent text-base-100 font-bold">Total</td>
							<td class="bg-accent text-base-100 font-bold">{variableTotal}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
	</section>
</div>
