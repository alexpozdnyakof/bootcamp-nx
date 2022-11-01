import { ReactNode, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
	children: ReactNode
}

const PORTAL_ROOT_ID = '__portalRoot__'
const DEFAULT_CONTAINER_NAME = '__default__'

const rootRegistry: Partial<Record<string, Element>> = {}

const registerPortalRoot = (root: Element, name = DEFAULT_CONTAINER_NAME) => {
	rootRegistry[name] = root
}

/**
 * 1. search in registry
 * 2. serrch in dom
 * 3. recreate if not exist
 * 4. paste in special root if needed
 */

const safeDefaultPortal = () => {
	const existingContainer = rootRegistry[DEFAULT_CONTAINER_NAME]
	if (!existingContainer || !document.body.contains(existingContainer)) {
		let newDefaultContainer = document.getElementById(PORTAL_ROOT_ID)
		if (!(newDefaultContainer instanceof Element)) {
			newDefaultContainer = document.createElement('div')
			newDefaultContainer.setAttribute('id', PORTAL_ROOT_ID)
			newDefaultContainer.style.position = 'absolute'
			newDefaultContainer.style.top = '0'
			newDefaultContainer.style.left = '0'

			document.body.appendChild(newDefaultContainer)
		}
		registerPortalRoot(newDefaultContainer)
	}
}

export function Portal({ children }: PortalProps) {
	const hostElement = document.createElement('div')
	hostElement.style.position = 'relative'
	hostElement.style.zIndex = '1'
	const elementRef = useRef(hostElement)

	useLayoutEffect(() => {
		const containerName = DEFAULT_CONTAINER_NAME
		safeDefaultPortal()

		const parentElement = rootRegistry[containerName]
		const element = elementRef.current
		parentElement?.appendChild(element)

		return () => {
			parentElement?.removeChild(element)
		}
	}, [elementRef])

	return createPortal(children, elementRef.current)
}

export default Portal
