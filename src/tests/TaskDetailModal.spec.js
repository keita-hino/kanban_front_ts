// import Vue from 'vue'
// import Vuetify from 'vuetify'

// import { mount, createLocalVue } from '@vue/test-utils';
// import TaskDetailModal from '../components/TaskDetailModal.vue'

// // TODO:セットアップに必要な処理は別途ファイルに切り出す
// Vue.use(Vuetify)
// const localVue = createLocalVue()

// describe('TaskDetailModal', () => {
//   let vuetify

//   beforeEach(() => {
//     vuetify = new Vuetify()
//   })

//   it('saveボタンを押下した時の挙動', () => {
//     const taskDataProps = {
//       isTaskDetailModalShow: true,
//       taskStatus: 'unstarted',
//       priorities: [
//         'low',
//         'medium',
//         'high'
//       ],
//       selectedTask: {
//         "id": 1,
//         "workspace_id": 1,
//         "name": "タスク0",
//         "detail": "詳細0",
//         "status": "unstarted",
//         "priority": "low",
//         "display_order": 1,
//         "due_date": "2019-03-10",
//         "created_at": "2020-05-12T11:36:26.838+09:00",
//         "updated_at": "2020-05-12T11:36:26.838+09:00"
//       },
//       statuses: {
//         'done': '完了',
//         'in_progress': '着手中',
//         'unstarted': '未着手'
//       }
//     }

//     // test('emitされること', () => {
//     const wrapper = mount(TaskDetailModal, {
//       localVue,
//       vuetify,
//       propsData: taskDataProps
//     })
//     wrapper.find('button.save').trigger('click')
//     // イベント発火してるかどうか
//     expect(wrapper.emitted('on-click-task-detail-save')).toBeTruthy()
//   });
// });