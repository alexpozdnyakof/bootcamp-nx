import { ReactNode } from 'react'
import { Box } from '../box'
import { Portal } from '../portal'
import { PortalProps, registerPortalRoot } from '../portal/portal'
import styles from './modal.module.less'

const Backdrop = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['backdrop']}>{children}</Box>
}

const Center = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['center']}>{children}</Box>
}

function checkCustomContainer(containerName: string | undefined) {
	if (!containerName) return
	const customRoot = document.querySelector(`#`.concat(containerName))
	if (customRoot) {
		registerPortalRoot(customRoot, containerName)
	}
}

type ModalProps = {
	isOpen: boolean
	children: ReactNode
} & JSX.IntrinsicElements['div'] &
	Pick<PortalProps, 'containerName'>

export function Modal({
	isOpen,
	containerName,
	children,
	...props
}: ModalProps) {
	if (!isOpen) return null

	checkCustomContainer(containerName)

	return (
		<Portal containerName={containerName}>
			<Backdrop>
				<Center>
					<Box className={styles['dialog']} {...props}>
						<Box className={styles['dialog-content']}>
							<Center>{children}</Center>
						</Box>
					</Box>
				</Center>
			</Backdrop>
		</Portal>
	)
}

export default Modal
