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

export class Snacko {
	#x: number;
	#y: number;
	#snacko: string;

	constructor(maxDim: number) {
		this.#x = Math.ceil((Math.random() * 1000) % maxDim);
		this.#y = Math.ceil((Math.random() * 1000) % maxDim);
		this.#snacko = SNACKOS[Math.floor((Math.random() * 1000) % SNACKOS.length)];
	}

	get x(): number {
		return this.#x;
	}

	get y(): number {
		return this.#y;
	}

	get snacko(): string {
		return this.#snacko;
	}

	isAt(x: number, y: number): boolean {
		return this.#x === x && this.#y === y;
	}
}
