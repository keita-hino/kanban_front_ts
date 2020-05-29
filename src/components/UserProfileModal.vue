<template>
  <v-dialog v-model="isProfileModalShow" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="sub-title">ユーザ設定</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="user_form">
            <v-row class="d-flex flex-wrap">
              <!-- <v-col cols="12" sm="6" md="6">
                <img-inputer v-model="file"
                  theme="light"
                  :auto-upload="true"
                  placeholder="ファイルをここにドラッグする"
                  bottom-text="ファイルをドロップするかここをクリックしてください" />
              </v-col> -->
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.last_name"
                  label="姓*"
                  required
                  :rules="lastNameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.first_name"
                  label="名*"
                  required
                  :rules="firstNameRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="user.email"
                  label="メールアドレス*"
                  required
                  :rules="emailRules"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- TODO:目のアイコンを設置して見えるようにする -->
                <v-text-field v-model="user.password" label="パスワード" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small class="red--text lighten-1--text">*は必須項目です</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('on-click-modal-cancel')">閉じる</v-btn>
        <v-btn color="blue darken-1" text @click="onClickUpdateUser(user)" :disabled="!!$refs.user_form && !$refs.user_form.validate()">変更</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import { UserData } from '@/types/user'
  // import ImgInputer from 'vue-img-inputer'
  // import 'vue-img-inputer/dist/index.css'

  @Component
  export default class UserProfileModal extends Vue {

    @Prop()
    // モーダル表示/非表示
    public isProfileModalShow?: boolean;

    @Prop()
    // ログイン中のユーザ
    public user?: UserData;

    @Emit('update-user')
    public onClickUserSaveEmit(user: UserData){};

    @Watch('isProfileModalShow')
    public isProfileModalShowWatch(): void{
      if(this.isProfileModalShow) {
        this.init()
      }
    }

    // 姓のバリデーション
    public lastNameRules = [
      (v: string) => !!v || '姓は必須です',
      (v: string) => v.length <= 20 || '姓は20字以内で入力してください',
    ]

    // 名のバリデーション
    public firstNameRules = [
      (v: string) => !!v || '名は必須です',
      (v: string) => v.length <= 20 || '名は20字以内で入力してください',
    ]

    // メールアドレスノンバリデーション
    public emailRules = [
      (v: string) => !!v || 'メールアドレスは必須です',
      (v: string) => v.length <= 20 || 'メールアドレスは20字以内で入力してください',
    ]

    // 初期化
    public init(){
      !!this.user ? this.user.before_email = this?.user?.email : ""
    }

    // 変更ボタンが押された時
    onClickUpdateUser(user: UserData): void {
      this.onClickUserSaveEmit(user);
    }

  }


  // export default {

  //   data() {
  //     return {
  //       file: '',
  //       lastNameRules: [
  //         v => !!v || '姓は必須です',
  //         v => v.length <= 20 || '姓は20字以内で入力してください',
  //       ],
  //       firstNameRules: [
  //         v => !!v || '名は必須です',
  //         v => v.length <= 20 || '名は20字以内で入力してください',
  //       ],
  //       emailRules: [
  //         v => !!v || 'メールアドレスは必須です',
  //         v => v.length <= 20 || 'メールアドレスは20字以内で入力してください',
  //       ],
  //     }
  //   },

  //   components: {
  //     // ImgInputer
  //   },


</script>