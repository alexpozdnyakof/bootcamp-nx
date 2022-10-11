import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { Box, BoxProps } from '../box'
import { useUniqueId } from '../common-helpers'
import { Stack } from '../stack'
import { Text } from '../text'
import styles from './base-field.module.less'

type HtmlInputFieldProps<T extends HTMLElement> = DetailedHTMLProps<
	InputHTMLAttributes<T>,
	T
>
type HintProps = {
	id: string
	children: ReactNode
	hidden?: boolean
}

const FieldHint = (props: HintProps) => (
	<Text as='p' tone='secondary' size='copy' {...props} />
)

export type BaseFieldProps = {
	label?: ReactNode
	secondaryLabel?: ReactNode
	auxiliaryLabel?: ReactNode
	hint?: ReactNode
	maxWidth?: BoxProps['maxWidth']
	className: BoxProps['className']
	children: (props: { id: string; 'aria-describedby'?: string }) => ReactNode
} & Pick<
	HtmlInputFieldProps<HTMLInputElement>,
	'id' | 'hidden' | 'aria-describedby'
>

export function BaseField({
	label,
	secondaryLabel,
	auxiliaryLabel,
	hint,
	className,
	children,
	maxWidth,
	hidden,
	'aria-describedby': originalAriaDescribedBy,
	id: originalId,
}: BaseFieldProps) {
	const id = useUniqueId(originalId)
	const hintId = useUniqueId()

	return (
		<Stack space='small'>
			<Box
				className={[className, styles['container']]}
				maxWidth={maxWidth}
				hidden={hidden}
			>
				<Box
					as='span'
					display='flex'
					justifyContent='spaceBetween'
					alignItems='flexEnd'
					paddingBottom='small'
				>
					<Text size='body' as='label' htmlFor={id}>
						{label ? (
							<span className={styles['primaryLabel']}>
								{label}
							</span>
						) : null}
						{secondaryLabel ? (
							<span className={styles['secondaryLabel']}>
								&nbsp;({secondaryLabel})
							</span>
						) : null}
					</Text>
					{auxiliaryLabel ? (
						<Box
							className={styles['auxiliaryLabel']}
							paddingLeft='small'
						>
							{auxiliaryLabel}
						</Box>
					) : null}
				</Box>
				{children({ id })}
			</Box>
			{hint ? (
				<FieldHint hidden={hidden} id={hintId}>
					{hint}
				</FieldHint>
			) : null}
		</Stack>
	)
}

export default BaseField
