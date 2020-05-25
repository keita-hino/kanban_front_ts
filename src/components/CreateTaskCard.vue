<template>
  <div>
    <template v-if="isTaskTextHide">
      <!-- タスク追加用カード -->
      <v-card
        class="mt-2"
        width="330"
      >
        <v-card-text @click="$emit('on-click-text-show')" class="text-center" style="cursor: pointer">
          <v-icon class="mr-1 mb-1" color="blue lighten-2" size=15>add</v-icon>
          <span class="blue--text lighten-2--text subheading mr-2">タスク追加</span>
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
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>

          <div class="my-2 pr-3">
            <v-btn small @click="onClickCansel()">キャンセル</v-btn>
          </div>

          <div class="my-2 pr-2">
            <v-btn small @click="$emit('on-click-create-task', task, statusKey)" :disabled="!task.name" color="primary">作成</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      // 入力用のテキストボックスを表示するかどうか
      isTaskTextHide: {
        type: Boolean,
      },
      // ステータスのKey
      statusKey: {
        type: String,
      },
    },

    data() {
      return {
        task: {},
        nameRules: [
          v => !!v || 'タスク名は必須です',
          v => !!v && v.length <= 50 || 'タスク名は50字以内で入力してください',
        ],
      }
    },

    watch: {
      isTaskTextHide(is_task_text_hide) {
        if(!is_task_text_hide) {
          this.init()
        }
      }
    },

    methods: {
      // 初期化処理
      init() {
        this.task = {};
      },

      // キャンセルボタンが押された時
      onClickCansel() {
        this.task = {};
        this.$emit('on-click-cancel')
      },
    }
  }

</script>
