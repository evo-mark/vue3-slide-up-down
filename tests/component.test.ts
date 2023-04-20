import { mount } from '@vue/test-utils';
import { Vue3SlideUpDown } from '../src';
import { it, expect } from 'vitest';

it('mounts and unmounts the container in response to v-model', async () => {
	const wrapper = mount(Vue3SlideUpDown, {
		props: {
			modelValue: false
		}
	});

	expect(wrapper.find('.slide-up-down__container').exists()).toBeFalsy();
	await wrapper.setProps({ modelValue: true });
	expect(wrapper.find('.slide-up-down__container').exists()).toBeTruthy();
	await wrapper.setProps({ modelValue: false });
	expect(wrapper.find('.slide-up-down__container').exists()).toBeFalsy();
});
