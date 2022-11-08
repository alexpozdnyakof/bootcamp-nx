import { ComponentProps, useState } from 'react'
import { BoxMaxMinWidth } from '../box/box'
import { Button } from '../button'
import { Text } from '../text'
import { selectWithNone } from '../storybook-helpers'
import { Modal } from './modal'

export default {
	component: Modal,
	title: 'Modal',
}

export function Interactive({ width, title }: ComponentProps<typeof Modal>) {
	const [isOpen, setOpen] = useState<boolean>(false)
	const toggleModal = () => setOpen(o => !o)
	return (
		<>
			<div id='__anotherRoot__'></div>
			<Button onClick={toggleModal}>モーダルを開く</Button>
			{isOpen && (
				<Modal
					onClose={toggleModal}
					width={width}
					title={title}
					buttons={
						<>
							<Button>閉じる</Button>
							<Button variant='secondary'>閉じる</Button>
						</>
					}
				>
					<Text>
						性別に基づく無意識の思い込み＝アンコンシャス・バイアスについて内閣府が行った調査で、「男性は仕事をして家計を支えるべき」と答えた割合が男女ともにおよそ半数となったことがわかりました。
						内閣府はことし、性別に基づく役割などの思い込みについて、20代から60代の男女1万906人を対象に調査を行いました。
						そのなかで、男女ともに最も多かった思い込みは、「男性は仕事をして家計を支えるべき」で、男性では48.7パーセント、女性では44.9パーセントでした。
						また、仕事と育児について聞いた項目では、「仕事より育児を優先する男性は仕事へのやる気が低い」と回答した割合は、性別・年代別では、20代の男性が最も多く18.9パーセントで、20代の女性はおよそ半分の9.4パーセントでした。
					</Text>
				</Modal>
			)}
		</>
	)
}

Interactive.argTypes = {
	width: selectWithNone<BoxMaxMinWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'none'
	),
	title: {
		control: { type: 'text' },
		defaultValue: 'モーダルウィンドウ',
	},
}
