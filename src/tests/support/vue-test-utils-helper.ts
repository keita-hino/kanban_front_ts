import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';

export const findDataTest = <T extends Vue>(wrapper: Wrapper<T>, dataAttr: string) => {
  return wrapper.find(`[data-test="${dataAttr}"]`);
};