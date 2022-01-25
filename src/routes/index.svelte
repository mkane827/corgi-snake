<script lang="ts">
	import { Direction } from '$lib/enums/Direction';
	import { Speed } from '$lib/enums/Speed';
	import { SnackoStore } from '$lib/stores/SnackoStore';
	import { SnakeStore } from '$lib/stores/SnakeStore';
	import Cell from '$lib/cell/Cell.svelte';
	import PlayButton from '$lib/PlayButton.svelte';
	import SpeedSelector from '$lib/SpeedSelector.svelte';
	import { get, writable } from 'svelte/store';
	import { getHighScores } from '$lib/db/scores';
	import NewHighScore from '$lib/NewHighScore.svelte';
	import { onMount } from 'svelte';

	const MAX_DIM = 20;
	const TICK_SPEED = 100;
	const DIMS = [];
	for (let i = 1; i <= MAX_DIM; i++) {
		DIMS.push(i);
	}
	const CODE_TO_DIRECTION = {
		ArrowUp: Direction.UP,
		ArrowDown: Direction.DOWN,
		ArrowLeft: Direction.LEFT,
		ArrowRight: Direction.RIGHT
	};

	let snake = new SnakeStore();
	let speed = Speed.TREATOS;
	let isPlaying = false;
	let snacko = new SnackoStore(MAX_DIM);
	let score = 0;
	let highScores = writable([]);
	let isGameOver = writable(false);
	let isFirstGame = true;
	let hasSubmittedNewHighScore = writable(false);
	let hasDirectionChangedSinceLastMove = false;
	let queuedDirection: Direction;
	let tick = 0;

	onMount(() => {
		getHighScores().then(highScores.set);
		hasSubmittedNewHighScore.subscribe(() => {
			getHighScores().then(highScores.set);
		});
	});

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
			isGameOver.set(true);
		}
	}, TICK_SPEED);

	function handlePlayButton() {
		isFirstGame = false;
		if (get(isGameOver)) {
			snake.reset();
			isGameOver.set(false);
			hasSubmittedNewHighScore.set(false);
			score = 0;
		}
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
		const newDirection = CODE_TO_DIRECTION[e.code];
		if (newDirection) {
			e.preventDefault();
			isPlaying = true;
			changeDirection(newDirection);
		}
	}

	function nom() {
		score++;
		snacko.move();
		snake.nom();
	}

	$: showHighScoreDialog =
		$isGameOver &&
		!$hasSubmittedNewHighScore &&
		score > 0 &&
		$highScores.length > 9 &&
		score > $highScores[9].score;
</script>

<svelte:window on:keydown={handleKeyPress} on:blur={() => (isPlaying = false)} />
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
		<SpeedSelector bind:speed disabled={!isFirstGame && !$isGameOver} />
		<h1>🏆 {score}</h1>
		<h2 class="game-over">
			{$isGameOver ? 'GAME OVER - WOOF WOOF' : ''}
		</h2>
		<h2>Leaderboard</h2>
		<ol>
			{#each $highScores as score}
				<li class="high-score">
					<span class="high-score-name">{score.name}</span>
					{score.score}
				</li>
			{/each}
		</ol>
	</div>

	{#if showHighScoreDialog}
		<NewHighScore {score} {hasSubmittedNewHighScore} />
	{/if}
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

	.high-score {
		font-size: 14px;
	}

	.high-score-name {
		text-transform: uppercase;
		font-weight: bold;
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
