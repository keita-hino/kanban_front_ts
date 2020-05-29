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
            <v-btn @click="login" small color="primary">ログイン</v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-container>
  </v-content>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Login extends Vue {
    public user: object = {};

    // ログイン
    public login(): void{
      this.axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/sign_in`, this.user)
        .then(response => {
          // TODO:ログイン失敗した場合の処理追加
          const data = {
            user: response.data.data
          }
          this.$store.commit('auth/login', data.user);
          this.$store.commit('workspace/setWorkspace', response.data.workspace);
          this.$router.push({name: 'Tasks'});
        });
    }
  }

</script>
