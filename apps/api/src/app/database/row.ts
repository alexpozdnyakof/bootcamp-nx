export type Row<
	EntityColumns extends { [key: string]: string | boolean | number }
> = EntityColumns & { id: UniqueId; created: string; updated: string }
