import { ForwardedRef, forwardRef, ReactNode } from 'react'
import { Box, BoxProps } from '../box'
import styles from './app-bar.module.less'

/* eslint-disable-next-line */
export type AppBarProps = {
	children: ReactNode
} & Pick<BoxProps, 'position' | 'background'>

const AppBar = forwardRef(
	(
		{ children, ...props }: AppBarProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<Box ref={ref} as='header' className={styles['app-bar']} {...props}>
				{children}
			</Box>
		)
	}
)

AppBar.displayName = 'AppBar'
export default AppBar
