<template>
	<Header />
	<main>
		<button class="btn btn-secondary my-4 mx-6" @click="show = !show">Toggle Slide</button>
		<div class="container">
			<slide-up-down
				v-model="show"
				style="color: red"
				data-id="1"
				responsive
				@open-start="openStart"
				@open-end="openEnd"
				@close-start="closeStart"
				@close-end="closeEnd"
				@layout-shift="layoutShift"
			>
				<div style="background-color: steelblue; color: white" class="p-4">{{ content }}</div>
			</slide-up-down>
		</div>
	</main>
	<Footer />
</template>

<script setup>
import "./index.css";
import { ref, onMounted } from "vue";
import Header from "./partials/Header.vue";
import Footer from "./partials/Footer.vue";

const show = ref(false);
const content = ref("");

const openStart = () => console.log("open start");
const openEnd = () => console.log("open end");
const closeStart = () => console.log("close start");
const closeEnd = () => console.log("close end");
const layoutShift = () => console.log("layout shift");

const longContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a sapien a purus consectetur feugiat non eget nisl. Praesent eu turpis volutpat, posuere sapien ut, interdum erat. Integer est diam, interdum nec mauris nec, porta commodo est. Vivamus nec neque diam. Ut urna augue, cursus laoreet magna at, mattis convallis lectus. In aliquet orci leo, nec accumsan velit rhoncus eu. Phasellus pulvinar dictum feugiat. Nullam diam nunc, porta placerat elit vel, fringilla pretium risus.

Aenean blandit augue eget ante maximus sollicitudin.Sed a purus elit.Morbi elementum venenatis libero, eget malesuada purus sagittis vitae.Vivamus tempor lacinia sapien, eget faucibus odio posuere eu.In ornare nisl ipsum, at ultrices purus rhoncus in.Nulla quis quam libero.Etiam eleifend id dolor ut faucibus.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Nunc placerat urna sollicitudin porttitor auctor.Suspendisse egestas id justo vel pharetra.Aenean convallis ex at tellus volutpat consequat.Phasellus volutpat dolor urna, at elementum tortor tristique eget.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;
const shortContent = "The Content";

onMounted(() => {
	setInterval(() => {
		if (content.value === shortContent) content.value = longContent;
		else content.value = shortContent;
	}, 3000);
});
</script>

<style lang="scss">
@import "prismjs/themes/prism-okaidia.css";

.container {
	background-color: #242424;
	padding: 1rem;
	border-radius: 4px;
}
</style>
