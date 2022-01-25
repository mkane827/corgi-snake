<script lang="ts">
	import { onMount } from 'svelte';

	import type { Writable } from 'svelte/store';

	import { addScore } from './db/scores';

	export let score: number;
	export let hasSubmittedNewHighScore: Writable<boolean>;

	const LAST_USED_INITS_KEY = 'last-used-inits';
	let inits: string;

	onMount(() => {
		try {
			inits = localStorage.getItem(LAST_USED_INITS_KEY);
		} catch {}
	});

	function handleSubmit() {
		addScore(inits, score);
		localStorage.setItem(LAST_USED_INITS_KEY, inits);
		hasSubmittedNewHighScore.set(true);
	}
</script>

<div class="overlay">
	<div class="dialog">
		<h1>Such score! Much points!</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<label for="high-score-name">Enter your initials</label>
			<input
				id="high-score-inits"
				name="high-score-inits"
				type="text"
				maxlength="3"
				minlength="3"
				bind:value={inits}
			/>

			<button type="submit">Bork!</button>
		</form>
	</div>
</div>

<style>
	.overlay {
		position: absolute;
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
