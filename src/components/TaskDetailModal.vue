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
          <v-btn
            color="blue darken-1"
            text
            data-test="task-detail-modal-cancel-btn"
            @click="cancelTaskDetail()"
            >キャンセル
          </v-btn>
          <v-btn 
            class="save"
            color="blue darken-1"
            text
            data-test="task-detail-modal-save-btn"
            @click="onClickSave(selectedTask)" 
            :disabled="!!$refs.task_form && !$refs.task_form.validate()"
            >保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api'
  import { Task } from '@/types/schema';

  export default defineComponent({
    props: {
      // タスク表示/非表示
      isTaskDetailModalShow: {
        type: Boolean
      },
      // タスクのステータス
      taskStatus: {
        type: String
      },
      priorities: {
        type: Array
      },
      // 選択されたタスク
      selectedTask: {
        type: Object as () => Task
      },
      // ステータス{key: i18n}
      statuses: {
        type: Object
      }
    },
    setup(props, { emit }){
      const task = ref<Task>({})

      // TODO:あとで必要か確認
      const menu2 = ref(false)

     // タスク名のバリデーション
      const nameRules =  [
        (v: string) => !!v || 'タスク名は必須です',
        (v: string) => v.length <= 50 || 'タスク名は50字以内で入力してください',
      ]

      // 詳細のバリデーション
      const detailRules = [
        (v: string) => v?.length <= 200 || !v || '詳細は200字以内で入力してください'
      ]

      // 登録されているタスクを取得する
      const onClickSave = (selectedTask: Task) => {
        task.value.status = props.taskStatus;
        emit('on-click-task-detail-save', selectedTask);
      }

      const cancelTaskDetail = () => {
        emit('on-click-task-detail-cancel')
      }

      return {
        menu2,
        nameRules,
        detailRules,
        onClickSave,
        cancelTaskDetail
      }
    }
  });
</script>
