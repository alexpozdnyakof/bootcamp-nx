import styles from './tooltip.module.less'

/* eslint-disable-next-line */
export interface TooltipProps {}

export function Tooltip(props: TooltipProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to Tooltip!</h1>
		</div>
	)
}

export default Tooltip
