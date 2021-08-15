<template>
	<div class="api-toolbar">
		<button
			v-for="(slide, i) in props.code"
			:key="slide.id"
			v-ripple
			class="api-button"
			:disabled="api === i"
			@click="changeSlide(i)"
		>{{ slide.button }}</button>
	</div>
	<div v-if="props.code" class="code-container ma-0 pa-0" :class="[props.alignment]">
		<transition
			v-for="slide in props.code"
			:key="slide.id"
			:name="
				props.static === false ? 'quick-slide-' + slideTransition : ''
			"
			mode="out-in"
		>
			<PrismComponent v-if="api === slide.id" :code="slide.output" :language="slide.lang" />
		</transition>
	</div>
</template>

<script setup>
import PrismComponent from "./PrismComponent.js";
import { ref } from "vue";
const api = ref(0);
const slideTransition = ref("left");

const emit = defineEmits(["change-slide"]);

const changeSlide = (to) => {
	emit("change-slide", to);
	if (to > api.value) slideTransition.value = "left";
	else slideTransition.value = "right";
	api.value = to;
};

const props = defineProps({
	alignment: {
		type: String,
		default: "left",
	},
	code: {
		type: Array,
		required: true,
	},
	static: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss">
$vue-blue: #34495e;
$vue-green: #41b883;

code,
pre {
	background: none !important;
}
.code-container {
	background-color: #1e1e1e;
	display: block;
	font-weight: bold;
	width: 100%;
	overflow: hidden;
	position: relative;
}
.code-container.right {
	border-radius: 4px 0 4px 4px;
}
.code-container.left {
	border-radius: 0 4px 4px 4px;
}

.api-toolbar {
	border-radius: 4px 4px 0 0;
	overflow: hidden;
	display: inline-block;

	button:not(:last-child) {
		border-right: 1px solid currentColor;
	}

	button {
		font: inherit;
		color: inherit;
		line-height: normal;
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;
		cursor: pointer;

		&:disabled {
			background-color: transparentize($vue-green, 0.5) !important;
			cursor: default;
		}

		&::-moz-focus-inner {
			border: 0;
			padding: 0;
		}
	}

	button.api-button {
		background-color: $vue-green;
		transition: background-color 150ms ease-in-out;
		color: white;
		padding: 0.5em 1.5em;
	}
}
</style>
