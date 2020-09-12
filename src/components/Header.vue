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
      :user="state.user"
    />

  </v-app-bar>
</template>

<script lang="ts">
  import _ from 'lodash';

  import { UserData } from '@/types/user'

  import { defineComponent, reactive, ref } from '@vue/composition-api'
  import { Component, Vue } from 'vue-property-decorator';
  import UserProfileModal from './UserProfileModal.vue';

  export default defineComponent({
    components: { UserProfileModal},

    setup(_props, context){
      const state = reactive<{ user: UserData }>({
        user: {}
      })

      const drawer = ref<boolean>( false )
      const is_profile_modal_show = ref<boolean>( false )

      // ログアウトボタン押下時
      const onClickLogout = () => {
        context.root.$store.commit('auth/logout');
        context.root.$router.push({name: 'Login'})
      }

      // ユーザ設定モーダルでキャンセルボタンが押された時
      const onClickModalCancel = () => {
        is_profile_modal_show.value = false;
      }

      // ユーザ設定モーダルで更新ボタンが押された時
      const updateUser = (user: UserData) =>  {
        context.root.axios.patch(`${process.env.VUE_APP_API_BASE_URL}/users`, {
          user: state.user,
        })
        .then( () => {
          is_profile_modal_show.value = false;
          context.root.$store.commit('auth/logout');
          context.root.$router.push({name: 'Login'})
        });
      }

      // フルネーム取得
      const fullName = () => {
        return `${context.root.$store.state.auth.last_name} ${context.root.$store.state.auth.first_name}`
      }

      // ログインしているか
      const isLogined = () => {
        return context.root.$store.state.auth.email != null
      }

      // プロファイル設定モーダルを開く
      const onProfileModalOpen = () => {
        is_profile_modal_show.value = true;
        state.user = _.cloneDeep(context.root.$store.state.auth)
      }

      return {
        state,
        is_profile_modal_show,
        drawer,
        onClickLogout,
        onClickModalCancel,
        updateUser,
        fullName,
        isLogined,
        onProfileModalOpen
      }

    }
  })
</script>

<style>
  .profile-menu{
    color:#ffffff !important;
  }
</style>