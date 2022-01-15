<script lang="ts">
	import { Direction } from '$lib/enums/Direction';
	import { Speed } from '$lib/enums/Speed';
	import { Snacko } from '$lib/stores/SnackoStore';
	import { SnakeStore } from '$lib/stores/SnakeStore';
	import Cell from '$lib/cell/Cell.svelte';
	import PlayButton from '$lib/PlayButton.svelte';
	import SpeedSelector from '$lib/SpeedSelector.svelte';

	const MAX_DIM = 20;
	const TICK_SPEED = 100;
	const DIMS = [];
	for (let i = 1; i <= MAX_DIM; i++) {
		DIMS.push(i);
	}
	let snake = new SnakeStore();
	let speed = Speed.TREATOS;
	let isPlaying = false;
	let snacko = new Snacko(MAX_DIM);
	let score = 0;
	let isGameOver = false;
	let hasDirectionChangedSinceLastMove = false;
	let queuedDirection: Direction;
	let tick = 0;

	setInterval(() => {
		tick = (tick + 1) % speed;
		if (tick !== 0) return;
		if (isPlaying) {
			snake.move();
			hasDirectionChangedSinceLastMove = false;

			if (queuedDirection) {
				changeDirection(queuedDirection);
				queuedDirection = null;
			}
		}

		if (snake.check(MAX_DIM)) {
			isPlaying = false;
			isGameOver = true;
		}
	}, TICK_SPEED);

	function restartGame() {
		snake = new SnakeStore();
		isGameOver = false;
		score = 0;
	}

	function handlePlayButton() {
		isPlaying = !isPlaying;
	}

	function changeDirection(direction: Direction) {
		if (hasDirectionChangedSinceLastMove) {
			queuedDirection = direction;
		} else {
			snake.direction = direction;
			hasDirectionChangedSinceLastMove = true;
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		e.preventDefault();
		switch (e.code) {
			case 'ArrowUp':
				changeDirection(Direction.UP);
				break;
			case 'ArrowDown':
				changeDirection(Direction.DOWN);
				break;
			case 'ArrowLeft':
				changeDirection(Direction.LEFT);
				break;
			case 'ArrowRight':
				changeDirection(Direction.RIGHT);
				break;
		}
	}

	function nom() {
		score++;
		snacko.move();
		snake.nom();
	}
</script>

<svelte:body on:keydown={handleKeyPress} />
<div class="game-screen">
	<table>
		<tbody>
			{#each DIMS as y}
				<tr>
					{#each DIMS as x}
						<Cell {x} {y} {snake} {snacko} {nom} />
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<div>
		<PlayButton {isPlaying} onClick={handlePlayButton} />
		<SpeedSelector bind:speed />
		<h1>🏆 {score}</h1>
		<h2 class="game-over">
			{isGameOver ? 'GAME OVER - WOOF WOOF' : ''}
		</h2>
	</div>
</div>

<style lang="scss">
	.game-screen {
		display: flex;

		table {
			flex: 0 0 auto;
			margin-right: 16px;
		}
	}
	table {
		border: solid 4px #5dade2;
		border-collapse: collapse;
	}

	@keyframes -global-pulsate {
		0% {
			font-size: 22px;
		}

		50% {
			font-size: 25px;
			top: -3px;
			left: -10px;
			right: -10px;
			bottom: -10px;
		}

		100% {
			font-size: 22px;
		}
	}
</style>
