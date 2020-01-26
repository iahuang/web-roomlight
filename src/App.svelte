<script>
	import Header from './Header.svelte';
	import {makeGradient} from './gradients.js'

	let color = {
			h: 0,
			s: 100,
			v: 100
		};
	let gradientSize = 0;
	
	setInterval(()=>{
		sleep.prevent(); // keep trying this; sometimes it throws a DOMException (why: https://goo.gl/xX8pDD)
	}, 10000);
	
</script>

<style>
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
<div>
	<div class="bg" style="background: {makeGradient(color, gradientSize)}" >
		<Header bind:color={color} bind:gradientSize={gradientSize}></Header>
	</div>
</div>
