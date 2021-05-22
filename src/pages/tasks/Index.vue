<template>
  <v-main>
    <v-container>
      <v-row
        class="lighten-4"
        justify="center" align-content="start"
      >
        <div id="top" class='headline font-italic font-weight-light mt-2 mb-7'>{{ $store.getters['workspace/name'] }}</div>
      </v-row>

      <TaskCards
        :statuses="statuses"
        :tasks="tasks"
        @on-update-task-status="onUpdateTaskStatus"
        @on-draggable-end="draggableEnd"
        @on-detail-modal-open="onClickDetailModalOpen"
        @create-task="createTask"
      />

      <TaskDetailModal
        @on-click-task-detail-cancel="onClickTaskDetailCancel"
        @on-click-task-detail-save="onClickTaskDetailSave"
        :is-task-detail-modal-show.sync="isTaskDetailModalShow"
        :task-status="taskStatus"
        :priorities="priorities"
        :selected-task="selectedTask"
        :statuses="statuses"
      />

    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
  import _ from 'lodash'

  import { Task, Event } from '@/types/schema'
  import { Statuses, Priorities } from 'src/api/task';
  import TaskCards from '@/components/TaskCards.vue'
  import TaskDetailModal from '@/components/TaskDetailModal.vue'
  import { fetchTasks, postTask, updateTask, updateOrderTask, updateStatusTask } from '@/api/task'

  export default defineComponent({
    components: { TaskCards, TaskDetailModal },
    setup(_props, { root }){
      const isTaskDetailModalShow = ref(false)
      const taskStatus = ref('');
      const workspaceId = computed(() => root.$store.getters['workspace/id'])
      const tasks = ref<Task[]>([]);
      const priorities = ref<Priorities>([])
      const statuses = ref<Statuses>({})
      const selectedTask = ref<Task>({})

      onMounted(() => {
        getTasks();
        // TODO:ここは共通でできるようにする
        if(root.$store.state.auth.email == null && root.$route.name != 'Login'){
          root.$router.push({name: 'Login'})
        }
        // ワークスペースが変更されたら再度Taskを取得する
        root.$store.subscribe((mutation) => {
          if (mutation.type === 'workspace/setWorkspace') {
            getTasks();
          }
        })
      });

      // タスク詳細設定用モーダルに渡す用のタスクステータス
      // 登録されているタスクを取得する
      const getTasks = async() => {
        const response = await fetchTasks(workspaceId.value)

        tasks.value = response.data.tasks
        priorities.value = response.data.priorities
        statuses.value = response.data.statuses
      }

      // タスクの新規作成
      const createTask = async(task: Task) => {
        const response = await postTask(task, workspaceId.value)

        tasks.value = response.data.tasks
      }

      // タスクの詳細設定用モーダルを開く
      const onClickDetailModalOpen = (task: Task) => {
        selectedTask.value = _.cloneDeep(task)
        taskStatus.value = status;
        isTaskDetailModalShow.value = true;
      }

      // タスク詳細モーダルでキャンセルボタンが押された時
      const onClickTaskDetailCancel = () => {
        isTaskDetailModalShow.value = false;
      }

      // タスク詳細設定用モーダルで保存ボタンが押された時
      const onClickTaskDetailSave = async(task: Task) => {
        const response = await updateTask(task, workspaceId.value)

        isTaskDetailModalShow.value = false;
        tasks.value = response.data.tasks
      }

      // 縦に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
      // TODO:下記のリファクタリング
      const onUpdateTaskStatus = async(event: Event) => {
        // 該当のレーン上のタスク取得
        const status = event.from.getAttribute('data-column-status')
        let filteredTasks = tasks.value.filter( task => task.status == status )

        // 移動するタスク取得
        let movedTask = filteredTasks.find( (task,index) => index == event.oldIndex )

        // 挿入した位置の直下にあるタスク取得
        let oldTask = filteredTasks.find( (task,index) => index == event.newIndex )

        if (!movedTask) { return '' }

        // 挿入先のdisplay_order設定
        movedTask.display_order = oldTask?.display_order

        // タスクの並び更新処理
        const response = await updateOrderTask(movedTask, workspaceId.value)

        tasks.value = response.data.tasks
      }

      // 横に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
      const draggableEnd = async(event: Event) => {
        if(event.from.getAttribute('data-column-status') == event.to.getAttribute('data-column-status')){ return '' }

        // TODO:ロジックのリファクタリング
        let status = event.from.getAttribute('data-column-status')
        let filteredTasks = tasks.value.filter( task => task.status == status )
        let findedTask = filteredTasks.find( (task, index) => index == event.oldIndex )
        if(!findedTask){ return '' }

        findedTask.status = event.to.getAttribute('data-column-status')

        // 挿入した位置の直下にあるタスクのdisplay_order取得
        let oldStatus = event.to.getAttribute('data-column-status')
        let findOldTasks = tasks.value.filter( task => task.status == oldStatus )
        if(!findOldTasks){ return '' }

        findedTask.display_order = findOldTasks?.find( (task, index) => index == event.newIndex )?.display_order

        // タスクの並び更新処理
        const response = await updateStatusTask(findedTask, workspaceId.value)

        tasks.value = response.data.tasks
      }

      return{
        tasks,
        priorities,
        statuses,
        selectedTask,
        isTaskDetailModalShow,
        taskStatus,
        onUpdateTaskStatus,
        draggableEnd,
        onClickTaskDetailCancel,
        onClickTaskDetailSave,
        onClickDetailModalOpen,
        createTask
      }
    }
  });
</script>
