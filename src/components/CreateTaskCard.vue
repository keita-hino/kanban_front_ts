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

<script lang="ts">
  import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

  @Component
  export default class CreateTaskCard extends Vue {
    @Prop()
    // 入力用のテキストボックスを表示するかどうか
    public isTaskTextHide?: boolean;

    @Prop()
    // ステータスのKey
    public statusKey?: String;

    // TODO:定義ファイル作成
    public task: object = {};

    // タスク名のバリデーション
    public nameRules = [
      (v: string) => !!v || 'タスク名は必須です',
      (v: string) => !!v && v.length <= 50 || 'タスク名は50字以内で入力してください',
    ]

    @Watch('is_task_text_hide')
    public isTaskText(){
      if(!this.isTaskTextHide) {
          this.init()
        }
    }

    @Emit('on-click-cancel')
    public onClickCanselEmit(){}

    // 初期化処理
    public init(){
      this.task = {};
    }

    // キャンセルボタンが押された時
    public onClickCansel(){
      this.task = {};
      this.onClickCanselEmit();
    }
  }
</script>
