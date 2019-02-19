export type MSDTags = Record<string, MSDTagMap>;
export interface MSDTagMap {
	comment?: string;
	positions: MSDTagMapElement[];
}
export interface MSDTagMapElement {
	position: number;
	stdPosition: number;
	comment?: string;
	values: Record<string, MSDTagValue>;
}

export interface MSDTagValue {
	char: string;
	comment?: string;
}
