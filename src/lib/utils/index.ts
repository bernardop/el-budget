export function ensureArray<T>(thing: T | T[] | null): T[] {
	if (thing) {
		return Array.isArray(thing) ? thing : [thing]
	}

	return []
}
