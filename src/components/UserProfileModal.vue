<template>
  <v-dialog 
    v-model="isProfileModalShow" 
    persistent 
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="sub-title">ユーザ設定</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="userFormRef">
            <v-row class="d-flex flex-wrap">
              <v-col 
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="user.last_name"
                  label="姓*"
                  required
                  :rules="lastNameRules"
                ></v-text-field>
              </v-col>
              <v-col 
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="user.first_name"
                  label="名*"
                  required
                  :rules="firstNameRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="user.email"
                  label="メールアドレス*"
                  required
                  :rules="emailRules"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <!-- TODO:目のアイコンを設置して見えるようにする -->
                <v-text-field 
                  v-model="user.password" 
                  label="パスワード" 
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small
          class="red--text lighten-1--text"
        >*は必須項目です</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="blue darken-1"
          text
          @click="onClickModalCancel"
        >閉じる</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="onClickUpdateUser(user)"
          :disabled="isInvalid"
        >変更</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { defineComponent, watch, PropType, ref, computed } from '@vue/composition-api'
  import { User } from '@/types/schema'

  export default defineComponent({
    props: {
      // モーダル表示/非表示
      isProfileModalShow: {
        type: Boolean
      },
      // ログイン中のユーザ
      user: {
        type: Object as PropType<User>
      },
    },
    setup(props, { emit }){
      watch(
        () => props.isProfileModalShow,
        () => {
          if(props.isProfileModalShow) {
            init()
          }
        }
      )

      const userFormRef = ref<HTMLFormElement | null>(null)

      const isInvalid = computed(() => userFormRef.value && !userFormRef.value.validate())

      // 姓のバリデーション
      const lastNameRules = [
        (v: string) => !!v || '姓は必須です',
        (v: string) => v.length <= 20 || '姓は20字以内で入力してください',
      ]

      // 名のバリデーション
      const firstNameRules = [
        (v: string) => !!v || '名は必須です',
        (v: string) => v.length <= 20 || '名は20字以内で入力してください',
      ]

      // メールアドレスノンバリデーション
      const emailRules = [
        (v: string) => !!v || 'メールアドレスは必須です',
        (v: string) => v.length <= 20 || 'メールアドレスは20字以内で入力してください',
      ]

      const init = () => {
        !!props.user ? props.user.before_email = props?.user?.email : ""
      }

      // 変更ボタンが押された時
      const onClickUpdateUser = (user: User) => {
        emit('update-user', user)
      }

      // キャンセルが押された時
      const onClickModalCancel = () => {
        emit('on-click-modal-cancel')
      }

      return {
        userFormRef,
        isInvalid,
        lastNameRules,
        firstNameRules,
        emailRules,
        onClickUpdateUser,
        onClickModalCancel
      }
    }
  });
</script>