export const propsModel = {
	/**
	 * v-model value, is the component expanded or not
	 */
	modelValue: {
		type: Boolean,
		default: false,
	},
	/**
	 * Time in milliseconds for the slide duration
	 */
	duration: {
		type: Number,
		default: 500,
	},
	/**
	 * Timing function for the animation
	 */
	timingFunction: {
		type: String,
		default: "ease-in-out",
	},
	/**
	 * HTML tag to use for the outer container
	 */
	tag: {
		type: String,
		default: "div",
	},
	/**
	 * Watch the contents of the container and smoothly resize on change
	 */
	responsive: {
		type: Boolean,
		default: false,
	},
};
