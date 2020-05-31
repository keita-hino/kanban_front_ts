<template>
  <div>
    <v-dialog v-model="isTaskDetailModalShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="subtitle-2 font-weight-light">#{{ selectedTask.id }} {{ statuses[selectedTask.status] }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="task_form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="selectedTask.name"
                    label="タスク名*"
                    :counter="50"
                    :rules="nameRules"
                    required
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="selectedTask.due_date"
                        label="期限日"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="selectedTask.due_date"
                      no-title
                      @input="menu2 = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12">
                  <v-select v-model="selectedTask.priority"
                    :items="priorities"
                    label="優先度"
                  >
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="selectedTask.detail"
                    label="詳細"
                    :counter="200"
                    :rules="detailRules"
                    rows="1"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small class="red--text lighten-1--text">*は必須項目です</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('on-click-task-detail-cancel')">キャンセル</v-btn>
          <v-btn class="save" color="blue darken-1" text @click="onClickSave(selectedTask)" :disabled="!!$refs.task_form && !$refs.task_form.validate()">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { TaskData } from '@/types/task';

  @Component
  export default class TaskDetailModal extends Vue {
    @Prop()
    // タスク表示/非表示
    public isTaskDetailModalShow?: boolean;

    @Prop()
    // タスクのステータス
    public taskStatus?: string;

    @Prop()
    // タスクの優先度のenum
    public priorities?: object[];

    @Prop()
    // 選択されたタスク
    public selectedTask?: TaskData;

    @Prop()
    // ステータス{key: i18n}
    public statuses?: object;

    public task: TaskData = {};

    // TODO:あとで必要か確認
    public menu2: boolean = false;

    @Emit('on-click-task-detail-save')
    public onClickTaskDetailSaveEmit(selectedTask: TaskData){}

    // タスク名のバリデーション
    public nameRules =  [
      (v: string) => !!v || 'タスク名は必須です',
      (v: string) => v.length <= 50 || 'タスク名は50字以内で入力してください',
    ]

    // 詳細のバリデーション
    public detailRules = [
      (v: string) => v?.length <= 200 || !v || '詳細は200字以内で入力してください'
    ]

    // 登録されているタスクを取得する
    public onClickSave(selectedTask: TaskData): void {
      this.task.status = this.taskStatus;
      this.onClickTaskDetailSaveEmit(selectedTask);
    }
  }
</script>
