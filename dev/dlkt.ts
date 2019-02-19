import { writeFileSync } from 'fs';
import { MSDTagMap, MSDTagMapElement, MSDTags } from '../src/tagsets/msd';
import { JSDOM } from 'jsdom';

async function main() {

	const dom = await JSDOM.fromURL('http://corpus.vdu.lt/en/morph');

	const ts = <MSDTags> {};
	let cmap = <MSDTagMap> {};
	let cmel = <MSDTagMapElement> {};
	let cnum = -1;

	for (let table of dom.window.document.querySelectorAll('table')) {

		const head = table.querySelector('thead');
		if (!head) continue;
		const htr = head.querySelector('tr');
		if (!htr || htr.querySelectorAll('th').length != 4) continue;

		cmap = null as any;

		const body = table.querySelector('tbody')!;
		for (let tr of body.querySelectorAll('tr')) {

			const [num, key, cmt, val] = Array.from(tr.querySelectorAll('td')).map(
				(td) => (td.textContent || '').trim() || undefined
			);

			if (num == '0') {
				cmap = {
					comment: cmt,
					positions: [],
				};
				ts[val!] = cmap;
			}

			if (num && num.length) {
				cnum = parseInt(num);
				cmel = {
					position: cmap.positions.length,
					stdPosition: cnum,
					comment: key,
					values: {},
				};
				if (cnum) cmel.values['-'] = {
					char: '-',
					comment: 'irrelevant',
				};
				cmap.positions.push(cmel);
			}

			if (!val) continue;

			cmel.values[val!] = {
				char: val!,
				comment: cmt,
			};

		}

	}

	writeFileSync('../src/tagsets/dlkt-data.json', JSON.stringify(ts, null, '\t'));

}

main();
