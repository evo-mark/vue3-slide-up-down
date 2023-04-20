import { renderToString } from '@vue/test-utils';
import { Vue3SlideUpDown } from '../src';
import { it, expect } from 'vitest';

it('renders the component when model-value is true', async () => {
	const component = Vue3SlideUpDown;

	const rendered = await renderToString(component, {
		props: { modelValue: true }
	});
	expect(/slide-up-down__container/i.test(rendered)).toBeTruthy();
});

it('does not render the component when model-value is false', async () => {
	const component = Vue3SlideUpDown;

	const rendered = await renderToString(component, {
		props: { modelValue: false }
	});
	expect(/slide-up-down__container/i.test(rendered)).toBeFalsy();
});

it('adds user-specified classes to the container', async () => {
	const component = Vue3SlideUpDown;

	const rendered = await renderToString(component, {
		props: { modelValue: true, class: 'vitest' }
	});

	expect(/slide-up-down__container/i.test(rendered)).toBeTruthy();
	expect(/vitest/i.test(rendered)).toBeTruthy();
});
