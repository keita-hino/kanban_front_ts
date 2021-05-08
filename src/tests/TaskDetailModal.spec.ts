import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils';
import TaskDetailModal from '../components/TaskDetailModal.vue'
import { findDataTest } from './support/vue-test-utils-helper'

describe('TaskDetailModal', () => {
  const selectedTask = { id: 1, workspace_id: 1, name: "タスク0", detail: "詳細0", status: "unstarted", priority: "low", display_order: 1, due_date: "2019-03-10", created_at: "2020-05-12T11:36:26.838+09:00", updated_at: "2020-05-12T11:36:26.838+09:00" }

  const taskDataProps = {
    isTaskDetailModalShow: true,
    taskStatus: 'unstarted',
    priorities: ['low', 'medium', 'high'],
    selectedTask: selectedTask,
    statuses: { done: '完了', in_progress: '着手中', unstarted: '未着手'}
  }

  const createComponent = () => mount(TaskDetailModal, {
    vuetify: new Vuetify(),
    propsData: taskDataProps
  })

  it('キャンセルボタンが押された時にemitされること', async () => {
    const wrapper = createComponent();

    await findDataTest(wrapper, 'task-detail-modal-cancel-btn').trigger('click');

    expect(wrapper.emitted('on-click-task-detail-cancel')?.length).toBe(1);
  });

  it('保存ボタンを押下した時にemitされること', async () => {
    const wrapper = createComponent();

    await findDataTest(wrapper, 'task-detail-modal-save-btn').trigger('click');

    expect(wrapper.emitted('on-click-task-detail-save')).toEqual([[selectedTask]]);
  });
});