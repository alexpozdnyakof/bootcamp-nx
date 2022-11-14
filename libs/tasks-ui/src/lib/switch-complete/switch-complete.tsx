import { Box, Icon, polymorphicComponent } from '@bootcamp-nx/core-ui'
import styles from './switch-complete.module.less'

export type SwitchCompleteProps = {
	done?: boolean
}

const SwitchComplete = polymorphicComponent<'button', SwitchCompleteProps>(
	({ done, onClick, ...props }, ref) => (
		<Box
			ref={ref}
			as='button'
			{...props}
			className={[styles['switchComplete']]}
			onClick={onClick}
			aria-checked={done}
			role='switch'
		>
			<Icon size='small'>done</Icon>
		</Box>
	)
)
SwitchComplete.displayName = 'SwitchComplete'

export default SwitchComplete
