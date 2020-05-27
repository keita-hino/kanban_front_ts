<template>
  <v-app-bar
    color="blue lighten-1"
    dense
    dark
    app
  >

    <v-toolbar-title>
      <v-img alt="Vue logo" src="../assets/logo.png"/>
    </v-toolbar-title>

    <v-spacer></v-spacer>

      <!-- プロフィール周り -->
      <v-menu offset-y>
        <template  v-if="isLogined()" v-slot:activator="{ on }">
          <a v-on="on" class="profile-menu">
            <!-- TODO:後にプロフィール画像にする -->
            {{ fullName() }}
            <i class="v-icon profile-menu notranslate hidden-sm-and-down mdi mdi-menu-down theme--light"></i>
          </a>
        </template>

        <v-list tag="a" dense>
          <v-list-item>
            <v-list-item-title @click="onProfileModalOpen()">プロフィール編集</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    <v-tooltip v-if="isLogined()" bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-btn icon @click="onClickLogout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        </template>
      <span>ログアウト</span>
    </v-tooltip>

    <UserProfileModal
      @on-click-modal-cancel="onClickModalCancel"
      @update-user="updateUser"
      :is-profile-modal-show="is_profile_modal_show"
      :user="user"
    />

  </v-app-bar>
</template>

<script lang="ts">
  import _ from 'lodash';

  import { UserData } from '@/types/user'

  import { Component, Vue } from 'vue-property-decorator';
  import UserProfileModal from './UserProfileModal.vue';

  @Component({
    components: {
      UserProfileModal
    }
  })

  export default class Header extends Vue {
    public user: UserData = {};
    public drawer: boolean = false;
    public is_profile_modal_show: boolean = false;

    // ログアウトボタン押下時
    public onClickLogout() {
      this.$store.commit('auth/logout');
      this.$router.push({name: 'Login'})
    }

    // ユーザ設定モーダルでキャンセルボタンが押された時
    public onClickModalCancel() {
      this.is_profile_modal_show = false;
    }

    // ユーザ設定モーダルで更新ボタンが押された時
    public updateUser(user: UserData) {
      this.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/users`, {
        user: user,
      })
      .then( () => {
        this.is_profile_modal_show = false;
        this.$store.commit('auth/logout');
        this.$router.push({name: 'Login'})
      });
    }

    // フルネーム取得
    public fullName(){
      return `${this.$store.state.auth.last_name} ${this.$store.state.auth.first_name}`
    }

    // ログインしているか
    public isLogined() {
      return this.$store.state.auth.email != null
    }

    // プロファイル設定モーダルを開く
    public onProfileModalOpen() {
      this.is_profile_modal_show = true;
      this.user = _.cloneDeep(this.$store.state.auth)
    }
  }
</script>

<style>
  .profile-menu{
    color:#ffffff !important;
  }

</style>