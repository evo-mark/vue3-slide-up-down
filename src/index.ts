import { defineComponent, h, Transition, ref, computed, unref, mergeProps, withDirectives, vShow } from 'vue';
import type { Ref } from 'vue';

interface initialStyle {
	height: string;
	width: string;
	position: string;
	visibility: string;
	overflow: string;
	paddingTop: string;
	paddingBottom: string;
	borderTopWidth: string;
	borderBottomWidth: string;
	marginTop: string;
	marginBottom: string;
}

function getElementStyle(element: HTMLElement) {
	return {
		height: element.style.height,
		width: element.style.width,
		position: element.style.position,
		visibility: element.style.visibility,
		overflow: element.style.overflow,
		paddingTop: element.style.paddingTop,
		paddingBottom: element.style.paddingBottom,
		borderTopWidth: element.style.borderTopWidth,
		borderBottomWidth: element.style.borderBottomWidth,
		marginTop: element.style.marginTop,
		marginBottom: element.style.marginBottom
	};
}

function prepareElement(closedRef: Ref<string>, element: HTMLElement, initialStyle: initialStyle) {
	const closed = unref(closedRef);

	const { width } = getComputedStyle(element);
	element.style.width = width;
	element.style.position = 'absolute';
	element.style.visibility = 'hidden';
	element.style.height = '';
	const { height } = getComputedStyle(element);
	element.style.width = initialStyle.width;
	element.style.position = initialStyle.position;
	element.style.visibility = initialStyle.visibility;
	element.style.height = closed;
	element.style.overflow = 'hidden';
	return initialStyle.height && initialStyle.height != closed ? initialStyle.height : height;
}

function animateTransition(
	element: HTMLElement,
	initialStyle: initialStyle,
	done: () => void,
	keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
	options?: number | KeyframeAnimationOptions
) {
	const animation = element.animate(keyframes, options);
	// Set height to 'auto' to restore it after animation
	element.style.height = initialStyle.height;
	animation.onfinish = () => {
		element.style.overflow = initialStyle.overflow;
		done();
	};
}
function getEnterKeyframes(props, closedRef: Ref<string>, height: string, initialStyle: initialStyle) {
	const closed = unref(closedRef);
	return [
		{
			height: closed,
			opacity: props.opacityClosed,
			paddingTop: closed,
			paddingBottom: closed,
			borderTopWidth: closed,
			borderBottomWidth: closed,
			marginTop: closed,
			marginBottom: closed
		},
		{
			height,
			opacity: props.opacityOpen,
			paddingTop: initialStyle.paddingTop || 0,
			paddingBottom: initialStyle.paddingBottom || 0,
			borderTopWidth: initialStyle.borderTopWidth || 0,
			borderBottomWidth: initialStyle.borderBottomWidth || 0,
			marginTop: initialStyle.marginTop || 0,
			marginBottom: initialStyle.marginBottom || 0
		}
	];
}

export const Vue3SlideUpDown = defineComponent({
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		/**
		 * Time in milliseconds for the slide duration
		 */
		duration: {
			type: Number,
			default: 500
		},
		/**
		 * Timing function for the animation
		 */
		timingFunction: {
			type: String,
			default: 'ease-in-out'
		},
		/**
		 * Independent timing function for the animation when entering
		 */
		timingFunctionEnter: {
			type: String,
			default: null
		},
		/**
		 * Independent timing function for the animation when leaving
		 */
		timingFunctionLeave: {
			type: String,
			default: null
		},
		/**
		 * Opacity value from 0 - 1 of the element when open
		 */
		opacityOpen: {
			type: Number,
			default: 1
		},
		/**
		 * Opacity value from 0 - 1 of the element when closed
		 */
		opacityClosed: {
			type: Number,
			default: 0
		},
		/**
		 * HTML tag to use for the outer container
		 */
		tag: {
			type: String,
			default: 'div'
		},
		/**
		 * Always render the element inside the slide container
		 */
		eager: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'open-start', 'open-end', 'close-start', 'close-end'],
	setup(props, { slots, attrs, emit }) {
		const closed = ref('0px');

		const easingEnter = computed(() => props.timingFunctionEnter || props.timingFunction);
		const easingLeave = computed(() => props.timingFunctionLeave || props.timingFunction);

		function enterTransition(element: Element, done: () => void) {
			const HTMLElement = element as HTMLElement;
			const initialStyle = getElementStyle(HTMLElement);
			const height = prepareElement(closed, HTMLElement, initialStyle);
			const keyframes = getEnterKeyframes(props, closed, height, initialStyle);
			const options = { duration: props.duration, easing: easingEnter.value };
			const doneCallback = () => {
				done();
				emit('open-end');
			};
			animateTransition(HTMLElement, initialStyle, doneCallback, keyframes, options);
		}
		function leaveTransition(element: Element, done: () => void) {
			const HTMLElement = element as HTMLElement;
			const initialStyle = getElementStyle(HTMLElement);
			const { height } = getComputedStyle(HTMLElement);
			HTMLElement.style.height = height;
			HTMLElement.style.overflow = 'hidden';
			const keyframes = getEnterKeyframes(props, closed, height, initialStyle).reverse();
			const options = { duration: props.duration, easing: easingLeave.value };
			const doneCallback = () => {
				done();
				emit('close-end');
			};
			animateTransition(HTMLElement, initialStyle, doneCallback, keyframes, options);
		}

		return () =>
			h(
				Transition,
				{
					css: false,
					persisted: props.eager,
					onBeforeEnter: () => emit('open-start'),
					onEnter: enterTransition,
					onBeforeLeave: () => emit('close-start'),
					onLeave: leaveTransition
				},
				{
					default: () =>
						props.modelValue || props.eager
							? withDirectives(
									h(
										props.tag,
										mergeProps(attrs, {
											class: 'slide-up-down__container'
										}),
										slots
									),
									[props.eager ? [vShow, props.modelValue === true] : [null]]
								)
							: null
				}
			);
	}
});
