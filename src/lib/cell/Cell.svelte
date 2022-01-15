<script>
	import ButtCell from './ButtCell.svelte';
	import HeadCell from './HeadCell.svelte';

	export let snake;
	export let snacko;
	export let x;
	export let y;

	let cellClass;

	$: isHead = snake.isHeadAt(x, y);
	$: isButt = snake.isButtAt(x, y);
	$: isShoulder = snake.isShoulderAt(x, y);
	$: isSnake = snake.hasSegmentAt(x, y);
	$: isSnacko = snacko.isAt(x, y);
	$: corgiIndex = snake.corgiIndex;
	$: {
		if ($isShoulder) {
			cellClass = 'shoulder';
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
{:else if isSnacko}
	<td class="snacko">
		<span>{snacko.snacko}</span>
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

	.shoulder,
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
