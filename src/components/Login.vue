<template>
  <v-main>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-text>
        <div class="layout column align-center">
          <h1 class="flex my-4">ログイン</h1>
        </div>
        </v-card-text>

        <v-container>
          <v-row>
            <v-col cols="11" class="ml-5">
              <v-text-field
                v-model="user.email"
                append-icon="person"
                name="login"
                label="メールアドレス"
                type="text"
                :counter="128"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="11" class="ml-5">
              <v-text-field
                v-model="user.password"
                append-icon="lock"
                name="password"
                label="パスワード"
                id="password"
                type="password"
                :counter="32"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <div class="my-2 pr-2">
            <v-btn @click="onClicklogin" small color="primary">ログイン</v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api'
  import { UserData } from '@/types/user'
  import { login } from '@/api/auth'

  export default defineComponent({
    setup(_, { root }){
      const user = ref<UserData>({})

      const onClicklogin = async () => {
        const response = await login(user.value)

        // TODO:ログイン失敗した場合の処理追加
        const data = {
          user: response.data.data
        }
        root.$store.commit('auth/login', data.user);
        root.$store.commit('workspace/setWorkspace', response.data.workspace);
        root.$router.push({name: 'Tasks'});
      }

      return {
        user,
        onClicklogin
      }
    }
  })
</script>
