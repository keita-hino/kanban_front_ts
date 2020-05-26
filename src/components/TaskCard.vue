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

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { TaskData } from '@/types/task'

  import draggable from 'vuedraggable'
  import CreateTaskCard from './CreateTaskCard.vue'

  @Component({
    components: {
      draggable,
      CreateTaskCard
    }
  })

  export default class TaskCard extends Vue {
    @Prop()
    // レーン名
    public subTitle?: string;

    @Prop()
    // ステータスのKey
    public statusKey?: string;

    @Prop()
    // タスク一覧
    public tasks?: object[];

    public is_task_text_hide: boolean = true;
    public task: TaskData = {};
    // draggabbleで使用するオプション
    public options: object = {
      group: "myGroup",
      animation: 200
    }

    @Emit('on-update-task-status')
    public onUpdateTaskStatusEmit(event: Event){}

    @Emit('on-draggable-end')
    public draggableEndEmit(event: Event){}

    @Emit('on-detail-modal-open')
    public onDetailModalOpenEmit(task: TaskData){}

    @Emit('create-task')
    public onClickCreateTaskEmit(task: TaskData){}

    // タスクの更新
    public onUpdateTaskStatus(event: Event) {
      this.onUpdateTaskStatusEmit(event);
    }

    // 横に移動した時に発火
    public draggableEnd(event: Event) {
      this.draggableEndEmit(event);
    }

    // 詳細モーダルを開く
    public onDetailModalOpen(task: TaskData) {
      this.onDetailModalOpenEmit(task);
    }

    // タスクの新規作成
    public onClickCreateTask(task: TaskData, statusKey: string) {
      this.is_task_text_hide = true;
      task.status = statusKey;
      this.onClickCreateTaskEmit(task);
    }

    // キャンセルボタンが押された時
    public onClickCansel() {
      this.is_task_text_hide = true;
    }

    public onClickTextShow() {
      this.is_task_text_hide = false;
    }
  }
</script>
