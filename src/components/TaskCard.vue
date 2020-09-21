<template>
  <v-card color="grey lighten-4 mr-5 pr-5 pl-7 pb-4" width="420" min-height="800">
    <v-layout row wrap>
      <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">{{ subTitle }} <span class="blue--text lighten-2--text">{{ tasks.length }}</span></v-card-subtitle>

      <!-- タスク登録用のカード -->
      <CreateTaskCard
        @on-click-text-show="onClickTextShow"
        @on-click-cancel="onClickCansel"
        @on-click-create-task="onClickCreateTask"
        :is-task-text-hide="is_task_text_hide"
        :status-key="statusKey"
      />

      <!-- TODO: 別コンポーネントにする -->
      <draggable
        group="myGroup"
        tag="div"
        v-bind="options"
        @update="onUpdateTaskStatus"
        @end="draggableEnd"
        :data-column-status="statusKey"
      >
        <v-card
          v-for="(task) in tasks" :key="task.id"
          @click="onDetailModalOpen(task)"
          class="mt-2"
          width="330"
        >
          <v-card-text>
            <div>#{{task.id}}</div>
            <p class="subtitle-2 text--primary">
              {{ task.name }}
            </p>
            <span v-if="!!task.due_date">Due {{ task.due_date }}</span>
          </v-card-text>
        </v-card>
      </draggable>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from '@vue/composition-api'
  import { TaskData } from '@/types/task'

  import draggable from 'vuedraggable'
  import CreateTaskCard from './CreateTaskCard.vue'

  export default defineComponent({
    components: { draggable, CreateTaskCard },

    props: {
      subTitle: {
        type: String
      },
      statusKey: {
        type: String
      },
      tasks: {
        type: Array as () => TaskData[]
      }
    },
    setup(props, { emit }){
      const is_task_text_hide = ref<Boolean>( true )
      const state = reactive<{ task: TaskData }>({
        task: {}
      })

      // タスクの更新
      const onUpdateTaskStatus = (event: Event): void =>  {
        emit('on-update-task-status', event)
      }

      // draggable用
      const options: object = {
        group: "myGroup",
        animation: 200
      }

      // 横に移動した時に発火
      const draggableEnd = (event: Event): void => {
        emit('on-draggable-end', event);
      }

      // 詳細モーダルを開く
      const onDetailModalOpen = (task: TaskData): void => {
        emit('on-detail-modal-open', task);
      }

      // タスクの新規作成
      const onClickCreateTask = (task: TaskData, statusKey: string): void =>  {
        is_task_text_hide.value = true;
        task.status = statusKey;
        emit('create-task', task);
      }

      // キャンセルボタンが押された時
      const onClickCansel = (): void => {
        is_task_text_hide.value = true;
      }

      // タスク追加が押された時
      const onClickTextShow = (): void => {
        is_task_text_hide.value = false;
      }

      return {
        state,
        is_task_text_hide,
        options,
        onClickTextShow,
        onClickCansel,
        onClickCreateTask,
        onUpdateTaskStatus,
        draggableEnd,
        onDetailModalOpen
      }
    }
  });
</script>
