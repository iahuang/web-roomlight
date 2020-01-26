<script>
    import {makeGradient, satGradient} from './gradients.js'
    export let color;
    export let gradientSize;

    let defaultCycleTime = 20;

    let cycleInterval;
    let intervalTime = 5; // in ms
    let cycleTime = defaultCycleTime;

    function enterFullscreen() {
        document.body.requestFullscreen();
    }
    function cycle() {
        color.h+=360/((cycleTime || defaultCycleTime) * 1000) * intervalTime;
        color.h = color.h%360;
    }
    function toggleCycle() {
        if (cycleInterval) {
            clearInterval(cycleInterval);
            cycleInterval = null;
        } else {
            cycleInterval = setInterval(cycle, intervalTime);
        }
    }
</script>

<style>
    .horizontal>div {
        display: inline-block;
        position: relative;
	}
    .header {
		position: relative;
		background-color: white;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
	.slider {
		margin: 0;
    }
    
    .color-slider {
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        border-radius: 10px;
    }
    
</style>

<div class="header" style="background: {makeGradient({
		h: color.h,
		s: 20,
		v: 100,
	}, gradientSize)}">
    <span class="horizontal">
        <div>
            hue
            <br>
            saturation
        </div>
        <div>
            <input type="range" min=0 max=360 bind:value={color.h} class="slider color-slider" style="background: {makeGradient({
		h: 0,
		s: 100,
		v: 100,
	}, 360, 90, 14)}">
            <br>
            <input type="range" min=0 max=100 bind:value={color.s} class="slider color-slider" style="background: {satGradient(color)}">
        </div>
        <div>
            cycle every <input type="number" bind:value={cycleTime} on:change={function(){
                if (!cycleTime) {
                    cycleTime = defaultCycleTime;
                }
            }}> seconds
            
            <br>
            <button on:click={toggleCycle}>cycle</button>
            <button on:click={enterFullscreen}>fullscreen</button>
            
        </div>
        <div>
            gradient size <input type="range" min=0 max=60 bind:value={gradientSize} class="slider color-slider" style="background: {makeGradient(color, 60)}">
        </div>
        {
            cycleTime<=0.8 ? "(epilepsy warning)" : ""
        }
    </span>
</div>