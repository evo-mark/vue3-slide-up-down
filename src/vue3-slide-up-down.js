import { h, ref, computed, watch, onMounted, nextTick } from "vue";

export default {
	name: "SlideUpDown",
	props: {
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
		 * HTML tag to use for the outer container
		 */
		tag: {
			type: String,
			default: "div",
		},
		/**
		 * Use aria-hidden tags when closed to hide the contents from screen-readers
		 */
		useHidden: {
			type: Boolean,
			default: true,
		},
		/**
		 * Watch the contents of the container and smoothly resize on change
		 */
		responsive: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { attrs, slots, emit }) {
		/**
		 * style { Object } - The reactive style object that sets CSS styles for the container
		 */
		const style = ref({});
		/**
		 * isInitialised { Boolean } - Whether the component has run its initial setup
		 */
		const isInitialised = ref(false);
		/**
		 * hidden { Boolean } - Is the element hidden from display. Separated from modelValue due to timing of the value change
		 */
		const hidden = ref(!props.modelValue);
		/**
		 * container { Template Ref } - Used to reference the container element in the DOM
		 */
		const container = ref(null);

		/**
		 * currentHeight { String } - Store for the current height of the element, used inside mutation observer
		 */
		const currentHeight = ref(0);

		/**
		 * Central controller for the component. Called onMounted and as a callback to v-model watch
		 */
		const layout = () => {
			if (props.modelValue) {
				hidden.value = false;
				emit("open-start");
				if (isInitialised.value) setHeight("0px", () => container.value.scrollHeight + "px");
			} else {
				emit("close-start");
				setHeight(container.value.scrollHeight + "px", () => "0px");
			}
		};

		/**
		 * Method called by the mutation observer when the content inside the container changes
		 */
		const layoutShift = () => {
			if (props.modelValue) {
				emit("layout-shift");
				setHeight(currentHeight.value, () => container.value.scrollHeight + "px");
			}
		};

		/**
		 * Computed value which contains the HTML attributes for the container
		 */
		const componentAttributes = computed(() => {
			return {
				"aria-hidden": !props.modelValue,
				"aria-expanded": props.modelValue,
				hidden: props.useHidden ? hidden.value : null,
			};
		});

		/**
		 * Respond to changes to the v-model value of the component
		 */
		watch(() => props.modelValue, layout);

		onMounted(() => {
			layout();
			isInitialised.value = true;
			if (props.responsive) setResizeListener();
		});

		const onTransitionEnd = (ev) => {
			if (ev.target !== container.value) return;

			if (props.modelValue) {
				style.value = {};
				emit("open-end");
			} else {
				style.value = {
					height: "0",
					overflow: "hidden",
				};
				hidden.value = true;
				emit("close-end");
			}
		};

		const asap = (callback) => {
			if (!isInitialised.value) callback();
			else nextTick(callback);
		};

		const setHeight = (temp, afterRelayout) => {
			style.value = { height: temp };

			asap(() => {
				currentHeight.value = afterRelayout();
				style.value = {
					height: currentHeight.value,
					overflow: "hidden",
					"transition-property": "height",
					"transition-duration": props.duration + "ms",
				};
			});
		};

		/**
		 * Called by onMounted if props.responsive is set to true. Attaches a mutation observer to the container and responds to content changes
		 */
		const setResizeListener = () => {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					layoutShift();
				});
			});
			const config = {
				subtree: true,
				attributes: false,
				childList: true,
				characterData: true,
			};
			observer.observe(container.value, config);
		};

		/**
		 * The main render function
		 */
		return () =>
			h(
				props.tag,
				{
					style: { ...style.value, width: "100%" },
					...componentAttributes.value,
					...attrs,
					ref: container,
					ontransitionend: onTransitionEnd,
				},
				slots.default()
			);
	},
};
