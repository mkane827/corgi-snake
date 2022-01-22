import { get, type Readable, type Writable, writable } from 'svelte/store';
import { Direction } from '../enums/Direction';
import { Segment } from './SegmentStore';

function getNewSnakeBody() {
	return [new Segment(10, 10), new Segment(10, 11), new Segment(10, 12), new Segment(10, 13)];
}

function getRandomCorgiIndex() {
	return Math.floor((Math.random() * 1000) % 6);
}

export class SnakeStore {
	#body: Writable<Segment[]>;
	#direction: Writable<Direction>;
	#corgiIndex: Writable<number>;

	constructor() {
		this.#body = writable(getNewSnakeBody());
		this.#direction = writable(Direction.UP);
		this.#corgiIndex = writable(getRandomCorgiIndex());
	}

	get corgiIndex(): Writable<number> {
		return this.#corgiIndex;
	}

	get head(): Segment {
		return get(this.#body)[0];
	}

	get shoulder(): Segment {
		return get(this.#body)[1];
	}

	get butt(): Segment {
		return get(this.#body)[this.length - 1];
	}

	set direction(direction: Direction) {
		const { x, y } = get(this.head.coordinates);
		if (
			(direction === Direction.DOWN && this.hasSegmentAt(x, y + 1)) ||
			(direction === Direction.UP && this.hasSegmentAt(x, y - 1)) ||
			(direction === Direction.RIGHT && this.hasSegmentAt(x + 1, y)) ||
			(direction === Direction.LEFT && this.hasSegmentAt(x - 1, y))
		) {
			return;
		}
		this.#direction.set(direction);
	}

	get buttDirection(): Direction {
		const { x: buttX, y: buttY } = get(this.butt.coordinates);
		const { x: hipX, y: hipY } = get(get(this.#body)[this.length - 2].coordinates);
		if (buttX < hipX) return Direction.RIGHT;
		if (buttX > hipX) return Direction.LEFT;
		if (buttY < hipY) return Direction.DOWN;
		return Direction.UP;
	}

	get length(): number {
		return get(this.#body).length;
	}

	get body(): Writable<Segment[]> {
		return this.#body;
	}

	move(): void {
		for (let i = get(this.#body).length - 1; i > 0; i--) {
			this.segmentAt(i).moveTo(this.segmentAt(i - 1));
		}
		this.head.moveInDirection(get(this.#direction));
	}

	segmentAt(index: number): Segment {
		return get(this.#body)[index];
	}

	check(maxDim: number): boolean {
		const { x, y } = get(this.head.coordinates);
		return (
			x < 1 ||
			y < 1 ||
			x > maxDim ||
			y > maxDim ||
			get(this.#body)
				.filter((segment) => segment !== this.head)
				.reduce(
					(gameOver: boolean, segment) =>
						gameOver || get(this.head.isAt(get(segment.x), get(segment.y))),
					false
				)
		);
	}

	hasSegmentAt(x: number, y: number): boolean {
		return get(this.body).reduce((anyAt, segment) => anyAt || get(segment.isAt(x, y)), false);
	}

	nom(): void {
		const { x: x1, y: y1 } = get(this.segmentAt(this.length - 1).coordinates);
		const { x: x2, y: y2 } = get(this.segmentAt(this.length - 2).coordinates);
		this.#body.update((body) => [...body, new Segment(2 * x1 - x2, 2 * y1 - y2)]);
	}

	reset(): void {
		this.#body.set(getNewSnakeBody());
		this.#direction.set(Direction.UP);
		this.#corgiIndex.set(getRandomCorgiIndex());
	}
}
