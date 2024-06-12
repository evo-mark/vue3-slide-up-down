<template>
	<div class="app-wrapper">
		<Vue3SlideUpDown v-model="show" :duration="500" @open-start="onOpenStart">
			<div class="p-4">
				<p class="mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Vel fringilla est ullamcorper eget nulla facilisi. Viverra tellus in hac
					habitasse platea. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.
					Adipiscing elit ut aliquam purus. Vulputate sapien nec sagittis aliquam malesuada. Augue interdum
					velit euismod in pellentesque massa placerat duis ultricies. Lectus urna duis convallis convallis.
					Lacus vestibulum sed arcu non odio euismod. At erat pellentesque adipiscing commodo elit at
					imperdiet. Vivamus at augue eget arcu. Ultrices neque ornare aenean euismod elementum nisi quis
					eleifend quam.
				</p>
				<p class="mb-4">
					Habitant morbi tristique senectus et. In aliquam sem fringilla ut morbi. Orci dapibus ultrices in
					iaculis. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Rutrum quisque non
					tellus orci ac. Urna et pharetra pharetra massa. Phasellus egestas tellus rutrum tellus. Quisque id
					diam vel quam elementum pulvinar etiam. Leo vel orci porta non. Lectus quam id leo in vitae.
					Pellentesque adipiscing commodo elit at. Est ultricies integer quis auctor elit sed vulputate mi
					sit. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Eu facilisis sed odio morbi. Nam libero justo
					laoreet sit amet cursus. Id aliquet lectus proin nibh nisl. Turpis tincidunt id aliquet risus
					feugiat in ante metus. In egestas erat imperdiet sed euismod nisi porta lorem. Ut tortor pretium
					viverra suspendisse potenti nullam ac tortor vitae.
				</p>
			</div>
		</Vue3SlideUpDown>
		<div class="bg-blue-500 h-60 py-4">
			<div class="container mx-auto">
				<button class="bg-neutral-800 text-white px-4 py-2 rounded" @click="show = !show">Toggle</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const onOpenStart = () => {
	console.log('Open Start');
};
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
