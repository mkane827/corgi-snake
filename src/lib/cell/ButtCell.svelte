<script>
	import corgiButt1 from '$lib/assets/corgi-butt-1.png';
	import corgiButt2 from '$lib/assets/corgi-butt-2.png';
	import corgiButt3 from '$lib/assets/corgi-butt-3.png';
	import corgiButt4 from '$lib/assets/corgi-butt-4.png';
	import corgiButt5 from '$lib/assets/corgi-butt-5.png';
	import corgiButt6 from '$lib/assets/corgi-butt-6.png';

	const BUTTS = [corgiButt1, corgiButt2, corgiButt3, corgiButt4, corgiButt5, corgiButt6];

	export let index;
	export let direction;
</script>

<td class={direction}>
	<img src={BUTTS[index]} alt="fluffy corgo booty" />
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
		border-radius: 0 0 50% 50%;
	}

	.up img {
		transform: rotate(0deg);
	}

	.down {
		border-radius: 50% 50% 0 0;
	}

	.down img {
		transform: rotate(180deg);
	}

	.righ {
		border-radius: 50% 0 0 50%;
	}

	.righ img {
		transform: rotate(90deg);
	}

	.left {
		border-radius: 0 50% 50% 0;
	}

	.left img {
		transform: rotate(270deg);
	}
</style>
