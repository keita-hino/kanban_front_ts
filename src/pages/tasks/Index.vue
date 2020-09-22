<template>
  <v-content>
    <v-container>
      <v-row
        class="lighten-4"
        justify="center" align-content="start"
      >
        <div id="top" class='headline font-italic font-weight-light mt-2 mb-7'>{{ $store.getters['workspace/name'] }}</div>
      </v-row>

      <div class='d-flex'>
        <template v-for="(status, key) in state.statuses">
          <TaskCard
            :key="key"
            :sub-title="status"
            :status-key="key"
            :tasks="filteredTasks(key)"
            @on-update-task-status="onUpdateTaskStatus"
            @on-draggable-end="draggableEnd"
            @on-detail-modal-open="onClickDetailModalOpen"
            @create-task="createTask"
          />
        </template>
      </div>

      <TaskDetailModal
        @on-click-task-detail-cancel="onClickTaskDetailCancel"
        @on-click-task-detail-save="onClickTaskDetailSave"
        :is-task-detail-modal-show.sync="isTaskDetailModalShow"
        :task-status="taskStatus"
        :priorities="state.priorities"
        :selected-task="state.selectedTask"
        :statuses="state.statuses"
      />

    </v-container>
  </v-content>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from '@vue/composition-api'
  import _ from 'lodash'

  import { TaskData } from '@/types/task'
  import { EventData } from '@/types/event'
  import TaskCard from '@/components/TaskCard.vue'
  import TaskDetailModal from '@/components/TaskDetailModal.vue'
  import { fetchTasks } from '@/api/task'

  export default defineComponent({
    components: { TaskCard, TaskDetailModal },
    setup(_props, context){
      const priorities = ref<String[]>( [] )
      const isTaskDetailModalShow = ref<Boolean>( false )
      const isTaskTextHide = ref<Boolean>( true )
      const taskStatus = ref<String>( '' );
      // TODO: refにできるものは切り出す
      const state = reactive<{tasks: TaskData[], priorities: String[], statuses: Object, selectedTask: TaskData}>({
        tasks: [],
        priorities: [],
        statuses: {},
        selectedTask: {}
      });

      onMounted(() => {
        getTasks();
        // TODO:ここは共通でできるようにする
        if(context.root.$store.state.auth.email == null && context.root.$route.name != 'Login'){
          context.root.$router.push({name: 'Login'})
        }
        // ワークスペースが変更されたら再度Taskを取得する
        context.root.$store.subscribe((mutation) => {
          if (mutation.type === 'workspace/setWorkspace') {
            getTasks();
          }
        })
      });


      // タスク詳細設定用モーダルに渡す用のタスクステータス
      // 登録されているタスクを取得する
      const getTasks = async() => {
        const workspaceId = getWorkspaceId()

        const response = await fetchTasks(workspaceId)

        state.tasks = response.data.tasks
        state.priorities = response.data.priorities
        state.statuses = response.data.statuses
      }

      // タスクの新規作成
      const createTask = (task: TaskData): void =>{
        let workspace_id = getWorkspaceId()
        // タスク新規作成
        context.root.axios.post(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
          workspace_id: workspace_id
        })
        .then( response => {
          isTaskTextHide.value = true;
          state.tasks = response.data.tasks
        });
      }

      // タスクの詳細設定用モーダルを開く
      const onClickDetailModalOpen = (task: TaskData): void =>{
        state.selectedTask = _.cloneDeep(task)
        taskStatus.value = status;
        isTaskDetailModalShow.value = true;
      }

      // タスク詳細モーダルでキャンセルボタンが押された時
      const onClickTaskDetailCancel = (): void =>{
        isTaskDetailModalShow.value = false;
      }

      // タスク詳細設定用モーダルで保存ボタンが押された時
      const onClickTaskDetailSave = (task: TaskData): void =>{
        // ワークスペースID取得
        let workspace_id = getWorkspaceId()

        // タスク更新
        context.root.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
          task: task,
          workspace_id: workspace_id,
        })
        .then( response => {
          isTaskDetailModalShow.value = false;
          state.tasks = response.data.tasks
        });
      }

      // 縦に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
      // TODO:下記のリファクタリング
      const onUpdateTaskStatus = (event: EventData): void | string =>{
        // ワークスペースID取得
        let workspace_id = getWorkspaceId()

        // 該当のレーン上のタスク取得
        const status = event.from.getAttribute('data-column-status')
        let filteredTasks = state.tasks.filter( task => task.status == status )

        // 移動するタスク取得
        let movedTask = filteredTasks.find( (task,index) => index == event.oldIndex )

        // 挿入した位置の直下にあるタスク取得
        let oldTask = filteredTasks.find( (task,index) => index == event.newIndex )

        if (!movedTask) {
          return ''
        }

        // 挿入先のdisplay_order設定
        movedTask.display_order = oldTask?.display_order

        // タスクの並び更新処理
        context.root.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/moved_tasks`, {
          task: movedTask,
          old_display_order: movedTask.display_order,
          workspace_id: workspace_id,
        })
        .then( response => {
          state.tasks = response.data.tasks
        });
      }

      // 横に移動した時に発火
      // TODO:コンポーネント側にロジックを移動してtaskを受け取るだけにする
      const draggableEnd = (event: EventData): void | string => {
        if(event.from.getAttribute('data-column-status') == event.to.getAttribute('data-column-status')){
          return ''
        }

        // ワークスペースID取得
        let workspace_id = getWorkspaceId()

        // TODO:ロジックのリファクタリング
        let status = event.from.getAttribute('data-column-status')
        let filteredTasks = state.tasks.filter( task => task.status == status )
        let findedTask = filteredTasks.find( (task, index) => index == event.oldIndex )
        if(!findedTask){
          return ''
        }

        findedTask.status = event.to.getAttribute('data-column-status')

        // 挿入した位置の直下にあるタスクのdisplay_order取得
        let oldStatus = event.to.getAttribute('data-column-status')
        let findOldTasks = state.tasks.filter( task => task.status == oldStatus )
        if(!findOldTasks){
          return ''
        }

        findedTask.display_order = findOldTasks?.find( (task, index) => index == event.newIndex )?.display_order

        // タスクの並び更新処理
        context.root.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/tasks/update_status_task`, {
          task: findedTask,
          workspace_id: workspace_id,
        })
        .then( response => {
          state.tasks = response.data.tasks
        });
      }

      // ステータスでフィルタリングしたタスクを返す
      const filteredTasks = (key: string): TaskData[] =>{
        return state.tasks.filter( task => task.status == key )
      }

      // ストアからワークスペースIDを取得する
      const getWorkspaceId = (): number =>{
        return context.root.$store.getters['workspace/id']
      }

      return{
        state,
        isTaskDetailModalShow,
        taskStatus,
        filteredTasks,
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
