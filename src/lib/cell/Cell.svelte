<script lang="ts">
	import type { SnackoStore } from '$lib/stores/SnackoStore';
	import type { SnakeStore } from '$lib/stores/SnakeStore';
	import { derived } from 'svelte/store';
	import ButtCell from './ButtCell.svelte';
	import HeadCell from './HeadCell.svelte';

	export let snake: SnakeStore;
	export let snacko: SnackoStore;
	export let x: number;
	export let y: number;
	export let nom: () => void;

	let cellClass = '';

	$: snakeBody = snake.body;
	$: snakeLength = $snakeBody.length;
	$: snakeHead = $snakeBody[0];
	$: snakeButt = $snakeBody[snakeLength - 1];
	$: isHead = snakeHead.isAt(x, y);
	$: isButt = snakeButt.isAt(x, y);
	$: snakeSegmentsAreAt = $snakeBody.map((s) => s.isAt(x, y));
	$: isSnake = derived(snakeSegmentsAreAt, (values) =>
		values.reduce((anyAt, s) => anyAt || s, false)
	);
	$: isSnacko = snacko.isAt(x, y);
	$: snackoIcon = snacko.snacko;
	$: corgiIndex = snake.corgiIndex;
	$: {
		if ($isHead && $isSnacko) {
			nom();
		} else if ($isSnake) {
			cellClass = 'snake';
		} else if ((x + y) % 2 === 0) {
			cellClass = 'even';
		} else {
			cellClass = 'odd';
		}
	}
</script>

{#if $isHead}
	<HeadCell index={$corgiIndex} direction={snake.direction} />
{:else if $isButt}
	<ButtCell index={$corgiIndex} direction={snake.buttDirection} />
{:else if $isSnacko}
	<td class="snacko">
		<span>{$snackoIcon}</span>
	</td>
{:else}
	<td class={cellClass} />
{/if}

<style>
	td {
		height: 22px;
		width: 22px;
		font-size: 13px;
		text-align: center;
		vertical-align: middle;
	}

	.snake {
		background: #d4ab72;
	}

	.snacko {
		position: relative;
	}

	.snacko span {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: visible;
		animation-name: pulsate;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
	}

	.even {
		background: #d4efdf;
	}

	.odd {
		background: #7dcea0;
	}
</style>
