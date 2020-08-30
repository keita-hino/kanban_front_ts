<template>
  <v-content>
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
                v-model="state.user.email"
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
                v-model="state.user.password"
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
            <v-btn @click="login" small color="primary">ログイン</v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-container>
  </v-content>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api'
  import { Component, Vue } from 'vue-property-decorator';
  import { UserData } from '@/types/user'

  export default defineComponent({
    setup(_props, context){
      const state = reactive<{ user: UserData }>({
        user: {}
      })

      const login = () => {
        context.root.axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/sign_in`, state.user)
        .then(response => {
          // TODO:ログイン失敗した場合の処理追加
          const data = {
            user: response.data.data
          }
          context.root.$store.commit('auth/login', data.user);
          context.root.$store.commit('workspace/setWorkspace', response.data.workspace);
          context.root.$router.push({name: 'Tasks'});
        });
      }

      return {
        state,
        login
      }
    }
  })
</script>
