<template>
	<MainComponent />
</template>

<script>
import MainComponent from './components/MainComponent.vue'

export default {
	name: 'App',
	components: { MainComponent },
}
</script>

<style lang="scss">
*,
*::after,
*::before {
	margin: 0;
	top: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Roboto', sans-serif;
	font-size: 62.5%;
	background-image: url('./assets/euro-small.jpg');
	background-repeat: no-repeat;
	min-height: 100svh;
	background-size: cover;

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		background-color: rgba(255, 255, 255, 0.5);
		z-index: -1;
	}
}

.wrapper {
	max-width: 1200px;
	margin: 0 auto;
}

@media (min-width: 768px) {
	body {
		background-image: url('./assets/euro-big.jpg');
	}
}
</style>
