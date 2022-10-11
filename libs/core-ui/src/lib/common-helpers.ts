import { useRef } from 'react'

let uid = 0
const uniqueId = () => uid++

const generateElementId = (prefix: string): string =>
	prefix.concat(uniqueId().toString())

export function useUniqueId(providedId?: string): string {
	const ref = useRef<string | null>(providedId ?? null)
	if (!ref.current) ref.current = generateElementId('element')
	return ref.current
}
