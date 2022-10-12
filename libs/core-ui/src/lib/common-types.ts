export type Space =
	| 'xsmall'
	| 'small'
	| 'medium'
	| 'large'
	| 'xlarge'
	| 'xxlarge'
export type SpaceWithNegatives = Space | `-${Space}`

export type Tone = 'normal' | 'secondary' | 'danger' | 'positive'
