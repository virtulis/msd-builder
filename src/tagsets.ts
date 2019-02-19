import { dlkt } from './tagsets/dlkt';
import { MSDTags } from './tagsets/msd';

export interface TagSet<T extends MSDTags>{ // | ...;
	name: string;
	type: string;
	data: T;
}

export const tagsets: Record<string, TagSet<any>> = {
	dlkt
};
