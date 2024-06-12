import { mount } from '@vue/test-utils';
import { Vue3SlideUpDown } from '../src';
import { it, expect } from 'vitest';
import { h } from 'vue';

it('mounts and unmounts the container in response to v-model', async () => {
	const wrapper = mount(Vue3SlideUpDown, {
		props: {
			modelValue: false,
			eager: false
		}
	});

	expect(wrapper.find('.slide-up-down__container').exists()).toBeFalsy();
	await wrapper.setProps({ modelValue: true });
	expect(wrapper.find('.slide-up-down__container').exists()).toBeTruthy();
	await wrapper.setProps({ modelValue: false });
	expect(wrapper.find('.slide-up-down__container').exists()).toBeFalsy();
});

it("changes the container's visibility in response to model changes", async () => {
	const wrapper = mount(Vue3SlideUpDown, {
		attachTo: document.body,
		props: {
			modelValue: false,
			eager: true
		},
		slots: {
			default: () => h('div', { class: 'slide-content' }, 'Hello World')
		}
	});

	expect(wrapper.get('.slide-up-down__container').isVisible()).toBeFalsy();
});
