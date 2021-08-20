import { h, computed, ref, onMounted, watch } from "vue";
import { propsModel } from "./props.js";

export default {
	emits: ["open-start", "close-start", "open-end", "close-end", "layout-shift"],
	props: {
		...propsModel,
	},
	setup(props, { slots, attrs, emit }) {
		/**
		 * @constant { ref<HTMLElement> } containerRef  - Template ref for the slide-up-down container
		 */
		const containerRef = ref(null);
		/**
		 * @constant { ref<boolean> } isInit  - Has the component mounted with its initial state? Used to prevent appear animation.
		 */
		const isInit = ref(false);
		/**
		 * @constant { ref<boolean> } shouldHideOverflow  - Whether to apply the overflow-y: hidden style to the component
		 */
		const shouldHideOverflow = ref(false);
		/**
		 * @constant { ref<number> } contentHeight  - The measured height of the contents of the conatainer.
		 */
		const contentHeight = ref(0);
		/**
		 * @constant { ref<number> } currentHeight  - The currently rendered height of the container.
		 */
		const currentHeight = ref(0);
		/**
		 * @constant { computed<string> } transitionDuration  - The value of the CSS transition-duration property.
		 */
		const transitionDuration = computed(() => {
			return typeof props.duration === "number" ? `${props.duration}ms` : props.duration;
		});
		/**
		 * Wait until the synchronous loop is cleared before executing action
		 *
		 * @param {Function} fn - The callback function to execute.
		 */
		const delayAction = (fn) => {
			setTimeout(() => {
				window.requestAnimationFrame(fn);
			}, 0);
		};
		/**
		 * Update the contentHeight value to the current height of the contents inside the container
		 */
		const updateContainerHeight = () => {
			contentHeight.value = containerRef.value.scrollHeight;
		};
		/**
		 * Perform the animations between open, close and shift states
		 */
		const updateDisplay = () => {
			currentHeight.value = contentHeight.value + "px";

			if (props.modelValue === false) {
				shouldHideOverflow.value = true;
				emit("close-start");
				delayAction(() => {
					currentHeight.value = 0;
				});
			} else emit("open-start");
		};

		/**
		 * @constant { computed<object> } generatedBaseStyles  - Computed style object for the container
		 */
		const generatedBaseStyles = computed(() => ({
			transition: isInit.value ? `height ${transitionDuration.value} ${props.timingFunction}` : null,
			height: isInit.value ? currentHeight.value : null,
			overflowY: shouldHideOverflow.value ? "hidden" : null,
			"--content-height": contentHeight.value,
		}));

		/**
		 * @constant { computed<object> } generatedBaseAttributes  - Computed attributes object for the container
		 */
		const generatedBaseAttributes = computed(() => ({
			"aria-hidden": shouldHideOverflow.value ? true : false,
		}));

		/**
		 * Called when the CSS transition animation is complete.
		 */
		const transitionEnd = () => {
			if (props.modelValue === true) {
				currentHeight.value = null;
				shouldHideOverflow.value = false;
				emit("open-end");
			} else emit("close-end");
		};

		onMounted(() => {
			updateContainerHeight();
			if (!props.modelValue) {
				currentHeight.value = 0;
				shouldHideOverflow.value = true;
			} else {
				currentHeight.value = contentHeight.value + "px";
			}
			if (props.responsive) setResizeListener();
			isInit.value = true;
		});

		watch(
			() => props.modelValue,
			(v) => {
				updateContainerHeight();
				updateDisplay();
			}
		);

		/**
		 * Called by onMounted if props.responsive is set to true. Attaches a mutation observer to the container and responds to content changes.
		 */
		const resizeCallback = () => {
			emit("layout-shift");
			currentHeight.value = contentHeight.value + "px";
			shouldHideOverflow.value = true;
			updateContainerHeight();
			setTimeout(updateDisplay, 0);
		};
		/**
		 * Executed if the 'responsive' property is present. Watches container for changes to contents and then performs a layout shift.
		 */
		const setResizeListener = () => {
			const observer = new MutationObserver(resizeCallback);
			const config = {
				subtree: true,
				attributes: false,
				childList: true,
				characterData: false,
			};
			observer.observe(containerRef.value, config);
		};

		console.log(attrs);
		return () =>
			h(
				props.tag,
				{
					...Object.assign({}, attrs, { style: generatedBaseStyles.value }),
					class: "slide-up-down__container",
					onTransitionend: transitionEnd,
					...generatedBaseAttributes.value,
					ref: containerRef,
				},
				slots.default()
			);
	},
};
