import supabase from '$lib/supabase'
import { ensureArray } from '$lib/utils'
import { yearMonthToLongString } from '$lib/utils/dates'

import type { Actions, PageServerLoad } from './$types'
import type { Database } from '$lib/supabase/types'

type BudgetPageData = Database['public']['Tables']['budgets']['Row'] & {
	budget_entrees: Database['public']['Tables']['budget_entrees']['Row'][]
	year_month_text: string
}

export const load = (async ({ params }) => {
	const { data: budget } = await supabase
		.from('budgets')
		.select(
			`
      id,
      created_at,
      year_month,
      budget_entrees (
				amount,
				budget_id,
				created_at,
				date,
				entree_type,
				id,
				name,
				notes(*)
			),
			notes(*)
      `
		)
		.eq('year_month', params.yearMonth)
		.order('created_at', { foreignTable: 'budget_entrees', ascending: true })
		.single()

	if (budget) {
		const pageData: BudgetPageData = {
			...budget,
			budget_entrees: ensureArray(budget.budget_entrees),
			year_month_text: yearMonthToLongString(budget.year_month)
		}

		return {
			budget: pageData
		}
	}

	return {}
}) satisfies PageServerLoad

export const actions = {
	updateEntreeName: async ({ request }) => {
		const data = await request.formData()
		const id = data.get('id')
		const name = data.get('name')

		if (id && typeof id === 'string' && name && typeof name === 'string') {
			await supabase.from('budget_entrees').update({ name }).eq('id', Number(id))
		}
	}
} satisfies Actions
