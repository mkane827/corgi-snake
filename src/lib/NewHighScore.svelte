<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { addScore } from './db/scores';

	export let score: number;
	export let hasSubmittedNewHighScore: Writable<boolean>;

	let name: string;

	function handleSubmit() {
		addScore(name, score);
		hasSubmittedNewHighScore.set(true);
	}
</script>

<div class="overlay">
	<div class="dialog">
		<h1>Such score! Much points!</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<label for="high-score-name">Name</label>
			<input
				id="high-score-name"
				name="high-score-name"
				type="text"
				maxlength="3"
				minlength="3"
				bind:value={name}
			/>

			<button type="submit">Bork!</button>
		</form>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog {
		padding: 24px;
		background: white;
	}
</style>
