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

<script>
  import draggable from 'vuedraggable'
  import CreateTaskCard from './CreateTaskCard'

  export default {
    props: {
      // レーン名
      subTitle: {
        type: String,
      },
      // ステータスのKey
      statusKey: {
        type: String,
      },
      tasks: {
        type: Array,
      }
    },

    data() {
      return {
        is_task_text_hide: true,
        task: {},
        // draggabbleで使用するオプション
        options: {
          group: "myGroup",
          animation: 200
        },

      }
    },

    components: {
      draggable,
      CreateTaskCard
    },

    methods: {
      onUpdateTaskStatus(event) {
        this.$emit('on-update-task-status', event)
      },

      // 横に移動した時に発火
      draggableEnd(event) {
        this.$emit('on-draggable-end', event)
      },

      // 詳細モーダルを開く
      onDetailModalOpen(task) {
        this.$emit('on-detail-modal-open', task)
      },

      // タスクの新規作成
      onClickCreateTask(task, statusKey) {
        this.is_task_text_hide = true;
        task.status = statusKey
        this.$emit('create-task', task)
      },

      // キャンセルボタンが押された時
      onClickCansel() {
        this.is_task_text_hide = true;
      },

      onClickTextShow() {
        this.is_task_text_hide = false;
      }
    }
  }
</script>
