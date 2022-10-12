import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactNode,
	SVGProps,
} from 'react'
import { Box, BoxProps } from '../box'
import { useUniqueId } from '../common-helpers'
import { Tone } from '../common-types'
import { Spinner } from '../spinner'
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

const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='16px'
		height='16px'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8.66667 10.3333C8.66667 10.7015 8.36819 11 8 11C7.63181 11 7.33333 10.7015 7.33333 10.3333C7.33333 9.96514 7.63181 9.66667 8 9.66667C8.36819 9.66667 8.66667 9.96514 8.66667 10.3333ZM8.65766 5.65766C8.65766 5.29445 8.36322 5 8 5C7.99087 5.00008 7.98631 5.00013 7.98175 5.00025C7.97719 5.00038 7.97263 5.00059 7.96352 5.00101C7.60086 5.02116 7.3232 5.33149 7.34335 5.69415L7.50077 8.52774C7.53575 9.15742 8.46425 9.15742 8.49923 8.52774L8.65665 5.69415C8.65707 5.68503 8.65728 5.68047 8.65741 5.67591C8.65754 5.67135 8.65758 5.66679 8.65766 5.65766Z'
			fill='currentColor'
		/>
	</svg>
)

type FieldTone = 'neutral' | 'success' | 'error' | 'loading'

type MessageProps = HintProps & {
	tone: FieldTone
}

const FieldMessage = ({ id, children, tone }: MessageProps) => {
	const toneMap: Record<FieldTone, Tone> = {
		error: 'danger',
		success: 'positive',
		neutral: 'normal',
		loading: 'normal',
	}
	const textTone = toneMap[tone]

	return (
		<Text as='p' tone={textTone} size='copy' id={id}>
			<Box
				as='span'
				marginRight='xsmall'
				display='inlineFlex'
				className={styles['messgeIcon']}
			>
				{tone === 'loading' ? (
					<Spinner size={16} />
				) : (
					<MessageIcon aria-hidden />
				)}
			</Box>
		</Text>
	)
}

export type BaseFieldProps = {
	label?: ReactNode
	secondaryLabel?: ReactNode
	auxiliaryLabel?: ReactNode
	hint?: ReactNode
	maxWidth?: BoxProps['maxWidth']
	className?: BoxProps['className']
	message?: React.ReactNode
	tone?: FieldTone
	children: (props: { id: string; 'aria-describedby'?: string }) => ReactNode
} & Pick<
	HtmlInputFieldProps<HTMLInputElement>,
	'id' | 'hidden' | 'aria-describedby'
>

export type FieldComponentProps<T extends HTMLElement> = Omit<
	BaseFieldProps,
	'children' | 'className'
> &
	Omit<HtmlInputFieldProps<T>, 'className' | 'style'>

export function BaseField({
	label,
	secondaryLabel,
	auxiliaryLabel,
	hint,
	className,
	children,
	maxWidth,
	hidden,
	message,
	tone = 'neutral',
	'aria-describedby': originalAriaDescribedBy,
	id: originalId,
}: BaseFieldProps) {
	const id = useUniqueId(originalId)
	const hintId = useUniqueId()
	const messageId = useUniqueId()

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
			{message ? (
				<FieldMessage id={messageId} tone={tone}>
					{message}
				</FieldMessage>
			) : null}
			{hint ? (
				<FieldHint hidden={hidden} id={hintId}>
					{hint}
				</FieldHint>
			) : null}
		</Stack>
	)
}

export default BaseField
