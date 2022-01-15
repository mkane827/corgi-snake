<script>
	export let isPlaying;
	export let onClick;

	$: icon = isPlaying ? '⏸️' : '▶️';
	$: text = isPlaying ? 'pause' : 'play';
</script>

<button class={isPlaying ? 'playing' : ''} on:click={onClick}>
	<span>
		<span class="icon">{icon}</span>
		<span>{text}</span>
	</span>
</button>

<style>
	button {
		border-radius: 14px;
		padding: 8px;
		margin-bottom: 8px;
		background: #3aae84;
		color: white;
		font-size: 20px;
		text-transform: uppercase;
	}

	button.playing {
		background: #f63f3a;
	}

	.icon {
		margin-right: 21px;
	}
</style>
