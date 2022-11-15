import { ReactNode, useCallback, useState } from 'react'

type ExpandViewProps = {
	children: (toggleExpand: () => void, expanded: boolean) => ReactNode
	expanded?: boolean
}

export function ExpandView({
	children,
	expanded: initial = false,
}: ExpandViewProps) {
	const [state, _setState] = useState<boolean>(initial)
	const toggleState = useCallback(() => _setState(s => !s), [_setState])

	return <>{children(toggleState, state)}</>
}

export default ExpandView
