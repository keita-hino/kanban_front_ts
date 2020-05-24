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

<script>
  import _ from 'lodash'

  import UserProfileModal from './UserProfileModal'

  export default {
    data: function () {
      return {
        user: {},
        drawer: false,
        is_profile_modal_show: false
      }
    },
    components:{
      UserProfileModal
    },

    methods: {
      // ログアウトボタン押下時
      onClickLogout() {
        this.$store.commit('auth/logout');
        this.$router.push({name: 'Login'})
      },

      // ユーザ設定モーダルでキャンセルボタンが押された時
      onClickModalCancel() {
        this.is_profile_modal_show = false;
      },

      // ユーザ設定モーダルで更新ボタンが押された時
      updateUser(user) {
        this.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/users`, {
          user: user,
        })
        .then( () => {
          this.is_profile_modal_show = false;
          this.$store.commit('auth/logout');
          this.$router.push({name: 'Login'})
        });

      },

      // フルネーム取得
      fullName(){
        return `${this.$store.state.auth.last_name} ${this.$store.state.auth.first_name}`
      },

      // ログインしているか
      isLogined() {
        return this.$store.state.auth.email != null
      },

      // プロファイル設定モーダルを開く
      onProfileModalOpen() {
        this.is_profile_modal_show = true;
        this.user = _.cloneDeep(this.$store.state.auth)
      },
    },
  }
</script>

<style>
  .profile-menu{
    color:#ffffff !important;
  }

</style>