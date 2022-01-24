<script>
	import { Speed } from './enums/Speed';

	export let speed;
	export let disabled;
</script>

<div>
	<label for="snake-speed">Corgo Speed</label>
	<select name="snake-speed" id="snake-speed" bind:value={speed} {disabled}>
		<option value={Speed.SNOOZE}>Snooze</option>
		<option value={Speed.TREATOS}>Looking for treatos</option>
		<option value={Speed.ZOOMIES}>ZOOOOOOMIES!!!</option>
	</select>
</div>

<style>
	div {
		margin-bottom: 16px;
	}

	label {
		margin-right: 8px;
	}
</style>
