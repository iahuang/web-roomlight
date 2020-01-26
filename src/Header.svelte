<script>
    import {makeGradient, satGradient} from './gradients.js'
    export let color;
    export let gradientSize;

    let cycleTimeDefaults = {
        "loop": 20,
        "osc": 5
    };

    let cycleTimes = {
        "loop": 20,
        "osc": 5
    };

    let cycleInterval;
    let intervalTime = 5; // in ms

    let oscCenter;
    let oscT;
    let oscAmp = 20;

    let cycleMode;

    function enterFullscreen() {
        document.body.requestFullscreen();
    }
    function cycle_loop() {
        color.h+=360/((cycleTimes.loop || cycleTimeDefaults.loop) * 1000) * intervalTime;
        color.h = color.h%360;
    }
    function cycle_osc() {
        color.h = oscCenter+Math.sin(oscT)*oscAmp;
        oscT+=(2*Math.PI)/((cycleTimes.osc || cycleTimeDefaults.osc) * 1000) * intervalTime;
        color.h = color.h%360;
    }
    function toggleCycle() {
        if (cycleInterval) {
            clearInterval(cycleInterval);
            cycleInterval = null;
        } else {
            if (cycleMode == "osc") {
                oscCenter = color.h;
                oscT = 0;
                cycleInterval = setInterval(cycle_osc, intervalTime);
            } else if (cycleMode == "loop") {
                cycleInterval = setInterval(cycle_loop, intervalTime);
            }
        }
    }
    function onChangeCycleMode() {
        if (cycleInterval) { // if cycle mode changed while currently cycling
            toggleCycle();
            toggleCycle(); // reset cycle interval
        }
    }
</script>

<style>
    .horizontal>div {
        display: inline-block;
        position: relative;
        margin-right: 20px;
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
            Hue
            <br>
            Saturation
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
            Cycle every <input type="number" bind:value={cycleTimes[cycleMode]} on:change={function(){
                if (!cycleTimes[cycleMode]) {
                    cycleTimes[cycleMode] = cycleTimeDefaults[cycleMode];
                }
            }} style="width:50px"> seconds
            
            <br>
            <button on:click={toggleCycle}>Cycle</button>
            <button on:click={enterFullscreen}>Fullscreen</button>
            <select bind:value={cycleMode} on:change={onChangeCycleMode}>
                <option value="loop">Loop</option>
                <option value="osc">Oscillate</option>
            </select>
            
        </div>
        <div>
            Gradient size <input type="range" min=0 max=60 bind:value={gradientSize} class="slider color-slider" style="background: {makeGradient(color, 60)}">
            
        </div>

    </span>
</div>