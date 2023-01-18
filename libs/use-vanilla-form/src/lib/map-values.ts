type Entries<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T][]

export function mapValues<V, T extends object>(
	object: T,
	fn: (x: T[keyof T]) => V
): Record<keyof T, V> {
	object = Object(object)
	const entries = Object.entries(object) as Entries<T>
	return entries.reduce((acc, [key, value]) => {
		acc[key] = fn(value)
		return acc
	}, {} as Record<keyof T, V>)
}
