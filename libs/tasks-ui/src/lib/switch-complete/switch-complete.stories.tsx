import { useState } from 'react'
import SwitchComplete from './switch-complete'

export default {
	component: SwitchComplete,
	title: 'SwitchComplete',
}

export function Interactive() {
	const [done, setDone] = useState<boolean>(false)
	return <SwitchComplete done={done} onClick={() => setDone(d => !d)} />
}
