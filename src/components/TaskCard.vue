<template>
  <v-card color="grey lighten-4 mr-5 pr-5 pl-7 pb-4" width="420" min-height="800">
    <v-layout row wrap>
      <v-card-subtitle class="pt-2 pb-0 pl-1 font-weight-black">{{ subTitle }} <span class="blue--text lighten-2--text">{{ tasks.length }}</span></v-card-subtitle>

      <!-- タスク登録用のカード -->
      <CreateTaskCard
        @on-click-text-show="onClickTextShow"
        @on-click-cancel="onClickCansel"
        @on-click-create-task="onClickCreateTask"
        :is-task-text-hide="isTaskTextHide"
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
  import { defineComponent, ref, PropType } from '@vue/composition-api'
  import { Task } from '@/types/schema'

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
        type: Array as PropType<Task[]>
      }
    },
    setup(_, { emit }){
      const isTaskTextHide = ref(true)

      // タスクの更新
      const onUpdateTaskStatus = (event: Event) =>  {
        emit('on-update-task-status', event)
      }

      // draggable用
      const options: object = {
        group: "myGroup",
        animation: 200
      }

      // 横に移動した時に発火
      const draggableEnd = (event: Event) => {
        emit('on-draggable-end', event);
      }

      // 詳細モーダルを開く
      const onDetailModalOpen = (task: Task) => {
        emit('on-detail-modal-open', task);
      }

      // タスクの新規作成
      const onClickCreateTask = (task: Task, statusKey: string) =>  {
        isTaskTextHide.value = true;
        task.status = statusKey;
        emit('create-task', task);
      }

      // キャンセルボタンが押された時
      const onClickCansel = () => {
        isTaskTextHide.value = true;
      }

      // タスク追加が押された時
      const onClickTextShow = () => {
        isTaskTextHide.value = false;
      }

      return {
        isTaskTextHide,
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
