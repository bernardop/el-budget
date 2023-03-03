import supabase from '$lib/supabase'
import { ensureArray } from '$lib/utils'
import { yearMonthToLongString } from '$lib/utils/dates'

import type { Database } from '$lib/supabase/types'
import type { PageServerLoad } from './$types'

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
      budget_entrees (*)
      `
		)
		.eq('year_month', params.yearMonth)
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
