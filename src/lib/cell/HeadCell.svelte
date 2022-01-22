<script>
	import corgiHead1 from '$lib/assets/corgi-head-1.png';
	import corgiHead2 from '$lib/assets/corgi-head-2.png';
	import corgiHead3 from '$lib/assets/corgi-head-3.png';
	import corgiHead4 from '$lib/assets/corgi-head-4.png';
	import corgiHead5 from '$lib/assets/corgi-head-5.png';
	import corgiHead6 from '$lib/assets/corgi-head-6.png';

	const HEADS = [corgiHead1, corgiHead2, corgiHead3, corgiHead4, corgiHead5, corgiHead6];

	export let index;
	export let direction;
</script>

<td class={direction}>
	<img src={HEADS[index]} alt="corgo head" />
</td>

<style>
	td {
		position: relative;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transition: transform;
	}

	.up {
		border-radius: 50% 50% 0 0;
	}

	.up img {
		transform: rotate(180deg);
	}

	.down {
		border-radius: 0 0 50% 50%;
	}

	.down img {
		transform: rotate(0deg);
	}

	.left {
		border-radius: 50% 0 0 50%;
	}

	.left img {
		transform: rotate(90deg);
	}

	.right {
		border-radius: 0 50% 50% 0;
	}

	.right img {
		transform: rotate(270deg);
	}
</style>
