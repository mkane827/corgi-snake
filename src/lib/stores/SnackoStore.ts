import { derived, type Readable, type Writable, writable } from 'svelte/store';

const SNACKOS = [
	'🍑',
	'🍉',
	'🍓',
	'🍏',
	'🥦',
	'🥕',
	'🍌',
	'🍊',
	'🥔',
	'🥐',
	'🌭',
	'🍗',
	'🥩',
	'🐞'
];

function getRandomNumber(maxDim: number): number {
	return Math.ceil((Math.random() * 1000) % maxDim);
}

function getRandomSnacko(): string {
	return SNACKOS[Math.floor((Math.random() * 1000) % SNACKOS.length)];
}

export class Snacko {
	#maxDim: number;
	#x: Writable<number>;
	#y: Writable<number>;
	#snacko: Writable<string>;

	constructor(maxDim: number) {
		this.#maxDim = maxDim;
		this.#x = writable(getRandomNumber(maxDim));
		this.#y = writable(getRandomNumber(maxDim));
		this.#snacko = writable(getRandomSnacko());
	}

	get x(): Writable<number> {
		return this.#x;
	}

	get y(): Writable<number> {
		return this.#y;
	}

	get snacko(): Writable<string> {
		return this.#snacko;
	}

	isAt(x: number, y: number): Readable<boolean> {
		return derived([this.#x, this.#y], ([$x, $y]) => $x === x && $y === y);
	}

	move(): void {
		this.#x.set(getRandomNumber(this.#maxDim));
		this.#y.set(getRandomNumber(this.#maxDim));
		this.#snacko.set(getRandomSnacko());
	}
}
