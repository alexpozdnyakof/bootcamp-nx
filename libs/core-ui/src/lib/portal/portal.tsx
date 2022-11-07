import { ReactNode, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
	children: ReactNode
	containerName?: string
}

const PORTAL_ROOT_ID = '__portalRoot__'
const DEFAULT_CONTAINER_NAME = '__default__'

const rootRegistry: Partial<Record<string, Element>> = {}

export function registerPortalRoot(
	root: Element,
	name = DEFAULT_CONTAINER_NAME
) {
	rootRegistry[name] = root
}

/**
 * 1. search in registry
 * 2. serrch in dom
 * 3. recreate if not exist
 * 4. paste in special root if needed
 */

function createDefaultContainer(id: string) {
	const result = document.createElement('div')
	result.setAttribute('id', id)
	result.style.position = 'absolute'
	result.style.top = '0'
	result.style.left = '0'

	return result
}

const safeDefaultPortal = () => {
	const existingContainer = rootRegistry[DEFAULT_CONTAINER_NAME]
	if (!existingContainer || !document.body.contains(existingContainer)) {
		let defaultContainer = document.getElementById(PORTAL_ROOT_ID)
		if (!(defaultContainer instanceof Element)) {
			defaultContainer = createDefaultContainer(PORTAL_ROOT_ID)
			document.body.appendChild(defaultContainer)
		}
		registerPortalRoot(defaultContainer)
	}
}

export function Portal({
	children,
	containerName: _containerName,
}: PortalProps) {
	const hostElement = document.createElement('div')
	hostElement.style.position = 'relative'
	hostElement.style.zIndex = '1'

	const elementRef = useRef(hostElement)

	useLayoutEffect(() => {
		let containerName = _containerName

		if (containerName === undefined) {
			containerName = DEFAULT_CONTAINER_NAME
			safeDefaultPortal()
		}

		const parentElement = rootRegistry[containerName]

		if (!parentElement)
			throw new Error(`Portal ${_containerName} not in registry`)
		const element = elementRef.current
		parentElement?.appendChild(element)

		return () => {
			parentElement?.removeChild(element)
		}
	}, [elementRef, _containerName])

	return createPortal(children, elementRef.current)
}

export default Portal
