import { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './editable-text.module.less'
import { Text } from '../text'
import { Box } from '../box'
import { TextProps } from '../text'
import { KeyCapturer } from '../key-capturer'

enum EditableTextMode {
	Idle,
	Edit,
}

export type EditableTextProps = {
	value: string
	onChange?: (newValue: string) => void
} & Omit<TextProps, 'children'>

export function EditableText({ value, onChange, ...props }: EditableTextProps) {
	const [mode, setMode] = useState<EditableTextMode>(EditableTextMode.Idle)
	const inputRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		inputRef.current?.focus()
	}, [mode])
	const setEdit = () => setMode(EditableTextMode.Edit)
	const setIdle = () => setMode(EditableTextMode.Idle)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		if (event.detail === 2) {
			setEdit()
		}
	}

	return (
		<KeyCapturer onEscape={setIdle}>
			<Box
				role='switch'
				aria-checked={mode === EditableTextMode.Edit}
				className={styles['editableText']}
				onClick={handleClick}
				tabIndex={0}
			>
				{mode === EditableTextMode.Edit ? (
					<Box
						as='input'
						className={styles['editableText-input']}
						aria-label={`Edit ${value}`}
						value={value}
						ref={inputRef}
						onBlur={setIdle}
					/>
				) : (
					<Text {...props}>{value}</Text>
				)}
			</Box>
		</KeyCapturer>
	)
}

export default EditableText
