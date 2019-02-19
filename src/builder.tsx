import { ujsx } from 'ujsx';
import { append, create } from 'dtk';

import { TagSet, tagsets } from './tagsets';
import { picker, PickerResult } from './ui';
import { MSDTags } from './tagsets/msd';

console.log(tagsets);

const L = {
	tagset: 'Tagset',
	result: 'Result',
	pos: 'Part of speech',
};

function init() {

	const tsroot = create('div');
	const tspicker = picker({
		label: L.tagset,
		name: 'tagset',
		items: Object.entries(tagsets).map(([value, ts]) => ({ value, label: ts.name })),
		onchange: tsid => initTagSet(tsroot, tsid),
		cls: 'picker--horiz',
	});

	const page = create('div', 'builder', tspicker.picker, tsroot);
	document.body.append(page);

}

interface Common {
	root: HTMLElement;
	query: HTMLInputElement;
	result: HTMLDivElement;
	form: HTMLElement;
	setQuery: (res: string) => void;
}

function initTagSet(root: HTMLElement, tsid: string) {

	const tagset = tagsets[tsid];
	if (!tagset) return;

	const parse = create('button', {}, 'parse');

	const query = create('input', { className: 'builder__result', placeholder: L.result });
	const result = create('div', 'builder__result', query);

	const common: Common = {
		root,
		query,
		result,
		form: create('div', 'builder__form'),
		setQuery: res => common.query.value = res,
	};

	root.innerHTML = '';
	append(root, common.result, common.form);

	if (tagset.type == 'msd') initMSDTagSet(tagset, common);

}

function initMSDTagSet(tagset: TagSet<MSDTags>, common: Common) {

	const options = create('div', 'builder__options');

	const setPos = (pos: string) => {

		let pickers: PickerResult<string>[] = [];

		const update = () => common.setQuery(pos + pickers.map(p => p.get() || '-').join(''));

		options.innerHTML = '';

		const tpd = tagset.data[pos];
		pickers = tpd.positions.slice(1).map(pd => picker({
			name: `msd_${pos}_${pd.position}`,
			label: pd.comment,
			items: Object.values(pd.values).map(vd => ({
				value: vd.char,
				label: <span>
					<code>{vd.char}</code>{' '}
					{vd.comment}
				</span>,
			})),
			onchange: update
		}));

		append(options, pickers.map(pd => pd.picker));
		update();

	};

	const pos = picker({
		name: 'msd_pos',
		label: [<code>0</code>, L.pos],
		items: Object.entries(tagset.data).map(([posid, pos]) => ({
			value: posid,
			label: <span>
				<code>{posid}</code>{' '}
				{pos.comment}
			</span>,
		})),
		onchange: setPos,
		cls: 'builder__pos',
	});

	append(common.form, pos.picker, options);

}

init();
