import { Box } from '../box'
import { Icon } from '../icon'
import { polymorphicComponent } from '../polymorphic'
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
