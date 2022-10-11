import { renderHook } from '@testing-library/react'
import { useUniqueId } from './common-helpers'

test('it generates random id when custom id not provided', () => {
	const { result } = renderHook(() => useUniqueId())
	expect(result.current).toBe('element0')
})

test('it should increment element id for every new hook call', () => {
	const { result } = renderHook(
		() => (useUniqueId(), useUniqueId(), useUniqueId())
	)
	expect(result.current).toBe('element3')
})

test('it generates passed id', () => {
	const { result } = renderHook(() => useUniqueId('providedId'))
	expect(result.current).toBe('providedId')
})
