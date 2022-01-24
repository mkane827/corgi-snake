import { derived, get, writable, type Writable, type Readable } from 'svelte/store';
import { Direction } from '../enums/Direction';

export class Segment {
	#x: Writable<number>;
	#y: Writable<number>;

	constructor(x: number, y: number) {
		this.#x = writable(x);
		this.#y = writable(y);
	}

	get x(): Writable<number> {
		return this.#x;
	}

	get y(): Writable<number> {
		return this.#y;
	}

	get coordinates(): Readable<{ x: number; y: number }> {
		return derived([this.#x, this.#y], ([$x, $y]) => ({ x: $x, y: $y }));
	}

	moveTo(segment: Segment): void {
		const { x, y } = get(segment.coordinates);
		this.#x.set(x);
		this.#y.set(y);
	}

	moveInDirection(direction: Direction): void {
		switch (direction) {
			case Direction.UP:
				this.#y.update((y) => y - 1);
				break;
			case Direction.DOWN:
				this.#y.update((y) => y + 1);
				break;
			case Direction.LEFT:
				this.#x.update((x) => x - 1);
				break;
			case Direction.RIGHT:
				this.#x.update((x) => x + 1);
				break;
		}
	}

	isAt(x: number, y: number): Readable<boolean> {
		return derived([this.#x, this.#y], ([$x, $y]) => $x === x && $y === y);
	}
}
