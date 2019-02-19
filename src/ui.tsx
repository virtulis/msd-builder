import { UJSX, ujsx, ujsxToDOM, ujsxToHTML } from 'ujsx';

import './scss/bulder.scss'

export interface PickerParams<T> {
	label?: UJSX;
	items: PickerItem[];
	name: string;
	cls?: string;
	onchange?: PickerChangeHandler<T>;
}
export type PickerItem<T = string> = { value: string, label?: UJSX };
export type PickerChangeHandler<T = string> = (selected: T, name: string) => void;
export type PickerChangeHandlers = PickerChangeHandler<string> | PickerChangeHandler<string[]>
export interface PickerResult<T> {
	picker: HTMLElement;
	inputs: HTMLInputElement[];
	get: () => T;
}

export function picker(params: PickerParams<string[]> & { multiple: true }): PickerResult<string[]>;
export function picker(params: PickerParams<string>): PickerResult<string>;
export function picker(params: PickerParams<any>) {
	return pickerImpl(params);
}

function pickerImpl<T>({ label, items, name, multiple, onchange, cls }: PickerParams<T> & { multiple?: boolean }): PickerResult<T> {

	const inputs: HTMLInputElement[] = [];

	const get = () => {
		const vals = inputs.filter(el => el.checked).map(el => el.value);
		return (multiple ? vals : vals[0]) as any as T;
	};

	const handler = (e: Event) => {
		onchange && onchange(get() as any, name);
	};

	const input = (value: string) => {
		const el = ujsxToDOM(<input
			id={`${name}_${value}`}
			name={name}
			type={multiple ? 'checkbox' : 'radio'}
			value={value}
		/>) as HTMLInputElement;
		onchange && el.addEventListener('change', handler);
		inputs.push(el);
		return el;
	};

	const ul = <ul>{items.map(
		({ value, label }) => <li>
			{input(value)}
			<label htmlFor={`${name}_${value}`}>
				{label}
			</label>
		</li>
	)}</ul>;

	const picker = ujsxToDOM(<div className={`picker ${cls}`.trim()}>
		{label && <h3>{label}</h3>}
		{ul}
	</div>) as HTMLElement;

	return {
		picker,
		inputs,
		get
	};

}
