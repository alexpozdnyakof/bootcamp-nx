import { KeyboardEvent, cloneElement, ReactElement } from 'react'

type EventHandler = (event: React.SyntheticEvent) => void

type Key =
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'Enter'
	| 'Backspace'
	| 'Escape'

type EventHandlerProps = Partial<Record<`on${Key}`, EventHandler>>
type PropagateProps = Partial<Record<`propagate${Key}`, boolean>>

const eventHanlderMap: Record<Key, keyof EventHandlerProps> = {
	ArrowUp: 'onArrowUp',
	ArrowDown: 'onArrowDown',
	ArrowLeft: 'onArrowLeft',
	ArrowRight: 'onArrowRight',
	Enter: 'onEnter',
	Backspace: 'onBackspace',
	Escape: 'onEscape',
}

const propagationMap: Record<Key, keyof PropagateProps> = {
	ArrowUp: 'propagateArrowUp',
	ArrowDown: 'propagateArrowDown',
	ArrowLeft: 'propagateArrowLeft',
	ArrowRight: 'propagateArrowRight',
	Enter: 'propagateEnter',
	Backspace: 'propagateBackspace',
	Escape: 'propagateEscape',
}

function resolveByKey(eventKey: string): Key | null {
	switch (eventKey.toLowerCase()) {
		case 'left':
		case 'ArrowLeft': {
			return 'ArrowLeft'
		}
		case 'up':
		case 'ArrowUp': {
			return 'ArrowUp'
		}
		case 'right':
		case 'ArrowRight': {
			return 'ArrowRight'
		}
		case 'down':
		case 'ArrowDown': {
			return 'ArrowDown'
		}
		case 'enter': {
			return 'Enter'
		}
		case 'backspace': {
			return 'Backspace'
		}
		case 'esc':
		case 'escape': {
			return 'Escape'
		}
		default: {
			return null
		}
	}
}

type KeyCapturerProps = {
	eventName?: 'onKeyDown' | 'onKeyDownCapture' | 'onKeyUp' | 'onKeyUpCapture'
	children: ReactElement<unknown>
} & EventHandlerProps &
	PropagateProps

export function KeyCapturer({
	eventName = 'onKeyDown',
	children,
	...props
}: KeyCapturerProps) {
	function handleEvent(event: KeyboardEvent<HTMLInputElement>) {
		const key = resolveByKey(event.key) as Key
		if (!key) return

		const shouldPropagate = props[propagationMap[key]] || false
		const eventHandler = props[eventHanlderMap[key]]

		if (eventHandler) {
			eventHandler(event)
			if (!shouldPropagate) {
				event.preventDefault()
				event.stopPropagation()
			}
		}
	}

	return cloneElement(children, {
		[eventName]: handleEvent,
	})
}

export default KeyCapturer
