<template>
  <div>
    <template v-if="props.isTaskTextHide">
      <!-- タスク追加用カード -->
      <v-card
        class="mt-2"
        width="330"
      >
        <v-card-text 
          class="text-center" 
          style="cursor: pointer"
          @click="showTextShow" 
        >
          <v-icon 
            class="mr-1 mb-1" 
            color="blue lighten-2" 
            size=15
          >add
          </v-icon>
          <span 
            class="blue--text lighten-2--text subheading mr-2"
          >タスク追加
          </span>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <v-card
        class="mt-2"
        width="330"
      >
        <v-card-text class="pb-0">
          <v-text-field
            v-model="task.name"
            label="タスク名"
            outlined
            :counter="50"
            :rules="nameRules"
            required
            Flat
            dense
            :autofocus="true"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>

          <div class="my-2 pr-3">
            <v-btn 
              small 
              @click="onClickCansel"
            >キャンセル
            </v-btn>
          </div>

          <div class="my-2 pr-2">
            <v-btn 
              small 
              @click="onClickCreateTask" 
              :disabled="!task.name" 
              color="primary"
            >作成
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from '@vue/composition-api'
  import { TaskData } from '@/types/task'

  export default defineComponent({
    props: {
      isTaskTextHide: {
        type: Boolean,
        required: true
      },
      statusKey: {
        type: String,
        required: true
      },
    },

    setup(props, { emit }){
      const task = ref<TaskData>({});

      // タスク名のバリデーション
      const nameRules = [
        (v: string) => !!v || 'タスク名は必須です',
        (v: string) => !!v && v.length <= 50 || 'タスク名は50字以内で入力してください',
      ]

      // 初期化処理
      const init = () => {
        task.value = {};
      }

      // キャンセルボタンが押された時
      const onClickCansel = () =>{
        init();
        emit('on-click-cancel');
      }

      const showTextShow = () => {
        emit('on-click-text-show');
      }

      const onClickCreateTask = () => {
        emit('on-click-create-task', task.value, props.statusKey)
      }

      watch(() => props.isTaskTextHide, () => {
        if(!props.isTaskTextHide) {
          init();
        }
      });

      return {
        task,
        nameRules,
        props,
        onClickCansel,
        showTextShow,
        onClickCreateTask
      }
    }
  })
</script>
