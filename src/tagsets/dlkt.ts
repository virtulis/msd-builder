import { TagSet } from '../tagsets';
import { MSDTags } from './msd';

export const dlkt = <TagSet<MSDTags>> {
	name: 'Lithuanian (DLKT)',
	type: 'msd',
	data: require('./dlkt-data')
};
