import { mount, Wrapper } from '@vue/test-utils';
import CreateTaskCard from '../components/CreateTaskCard.vue';

describe('CreateTaskCard', () => {
  const defaultProps: {
    isTaskTextHide: boolean;
    statusKey: string;
  } = {
    isTaskTextHide: true,
    statusKey: 'done'
  };

  let wrapper!: Wrapper<any>;

  const createComponent = () => mount(CreateTaskCard, {
    propsData: { ...defaultProps } 
  });

  // const createWrapper = () => {
  //   wrapper = mount(CreateTaskCard, {
  //     propsData: {
  //       isTaskTextHide: true,
  //       statusKey: 'done'
  //     }
  //   });
  // };

  test('キャンセルボタンが押された時に、イベントが emit されること', () => {
    wrapper = createComponent();

  });
});
